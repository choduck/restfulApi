//var QueryManager = require('./QueryManager').createApp;
var afc = require('./afc.js');
var ABuffer = require('./ABuffer.js');

var AQuery = require('./AQuery.js');

var KVQueryData = require('./KVQueryData.js');


/**
Constructor
Do not call Function in Constructor.
*/

/**
 * @author asoocool
 */

var SZ_SIZE_HEADER				= 4;	// 사이즈를 얻어올 수 있는 헤더 영역 사이즈, SZ_SOCK_ETX 포함

//--------------------------------------------------
//	XT_SOCK_PACKET
//--------------------------------------------------
var SZ_SOCK_STX					= 1;	// 
var SZ_SOCK_HI					= 1;	// 
var SZ_SOCK_LO					= 1;	// 
var SZ_SOCK_ETX					= 1;	//  이 값은 패킷의 맨 뒷 부분에 있다.

//--------------------------------------------------
//	XT_COMM_HEAD
//--------------------------------------------------
var SZ_COMM_FLAG				= 1;	// 
var SZ_COMM_ID					= 1;	// 
var SZ_COMM_CMD					= 1;	// 



//-------------------------------------------------- ------------------------------------------------
//	XT_MSG_PACKET
//-------------------------------------------------- ------------------------------------------------
var SZ_MSG_CODE					= 5;
var SZ_MSG_MESSAGE				= 130;


//-------------------------------------------------- ------------------------------------------------
//	XT_TR_HEAD
//-------------------------------------------------- ------------------------------------------------
var SZ_TR_FLAG					= 1;	// 
var SZ_TR_TRCODE				= 5;	// 
var SZ_TR_MEDIA					= 1;	// 
var SZ_TR_DHEAD_TYPE			= 1;	// 
var SZ_TR_DHEAD_HI				= 1;	// 
var SZ_TR_DHEAD_LO				= 1;	// 
var SZ_TR_FID_OUT				= 1;	//	FID OutData Type 1:Json 2:Xml ' ':struct
var SZ_TR_SEQCHK				= 5;	//	시퀀스 체크 1 ~ 99999 

//--------------------------------------------------
//	XT_DATA_HEAD (정보계)
//--------------------------------------------------
var SZ_BDH_CONTI_FLAG			= 1;	// 연속 FLAG 
var SZ_BDH_PAGING_KEY			= 80;	// 연속 조회키 
var SZ_BDH_SCREEN_NO			= 4;	// 화면 번호
var SZ_BDH_FILLER				= 115;	// 필러 

//--------------------------------------------------
//	XT_DATA_HEAD (업무계)
//--------------------------------------------------
var SZ_ADH_ACCOUNT_ID			= 10;	// 계정
var SZ_ADH_CHANNEL				= 2;	// 매체 구분
var SZ_ADH_PUB_IP				= 16;	// 공인 IP 주소
var SZ_ADH_PRV_IP				= 16;	// 사설 IP 주소
var SZ_ADH_MAC_ADDR				= 32;	// MAC 주소
var SZ_ADH_CONTI_FLAG			= 1;	// 연속 FLAG 
var SZ_ADH_PAGING_KEY			= 80;	// 연속 조회키 
var SZ_ADH_FILLER				= 43;	// 필러 

var SZ_INF_DHEAD				= 200;
var SZ_ACC_DHEAD				= 200;



//and so on

//var PACKET_CHAIN_SIZE			= 2048;
var PACKET_CHAIN_SIZE			= 2055; //2048+7



//------------------------------------------------------------------------------------------------------------------
//	OFFSET
//------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------
//	XT_SOCK_PACKET
//--------------------------------------------------
var OS_SOCK_STX					= 0;
var OS_SOCK_HI					= OS_SOCK_STX + SZ_SOCK_STX;
var OS_SOCK_LO					= OS_SOCK_HI + SZ_SOCK_HI;

//--------------------------------------------------
//	XT_COMM_HEAD
//--------------------------------------------------
var OS_COMM_FLAG				= OS_SOCK_LO + SZ_SOCK_LO;
var OS_COMM_ID					= OS_COMM_FLAG + SZ_COMM_FLAG;
var OS_COMM_CMD					= OS_COMM_ID + SZ_COMM_ID;



//-------------------------------------------------- ------------------------------------------------
//	XT_MSG_PACKET
//-------------------------------------------------- ------------------------------------------------
var OS_MSG_CODE					= OS_COMM_CMD + SZ_COMM_CMD;
var OS_MSG_MESSAGE				= OS_MSG_CODE + SZ_MSG_CODE;


//-------------------------------------------------- ------------------------------------------------
//	XT_TR_HEAD
//-------------------------------------------------- ------------------------------------------------
var OS_TR_FLAG					= OS_COMM_CMD + SZ_COMM_CMD;
var OS_TR_TRCODE				= OS_TR_FLAG + SZ_TR_FLAG;
var OS_TR_MEDIA					= OS_TR_TRCODE + SZ_TR_TRCODE;
var OS_TR_DHEAD_TYPE			= OS_TR_MEDIA + SZ_TR_MEDIA;
var OS_TR_DHEAD_HI				= OS_TR_DHEAD_TYPE + SZ_TR_DHEAD_TYPE;
var OS_TR_DHEAD_LO				= OS_TR_DHEAD_HI + SZ_TR_DHEAD_HI;

//var OS_TR_FILLER				= OS_TR_DHEAD_LO + SZ_TR_DHEAD_LO;	//보안 시퀀스 작업으로 아래와 같이 변경됨.

var OS_TR_FID_OUT				= OS_TR_DHEAD_LO + SZ_TR_DHEAD_LO;
var OS_TR_SEQCHK				= OS_TR_FID_OUT + SZ_TR_FID_OUT;


//데이터 헤드 시작 위치
var OS_TR_DHEAD					= OS_TR_SEQCHK + SZ_TR_SEQCHK;

//--------------------------------------------------
//	XT_DATA_HEAD (정보계)
//--------------------------------------------------
var OS_BDH_CONTI_FLAG			= OS_TR_SEQCHK + SZ_TR_SEQCHK;
var OS_BDH_PAGING_KEY			= OS_BDH_CONTI_FLAG + SZ_BDH_CONTI_FLAG;
var OS_BDH_SCREEN_NO			= OS_BDH_PAGING_KEY + SZ_BDH_PAGING_KEY;
var OS_BDH_FILLER				= OS_BDH_SCREEN_NO + SZ_BDH_SCREEN_NO;

//--------------------------------------------------
//	XT_DATA_HEAD (업무계)
//--------------------------------------------------
var OS_ADH_ACCOUNT_ID			= OS_TR_SEQCHK + SZ_TR_SEQCHK;
var OS_ADH_CHANNEL				= OS_ADH_ACCOUNT_ID + SZ_ADH_ACCOUNT_ID;
var OS_ADH_PUB_IP				= OS_ADH_CHANNEL + SZ_ADH_CHANNEL;
var OS_ADH_PRV_IP				= OS_ADH_PUB_IP + SZ_ADH_PUB_IP;
var OS_ADH_MAC_ADDR				= OS_ADH_PRV_IP + SZ_ADH_PRV_IP;
var OS_ADH_CONTI_FLAG			= OS_ADH_MAC_ADDR + SZ_ADH_MAC_ADDR;
var OS_ADH_PAGING_KEY			= OS_ADH_CONTI_FLAG + SZ_ADH_CONTI_FLAG;
var OS_ADH_FILLER				= OS_ADH_PAGING_KEY + SZ_ADH_PAGING_KEY;



function QueryManager(name)
{
	this.name = name;			//매니저를 구분 짓는 이름
	this.netIo = null;			//io 전송 방식에 따른 객체 저장
	
	this.sndBuf = null;			//전송용 ABuffer 객체
	this.rcvBuf = null;			//수신용 ABuffer 객체
	this.queryListeners = [];	//IO 이벤트를 수신할 객체들을 모아둔 배열
	this.realComps = {};		//리얼 데이터를 수신할 컴포넌트 모음
	this.realCallbacks = {};

	this.queryData_ = null;

	this.user_id = null;

	//초기화	
	this.headerInfo = null;
	this.setHeaderInfo();
	
	this.errorData = 
	{
		trName: '',
		errCode: '',	//메시지코드/오류코드
		errMsg: ''		//에러 메시지
	};

	//수신 패킷 정보
	this.packetInfo = 
	{
		packetType: 0,
		packetId: 0, 
		menuNo: '', 
		groupName: '', 
		trName: ''
	};
	
	//전송 패킷 정보
	this.sendInfo = 
	{
		packetType: 0,
		packetId: 0, 
		menuNo: '', 
		groupName: '', 
		trName: ''
	};
	
	
	this.publicKey = null;
	this.sessionKey = null;
	
	this.packetId = 0;
	
	this.isShowProgress = true;
	this.timeoutSec = 15; //zero is unlimit
	
	this.errCodeMap = {};
	this.queryCallbacks = {};
	this.realProcMap = {};
	//this.realCallbacks = {};

////////// 2018-12/18 추가 start
	this.readBuf = new Uint8Array(4096);
	this.readSize = SZ_SIZE_HEADER;
	this.packetInx = 0;
	
	//this.chnBuf = new ABuffer(1024*1500);
	this.zipBuf = new ABuffer(1024*1000);
	this.encBuf = new ABuffer(1024*1000);
	//this.chnId = 0;
	
	//asoocool, 패킷 체인 오류 수정...
	this.chnBufMap = {};

////////// 2018-12/18 추가 end

}

QueryManager.prototype.startManager = function(address, port)
{
	if(this.netIo) this.netIo.startIO(address, port);
};

QueryManager.prototype.stopManager = function()
{
	if(this.netIo) this.netIo.stopIO();
};

QueryManager.prototype.setNetworkIo = function(netIo)
{
	this.netIo = netIo;
};

QueryManager.prototype.setQueryCallback = function(key, callback)
{
	this.queryCallbacks[key] = callback;
};

QueryManager.prototype.getQueryCallback = function(key)
{
	var callback = this.queryCallbacks[key];
	if(callback) 
	{
		if(callback.timeout) 
		{
			clearTimeout(callback.timeout);
			callback.timeout = null;
		}
	
		if(!callback.noDelete) delete this.queryCallbacks[key];
	}
	
	return callback;
};

QueryManager.prototype.clearAllQueryCallback = function()
{
	var callback, key;
	for(key in this.queryCallbacks)
	{
		callback = this.queryCallbacks[key];
		
		if(callback.timeout) 
		{
			clearTimeout(callback.timeout);
			callback.timeout = null;
		}
	}

	this.queryCallbacks = {};
};

QueryManager.prototype.setQueryBuffer = function(sendSize, recvSize, charSet, emptyChar, emptyNumChar)
{
	
	this.sndBuf = new ABuffer(sendSize);
	this.sndBuf.setCharset(charSet);
	
	this.rcvBuf = new ABuffer(recvSize);
	this.rcvBuf.setCharset(charSet);
	
	if(emptyChar!=undefined && emptyChar!=null)  
	{
		this.sndBuf.setEmptyChar(emptyChar);
		this.rcvBuf.setEmptyChar(emptyChar);
	}
	
	if(emptyNumChar!=undefined && emptyNumChar!=null) 
	{
		this.sndBuf.setEmptyNumChar(emptyNumChar);
		this.rcvBuf.setEmptyNumChar(emptyNumChar);
	}
};

QueryManager.prototype.showProgress = function(isShow)
{
	this.isShowProgress = isShow;
};


//second
QueryManager.prototype.setTimeout = function(timeoutSec)
{
	this.timeoutSec = timeoutSec;
};

QueryManager.prototype.getLastError = function(key)
{
	if(key) return this.errorData[key];
	else return this.errorData;
};

QueryManager.prototype.getLastPacketInfo = function(key)
{
	if(key) return this.packetInfo[key];
	else return this.packetInfo;
};

QueryManager.prototype.printLastError = function(key)
{
	if(key) return afc.log(key + ':' + this.errorData[key]);
	else return afc.log(JSON.stringify(this.errorData, undefined, 2));
};

//---------------------------------------------------------
//	listener functions
//	function afterRecvBufferData(QueryManager);				* 수신버퍼에 데이터를 수신한 후 바로 호출된다.
//	function afterOutBlockData(queryData, QueryManager);	* 수신된 데이터를 AQueryData 에 채운 후 호출된다.
//	function beforeInBlockBuffer(queryData, groupName);		* 전송버퍼에 데이터를 채우기 전에 호출된다.
//	function beforeSendBufferData(QueryManager);			* 전송버퍼의 데이터를 전송하기 바로 전에 호출된다.

//화면 아이디  기준
QueryManager.prototype.addQueryListener = function(listener)//function(name, listener)
{
	for(var i=0; i<this.queryListeners.length; i++)
		if(this.queryListeners[i]===listener) return;
	
	this.queryListeners.push(listener);
};

QueryManager.prototype.removeQueryListener = function(listener)//function(name)
{
	for(var i=0; i<this.queryListeners.length; i++)
	{
		if(this.queryListeners[i]===listener)
		{
			this.queryListeners.splice(i, 1);
			return;
		}
	}
	
};

//리얼 수신용 컴포넌트 등록
QueryManager.prototype.addRealComp = function(dataKey, comp)
{
	var array = this.realComps[dataKey];
	if(!array) array = this.realComps[dataKey] = [];
	
	for(var i=0; i<array.length; i++)
	{
		if(array[i]===comp) return -1;
	}
	
	//if(!comp.realDataKeyArr) comp.realDataKeyArr = [];
	
	//자신이 속한 리얼에 대한 dataKey 값들을 저장해 둔다.
	//comp.realDataKeyArr.push(dataKey);
	
	array.push(comp);
	return array.length;
};

QueryManager.prototype.removeRealComp = function(dataKey, comp)
{
	var array = this.realComps[dataKey];
	if(!array) return -1;
	
	for(var i=0; i<array.length; i++)
	{
		if(array[i]===comp)
		{
			/*
			//리얼에 대한 dataKey remove
			for(var j=0; j<comp.realDataKeyArr.length; j++)
			{
				if(comp.realDataKeyArr[j]==dataKey)
				{
					comp.realDataKeyArr.splice(j, 1);
					break;
				}
			}
			*/
			
			array.splice(i, 1);
			if(array.length==0) delete this.realComps[dataKey];
			
			return array.length;
		}
	}
	
	return -1;
};

//return : array
QueryManager.prototype.getRealComps = function(dataKey)
{
	return this.realComps[dataKey];
};

//keyArr = [ KR004LTC__USD__, KR004LTC__USD__,  ... ]
//compArr = [acomp, acomp, ...]
//updateType : -1/prepend, 0/update, 1/append
QueryManager.prototype.registerReal = function(aquery, realField, keyArr, compArr, updateType, callback)
{
	var i, j, regArr = [], comp, dataKey;
		
	if(typeof(aquery)=='string') aquery = AQuery.getSafeQuery(aquery);
	
	//문자열이면 컨테이너 아이디가 들어오고 매핑되어져 있는 컴포넌트를 얻어서 등록한다.
	if(typeof(compArr)=='string') compArr = aquery.getQueryComps(compArr, 'output');

	for(i=0; i<keyArr.length; i++)
	{
		dataKey = aquery.getName() + keyArr[i];
		
		if(compArr)
		{
			for(j=0; j<compArr.length; j++)
			{
				//특정 키에 대해 등록되어져 있는 컴포넌트 개수를 리턴. 즉, 최초로 등록하는 경우만 전송 정보로 셋팅한다.
				if(this.addRealComp(dataKey, compArr[j]) == 1)
				{
					regArr.push(keyArr[i]);
				}
			}
			
			if(callback)
			{
				//같은 키로 여러 컴포넌트에 realCallback 함수를 셋팅하면 리얼 수신시 
				//같은 callback 함수가 여러번 호출되므로 첫번째 컴포넌트에만 함수를 셋팅한다.
				
				if(compArr.length>0)
				{
					comp = compArr[0];
					
					if(!comp.realCallbacks) comp.realCallbacks = {};
					
					comp.realCallbacks[dataKey] = callback;
				}
			}
			
		}
		
		//컴포넌트에 쿼리 매핑 없이 리얼 데이터만 받을경우
		else{
			regArr.push(keyArr[i]);
			if(callback){
				this.realCallbacks[dataKey] = callback;

			}
		} 
	}
	
	//var comp, block = aquery.getQueryBlock('input', 'InBlock1'),
	//	realKey = block.format[0][AQuery.IKEY];
	
	if(compArr)
	{
		//set updateType to component
		for(j=0; j<compArr.length; j++)
		{
			comp = compArr[j];
			if(!updateType) 
			{
				comp.updateType = 0;
				if(comp.setRealMap) comp.setRealMap(realField);	//그리드 같은 컴포넌트는 realMap 이 존재한다.
			}
			else comp.updateType = updateType;
		}
	}
	
	//새롭게 등록할 정보가 있으면
	if(regArr.length>0)
		this.sendRealSet(aquery, true, regArr);
};

QueryManager.prototype.unregisterReal = function(aquery, keyArr, compArr)
{
	if(aquery==null) 
		return;
		
	var i, j, regArr = [], comp, dataKey;
	
	if(typeof(aquery)=='string') aquery = AQuery.getSafeQuery(aquery);
	
	//문자열이면 컨테이너 아이디가 들어오고 매핑되어져 있는 컴포넌트를 얻어서 등록한다.
	if(typeof(compArr)=='string') compArr = aquery.getQueryComps(compArr, 'output');
	
	for(i=0; i<keyArr.length; i++)
	{
		dataKey = aquery.getName() + keyArr[i];
	
		if(compArr)
		{
			for(j=0; j<compArr.length; j++)
			{
				comp = compArr[j];
				
				//특정 키에 대해 모든 컴포넌트의 등록이 해제되면 전송 정보로 셋팅한다.
				if(this.removeRealComp(dataKey, comp) == 0)
				{
					regArr.push(keyArr[i]);
				}
				
				//파람으로 넘어온 compArr 의 순서가 reg 시점과 똑같다고 보장할 수 없으므로, 모든 컴포넌트의 realCallback 변수를 삭제한다.
				if(comp.realCallbacks) 
				{
					delete comp.realCallbacks[dataKey];
					
					if(Object.keys(comp.realCallbacks).length==0) comp.realCallbacks = undefined;
				}
			}
		}
		else regArr.push(keyArr[i]);
	}
	
	if(compArr)
	{
		//set updateType to component
		for(j=0; j<compArr.length; j++)
		{
			comp = compArr[j];
			comp.updateType = undefined;

			if(comp.setRealMap) comp.setRealMap(null);
		}
	}
	
	//새롭게 해제할 정보가 있으면
	if(regArr.length>0)
		this.sendRealSet(aquery, false, regArr);
};

QueryManager.prototype.getHeaderInfo = function(headerKey)
{
	if(headerKey) return this.headerInfo[headerKey];
	else return this.headerInfo;
};

QueryManager.prototype.setHeaderInfo = function(headerInfo)
{
	if(headerInfo)
	{
		for(var p in headerInfo)
		{
			if(!headerInfo.hasOwnProperty(p)) continue;
			this.headerInfo[p] = headerInfo[p];
		}
	}
	//파라미터가 null 인 경우 초기화
	else
	{
		this.headerInfo = 
		{
			PBLC_IP_ADDR		: '',	// 공인 IP		//10.110.51.182
			PRVT_IP_ADDR		: '',	// 사설 IP		//10.110.51.182
			MAC_ADR				: '',	// Mac 주소		//6C626D3A60C9
			TMNL_OS_TCD			: 'PC',	// 단말 OS 구분 코드 MS Win:"PC" MAC:"MC" AND:"AP" IPHONE:"IP" IPAD:"ID" AND PAD:"AD" 기타:"ZZ"
			TMNL_OS_VER			: '',	// 단말 OS 버전
			TMNL_BROW_TCD		: '',	// 단말 브라우저 구분 코드 익스플로러:"IE" 사파리:"SF" 파이어폭스:"FX" 크롬:"CR" 오페라:"OP" WEBKIT:"WK" 기타:"ZZ"
			TMNL_BROW_VER		: ''	// 단말 브라우저 버전
		};
	}
};

QueryManager.prototype.onConnected = function(success)
{
	//afc.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ QueryManager.prototype.onConnected');
};

QueryManager.prototype.onClosed = function()
{
	//afc.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ QueryManager.prototype.onClosed');
	this.clearAllQueryCallback();
	
	// TODO: 재접속 처리 로직 
// 	if(!this.selfClose && !theApp.isPause)
// 		theApp.autoLoginProcess('재접속중입니다...');
};

//############################################################################################################################################
// 상속받아 오버라이드 해야하는 함수들


//상속 받아 다음과 같은 패턴으로 구현한다.
QueryManager.prototype.onReceived = function(data, size)
{
	//----------------------------------------------------
	
	//	1. this.rcvBuf 를 생성한다. 생성방법은 상황에 따라 다름.
	//	this.rcvBuf.setBuffer(data);
	//	this.rcvBuf.setDataSize(size);
	
	//	2. 패킷 타입과 패킷 아이디를 셋팅한다.
	//	this.packetInfo.packetType = this.rcvBuf.getByte(OS_COMM_CMD);
	//	this.packetInfo.packetId = this.rcvBuf.getByte(OS_COMM_ID);

	//	3. 패킷 타입에 따라 처리 함수를 분기한다.
	//	switch(this.packetInfo.packetType)
	//	{
	//		case 1: this.queryProcess();
	//	}
	
	//----------------------------------------------------
};

//헤더 이후의 데이터 셋팅 오프셋을 리턴한다.
QueryManager.prototype.getInDataOffset = function()
{
	return 0;
};

QueryManager.prototype.getOutDataOffset = function()
{
	return 0;
};

//사용할 AQueryData 객체를 생성하여 리턴한다.
QueryManager.prototype.makeQueryData = function(aquery, isSend)
{
	console.log('QueryManager.prototype.makeQueryData ====>');
	
	return new AQueryData(aquery);
};

//리얼 등록/해제 패킷 전송 함수... 재정의 하기, unregisterReal 함수 내에서 호출함
QueryManager.prototype.sendRealSet = function(aquery, isSet, regArr)
{

};

//onReceive 함수 내에서 패킷 타입에 따라 분기하여 호출되는 함수
QueryManager.prototype.realProcess = function()
{
	//----------------------------------------------------
	
	//	1. 쿼리 네임을 얻어 queryData 를 생성한다.
	//	var qryName = this.rcvBuf.nextOriString(4),
	//		aquery = AQuery.getSafeQuery(qryName),
	//		queryData = this.makeQueryData(aquery);
	
	//	2. queryData 객체에 값을 채우고 dataKey 값을 구한 후
	//	queryData.outBlockData(this.rcvBuf, offset);
		
	//	3. realDataToComp 함수를 호출한다.
	
	//----------------------------------------------------

};

QueryManager.prototype.makeHeader = function(queryData, abuf, menuNo)
{
};

// 데이터 수신시 에러정보를 세팅하는 함수
QueryManager.prototype.setErrorData = function(cbObj)
{
	//----------------------------------------------------
	
	//	* rcvBuf에서 에러데이터에 해당하는 정보를 뽑아 저장한다.
	//	this.errorData.errCode = this.rcvBuf.getString(OS_ERR_CODE, SZ_ERR_CODE);
	//	this.errorData.errMsg = this.rcvBuf.getString(OS_ERR_MSG, SZ_ERR_MSG);
	//		...
	//		etc
	//----------------------------------------------------
};


// 여기까지 
//############################################################################################################################################



//asoocool dblTostr
QueryManager.prototype.enableDTS = function()
{
	this.dblTostr = true;
};


// 전문 수신 후 프로세스
QueryManager.prototype.queryProcess = function(cb)
{
//##########################################	
	//if(this.isShowProgress) AIndicator.hide();
//##########################################


	console.log('QueryManager.prototype.queryProcess ====>');

	var dataSize = this.rcvBuf.getDataSize(),
		cbObj = this.getQueryCallback(this.packetInfo.packetId);
	
	// 타임아웃 발생시 콜백객체를 제거하므로 체크
	if(!cbObj) return;

	//패킷 정보 셋팅
	this.packetInfo.menuNo = cbObj.menuNo;
	this.packetInfo.groupName = cbObj.groupName;
	this.packetInfo.trName = cbObj.trName;

	//에러 메시지 셋팅
	this.errorData.trName = cbObj.trName;
	this.errorData.errCode = '';
	this.errorData.errMsg = '';
	this.setErrorData();
	

	//수신된 전문 로그 남기는 함수, 개발시에만 호출
	//this.recv_log_helper();
	
	var listener, i, qLen = this.queryListeners.length;

	//버퍼에 데이터를 수신한 후 바로 호출된다.
	//######## afterRecvBufferData
	for(i=0; i<qLen; i++)
	{
		listener = this.queryListeners[i];
		if(listener.afterRecvBufferData) listener.afterRecvBufferData(this);
	}
	//########

	var queryData = null,
		aquery = AQuery.getSafeQuery(cbObj.trName);

	if(!aquery)
	{
 		//if(this.isShowProgress) AIndicator.hide();

		alert('onReceive : ' + cbObj.trName + ' query is not found.');
		return;
	}
	
	var dataOffset = this.getOutDataOffset(aquery);

	//body data 가 있는 경우만
	if(dataSize>dataOffset)
	{
		queryData = this.makeQueryData(aquery);
		
		//asoocool dblTostr
		queryData.dblTostr = cbObj.dblTostr;

		console.log('queryData.outBlockData  ===>');
		
		//queryData 객체에 전문데이터를 세팅
		queryData.outBlockData(this.rcvBuf, dataOffset);
	}

	var blockData0 = queryData.getBlockData('OutBlock1'), dataObj;
	var blockData = queryData.getBlockData('OutBlock2'), dataObj;
			
	cb(blockData,blockData0);
	console.log('blockData.length ===>',typeof blockData)

	// for (var i=0; typeof blockData0 != 'undefined' && i< blockData0.length; i++)
	// {
	// 	dataObj = blockData0[i];
		
	// 	//if(i == 11)
	// 	//console.log('dataObj0 ===>',i,'::',dataObj);

	// }

	
	// for (var i=0; typeof blockData != 'undefined' && i< blockData.length; i++)
	// {
	// 	dataObj = blockData[i];
		
	// 	//if(i == 11)
	// 	//console.log('dataObj ===>',i,'::',dataObj);

	// }

	
	
	//타임 아웃 이후에 패킷이 도착하거나 
	//계정계 지연 패킷이 올수 있으므로 콜백 객체가 없어도 계속 진행한다.
	//계정계 지연 패킷은 listener 의 afterOutBlockData 함수에서만 구현 가능한다.
	//if(cbObj && cbObj.func) cbObj.func.call(this, queryData);

	//수신된 데이터를 AQueryData 에 채운 후 호출된다.
	//######## afterOutBlockData
	for(i=0; i<qLen; i++)
	{
		listener = this.queryListeners[i];
		if(listener.afterOutBlockData) listener.afterOutBlockData(queryData, this);
	}
	//########

	if(queryData)
	{
		//afterOutBlockData 함수에서 enableLazyUpdate 함수를 호출하면 화면 업데이트를 비동기 함수 호출후에 할 수 있다.
		//차후 비동기 함수 콜백에서 queryData.lazyUpdate(); 함수를 호출해 준다.
		
		if(queryData.isLazyUpdate) queryData.lazyUpdate = _updateFunc;
		else _updateFunc();
	}
	
	//-----
	
	function _updateFunc()
	{
		var compArray = aquery.getQueryComps(cbObj.menuNo, 'output');
		
		if(compArray)
		{
			var qryComp;
			for(var i=0; i<compArray.length; i++)
			{
				qryComp = compArray[i];

				//비활성화된 탭은 적용되지 않도록
				//var tab = qryComp.getRootView().tab;
				//if(tab && $(tab.content).is(':hidden')) continue;
				
				var item = qryComp.getRootView().item;
				if(item && $(item).is(':hidden')) continue;
				

				//groupName 을 지정해 줬으면 같은 그룹네임인지 비교
				if( cbObj.groupName!='' && cbObj.groupName!=qryComp.getGroupName() ) continue;

				qryComp.updateComponent(queryData);
			}
		}
	}
	
	this.queryData_ = queryData;

//##########################################	
	//if(this.isShowProgress) AIndicator.hide();
//##########################################
	
};

//realProcess 함수에서 호출한다.
QueryManager.prototype.realDataToComp = function(key, queryData)
{
	key = queryData.getQueryName() + key;
	
	queryData.isReal = true;
	

	//dataKey 가 동일한 컴포넌트 들은 일단 모두 updateComponent 를 호출해 줘야 한다.(updateComponent 내부 주석 참조)
	var compArray = this.getRealComps(key);
	if(compArray)
	{
		var qryComp, callback;
		for(var i=0; i<compArray.length; i++)
		{
			qryComp = compArray[i];
			
			if(qryComp.realCallbacks) 
			{
				callback = qryComp.realCallbacks[key];
				
				if(callback) callback.call(this, queryData);
			}
			
			qryComp.updateComponent(queryData);
		}
	}else {
		var callback = null;
		callback = this.realCallbacks[key];
		if(callback != null){
			callback.call(this, queryData);
		}
	}
};

QueryManager.prototype.sendProcessByComp = function(acomp, groupName, beforeInBlockBuffer, afterOutBlockData)
{
	var menuNo = acomp.getContainerId(),ret = [];

	for(var queryName in acomp.dataKeyMap)
		ret.push(this.sendProcess(AQuery.getQuery(queryName), menuNo, groupName, beforeInBlockBuffer, afterOutBlockData));
	
	return ret;
};

QueryManager.prototype.sendProcessByComps = function(acomps, groupName, beforeInBlockBuffer, afterOutBlockData)
{
	var acomp, menuNo, queryName, ret = [];
	for(var i=0; i<acomps.length; i++)
	{
		acomp = acomps[i];
		menuNo = acomp.getContainerId();
		
		for(queryName in acomp.dataKeyMap)
			ret.push(this.sendProcess(AQuery.getQuery(queryName), menuNo, groupName, beforeInBlockBuffer, afterOutBlockData));
	}
	
	return ret;
};

QueryManager.prototype.sendProcessByName = function(queryName, beforeInBlockBuffer, afterOutBlockData)
{
	
	console.log('QueryManager.prototype.sendProcessByName  beforeInBlockBuffer==>',beforeInBlockBuffer);
	console.log('QueryManager.prototype.sendProcessByName==>');
	return [this.sendProcess(AQuery.getSafeQuery(queryName), '', '', beforeInBlockBuffer, afterOutBlockData)];
};

QueryManager.prototype.sendProcessByNames = function(queryNames, menuNo, groupName, beforeInBlockBuffer, afterOutBlockData)
{
	var ret = [];
	
	for(var i=0; i<queryNames.length; i++)
		ret.push(this.sendProcess(AQuery.getSafeQuery(queryNames[i]), menuNo, groupName, beforeInBlockBuffer, afterOutBlockData));

	return ret;
};

//QueryManager.prototype.sendProcess = function(aquery, menuNo, groupName, beforeInBlockBuffer, afterOutBlockData)
QueryManager.prototype.sendProcess = function(aquery, menuNo, groupName, beforeInBlockBuffer, cb)
{
	if(aquery==null) 
		return;
		
//############################################
	//if(this.isShowProgress) AIndicator.show();
//############################################

	var trName = aquery.getName();

	this.errorData.trName = trName;
	
	this.sendInfo.trName = trName;
	this.sendInfo.menuNo = menuNo;
	this.sendInfo.groupName = groupName; 
	
	//console.log('trName ====>',trName);

	var queryData = this.makeQueryData(aquery, true);
	queryData.inBlockPrepare();


	//console.log('queryData ====>',queryData);

	var qryComp, compArray = aquery.getQueryComps(menuNo, 'input');
	
	if(compArray)
	{
		for(var i=0; i<compArray.length; i++)
		{
			qryComp = compArray[i];
			
			//비활성화된 탭은 적용되지 않도록
			var tab = qryComp.getRootView().tab;
			if(tab && $(tab.content).is(':hidden')) continue;
			
			qryComp.updateQueryData(queryData);
		}
	}
	
	var listener, i, qLen = this.queryListeners.length;

	//전송버퍼에 데이터를 채우기 전에 호출된다.
	//######## beforeInBlockBuffer
	


	if(beforeInBlockBuffer) beforeInBlockBuffer.call(this, queryData);
	
	for(i=0; i<qLen; i++)
	{
		listener = this.queryListeners[i];
		if(listener.beforeInBlockBuffer) listener.beforeInBlockBuffer(queryData, this);
	}
	
	//########
	
	var packetId = 0, dataOffset = this.getInDataOffset(aquery);

	queryData.inBlockBuffer(this.sndBuf, dataOffset);
	
	this.sndBuf.setDataSize(this.sndBuf.getOffset());
	
	packetId = this.makeHeader(queryData, this.sndBuf, menuNo);
	
	this.sendInfo.packetId = packetId;
	
	
	//---------------------------------------------------------
	
	//데이터를 전송하기 바로 전에 호출된다.
	//######## beforeSendBufferData
	for(i=0; i<qLen; i++)
	{
		listener = this.queryListeners[i];
		
		if(listener.beforeSendBufferData) 
		{
			listener.beforeSendBufferData(this);
		}
	}
	//########
	
	//asoocool dblTostr
	var cbObj = 
	{
		'menuNo': menuNo, 'groupName': groupName, 'func': 'afterOutBlockData', 'timeout': null,
		'trName': trName, 'dblTostr': this.dblTostr
	};
	
	//asoocool dblTostr
	//cbObj 에 셋팅하고 바로 지운다.
	this.dblTostr = undefined;
	
	this.setQueryCallback(packetId, cbObj);
	
	//------------------------------------------------------------
	//	네트웍 타임아웃 셋팅
	if(this.timeoutSec>0)
	{
		var thisObj = this;

		cbObj.timeout = setTimeout(function()
		{
			//if(thisObj.isShowProgress) AIndicator.hide();
			
			thisObj.errorData.trName = trName;
			thisObj.errorData.errCode = 10001;
			//thisObj.errorData.errMsg = '서버와의 접속이 지연되고 있습니다.';
			thisObj.errorData.errMsg = '통신 상태가 원활하지 않습니다.(1) : ' + thisObj.errorData.trName + ',' + menuNo + ',' + groupName;
			
			//콜백 객체 제거
			thisObj.getQueryCallback(packetId);
			
			//타임아웃
//			if(afterOutBlockData) afterOutBlockData.call(thisObj, null);
			//if(listener && listener.afterOutBlockData) listener.afterOutBlockData(null, groupName, thisObj.errorData.trName, thisObj);
			
			qLen = thisObj.queryListeners.length;
			for(i=0; i<qLen; i++)
			{
				listener = thisObj.queryListeners[i];
				
//				if(listener.afterRecvBufferData) listener.afterRecvBufferData(thisObj);
//				if(listener.afterOutBlockData) listener.afterOutBlockData(null, thisObj);
			}
			

		}, this.timeoutSec*1000);
	}
	
	//console.log('this.sndBuf.getBuffer() ====>',this.sndBuf.getBuffer().toString(''));
	
	var string11 = this.Utf8ArrayToStr(this.sndBuf.getBuffer());
	//var string11 = new TextDecoder("utf-8").decode(this.sndBuf.getBuffer());

	//console.log('string11 ===>',string11);
	//console.log('string11 ===> end',string11.length);

	var sendLen = this.sndBuf.getDataSize();

	//console.log('sendLen ===>',sendLen)
	//console.log('====>',this.Utf8ArrayToStr(this.sndBuf.subArray(0, sendLen)));

	cb(this.sndBuf.subArray(0, sendLen));
	//cb(this.sndBuf.getBuffer());
	return string11;
	//

	// if(this.netIo.sorimachiSend)
	// {
	// 	this.netIo.sorimachiSend({
	// 		packetId: packetId,
	// 		menuNo: menuNo,
	// 		trName: trName,
	// 		groupName: groupName,
	// 		queryData: queryData,
	// 		sndBuf: this.sndBuf,
	// 		sendLen: this.sndBuf.getDataSize()
	// 	});
	// }
	// else this.sendBufferData(this.sndBuf);
	
	//this.sendBufferData(this.sndBuf);
	

	//return packetId;
};

QueryManager.prototype.Utf8ArrayToStr = function(array)
{
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while(i < len) {
    c = array[i++];
    switch(c >> 4)
    { 
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) |
                       ((char2 & 0x3F) << 6) |
                       ((char3 & 0x3F) << 0));
        break;
    }
    }

    return out;
}

QueryManager.prototype.sendBufferData = function(abuf)
{
	var thisObj = this;
	// if(!this.netIo.isStart())
	// {
	// 	//console.log('----------------------- sendBufferData fail! : socket is closed.');
		
	// 	//if(this.isShowProgress) AIndicator.hide();
	// 	return;
	// }
	
	//---------------------------------------------------------
	// 송신할 전문 로그 남기는 함수
	this.send_log_helper();
	//---------------------------------------------------------
	
	
	var sendLen = abuf.getDataSize();

	//this.netIo.requestSend(Base64.btoaArray(abuf.subArray(0, sendLen)), function(result)
	
	// this.netIo.sendData(abuf.subArray(0, sendLen), function(result)
	// {
	// 	if(!result) 
	// 	{
	// 		thisObj.onSendFail();
	// 	}
	// });
};

QueryManager.prototype.onSendFail = function()
{
	if(this.netIo.isStart())
	{
		//AIndicator.endOltp();
		
		AToast.show('통신 상태가 원활하지 않습니다.');
		//theApp.autoLoginProcess('통신 상태가 원활하지 않습니다.(2) : '+this.errorData.trName, true);
	}

};

QueryManager.prototype.makePacketId = function()
{
	return ++this.packetId;
};

QueryManager.prototype.addSkipErrorCode = function(qryName, errorCode)
{
	var array = this.errCodeMap[qryName];
	if(!array) array = this.errCodeMap[qryName] = [];
	
	for(var i=0; i<array.length; i++)
		if(array[i]==errorCode) return;
	
	array.push(errorCode);
};

QueryManager.prototype.removeSkipErrorCode = function(qryName, errorCode)
{
	var array = this.errCodeMap[qryName];
	if(!array) return;
	
	for(var i=0; i<array.length; i++)
	{
		if(array[i]==errorCode)
		{
			array.splice(i, 1);
			if(array.length==0) delete this.errCodeMap[qryName];
			
			return;
		}
	}
};

QueryManager.prototype.isSkipErrorCode = function(qryName, errorCode)
{
	var array = this.errCodeMap[qryName];
	if(!array) return false;
	
	for(var i=0; i<array.length; i++)
	{
		if(array[i]==errorCode)
			return true;
	}
	
	return false;
};

// 송신할 전문 로그 남기는 함수
QueryManager.prototype.send_log_helper = function()
{
};


// 수신된 전문 로그 남기는 함수
QueryManager.prototype.recv_log_helper = function()
{
};

// option = { realQuery:'', keyBlock:'InBlock1', realField:'', updateType: 0 }
QueryManager.prototype.sendProcessWithReal = function(queryName, menuNo, groupName, beforeInBlockBuffer, afterOutBlockData, option, realCallback)
{
	var dataKeyArr = [];
	
	if(!option.keyBlock) option.keyBlock = 'InBlock1';

	this.sendProcessByName(queryName,
	
	function(queryData)
	{
		var e;
		try {
			beforeInBlockBuffer.call(this, queryData);

			if(option.keyBlock.charCodeAt(0)==0x49)	//I
			{
				var blockData = queryData.getBlockData(option.keyBlock);

				for(var i=0; i<blockData.length; i++)
					dataKeyArr.push(blockData[i][option.realField]);
			}
		} catch(e){}
	},
	
	function(queryData)
	{
		var e;
		try {
			if(option.keyBlock.charCodeAt(0)==0x4F)	//O
			{
				var blockData = queryData.getBlockData(option.keyBlock);

				for(var i=0; i<blockData.length; i++)
					dataKeyArr.push(blockData[i][option.realField]);
			}

			this.realProcMap[menuNo + queryName + option.realQuery] = dataKeyArr;

	//afc.log(dataKeyArr);		

			this.registerReal(option.realQuery, option.realField, dataKeyArr, menuNo, option.updateType, realCallback);

			afterOutBlockData.call(this, queryData);
		} catch(e) {}
	});

};

QueryManager.prototype.clearRealProcess = function(queryName, menuNo, realQuery)
{
	var key = menuNo + queryName + realQuery, 
		dataKeyArr = this.realProcMap[key];
	
	if(dataKeyArr) delete this.realProcMap[key];
	else dataKeyArr = [];
	
	this.unregisterReal(realQuery, dataKeyArr, menuNo);
};






//KVQueryManager.prototype = QueryManager;

module.exports.createApp = function()
{
	return new KVQueryManager();
};


function KVQueryManager()
{
	
	
	
	QueryManager.apply(this, arguments);
	//QueryManager.call(this);

	
	//----------------------------------------
	//	data head type 패킷 정보 변수 추가
	
	this.packetInfo.dheadType = '';
	this.sendInfo.dheadType = '';
	this.pcIp = '';
	
	this.trSeq = 0;
	
}

KVQueryManager.prototype = new QueryManager();

//KVQueryManager.prototype = Object.create(QueryManager.prototype);
//afc.extendsClass(KVQueryManager, QueryManager);

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

var PACKET_ETX = 0x03;


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

//data is ArrayBuffer, var buf = new Uint8Array(data);
KVQueryManager.prototype.onPreReceived = function(data,cb)
{
	
	//console.log('KVWebsocketIO.prototype.onReceived ===>0.');
	
	var nRead, isEnc, isZip, dataBuf, arr, flag, cFlag, packetSize, lastBuf;
	
	dataBuf = new ABuffer();
	dataBuf.setBuffer(new Uint8Array(data));
	
	while(true)
	{
		arr = dataBuf.nextBinary(this.readSize);
		nRead = arr.length;
		
		if(nRead<1) break;
		
		this.readBuf.set(arr, this.packetInx);
		
        //수신한 패킷을 다 읽을 때까지 뺀다.
        this.readSize -= nRead;
        //패킷을 읽은 만큼 인덱스를 증가시킨다.
        this.packetInx += nRead;

        //공통헤더를 다 읽을 때까지...
        if(this.packetInx<SZ_SIZE_HEADER) continue;
		
        //공통헤더 부분을 다 읽음
        else if(this.packetInx==SZ_SIZE_HEADER)
        {
            this.readSize = this.readBuf[OS_SOCK_HI]*256 + this.readBuf[OS_SOCK_LO];
			
            continue;
        }

        //공통헤더를 읽은후 나머지 데이터를 모두 받을 때까지...
        else if(this.readSize>0) continue;
		
		
		//flag = this.readBuf[OS_COMM_FLAG];
			
//console.log('[' + flag + ']');
		
		//-----------------------------------------------------------------
        //  여기부터 패킷 컨트롤 시작
        //-----------------------------------------------------------------
            
        lastBuf = this.readBuf;
        packetSize = this.packetInx;
            
        //[mRecvBufUtil setBuffer:lastBuf size:RECV_BUFSIZE];
            
        flag = lastBuf[OS_COMM_FLAG];
		
        //초기화
		this.readSize = SZ_SIZE_HEADER;
        this.packetInx = 0;
		
		// 암호화, 압축은 패킷 체인인 경우 따로따로 압축해제, 복호화를 해야함.
		//암호화 여부, 압축 여부
		isEnc = (flag & PACKET_FLAG.ENCRYPT);
		isZip = (flag & PACKET_FLAG.COMPRESS);

		//console.log('-------------------------------------> ' + flag);		

		//구간 암호화 & 압축
		if(isEnc && isZip)
		{
		}
		

		// 전문 복호화
		if( isEnc )
		{
			this.encBuf.setBuffer(lastBuf);

			//var encStrLen = (lastBuf[OS_SOCK_HI] * 256) + lastBuf[OS_SOCK_LO];
			var encStr = this.encBuf.getOriString(OS_TR_FLAG, packetSize - SZ_SIZE_HEADER - 3);

			var dec_array = this.unikeyAIR.decryptToArray(this.userSeed, encStr);
			if (dec_array == null) return "decrypt error:"+process_error(this.unikeyAIR.getErrorCode());

			packetSize = dec_array.length + SZ_SIZE_HEADER + 3;
			var rcvLen = dec_array.length;
			this.encBuf.copyBuffer(dec_array, OS_TR_FLAG);

			this.encBuf.setByte(OS_SOCK_HI, (packetSize-SZ_SIZE_HEADER)/256);	//패킷 길이 hi
			this.encBuf.setByte(OS_SOCK_LO, (packetSize-SZ_SIZE_HEADER)%256);	//패킷 길이 lo
			this.encBuf.setOffset(packetSize - 1);
			this.encBuf.addByte(PACKET_ETX);

			lastBuf = this.encBuf.subArray(0, packetSize);
		}

		// 전문 압축 해제
		else if( isZip )
		{
			var state = 
				{
					inputBuffer: lastBuf.subarray(OS_TR_FLAG, packetSize - 1),	//압축 해제 대상 버퍼
					outputBuffer: new Uint8Array(4)
				};

			window.lzo1x.decompress(state);

			//console.log(state.outputBuffer);

			this.zipBuf.copyBuffer(lastBuf.subarray(0, OS_TR_FLAG), 0);
			this.zipBuf.copyBuffer(state.outputBuffer, OS_TR_FLAG);

			packetSize = state.outputBuffer.length + SZ_SIZE_HEADER + 3;

			//헤더에 새로운 사이즈 세팅
			this.zipBuf.setByte(OS_SOCK_HI, (packetSize-SZ_SIZE_HEADER)/256);
			this.zipBuf.setByte(OS_SOCK_LO, (packetSize-SZ_SIZE_HEADER)%256);
			this.encBuf.setOffset(packetSize - 1);
			this.zipBuf.addByte(PACKET_ETX);

			lastBuf = this.zipBuf.subArray(0, packetSize);

			/*
				var ret = checkResult(state.outputBuffer);
				if(ret.status !== 0) {
					console.error('decompression', ret.msg, list[index]);
					// return false;
				}
				*/

		}

		console.log('KVWebsocketIO.prototype.onReceived ===>1.');
		
		cFlag = (flag & 0x0f);
		
		//패킷 체인 처리
		switch(cFlag)
		{
				//마지막 체인 패킷
			case 0x03:
				{
					//if(this.chnBuf.getOffset()==0) break;
					//if(this.chnId != lastBuf[OS_COMM_ID]) break;
					console.log('KVWebsocketIO.prototype.onReceived ===>0x03.');
					
					var chnId = lastBuf[OS_COMM_ID],
						chnBuf = this.chnBufMap[chnId];


					if(chnBuf)
					{
						var copySize = packetSize - OS_TR_FLAG;
						chnBuf.addBinary(copySize, lastBuf.subarray(OS_TR_FLAG, OS_TR_FLAG+copySize));

						lastBuf = chnBuf.getBuffer();
						packetSize = chnBuf.getOffset();

						//헤더에 새로운 사이즈 세팅
						chnBuf.setByte(OS_SOCK_HI, (packetSize-SZ_SIZE_HEADER)/256);
						chnBuf.setByte(OS_SOCK_LO, (packetSize-SZ_SIZE_HEADER)%256);

						chnBuf.setOffset(0);

						delete this.chnBufMap[chnId];

						//console.log('-----> packet chain clear !!');
						//afc.log(this.chnBufMap);
					}
				}
				break;

				//첫번째 체인 패킷은 전체를 복사
			case 0x01:
				{
					//asoocool
					console.log('KVWebsocketIO.prototype.onReceived ===>0x01.');

					var chnId = lastBuf[OS_COMM_ID],
						chnBuf = new ABuffer(1024*1500);

					this.chnBufMap[chnId] = chnBuf;

					//종료 플래그는 뺀다. -1
					packetSize--;
					chnBuf.setBinary(0, packetSize, lastBuf.subarray(0, packetSize));
				}
				continue;

				//중간 패킷
			case 0x02:
				{
					console.log('KVWebsocketIO.prototype.onReceived ===>0x02.');
					
					var chnId = lastBuf[OS_COMM_ID],
						chnBuf = this.chnBufMap[chnId];

					if(chnBuf)
					{
						//종료 플래그는 뺀다. -1
						var copySize = packetSize - OS_TR_FLAG - 1;
						chnBuf.addBinary(copySize, lastBuf.subarray(OS_TR_FLAG, OS_TR_FLAG+copySize));
					}
				}
				continue;
		}	

		console.log('KVWebsocketIO.prototype.onReceived ===>');
		this.onReceived(lastBuf, packetSize,cb);				
		
		//if(this.listener) this.listener.onReceived(lastBuf, packetSize);				
		
	}


};


//data is UInt8Array
KVQueryManager.prototype.onReceived = function(data, size,cb)
{
	
	console.log('KVQueryManager.prototype.onReceived ====>');
	
	this.rcvBuf.setBuffer(data);
	this.rcvBuf.setDataSize(size);	
	
	this.packetInfo.dheadType = '';
	this.packetInfo.packetType = this.rcvBuf.getByte(OS_COMM_CMD);
	this.packetInfo.packetId = this.rcvBuf.getByte(OS_COMM_ID);
	
	console.log('this.packetInfo.packetType ====>',typeof this.packetInfo.packetType);
	console.log('PACKET_TYPE.E====>',typeof PACKET_TYPE.E);

	switch(this.packetInfo.packetType)
	{
		case PACKET_TYPE.D:
			this.siseProcess();
		break;
		
		case PACKET_TYPE.I:
			this.pushProcess();
		break;
	
		case PACKET_TYPE.E:
			console.log('PACKET_TYPE.E====>');
			this.queryProcess(cb);
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
			
			var errStr = {};
			errStr.errCode = errCode;
			errStr.errMsg = errMsg;

			cb(errStr);
			//this.errorProcess(this.packetInfo.packetId, errCode, errMsg);
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
					//window.location.reload(); 										
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
		
		default :
		{
			console.log('default ');
		}
	
	}
	
	// if(this.isShowProgress) AIndicator.hide();	

};

KVQueryManager.prototype.errorProcess = function(packetId, errCode, errMsg)
{
	
	console.log('KVQueryManager.prototype.errorProcess ==============>');
	
	if(errCode == '00000') return;	

	// if(this.isShowProgress) AIndicator.hide();

	var cbObj = this.getQueryCallback(packetId), listener, i, 
		qLen = this.queryListeners.length;
	
	// 타임아웃 발생시 콜백객체를 제거하므로 체크
	if(!cbObj) return;

	//에러 메시지 셋팅
	this.errorData.trName = cbObj.trName;
	this.errorData.errCode = errCode;
	this.errorData.errMsg = errMsg;
	
	//console.log('-----------------------------------------------------');
	//afc.log(this.errorData);
	
//--------------------------------
	if(!cbObj.func || !cbObj.func.notUseMessageBox)
		// theApp.openMessageBox(errMsg, 1, theApp.mainContainer);


	//타임 아웃 이후에 패킷이 도착하거나 
	//계정계 지연 패킷이 올수 있으므로 콜백 객체가 없어도 계속 진행한다.
	//계정계 지연 패킷은 listener 의 afterOutBlockData 함수에서만 구현 가능한다.
	//if(cbObj.func) cbObj.func.call(this, null);

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
	
	console.log('KVQueryManager.prototype.makeQueryData ====>',isSend);
	
	var queryData = new KVQueryData(aquery);
	
	if(isSend)
	{
		var dheadType = aquery.getValue('headtype');
		if(dheadType)
		{
			dheadType = dheadType.charCodeAt(0);

			if(dheadType==DHEAD_TYPE.A) queryData.enableEnc(true);
		}
		
		console.log('this.packetInfo.dheadType =======>',this.packetInfo.dheadType);
		
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
			
			console.log('dheadType ===>',dheadType);
			
			var flag = this.rcvBuf.getOriString(OS_ADH_CONTI_FLAG, SZ_ADH_CONTI_FLAG);
			console.log('flag ===>',flag);
			
			
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
			//한번만 셋팅하므로
			if(KVQueryManager.pushRegCnt!=1) return;
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

// 암호화된 계정아이디 등록 2018.12.28
KVQueryManager.prototype.sendXtEncryptUserId = function(userId)
{
	this.user_id = userId;

	console.log('this.user_id ===>',this.user_id);
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
	
	abuf.setByte(OS_COMM_FLAG, PACKET_FLAG.LAST || PACKET_FLAG.ENCRYPT);		//종료 패킷 셋팅
	//abuf.setByte(OS_COMM_FLAG, PACKET_FLAG.LAST);		//종료 패킷 셋팅
	//abuf.setByte(OS_COMM_FLAG, PACKET_FLAG.LAST | queryData.encFlag);		//종료 패킷 셋팅
	//abuf.setByte(OS_COMM_ID, 2);					//트랜잭션 아이디 0~255
	abuf.setByte(OS_COMM_ID, packetId);					//트랜잭션 아이디 0~255
	abuf.setByte(OS_COMM_CMD, PACKET_TYPE.E);			//패킷의 종류, Transaction 호출 IO 패킷
	
	console.log(PACKET_FLAG.LAST + ':::' + queryData.encFlag + '::::::' + packetId);

	console.log('packetId ==>',packetId);

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
		
		
		console.log('dheadSize===>',dheadSize);
		
		abuf.setByte(OS_TR_DHEAD_HI, dheadSize/256);
		//abuf.setByte(OS_TR_DHEAD_LO, dheadSize/256);
		abuf.setByte(OS_TR_DHEAD_LO, dheadSize%256);
		//abuf.addByte(dheadType);
		

		console.log('dheadSize%256==>',dheadSize%256);

		abuf.setNumString(OS_TR_SEQCHK, SZ_TR_SEQCHK, this.makeTrSeq() );

		
		console.log('OS_TR_DHEAD_HI= ',OS_TR_DHEAD_HI);
		console.log('OS_TR_DHEAD_LO= ',OS_TR_DHEAD_LO);

		
		console.log('OS_TR_SEQCHK= ',OS_TR_SEQCHK);
		console.log('SZ_TR_SEQCHK= ',SZ_TR_SEQCHK);
		console.log('this.makeTrSeq()=',this.makeTrSeq());

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


			console.log('this.user_id ====>',this.user_id);
			// 			queryData.printQueryData();

			abuf.setOriString(OS_ADH_ACCOUNT_ID, SZ_ADH_ACCOUNT_ID, this.user_id);		// 사용자 계정			
//			abuf.setOriString(OS_ADH_ACCOUNT_ID, SZ_ADH_ACCOUNT_ID, '{uVx2.rf.B');		// 사용자 계정
// 			abuf.setOriString(OS_ADH_ACCOUNT_ID, SZ_ADH_ACCOUNT_ID, 'I63{sv6)gx');		// 암호화된 사용자 계정			
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



