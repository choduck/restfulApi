
/**
Constructor
Do not call Function in Constructor.
*/
function KVQueryManager()
{
	QueryManager.call(this);

	//----------------------------------------
	//	data head type 패킷 정보 변수 추가
	
	this.packetInfo.dheadType = '';
	this.sendInfo.dheadType = '';
	this.pcIp = '';
	
	this.trSeq = 0;
	
}
afc.extendsClass(KVQueryManager, QueryManager);

var MEDIA_TYPE = '40';

var PACKET_STX = 0x02;
var PACKET_ETX = 0x03;

var PACKET_TYPE = 
{
	A: 0x41,	// 시세 실시간 요청 패킷
	B: 0x42,	// 시세 실시간 요청 해지 패킷
	D: 0x44,	// 시세 실시간 패킷
	E: 0x45, 	// Transaction 호출 I/O 패킷
	F: 0x46,	// Transaction 종료 패킷
	
	G: 0x47,	// 주문 실시간 요청 패킷
	H: 0x48,	// 주문 실시간 요청 해지 패킷
	I: 0x49,	// 주문 실시간 패킷
	
	O: 0x4F,	// 로그인 세션 등록 패킷
	P: 0x50,	// Transaction 메시지 패킷
	Q: 0x51,	// 시스템 오류 패킷
	
	X: 0x58,	// 구간암호화 키 받는 패킷
	Y: 0x59,	// m/w 로 부터 자신의 공개 IP 를 받는 패킷
	
	k: 0x6b,	// 암호화된 계정아이디를 등록하는 패킷
};

var DHEAD_TYPE = 
{
	A: 0x41,	// 업무계
	B: 0x42,	// 정보계
};

var PACKET_FLAG = 
{
	FIRST:		0x01,
	MID:		0x02,
	LAST:		0x03,
	ENCRYPT:	0x10,
	COMPRESS:	0x20,
	BLOCKING:	0x40,
};


KVQueryManager.pushRegCnt = 0;

KVQueryManager.prototype.setClosedCallback = function(callback)
{
	this.closedCallback = callback;
};

KVQueryManager.prototype.setConnectCallback = function(connectCallback)
{
	this.connectCallback = connectCallback;
};

KVQueryManager.prototype.onConnected = function(success)
{
	//AToast.show('connect : ' + success);
	
	// 푸시 등록 개수 초기화
	KVQueryManager.pushRegCnt = 0;

	if(success && !this.noFirst)
	{
		var thisObj = this;
		this.noFirst = true;
		this.sendXtSetKey(function()
		{
			if(thisObj.connectCallback) thisObj.connectCallback(success);
		});
	}
	else
	{
		if(this.connectCallback) this.connectCallback(success);
	}
};

KVQueryManager.prototype.onClosed = function()
{
	//this.realProcMap = undefined;
	
	if(this.closedCallback) this.closedCallback();
};

KVQueryManager.prototype.enableRetry = function(retryCount)
{
	if(this.netIo) this.netIo.enableRetry(retryCount);
};

//data is UInt8Array
KVQueryManager.prototype.onReceived = function(data, size)
{
	this.rcvBuf.setBuffer(data);
	this.rcvBuf.setDataSize(size);	
	
	this.packetInfo.dheadType = '';
	this.packetInfo.packetType = this.rcvBuf.getByte(OS_COMM_CMD);
	this.packetInfo.packetId = this.rcvBuf.getByte(OS_COMM_ID);
	
	switch(this.packetInfo.packetType)
	{
		case PACKET_TYPE.D:
			this.siseProcess();
		break;
		
		case PACKET_TYPE.I:
			this.pushProcess();
		break;
	
		case PACKET_TYPE.E:
			this.queryProcess();
		break;
		
		//transaction 패킷 종료
		case PACKET_TYPE.F:
		break;

		//transaction 패킷 메시지
		case PACKET_TYPE.P:
		{
			var errCode = this.rcvBuf.getOriString(OS_MSG_CODE, SZ_MSG_CODE),
				errMsg = this.rcvBuf.getStringTo(OS_MSG_MESSAGE, 0x03);
			
			console.log('P : ' + errCode + ' : ' + errMsg);
			
			this.errorProcess(this.packetInfo.packetId, errCode, errMsg);
		}
		break;
		
		//transaction 패킷 에러
		//차후 outblockdata 에 호출되도록
		case PACKET_TYPE.Q:
		{
			var errCode = this.rcvBuf.getOriString(OS_MSG_CODE, SZ_MSG_CODE), 
				errMsg = this.rcvBuf.getStringTo(OS_MSG_MESSAGE, 0x03);
			
			console.log('Q : ' + errCode + ' : ' + errMsg);
			
			//전송규약 오류발생시 앱 reload (00014)
			//허가되지 않은 접근 (00015)
			if(errCode == "00014" || errCode == "00015") { 
				if(afc.isMobile) {
					theApp.isExitApp = true;
					theApp.exitApp();
				} else {
					//웹 에서 종료시 로그아웃 화면으로 이동하도록 수정예정
					theApp.isForceCloseState = true;
					window.location.reload(); 										
				}
				// if(this.isShowProgress) AIndicator.hide();	
				return;
			}
			
			this.errorProcess(this.packetInfo.packetId, errCode, errMsg);
		}
		break;

		// 로그인 세션등록 패킷
		case PACKET_TYPE.O:
		{
			// 서버에서 아무런 응답을 보내주지 않는게 맞음
		}
		break;

		// 구간암호화 키 패킷
		case PACKET_TYPE.X:
		{
			this.netIo.setUserSeed(this.rcvBuf.getOriString(OS_TR_FLAG, 17, true));	//User Seed 세팅
			//this.pcIp = this.rcvBuf.nextOriString(15);							//PC IP, 차후 업무계 티알 헤더 ip 영역에 셋팅해주기
			//값만 꺼내온다. 차후 packet_type.y  에서 다시 받음.
			this.rcvBuf.nextOriString(15);							//PC IP, 차후 업무계 티알 헤더 ip 영역에 셋팅해주기
			this.serverIp = this.rcvBuf.nextOriString(15);						//접속서버 IP
			
			var cb = this.getQueryCallback(this.packetInfo.packetId);
			if(cb) cb.call(this);
		}
		break;
		
		// m/w 로 부터 자신의 공개 IP 를 받는 패킷
		case PACKET_TYPE.Y:
		{
			var pubIp = this.rcvBuf.getOriString(OS_TR_FLAG, 20);
			
			pubIp = pubIp.split('.');
			for(var i=0; i<pubIp.length; i++)
			{
				if(pubIp[i].length == 2) pubIp[i] = '0' + pubIp[i];
				else if(pubIp[i].length == 1) pubIp[i] = '00' + pubIp[i];
			}
			this.pcIp = pubIp.join('.');
			console.log('public ip : ' + this.pcIp);
		}
		break;
	}
	
	// if(this.isShowProgress) AIndicator.hide();	

};

KVQueryManager.prototype.errorProcess = function(packetId, errCode, errMsg)
{
	if(errCode == '00000') return;
	//alert(errMsg);

	// if(this.isShowProgress) AIndicator.hide();

	var cbObj = this.getQueryCallback(packetId), listener, i, 
		qLen = this.queryListeners.length;
	
	// 타임아웃 발생시 콜백객체를 제거하므로 체크
	if(!cbObj) return;

	//에러 메시지 셋팅
	this.errorData.trName = cbObj.trName;
	this.errorData.errCode = errCode;
	this.errorData.errMsg = errMsg;

    /**
     * AS-IS 스파이더젠 에서는 메인컨테이너로 메세지박스 전송
     * TO-BE 뷰 에서는 세션스토리지에 임시 저장(브라우저 닫으면 삭제됨)
     */
    window.sessionStorage.setItem('lastErrorData', JSON.stringify(this.errorData));
	
	//console.log('-----------------------------------------------------');
	//afc.log(this.errorData);
	
//--------------------------------
	if(!cbObj.func || !cbObj.func.notUseMessageBox)
		// theApp.openMessageBox(errMsg, 1, theApp.mainContainer);


	//타임 아웃 이후에 패킷이 도착하거나 
	//계정계 지연 패킷이 올수 있으므로 콜백 객체가 없어도 계속 진행한다.
	//계정계 지연 패킷은 listener 의 afterOutBlockData 함수에서만 구현 가능한다.
	if(cbObj.func) cbObj.func.call(this, null);

	//수신된 데이터를 AQueryData 에 채운 후 호출된다.
	//######## afterOutBlockData
	for(i=0; i<qLen; i++)
	{
		listener = this.queryListeners[i];

		if(listener.afterRecvBufferData) listener.afterRecvBufferData(this);
		if(listener.afterOutBlockData) listener.afterOutBlockData(null, this);
	}

};

KVQueryManager.prototype.siseProcess = function()
{
	var abuf = this.rcvBuf, dtSize, qryName, aquery, queryData, block, realField, endFlag;
	
	abuf.setOffset(OS_TR_FLAG);
	
	while(true)
	{
		//dtSize = abuf.nextByte()*256 + abuf.nextByte();
		//dtSize는 사용하지 않으므로
		abuf.nextByte();
		abuf.nextByte();
		
		qryName = abuf.nextOriString(4);

		aquery = AQuery.getSafeQuery(qryName);
		
		if (!aquery)
		{
			console.log('siseProcess, no query : ' + qryName);
			return;
		}
		
		queryData = this.makeQueryData(aquery);
		
		block = aquery.getQueryBlock('input', 'InBlock1');
		realField = block.format[0][AQuery.IKEY];
		
		//offset 을 넘기지 않으면 ABuffer의 현재 offset 을 사용한다.
		queryData.outBlockData(abuf);
		
		var blockData = queryData.getBlockData('OutBlock1')[0];
		
		this.realDataToComp(blockData[realField], queryData);

		//여기까지가 한 묶음.
		//-----------------------
		
		endFlag = abuf.nextByte();
		
		//PACKET_ETX 이면 종료 
		if(endFlag==PACKET_ETX) break;
		//아니면 데이터가 더 있는 것이므로 다시 1byte 뒤로 
		else abuf.addOffset(-1);
	}
};

KVQueryManager.prototype.pushProcess = function()
{
	var abuf = this.rcvBuf, dtSize, qryName, aquery, queryData, block, realField, endFlag;
	
	abuf.setOffset(OS_TR_FLAG);
	
	while(true)
	{
		//dtSize = abuf.nextByte()*256 + abuf.nextByte();
		//dtSize는 사용하지 않으므로
		abuf.nextByte();
		abuf.nextByte();

		qryName = abuf.nextOriString(4);
		
		aquery = AQuery.getSafeQuery(qryName);
		
		if (!aquery)
		{
			console.log('pushProcess, no query : ' + qryName);
			return;
		}
		
		queryData = this.makeQueryData(aquery);
		
		block = aquery.getQueryBlock('input', 'InBlock1');
		realField = block.format[0][AQuery.IKEY];
		
		//push 전문인 경우, res 내부에 qryName 이 포함되어져 있어서
		//미리 얻어서 셋팅하고 쿼리 데이터를 만들고 offset 을 다시 뒤로 돌려준다.
		abuf.addOffset(-4);

		//offset 을 넘기지 않으면 ABuffer의 현재 offset 을 사용한다.
		queryData.outBlockData(abuf);
		
		var blockData = queryData.getBlockData('OutBlock1')[0];
		
		this.realDataToComp(blockData[realField], queryData);
		
		//여기까지가 한 묶음.
		//-----------------------
		
		endFlag = abuf.nextByte();
		
		//오류인지 LF 문자가 포함되어져 있음.
		if(endFlag==0x0A) endFlag = abuf.nextByte();
		
		//PACKET_ETX 이면 종료 
		if(endFlag==PACKET_ETX) break;
		//아니면 데이터가 더 있는 것이므로 다시 1byte 뒤로 
		else abuf.addOffset(-1);
	}
};

//헤더 이후의 데이터 셋팅 오프셋을 리턴한다. makeHeader 보다 먼저 호출된다
KVQueryManager.prototype.getInDataOffset = function(aquery)
{
	var dataOffset = OS_TR_DHEAD;
	
	//dhead 타입을 얻어온다. A: 업무계, B: 정보계
	var dheadType = aquery.getValue('headtype');
	
	if(!dheadType) dheadType = '';
	
	this.sendInfo.dheadType = dheadType;
	
	if(dheadType) 
	{
		dheadType = dheadType.charCodeAt(0);
	
		if(dheadType==DHEAD_TYPE.B) dataOffset += SZ_INF_DHEAD;
		
		//DHEAD_TYPE.A
		else dataOffset += SZ_ACC_DHEAD;
	}
	
	return dataOffset;
};

KVQueryManager.prototype.getOutDataOffset = function(aquery)
{
	var dataOffset = OS_TR_DHEAD;
	
	//dhead 타입을 얻어온다. A: 업무계, B: 정보계
	var dheadType = aquery.getValue('headtype');
	
	if(!dheadType) dheadType = '';
	
	this.packetInfo.dheadType = dheadType;
	
	if(dheadType) 
	{
		dheadType = dheadType.charCodeAt(0);
	
		if(dheadType==DHEAD_TYPE.B) dataOffset += SZ_INF_DHEAD;
		
		//DHEAD_TYPE.A
		else dataOffset += SZ_ACC_DHEAD;
	}
	
	return dataOffset;
};

KVQueryManager.prototype.makePacketId = function()
{
	if(++this.packetId  > 255) this.packetId = 1;
	
	return this.packetId;
};

KVQueryManager.prototype.makeTrSeq = function()
{
	if(++this.trSeq  > 99999) this.trSeq = 1;
	
	//test
/*	if(this.trSeq > 10)
		this.trSeq = 10;*/
		
	return this.trSeq;
};



//사용할 AQueryData 객체를 생성하여 리턴한다.
KVQueryManager.prototype.makeQueryData = function(aquery, isSend)
{
	var queryData = new KVQueryData(aquery);
	
	if(isSend)
	{
		var dheadType = aquery.getValue('headtype');
		if(dheadType)
		{
			dheadType = dheadType.charCodeAt(0);

			if(dheadType==DHEAD_TYPE.A) queryData.enableEnc(true);
		}
		return queryData;
	}
	
	//data head 타입이 존재하면 
	if(this.packetInfo.dheadType) 
	{
		var dheadType = this.packetInfo.dheadType.charCodeAt(0);
		
		//정보계 데이터 헤드
		if(dheadType==DHEAD_TYPE.B)
		{
			//연속 조회키 셋팅
			var flag = this.rcvBuf.getOriString(OS_BDH_CONTI_FLAG, SZ_BDH_CONTI_FLAG);
			if(flag=='1') queryData.setContiKey(this.rcvBuf.getOriString(OS_BDH_PAGING_KEY, SZ_BDH_PAGING_KEY));
		}
		
		//계정계 데이터 헤드
		else if(dheadType==DHEAD_TYPE.A)
		{
			var flag = this.rcvBuf.getOriString(OS_ADH_CONTI_FLAG, SZ_ADH_CONTI_FLAG);
			if(flag=='1') queryData.setContiKey(this.rcvBuf.getOriString(OS_ADH_PAGING_KEY, SZ_ADH_PAGING_KEY));
		}
	}
	
	return queryData;
};

//리얼 등록/해제 패킷 전송 함수... 재정의 하기, unregisterReal 함수 내에서 호출함
KVQueryManager.prototype.sendRealSet = function(aquery, isSet, regArr)
{
	var abuf = this.sndBuf, regData = '', type, sendLen = 0, i,
		qryType = aquery.getQueryType();
		
	if(qryType=='.Push')
	{
		if(isSet) 
		{
			KVQueryManager.pushRegCnt++;
			// 2018-12-13 아래 소스 주석처리 - 이명철
			//   > .Push 요청일 경우 데이터가 넘어오지 않아 주석처리 함

			//한번만 셋팅하므로
			//if(KVQueryManager.pushRegCnt!=1) return;
		}
		else 
		{
			KVQueryManager.pushRegCnt--;
			//sendRealSet 함수 호출전에 유효성을 검사하므로
			//음수인 경우는 비교하지 않아도 됨.
			if(KVQueryManager.pushRegCnt!=0) return;
		}
	}
		
	
	for(i=0; i<regArr.length; i++)
		regData += regArr[i];
		
	this.sendInfo.trName = aquery.getName();
	this.sendInfo.dheadType = qryType;
	this.sendInfo.packetId = isSet; 
		
	if(qryType=='.Feed') regData = this.sendInfo.trName + '|' + regData + ';';
	
	sendLen = OS_TR_FLAG + regData.length + 1;	//1 is 0x03 (end flag)

	//정보계
	if(qryType=='.Feed') type = isSet ? PACKET_TYPE.A : PACKET_TYPE.B;
	else type = isSet ? PACKET_TYPE.G : PACKET_TYPE.H;
	
	//--------------------------------------------------
	//	XT_SOCK_PACKET
	//--------------------------------------------------
	abuf.setByte(OS_SOCK_STX, PACKET_STX);					//패킷 시작 플래그
	abuf.setByte(OS_SOCK_HI, (sendLen-SZ_SIZE_HEADER)/256 );			//패킷 길이 hi
	abuf.setByte(OS_SOCK_LO, (sendLen-SZ_SIZE_HEADER)%256);			//패킷 길이 lo
	
	//--------------------------------------------------
	//	XT_COMM_HEAD
	//--------------------------------------------------
	abuf.setByte(OS_COMM_FLAG, PACKET_FLAG.LAST);	//종료 패킷 셋팅
	abuf.setByte(OS_COMM_ID, 0);					//트랜잭션 아이디 0~255
	abuf.setByte(OS_COMM_CMD, type);				//패킷의 종류, Transaction 호출 IO 패킷
		
	//regData == 'ECH1|KR004LTC__USD__;'
	abuf.setOriString(OS_TR_FLAG, regData.length, regData);
	abuf.addByte(0x03);//종료 플래그
	
	abuf.setDataSize(sendLen);
	this.sendBufferData(abuf);
};

// 로그인 세션 등록
KVQueryManager.prototype.sendXtLoginData = function(userId, sessionId)
{
	var abuf = this.sndBuf;
	
	//접속IP와 filler 는 SPACE로 채움.
	abuf.setOriString(OS_TR_FLAG, 10, userId);			//사용자 아이디
	abuf.addOriString(50, sessionId);					//세션 Key
	abuf.addOriString(15, this.serverIp);				//접속 IP
	abuf.addOriString(15, this.pcIp);					//PC IP
	abuf.addOriString(2, MEDIA_TYPE);					//매체 구분
	abuf.addOriString(2, '');							//filler
	abuf.addOriString(32, this.headerInfo['UUID']);		//mac address
	abuf.addOriString(4, '');							//filler
	abuf.addByte(PACKET_ETX);//종료 플래그

	this.sendCmdTypeData(abuf, PACKET_TYPE.O);
};

// 암호화된 계정아이디 등록
KVQueryManager.prototype.sendXtEncryptUser = function(userId)
{
	var abuf = this.sndBuf;
	
	//접속IP와 filler 는 SPACE로 채움.
	abuf.setOriString(OS_TR_FLAG, 10, userId);			//사용자 아이디
	abuf.addByte(PACKET_ETX);//종료 플래그

	this.sendCmdTypeData(abuf, PACKET_TYPE.k);
};

// 구간암호화 키 앱기동시 최초에만 전송하여 수신받은 수신받은 정보를 저장, 처리해야함
KVQueryManager.prototype.sendXtSetKey = function(callback)
{
	var abuf = this.sndBuf;
	
// 	abuf.setOriString(OS_TR_FLAG, 17, '');				//비밀키
// 	abuf.addOriString(15, '');							//PC IP, 차후 업무계 티알 헤더 ip 영역에 셋팅해주기
// 	abuf.addOriString(15, '');							//접속서버 IP

	abuf.setOffset(OS_TR_FLAG);
	abuf.addByte(PACKET_ETX);//종료 플래그
	
	this.sendCmdTypeData(abuf, PACKET_TYPE.X, callback);
};

KVQueryManager.prototype.sendCmdTypeData = function(abuf, cmd, callback)
{
	var packetId = this.makePacketId();
	var sendLen = abuf.getOffset();
	
	this.sendInfo.trName = '';
	this.sendInfo.dheadType = '';

	//--------------------------------------------------
	//	XT_SOCK_PACKET
	//--------------------------------------------------
	abuf.setByte(OS_SOCK_STX, PACKET_STX);						//패킷 시작 플래그
	abuf.setByte(OS_SOCK_HI, (sendLen-SZ_SIZE_HEADER)/256 );	//패킷 길이 hi
	abuf.setByte(OS_SOCK_LO, (sendLen-SZ_SIZE_HEADER)%256);		//패킷 길이 lo
	
	//--------------------------------------------------
	//	XT_COMM_HEAD
	//--------------------------------------------------
	abuf.setByte(OS_COMM_FLAG, PACKET_FLAG.LAST);	//종료 패킷 셋팅
	abuf.setByte(OS_COMM_ID, packetId);				//트랜잭션 아이디 0~255
	abuf.setByte(OS_COMM_CMD, cmd);					//패킷의 종류, XT_LOGIN_DATA = 'O'
	
	if(callback) this.setQueryCallback(packetId, callback);
	
	abuf.setDataSize(sendLen);
	this.sendBufferData(abuf);
};

KVQueryManager.prototype.makeHeader = function(queryData, abuf)
{
	var packetId = this.makePacketId(), sendLen = abuf.getDataSize(),
		aquery = queryData.getQuery();
	
	//--------------------------------------------------
	//	XT_SOCK_PACKET
	//--------------------------------------------------
	abuf.setByte(OS_SOCK_STX, PACKET_STX);					//패킷 시작 플래그
	abuf.setByte(OS_SOCK_HI, (sendLen-SZ_SIZE_HEADER)/256);	//패킷 길이 hi
	abuf.setByte(OS_SOCK_LO, (sendLen-SZ_SIZE_HEADER)%256);	//패킷 길이 lo
	
	//--------------------------------------------------
	//	XT_COMM_HEAD
	//--------------------------------------------------
	
	//abuf.setByte(OS_COMM_FLAG, PACKET_FLAG.LAST | PACKET_FLAG.ENCRYPT);		//종료 패킷 셋팅
	abuf.setByte(OS_COMM_FLAG, PACKET_FLAG.LAST | queryData.encFlag);		//종료 패킷 셋팅
	abuf.setByte(OS_COMM_ID, packetId);					//트랜잭션 아이디 0~255
	abuf.setByte(OS_COMM_CMD, PACKET_TYPE.E);			//패킷의 종류, Transaction 호출 IO 패킷
	
	//--------------------------------------------------
	//	XT_TR_HEAD
	//--------------------------------------------------
	abuf.setByte(OS_TR_FLAG, 0x04);										//OCCURS 블록, XT_BLOCK_MODE
	abuf.setOriString(OS_TR_TRCODE, SZ_TR_TRCODE, aquery.getName());	//TR 코드
	abuf.setChar(OS_TR_MEDIA, 'H');										//매체 구분
	
	
	//dhead 타입을 얻어온다. A: 업무계, B: 정보계
	//var dheadType = aquery.getValue('headtype');
	
	//data head 타입이 존재하면 
	if(this.sendInfo.dheadType) 
	{
		var dheadSize = 0;

		//전송시 data head type 저장
		//this.sendInfo.dheadType = dheadType;
		
		var dheadType = this.sendInfo.dheadType.charCodeAt(0);
		abuf.setByte(OS_TR_DHEAD_TYPE, dheadType);	//B, A
		
		if(dheadType==DHEAD_TYPE.B) dheadSize = SZ_INF_DHEAD;
		else if(dheadType==DHEAD_TYPE.A) dheadSize = SZ_ACC_DHEAD;
		
		abuf.setByte(OS_TR_DHEAD_HI, dheadSize/256);
		abuf.setByte(OS_TR_DHEAD_LO, dheadSize%256);
		//abuf.addOffset(SZ_TR_FILLER);

		abuf.setNumString(OS_TR_SEQCHK, SZ_TR_SEQCHK, this.makeTrSeq() );
		
		//정보계 데이터 헤드
		if(dheadType==DHEAD_TYPE.B)
		{
			var contiKey = queryData.getContiKey();
			if(contiKey) 
			{
				abuf.setChar(OS_BDH_CONTI_FLAG, '1');								// 연속 FLAG 
				abuf.setOriString(OS_BDH_PAGING_KEY, SZ_BDH_PAGING_KEY, contiKey);	// 연속 조회키
			}
			else abuf.setChar(OS_BDH_CONTI_FLAG, '0');
			
			//사용안함
			//abuf.setOriString(OS_BDH_SCREEN_NO, SZ_BDH_SCREEN_NO, option.menuNo);
		}
		
		//계정계 데이터 헤드
		else if(dheadType==DHEAD_TYPE.A)
		{
// 			queryData.printQueryData();
            if(window.localStorage.getItem('user_id') !== null){
                abuf.setOriString(OS_ADH_ACCOUNT_ID, SZ_ADH_ACCOUNT_ID, window.localStorage.getItem('user_id'));		// 로그인 사용자 계정
            }else{
                abuf.setOriString(OS_ADH_ACCOUNT_ID, SZ_ADH_ACCOUNT_ID, '');		// 비로그인 사용자 계정
            }
// 			abuf.setOriString(OS_ADH_ACCOUNT_ID, SZ_ADH_ACCOUNT_ID, Mypage.getInstance().getEncryptUserId());		// 암호화된 사용자 계정
			abuf.setOriString(OS_ADH_CHANNEL, SZ_ADH_CHANNEL, '20');		// 매체 구분
			
			abuf.setOriString(OS_ADH_PUB_IP, SZ_ADH_PUB_IP, '');			// 공인 IP 주소
			abuf.setOriString(OS_ADH_PRV_IP, SZ_ADH_PRV_IP, '');			// 사설 IP 주소
			abuf.setOriString(OS_ADH_MAC_ADDR, SZ_ADH_MAC_ADDR, ''); // MAC 주소
			
			var contiKey = queryData.getContiKey();
			if(contiKey) 
			{
				abuf.setChar(OS_ADH_CONTI_FLAG, '1');								// 연속 FLAG 
				abuf.setOriString(OS_ADH_PAGING_KEY, SZ_ADH_PAGING_KEY, contiKey);	// 연속 조회키 
			}
			else abuf.setChar(OS_ADH_CONTI_FLAG, '0');
		}
		
	}
	
	//dheadType 이 없으면 data head 란 개념을 사용하지 않으므로 
	//바로 res 데이터 영역이 시작된다.
	else
	{
		abuf.setNumString(OS_TR_SEQCHK, SZ_TR_SEQCHK, this.makeTrSeq() );
		
	}

	return packetId;
};

// option = { realQuery:'', isOutKey:false, realField:'symbol' }
KVQueryManager.prototype.sendProcessWithReal = function(queryName, beforeInBlockBuffer, afterOutBlockData, option, callback)
{
	if(!option.realField) option.realField = 'symbol';
	
	QueryManager.prototype.sendProcessWithReal.call(this, queryName, '', '', beforeInBlockBuffer, afterOutBlockData, option, callback);
};

KVQueryManager.prototype.registerReal = function(aquery, realField, keyArr, updateType, callback)
{
	QueryManager.prototype.registerReal.call( this, aquery, realField, keyArr, '', updateType, callback);
	// QueryManager.prototype.sendProcessWithReal.call(this, queryName, '', '', beforeInBlockBuffer, afterOutBlockData, option, callback);
};











