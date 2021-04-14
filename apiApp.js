var logger = require('./lib/logger.js');

//restful api 메인 class 생성
module.exports.createApp = function()
{
	return new apiApp();
};

//restful api config화일 및 socket 개발을 위한 net 모듈 호출
var def = require('./Define'),
	net = require('net');

//-------------------------------------------------------------------------
//	apiApp
//

//http 및 웹소켓 인스턴스 변수 초기화
function apiApp()
{
	this.httpServer = null;
	this.wsServer = null;
	this.tcpClient = null;

	this.blockData = null;
	
}

//http 및  웹소켓 인스턴스 생성
apiApp.prototype.onReady = function()
{
	this.initHttpServer();
	this.initWebsocketServer();

};

//http 서버 생성
apiApp.prototype.initHttpServer = function()
{
	
	//restful api를 위해 관련 library 호출
	var express = require('express');
	//크로스 도메인 해결하기 위해 cors모듈 사용
	var cors = require('cors')();
	var app = express();
	//mca로 tr보내기 위한 소켓 모듈
	this.tcpClient = require('./tcpClient.js');

	
	//http 서버 생성
	var http = require('http');
	this.httpServer = http.createServer(app).listen(def.LISTEN_PORT,function () {
		console.log('Http Server listening on port ',def.LISTEN_PORT);
	});
	

	//cross domain 허용을 위해 셋팅
	app.use(cors);
	app.use(express.static('public'));
	//tr RES관련 디렉토리
	app.use('/Query',express.static('Query'));

	//http request parsing 위해 사용
	var bodyParser = require('body-parser');
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	
	// 사용횟수 제한 user 저장하기 위해 redis 사용
	var red = require("redis");
	// 포트번호는 운영서버에 맞게 변경한다.
	var redis = red.createClient(6379,'127.0.0.1');

	//redis 에러 로그
	redis.on("error", function (err) {
		console.log("Redis Error " + err);
	});

	//redis 특정시간 후 알림위해 셋팅
	redis.config("SET","notify-keyspace-events", "Ex");
	//redis에 데이타를 저장하기 위해 client 인스턴스 생성
	var subscriber = red.createClient();

	
	//특정시간 후 사용제한 풀림
	subscriber.on("pmessage", function (pattern, channel, message) {
		
		console.log("pattern : "+pattern+" channel: "+channel+" message : "+message);
	
		//구분자 :::사용
		var userStr = message.split(':::');
		
		//mca로 보내기 위한 user 정보 셋팅
		var userInfo = {
			connect_key : userStr[0],
			user_id : userStr[1],
			noti_tp : '1'
		};

		//사용제한 user mca로 전송
		var ac171Unlock = require('./src/ac171Unlock.js');			
        ac171Unlock.onRun(userInfo);

	});
	

	subscriber.psubscribe("__key*__:*");

	// 블랙리스트 및 api 사용제한을 위한 verifyFn 사용
	const { checkBlackList,verifyApiKey,apiLimiter,apiLimiter2 } = require('./verifyFn.js');

	//error 에러 문장 셋팅
	var errStr ={
		status :'0001',
		data :'-1',
		msg :'There is no response data!!'
	};

	var errApiStr ={
		status :'-1',
		msg :'API 조회 권한이 없습니다. '
	};

	//redis 인스턴스 request객체에 save
	app.use(function(req,res,next){
	   
	   req.redis = redis;	
	   	
	   // restful response시 header에러 방지하기 위해 기술  
	   var _send = res.send;
	   var sent = false;
	   res.send = function(data){
		   if(sent) return;
		   _send.bind(res)(data);
		   sent = true;
	   };
	   next();
	});

	
	//체결 미체결 get 방식 셋팅
	app.get('/public/order/:id/:key',verifyApiKey,apiLimiter, function(req, res, next){
		var id = req.params.id;
		
		switch (id) {
		
			case "nosign": //미체결
				var tr526 = require('./src/tr526.js');			
				tr526.onRun(res);
				
				break;
			
			case "sign": //체결
				var tr523 = require('./src/tr523.js');			
				tr523.onRun(res);
				break;
		
			default:
				res.end(JSON.stringify(errStr));
		
		}
	
	});

	// 2019년 3월 21일 신규 추가 sms tr 요청 
	app.post('/public/sms/req', function(req, res, next){
			
		res.user_id = req.body.userId;
				
		var smsxxx = require('./src/smsxxx.js');			
		smsxxx.onRun(res);

	});


	//post방식의 restful api 위한 로직 ,블랙리스트 ,특정시간 내 호출회수 제한을 위한 로직 미들웨어에 등록
	app.post('/public/order/:id', checkBlackList,verifyApiKey,apiLimiter2,function(req, res, next){
		
		var id = req.params.id;
		
		console.log('body ====>',req.body);
		
		//분기 처리를 위해 사용
		switch (id) {
		
			case "nosign": //미체결
				var tr526 = require('./src/tr526.js');			
				tr526.onRun(res);
				
				break;
			
			case "sign": //체결
				
				console.log('res.use_api ====>',res.use_api);

				//tr523 허용 user여부 확인
				if(JSON.stringify(res.use_api).indexOf('tr523') !== -1){

					var tr523 = require('./src/tr523.js');			
					tr523.onRun(req,res);
				}else {
					
					res.end(JSON.stringify(errApiStr));
				}
				
				break;

			case "signcancel": //미체결 취소
				
				console.log('res.use_api ====>',res.use_api);

				//tr102 허용 user여부 확인
				if(JSON.stringify(res.use_api).indexOf('tr102') !== -1){
					var tr102 = require('./src/tr102.js');			
					tr102.onRun(req,res);
				}else {
					
					res.end(JSON.stringify(errApiStr));
				}
				
				break;
			case "orderwatch": //감시완료
				
				console.log('res.use_api ====>',res.use_api);

				//s0055 허용 user여부 확인
				if(JSON.stringify(res.use_api).indexOf('s0055') !== -1){

					var s0055 = require('./src/s0055.js');			
					s0055.onRun(req,res);
				}else {
					
					res.end(JSON.stringify(errApiStr));
				}
				
				break;

			case "watchcancel": //잔고청산 주문 조건 삭제
				
				console.log('res.use_api ====>',res.use_api);

				//s0003 허용 user여부 확인
				if(JSON.stringify(res.use_api).indexOf('s0003') !== -1){
					var s0003 = require('./src/s0003.js');			
					s0003.onRun(req,res);
				}else {
					
					res.end(JSON.stringify(errApiStr));
				}
				
				break;
			case "watchcanceldel": //신규 주문 설정조건 삭제
				
				console.log('res.use_api ====>',res.use_api);

				//s0021 허용 user여부 확인
				if(JSON.stringify(res.use_api).indexOf('s0021') !== -1){

					var s0021 = require('./src/s0021.js');			
					s0021.onRun(req,res);
				}else {
					
					res.end(JSON.stringify(errApiStr));
				}
				
				break;
			case "bookmark": //관심조회
				
				console.log('res.use_api ====>',res.use_api);

				//d0003 허용 user여부 확인
				if(JSON.stringify(res.use_api).indexOf('d0003') !== -1){

					var d0003 = require('./src/d0003.js');			
					d0003.onRun(req,res);
				}else {
					
					res.end(JSON.stringify(errApiStr));
				}
				
				break;
			case "bookmarkreg": //관심등록
				
				console.log('res.use_api ====>',res.use_api);

				//d0004 허용 user여부 확인
				if(JSON.stringify(res.use_api).indexOf('d0004') !== -1){

					var d0004 = require('./src/d0004.js');			
					d0004.onRun(req,res);
				}else {
					
					res.end(JSON.stringify(errApiStr));
				}
				
				break;
			case "assetdata": //자산조회
				
				console.log('res.use_api ====>',res.use_api);

				//tr531 허용 user여부 확인
				if(JSON.stringify(res.use_api).indexOf('tr531') !== -1){

					var tr531 = require('./src/tr531.js');			
					tr531.onRun(req,res);
				}else {
					
					res.end(JSON.stringify(errApiStr));
				}
				
				break;
			case "ordernoti": //주문체결통지 ==> 내부적으로 사용하는 tr
				
				console.log('res.use_api ====>',res.use_api);

				//rb03 허용 user여부 확인
				if(JSON.stringify(res.use_api).indexOf('rb03') !== -1){

					var rb03 = require('./src/rb03.js');			
					rb03.onRun(req,res);
				}else {
					
					res.end(JSON.stringify(errApiStr));
				}
				
				break;

			case "buy": // 매수
				
				console.log('res.use_api ====>',res.use_api);

				//tr101 허용 user여부 확인
				if(JSON.stringify(res.use_api).indexOf('tr101') !== -1){

					var tr101 = require('./src/tr101.js');			
					tr101.onRun(req,res);
				}else {
					
					res.end(JSON.stringify(errApiStr));
				}
				
				break;

			case "sell": // 매도
				
				console.log('res.use_api ====>',res.use_api);

				//tr101 허용 user여부 확인
				if(JSON.stringify(res.use_api).indexOf('tr101') !== -1){

					var tr101 = require('./src/tr101.js');			
					tr101.onRun(req,res);
				}else {
					
					res.end(JSON.stringify(errApiStr));
				}
				
				break;

      //해당 URL없을 경우 error 메시지를 보낸다 
			default:
				res.end(JSON.stringify(errStr));
		
		}
	
	});

	// 기획서 바뀌기 전 관심종목
	app.get('/public/inst/:id', apiLimiter2, function(req, res, next){
		var id = req.params.id;
		
		switch (id) {
		
			case "all": //관심종목
				var n0010 = require('./src/n0010.js');			
				n0010.onRun(res);
				break;

			default:
				res.end(JSON.stringify(errStr));
		}
	
	});

	// cms 연동 계좌확인 로직 
	app.get('/public/bank/trans', apiLimiter,function(req, res, next){
		
		var sv_param = req.query.sv_param;
		console.log('dw126 req.params.svc_param=====>',sv_param);
		
		var dw126 = require('./src/dw126.js');			
		dw126.onRun(sv_param,res);

	});


	// 현재가 조회
	app.get('/public/ticker/:id', apiLimiter2,function(req, res, next){
		
		var id = req.params.id;
		
		var key = req.params.key;
      
		console.log('id =====>', id);
		console.log('key =====>',key);

		
		var i0018 = require('./src/i0018.js');			
		
		i0018.onRun(res,id);
	

	});

};

//utf8 ==> string로 변환
apiApp.prototype.Utf8ArrayToStr = function(array)
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

//웹소켓 생성 로직 
apiApp.prototype.initWebsocketServer = function()
{
	var WebsocketServer = require('websocket').server, 
		thisObj = this;
	
	this.wsServer = new WebsocketServer( 
	{ 
		httpServer: this.httpServer,
		autoAcceptConnections: false
	});

	//웹소켓 서버에 접속 요청 시
	this.wsServer.on('request', function(req)
	{
		var tsocket = new net.Socket();
		
		//접속 요청이 오면 타겟 서버에 바로 접속을 시도한다. 
		thisObj.connectToTarget(tsocket, function(result)
		{
			//타겟 서버에 접속이 성공하면 클라이언트 접속 요청을 accept 한다.
			if(result)
			{
				var wsocket = req.accept('wsmw-protocol', req.origin);
				//var wsocket = req.accept(null, req.origin);

				//thisObj.sendIpToClient(wsocket);
				
				thisObj.bindToTarget(wsocket, tsocket);
			}
			
			else 
			{
				
				console.log('reject------')
				req.reject();
			}
		});
		
	});
	
};


apiApp.prototype.connectToTarget = function(socket, callback)
{
	socket.connect(def.TARGET_PORT, def.TARGET_ADDRESS, function() 
	{
		console.log('Connect Success!');
		
		//---------------------
			callback(true);
		//---------------------
	});

	//타겟 서버로부터 데이터가 수신되면 바로 클라이언트로 보낸다. 
	socket.on('data', function(data) 
	{
		//console.log('data typeof ===>',typeof data);
		
		//console.log('Received, from target : ' + data.length);
		
		//console.log(data.toString());
		//logger.info('data=== >[%s]',data);

		if(socket.wsocket)
		{
			//socket.wsocket.send(data.toString(), function(err)
			socket.wsocket.sendBytes(data, function(err)
			
			{
				if(err) console.log('connectToTarget wsocket.sendBytes error');
			});
		}
		
	});

	socket.on('close', function() 
	{
		//console.log('closed!');
	});

	socket.on('error', function(err) 
	{
		//console.log('Socket Error: ', JSON.stringify(err));
		
		//매칭 소켓이 셋팅되어져 있으면 연결된 후의 에러이므로 disconnected.
		if(socket.wsocket)
		{
			//console.log('Disconnected from target!');
			
			socket.wsocket.close();
			socket.wsocket = null;
		}
		
		//연결 실패
		else 
		{
			//console.log('Connect Fail!');
			
			//---------------------
				callback(false);
			//---------------------
		}
	});
	
	/*
	socket.on('end', function() 
	{
		console.log('Client disconnected');
    });
	
    socket.on('timeout', function() 
	{
    	console.log('Socket Timed Out');
    });	
	*/

};


apiApp.prototype.bindToTarget = function(wsocket, tsocket)
{
	var thisObj = this;
	
	//tcp 소켓과 web 소켓을 bind 해 둔다. 
	wsocket.tsocket = tsocket;
	tsocket.wsocket = wsocket;

	//클라이언트로부터 데이터가 도착하면 바로 타겟 서버로 보낸다.
	wsocket.on('message', function(msg) 
	{
		if(msg.type == 'binary') 
		{
			//console.log('Received from client : ' + msg.binaryData.length);
			//console.log(msg.binaryData);
			console.log(msg.binaryData.toString());
			
						
			//logger.info('msg.binaryData ===>[%s]',msg.binaryData); 
			//logger.info('msg.binaryData.toString() ===>[%s]',msg.binaryData.toString()); 
			
			if(wsocket.tsocket)
			{
				thisObj.writeToTarget(wsocket.tsocket, msg.binaryData, function(err)
				{
					if(err) console.log('bindToTarget tsocket.writeToTarget error');
				});
			}
			
		}

		else if(msg.type == 'utf8') 
		{
			//console.log('Received Message: ' + msg.utf8Data);
			//console.log('Received Message: ' + msg.utf8Data.toString('utf8'));

			if(wsocket.tsocket)
			{
				thisObj.writeToTarget(wsocket.tsocket, msg.utf8Data, function(err)
				{
					if(err) console.log('bindToTarget tsocket.writeToTarget error');
				});
			}
			
		}

	});
	

	wsocket.on('close', function(reasonCode, description) 
	{
		//console.log('websocket closed!');
		
		if(wsocket.tsocket)
		{
			wsocket.tsocket.destroy();
			wsocket.tsocket = null;
		}

	});	
	
	
	//this.sendIpToClient(wsocket);

};


apiApp.prototype.writeToTarget = function(tsocket, data, callback)
{
	//버퍼가 가득차 쓰기가 실패한 경우, drain 이벤트 핸들러를 구현해 버퍼가 비어있을 경우 다시 쓰기를 수행한다.	
	if(!tsocket.write(data, callback))
	{
		console.log('drain start ------------------');
	
		var thisObj = this;
		tsocket.once('drain', function()
		{
			console.log('drain end ------------------');
			thisObj.writeToTarget(tsocket, data, callback);
	  	});
	}
};

apiApp.prototype.sendIpToClient = function(wsocket)
{
	var ipAddr = wsocket.remoteAddresses[0].split(':')[3];

	if(ipAddr && ipAddr.length)
	{
		var offset = 0, ipSize = 20, i = 0, sendLen = ipSize + 7;

		//--------------------------------------------------
		//	XT_SOCK_PACKET
		//--------------------------------------------------
		this.ipBuf.writeUInt8(0x02, offset++);					//패킷 시작 플래그
		this.ipBuf.writeUInt8((sendLen-4)/256, offset++);		//패킷 길이 hi
		this.ipBuf.writeUInt8((sendLen-4)%256, offset++);		//패킷 길이 lo

		//--------------------------------------------------
		//	XT_COMM_HEAD
		//--------------------------------------------------
		this.ipBuf.writeUInt8(0x03, offset++);		//종료 패킷 셋팅
		this.ipBuf.writeUInt8(0, offset++);		//트랜잭션 아이디 0~255
		this.ipBuf.writeUInt8(0x59, offset++);		//패킷의 종류, Y, 공개 아이피 전송용

		for(; i<ipAddr.length; i++)
			this.ipBuf.writeUInt8(ipAddr.charCodeAt(i), offset++);

		//빈자리는 공백문자로 채움
		for(; i<ipSize; i++)
			this.ipBuf.writeUInt8(0x20, offset++);

		this.ipBuf.writeUInt8(0x03, offset++); //종료 플래그

		wsocket.sendBytes(this.ipBuf, function(err)
		{
			if(err) console.log('sendIpToClient wsocket.sendBytes error');
		});
	
	}
	else 
	{
		console.log('sendIpToClient : ipAddr Error ==> ' + ipAddr); 
	}

};

