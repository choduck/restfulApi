/**
 * @author asoocool
 */

function DllIO(listener)
{
	NetworkIO.call(this, listener); 

	DllIO.listener = listener;
	
    this.address = null;
    this.port = null;
}
afc.extendsClass(DllIO, NetworkIO);


DllIO.prototype.startIO = function(address, port)
{
    this.address = address;
    this.port = port;
};

DllIO.prototype.stopIO = function(isClosed)
{
    this.address = null;
    this.port = null;
};


//data is Uint8Array
DllIO.prototype.sendData = function(data, sendInfo, callBack)
{
	var strData = Base64.btoaArray(data);
	//var len = strData.length;
	
	var funcName = 'TranData';
	
	if(sendInfo.dheadType.length>1)
		funcName = 'RealData';
	
	if(afc.isIE) 
	{
		window.external.exec(callBack, null, "AppPlugin", funcName, [ strData, sendInfo.trName, sendInfo.dheadType, sendInfo.packetId ]);
	}
	else window.exec(callBack, null, "AppPlugin", funcName, [ strData, sendInfo.trName, sendInfo.dheadType, sendInfo.packetId ]);
};

DllIO.prototype.isStart = function()
{
	return (this.address!=null);
};


//----------------------------------------------------------------------
//	static area
//----------------------------------------------------------------------

DllIO.onReceived = function(strData, isReal, packetId)
{
	if(DllIO.listener) 
	{
		//base64 decoding, size
		DllIO.listener.onReceived(strData, isReal, packetId);
	}
};



DllIO.ShareData = function(strCommand, arrayData)
{
	if(strCommand=='error_data')
	{
		//packetId, errorCode, errorMsg
		DllIO.listener.onErrorData(arrayData[0], arrayData[1], arrayData[2]);
	}
};


