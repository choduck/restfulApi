/**
 * @author asoocool
 */

function ChatWebsocketManager(listener)
{
	//this.workerId = 0;
	this.socket = null;
	
	this.listener = listener;
	this.retryCount = 0;
	this.retryTime = 0;
	this.curCount = 0;
	this.selfClose = false;
	
	this.readBuf = null;
    this.readSize = SZ_SIZE_HEADER;
    this.packetInx = 0;
	
}

//리스너 이벤트 함수
//void onConnected(success);
//void onClosed();
//void onReceived(strData);

ChatWebsocketManager.RETRY_CHECK_TIME = 3000;

ChatWebsocketManager.prototype.isStart = function()
{
	return (this.socket!=null);
};

ChatWebsocketManager.prototype.enableRetry = function(retryCount)
{
	this.retryCount = retryCount;
};

ChatWebsocketManager.prototype.startManager = function(address, port, protocols)
{
	if(this.isStart()) return;
	
	this.readBuf = new ABuffer(4096);
    this.readSize = SZ_SIZE_HEADER;
    this.packetInx = 0;
	
	var thisObj = this;
	
	this.selfClose = false;
	this.address = address;
	this.port = port;
	
	var socket = new WebSocket('ws://' + address + ':' + port, protocols);
	
	socket.binaryType = 'arraybuffer';
	
	var thisObj = this;//, listener = this.listener;//, abuf = new ABuffer(), buf = null;
	
	socket.onopen = function(event) 
	{
		thisObj.socket = socket;
		
		thisObj._onConnected(true);
	};	
	
	socket.onmessage = function(event) 
	{
		thisObj.onReceived(event.data);
		
		//if(listener) listener.onReceived(event.data);
	};

	socket.onclose = function(event) 
	{
		if(!socket.isConnectFail) thisObj.onClosed();
	};
	
	socket.onerror = function(event) 
	{
		//console.log('onError');
		if(!thisObj.isStart())
		{
			socket.isConnectFail = true;
			thisObj._onConnected(false);
		}
  			
	};
	
};

ChatWebsocketManager.prototype.stopManager = function(isClosed)
{
	if(!this.isStart()) return;

	this.selfClose = !isClosed;
	
	this.socket.close();
	this.socket = null;
	
	this.readBuf = null;
};

ChatWebsocketManager.prototype.requestSend = function(data, callback)
{
	if(!this.isStart()) return;
	
	this.socket.send(data, callback);
};

//data is ArrayBuffer
ChatWebsocketManager.prototype.onReceived = function(data)
{
/*
    var nRead, packetSize = 0,
    	isEnc, isZip, lastBuf, tgType = 0, dataBuf;
		
	dataBuf = new Uint8Array(data);
	dataBuf.subarray(0, this.readSize);
	
	this.readBuf.copyBuffer(data.slice(), this.packetInx);
		
		nRead = data.length;
		
    	this.readSize = SZ_SIZE_HEADER;
    	this.packetInx = 0;
	
	
    //new Uint8Array(data,  [, byteOffset [, byteLength]]);
*/	
	
	if(this.listener) this.listener.onReceived(data);
	//if(listener) listener.onReceived(event.data);
};


ChatWebsocketManager.prototype.onClosed = function()
{
	//console.log('onClosed');
	
	if(this.listener) this.listener.onClosed();
};

ChatWebsocketManager.prototype.onConnected = function(success)
{
	//console.log('onConnected : ' + success);
	
	if(this.listener) this.listener.onConnected(success);
};

ChatWebsocketManager.prototype._onConnected = function(success)
{
	if(success)
	{
		this.curCount = 0;
		this.onConnected(true);
	}
	else
	{
		//최초 재시도인 경우, 시작 시간 체크
		if(this.curCount==0) this.retryTime = new Date().getTime();
		
		if(++this.curCount >= this.retryCount)
		{
			this.curCount = 0;
			this.onConnected(false);
			this.stopManager(true);
		}	
		//재접속 시도
		else
		{
			//max wait time is 15 sec
			if( (new Date().getTime() - this.retryTime) > 1000*Define.QUERY_TIMEOUT )
			{
				this.curCount = 0;
				this.onConnected(false);
				this.stopManager(true);
				return;
			}
			
			
			var thisObj = this;
			setTimeout(function()
			{
				thisObj.stopManager(true);
				thisObj.startManager(thisObj.address, thisObj.port);
				
			}, ChatWebsocketManager.RETRY_CHECK_TIME);
		}
	}
};

