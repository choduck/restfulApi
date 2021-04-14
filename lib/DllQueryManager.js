
/**
Constructor
Do not call Function in Constructor.
*/
function DllQueryManager()
{
	KVQueryManager.call(this);

	//TODO:edit here
	
	this.timeoutSec = 15;

}
afc.extendsClass(DllQueryManager, KVQueryManager);



//data is UInt8Array
DllQueryManager.prototype.onReceived = function(data, isReal, packetId)
{
	var size, addOffset = OS_TR_DHEAD;
	
	if(isReal) addOffset = OS_TR_FLAG + 2;	//2 는 dtSize 정보가 있는 영역, 스킵함
	
	if(afc.isIE)
	{
		var buf = base64.decode(data);
		size = buf.length;
		
		for(var i=0; i<size; i++)
		{
			this.rcvBuf.buf[i+addOffset] = buf.charCodeAt(i);
		}
			
		//window.external.exec(null, null, "AppPlugin", "MakeLog", [ ''+buf ]);
	}

	else 
	{
		size = Base64.atobArray(data, this.rcvBuf.subArray(addOffset));
	}
	
	this.rcvBuf.setDataSize(size+addOffset);
	
	this.packetInfo.packetId = packetId;
	
	if(isReal) 
	{
		//push 리얼은 8바이트에 key 값이 4바이트씩 중복되어져 있다. 일단 2byte 만 비교함
		if(this.rcvBuf[addOffset]==this.rcvBuf[addOffset+4] && this.rcvBuf[addOffset+1]==this.rcvBuf[addOffset+5]) this.pushProcess();
		else this.siseProcess();
	}
	else this.queryProcess();
	
};

DllQueryManager.prototype.onErrorData = function(packetId, errCode, errMsg)
{
	//console.log([packetId, errCode, errMsg].join(','));
	
	this.errorProcess(packetId, errCode, errMsg);
};

DllQueryManager.prototype.sendBufferData = function(abuf)
{
	var thisObj = this;
	if(!this.netIo.isStart())
	{
		//console.log('----------------------- sendBufferData fail! : socket is closed.');
		
		if(this.isShowProgress) AIndicator.hide();
		return;
	}
	
	//---------------------------------------------------------
	// 송신할 전문 로그 남기는 함수
	//this.send_log_helper();
	//---------------------------------------------------------
	
	var sendLen = abuf.getDataSize(),
		offset = 0;
	
	//real 등록/해제 전송
	if(this.sendInfo.dheadType.length>1) offset = OS_TR_FLAG;
	//조회 전송
	else offset = OS_TR_DHEAD;

	this.netIo.sendData(abuf.subArray(offset, sendLen), this.sendInfo, function(result)
	{
		if(!result) 
		{
			thisObj.onSendFail();
		}
	});
};
