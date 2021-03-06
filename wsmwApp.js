var logger = require('./lib/logger.js');


module.exports.createApp = function()
{
	return new wsmwApp();
};



var def = require('./Define'),
	net = require('net');

//-------------------------------------------------------------------------
//	wsmwApp
//

function wsmwApp()
{
	this.httpServer = null;
	this.wsServer = null;
	this.tcpClient = null;

	this.ipBuf = new Buffer(27);	//header(6) + ip(20) + end(1)
}


wsmwApp.prototype.onReady = function()
{
	this.initHttpServer();
	this.initWebsocketServer();
};

wsmwApp.prototype.initHttpServer = function()
{
	var thisObj = this;
	
	var express = require('express');
	var cors = require('cors')();
	var app = express();
	var url = require('url');
	this.tcpClient = require('./tcpClient.js');
	app.use('/Query',express.static('Query'));



	app.use(cors);
	
	if(def.SSL) 
	{
		var https = require('https'),     
			fs =    require('fs');        

		var options = 
		{
			key:    fs.readFileSync('/home/inance/wsmw/ssl/bithumbpro.key'),
			cert:   fs.readFileSync('/home/inance/wsmw/ssl/bithumbpro.crt')
		};

		
		this.httpServer = https.createServer(app).listen(def.LISTEN_PORT,function () {
			console.log('Https Server listening on port ',def.LISTEN_PORT);
		});

	}
	else 
	{
		var http = require('http');
		
		this.httpServer = http.createServer(app).listen(def.LISTEN_PORT,function () {
			console.log('Http Server listening on port ',def.LISTEN_PORT);
		});
		
	}

	app.use((req, res, next) => {

		var method = req.method;
		var uri = url.parse(req.url, true);
		var pathname = uri.pathname;
	
		if (method === "POST" || method === "PUT") {
			var body = "";
	
			req.on('data', function (data) {
				body += data;
			});
			req.on('end', function () {
				var params;
				params = JSON.parse(body);
				
				thisObj.onRequest(req,res, method, pathname, params);
			});
		} else {        
			
//			res.end('finish!!!!');
			thisObj.onRequest(req,res, method, pathname, uri.query);
		}
	});

};

wsmwApp.prototype.onRequest = function(req,res, method, pathname, params)
{
	var thisObj = this;
	
	var rcvStr ={
        status :'0001',
        data :'-1',
        msg :'There is no response data for ' + pathname
    };
    
    switch (pathname) {
        
        case "/public/ticker/BTC":
			thisObj.sendtoMCA(res);
            break;
		
		case "/public/order/nosign":
			thisObj.sendtoMCA_nosign(res);
            break;

		default:
			res.end(JSON.stringify(rcvStr));
	
	}
}


wsmwApp.prototype.sendtoMCA = function(res)
{
	
	try {
        var offset = 0, i = 0, sendLen = 0;
        //var regData = 'KVS0|KR001EOS__KRW__;';
		var regData = 'KVS0|KR001BTC__KRW__;';
		//var regData = 'KVS0|KR001XMR__KRW__KR001BTG__KRW__KR001BTC__KRW__KR001LTC__KRW__KR001ETC__KRW__KR001QTUM_KRW__KR001XRP__KRW__KR001BCH__KRW__KR001DASH_KRW__KR001EOS__KRW__KR001ETH__KRW__KR001TRX__KRW__KR001ZEC__KRW__;';

        sendLen = regData.length + 7;
        
        var tcpData = new Buffer(sendLen);
        //--------------------------------------------------
		//	XT_SOCK_PACKET
		//--------------------------------------------------
		tcpData.writeUInt8(0x02, offset++);					//?????? ?????? ?????????
		tcpData.writeUInt8((sendLen-4)/256, offset++);		//?????? ?????? hi
		tcpData.writeUInt8((sendLen-4)%256, offset++);		//?????? ?????? lo

		//--------------------------------------------------
		//	XT_COMM_HEAD
		//--------------------------------------------------
		tcpData.writeUInt8(0x03, offset++);		//?????? ?????? ??????
		tcpData.writeUInt8(0, offset++);		//???????????? ????????? 0~255
		//tcpData.write("",offset++);
		tcpData.writeUInt8(0x41, offset++);		//????????? ??????, Y, ?????? ????????? ?????????

        for(; i<regData.length; i++){
            tcpData.writeUInt8(regData.charCodeAt(i), offset++);
            //console.log('regData.charCodeAt(i) ===> ',regData.charCodeAt(i))
        }        
        
        tcpData.writeUInt8(0x03, offset++); //?????? ?????????

        console.log('--------->',tcpData.toString('utf8'));
		logger.info('tcpData.toString === >[%s]',tcpData.toString('utf8'));

		logger.info('(sendLen-4)/256 === >[%s]',(sendLen-4)/256);
		logger.info('(sendLen-4)/256 === >[%d]',(sendLen-4)/256);

        this.tcpClient.rcvMcaData(tcpData,function(data) {
            
            console.log('1.data ===========>',data); 
            //console.log('data.slice(0,7) ===========>',data.slice(0,7)); 
            // console.log('TR?????? ===========>',data.slice(8,12)); 
            // console.log('???????????? ===========>',data.slice(12,27)); 
            // console.log('???????????? ===========>',data.slice(27,35)); 
            console.log('???????????? ===========>',data.slice(35,47)); 
            // console.log('???????????? ===========>',data.slice(47,67).trim()); 
            // console.log('???????????? ===========>',data.slice(67,87).trim()); 
            // console.log('???????????? ===========>',data.slice(87,99).trim()); 
            // console.log('???????????? ===========>',data.slice(99,111).trim()); 
            // console.log('???????????? ===========>',data.slice(111,123).trim()); 
            // console.log('?????? ===========>',data.slice(123,143).trim()); 
            // console.log('?????? ===========>',data.slice(143,163).trim()); 
            // console.log('?????? ===========>',data.slice(163,183).trim()); 
            // console.log('???????????? ===========>',data.slice(183,203).trim()); 
            // console.log('?????????????????? ===========>',data.slice(203,204).trim()); 
            // console.log('???????????? ===========>',data.slice(204,224).trim()); 
            // console.log('????????????????????? ===========>',data.slice(224,244).trim()); 
            // console.log('????????????????????? ===========>',data.slice(244,264).trim()); 
            // console.log('???????????????????????? ===========>',data.slice(264,279).trim()); 
            // console.log('???????????????????????? ===========>',data.slice(279,294).trim()); 
            // console.log('???????????? ===========>',data.slice(294,295).trim()); 
            // console.log('???????????? ===========>',data.slice(295,315).trim()); 
            // console.log('??????????????? ===========>',data.slice(315,335).trim()); 
            // console.log('????????????????????? ===========>',data.slice(335,355).trim()); 
            // console.log('?????????????????? ===========>',data.slice(355,375).trim()); 
            // console.log('???????????????????????? ===========>',data.slice(375,395).trim()); 
            // console.log('???????????? ===========>',data.slice(395,415).trim()); 
            // console.log('???????????? ===========>',data.slice(415,435).trim()); 
            // console.log('???????????? ?????? ===========>',data.slice(435,455).trim()); 
            // console.log('???????????? ?????? ===========>',data.slice(455,475).trim()); 
            // console.log('????????????????????? ===========>',data.slice(475,495).trim()); 
            // console.log('????????????????????? ===========>',data.slice(495,515).trim()); 
            // console.log('????????? ===========>',data.slice(515,521).trim()); 
            // console.log('?????????????????? ===========>',data.slice(521,541).trim()); 
            // console.log('??????????????????????????? ===========>',data.slice(541,547).trim()); 
            // console.log('?????????????????? ===========>',data.slice(547,567).trim()); 
            // console.log('??????????????????????????? ===========>',data.slice(567,573).trim()); 
            // console.log('?????????????????? ===========>',data.slice(573,593).trim()); 
            // console.log('??????????????????????????? ===========>',data.slice(593,599).trim()); 
            // console.log('????????????????????? ===========>',data.slice(599,619).trim()); 
            // console.log('?????????????????? ===========>',data.slice(619,627).trim()); 
            // console.log('???????????????????????? ===========>',data.slice(627,647).trim()); 
            // console.log('????????????????????? ===========>',data.slice(647,657).trim()); 
            // console.log('???????????? ===========>',data.slice(657,663).trim()); 
            // console.log('????????? ?????? ===========>',data.slice(663,665).trim()); 

            var KVS0 = { 
				"status" :'0000',
				"data" : { 
//					"trcode"             : data.slice(8,12),
//                	"symbol"             : data.slice(12,27),
                	"symbol"             : "EOS",
					"execdate"           : data.slice(27,35),
					"exectime"           : data.slice(35,47),
					"execprice"          : data.slice(47,67).trim(),
					"execvalue"          : data.slice(67,87).trim(),
					"opentime"           : data.slice(87,99).trim(),
					"hightime"           : data.slice(99,111).trim(),
					"lowtime"            : data.slice(111,123).trim(),
					"openprc"            : data.slice(123,143).trim(),
					"highprc"            : data.slice(143,163).trim(), 
					"lowprc"             : data.slice(163,183).trim(),
					"yesterdayprice"     : data.slice(183,203).trim(),
					"diffdiv"            : data.slice(203,204).trim(),
					"diff"               : data.slice(204,224).trim(),
					"sellcumexecqty"     : data.slice(224,244).trim(),
					"buycumexecqty"      : data.slice(244,264).trim(), 
					"sellcumexeccnt"     : data.slice(264,279).trim(),
					"buycumexeccnt"      : data.slice(279,294).trim(),
					"exectype"           : data.slice(294,295).trim(),
					"execqty"            : data.slice(295,315).trim(),
					"cumdealqty"         : data.slice(315,335).trim(), 
					"precumdealqty"      : data.slice(335,355).trim(),
					"cumdealcost"        : data.slice(355,375).trim(),
					"precumdealcost"     : data.slice(375,395).trim(),
					"ask"                : data.slice(395,415).trim(),
					"bid"                : data.slice(415,435).trim(),
					"askrest"            : data.slice(435,455).trim(),
					"bidrest"            : data.slice(455,475).trim(),
					"asktotal"           : data.slice(475,495).trim(),
					"bidtotal"           : data.slice(495,515).trim(),
					"updnrate"           : data.slice(515,521).trim(),
					"openprcdiff"        : data.slice(521,541).trim(),
					"openprcdiffupdnrate": data.slice(541,547).trim(),
					"highprcdiff"        : data.slice(547,567).trim(),
					"highprcdiffupdnrate": data.slice(567,573).trim(),
					"lowprcdiff"         : data.slice(573,593).trim(),
					"lowprcdiffupdnrate" : data.slice(593,599).trim(),
					"dealqtydiff"        : data.slice(599,619).trim(),
					"dealqtyupdnrate"    : data.slice(619,627).trim(),
					"dealcostdiff"       : data.slice(627,647).trim(),
					"dealcostupdnrate"   : data.slice(647,657).trim(),
					"execstrth"          : data.slice(657,663).trim(),
					"jstatus"            : data.slice(663,665).trim()
				}
			};        


            //console.log('KVS0 ====== >',JSON.stringify(KVS0));
            
            res.end(JSON.stringify(KVS0));
            
        });
    
    } catch (e) {
        console.log('ERROR===========>',e); 
    }  
}

/*


wsmwApp.prototype.sendtoMCA_nosign = function(res)
{
	
	try {
        var offset = 0, i = 0, sendLen = 0;
        //var regData = 'KVS0|KR001EOS__KRW__;';
		//var regData = 'KVS0|KR001BTC__KRW__;';
		var regData = 'KVS0|KR001XMR__KRW__KR001BTG__KRW__KR001BTC__KRW__KR001LTC__KRW__KR001ETC__KRW__KR001QTUM_KRW__KR001XRP__KRW__KR001BCH__KRW__KR001DASH_KRW__KR001EOS__KRW__KR001ETH__KRW__KR001TRX__KRW__KR001ZEC__KRW__;';

        //sendLen = regData.length + 7;
		sendLen = 257;
		
        var tcpData = new Buffer(sendLen);
        //--------------------------------------------------
		//	XT_SOCK_PACKET
		//--------------------------------------------------
		tcpData.writeUInt8(0x02, offset++);					//?????? ?????? ?????????
		tcpData.writeUInt8((sendLen-4)/256, offset++);		//?????? ?????? hi
		tcpData.writeUInt8((sendLen-4)%256, offset++);		//?????? ?????? lo

        tcpData.write("Etr526HA",offset++);
		offset = offset + 10;
		tcpData.write("",offset++);
		tcpData.write("",offset++);
        tcpData.write("",offset++);
		tcpData.write("    6{uVx2.rf.B20",offset++);
		offset = offset + 16;
		tcpData.write("                                                                0",offset++);
		// tcpData.writeUInt8(0,offset++);
		offset = offset + 64;
		// for(i=0; i<123; i++){
		// 	tcpData.write("",offset++);

		offset = offset + 123;
		tcpData.write("{uVx2.rf.B00                    30",offset++);
		offset = offset + 33;
		tcpData.writeUInt8(0x03,offset++);
		

        console.log('--------->',tcpData.toString('utf8'));
		logger.info('tcpData.toString === >[%s]',tcpData.toString('utf8'));


        this.tcpClient.rcvMcaData(tcpData,function(data) {
            
            console.log('1.data ===========>',data); 
			res.end(data.toString('utf8'));
			return;
            
        });
    
    } catch (e) {
        console.log('ERROR===========>',e); 
    }  
}
*/



wsmwApp.prototype.sendtoMCA_nosign = function(res)
{
	
	try {
        var offset = 0, i = 0, sendLen = 0;
        //var regData = 'KVS0|KR001EOS__KRW__;';
		//var regData = 'KVS0|KR001BTC__KRW__;';
		var regData = 'KVS0|KR001XMR__KRW__KR001BTG__KRW__KR001BTC__KRW__KR001LTC__KRW__KR001ETC__KRW__KR001QTUM_KRW__KR001XRP__KRW__KR001BCH__KRW__KR001DASH_KRW__KR001EOS__KRW__KR001ETH__KRW__KR001TRX__KRW__KR001ZEC__KRW__;';

        //sendLen = regData.length + 7;
		sendLen = 257;
		
        var tcpData = new Buffer(sendLen);
        //--------------------------------------------------
		//	XT_SOCK_PACKET
		//--------------------------------------------------
		tcpData.writeUInt8(0x02, offset++);					//?????? ?????? ?????????
		tcpData.writeUInt8((sendLen-4)/256, offset++);		//?????? ?????? hi
		tcpData.writeUInt8((sendLen-4)%256, offset++);		//?????? ?????? lo

		tcpData.writeUInt8(0x03, offset++);		//?????? ?????? ??????
		tcpData.writeUInt8(8, offset++);		//???????????? ????????? 0~255
		//tcpData.write("",offset++);
		tcpData.write("E", offset++);		//????????? ??????
		tcpData.writeUInt8(0x04, offset++);		
        tcpData.write("tr526HA",offset++);
		offset = offset + 6;
		
		var dheadSize = 200;

		tcpData.writeUInt8(dheadSize/256, offset++);		
		tcpData.writeUInt8(dheadSize%256, offset++);		

        tcpData.write("",offset++);

		tcpData.write("    6{uVx2.rf.B20",offset++);
		offset = offset + 16;
		tcpData.write("                                                                0",offset++);
		// tcpData.writeUInt8(0,offset++);
		offset = offset + 64;
		// for(i=0; i<123; i++){
		// 	tcpData.write("",offset++);

		offset = offset + 123;
		tcpData.write("{uVx2.rf.B00                    30",offset++);
		offset = offset + 33;
		tcpData.writeUInt8(0x03,offset++);
		

        console.log('--------->',tcpData.toString('utf8'));
		logger.info('tcpData.toString === >[%s]',tcpData.toString('utf8'));


        this.tcpClient.rcvMcaData(tcpData,function(data) {
            
            console.log('1.data ===========>',data); 
			res.end(data.toString('utf8'));
			return;
            
        });
    
    } catch (e) {
        console.log('ERROR===========>',e); 
    }  
}

wsmwApp.prototype.initWebsocketServer = function()
{
	var WebsocketServer = require('websocket').server, 
		thisObj = this;
	
	this.wsServer = new WebsocketServer( 
	{ 
		httpServer: this.httpServer,
		autoAcceptConnections: false
	});

	//????????? ????????? ?????? ?????? ???
	this.wsServer.on('request', function(req)
	{
		var tsocket = new net.Socket();
		
		//?????? ????????? ?????? ?????? ????????? ?????? ????????? ????????????. 
		thisObj.connectToTarget(tsocket, function(result)
		{
			//?????? ????????? ????????? ???????????? ??????????????? ?????? ????????? accept ??????.
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


wsmwApp.prototype.connectToTarget = function(socket, callback)
{
	socket.connect(def.TARGET_PORT, def.TARGET_ADDRESS, function() 
	{
		console.log('Connect Success!');
		
		//---------------------
			callback(true);
		//---------------------
	});

	//?????? ??????????????? ???????????? ???????????? ?????? ?????????????????? ?????????. 
	socket.on('data', function(data) 
	{
		console.log('Received, from target : ' + data.length);
		console.log(data);
		console.log(data.toString());

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
		
		//?????? ????????? ??????????????? ????????? ????????? ?????? ??????????????? disconnected.
		if(socket.wsocket)
		{
			//console.log('Disconnected from target!');
			
			socket.wsocket.close();
			socket.wsocket = null;
		}
		
		//?????? ??????
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


wsmwApp.prototype.bindToTarget = function(wsocket, tsocket)
{
	var thisObj = this;
	
	//tcp ????????? web ????????? bind ??? ??????. 
	wsocket.tsocket = tsocket;
	tsocket.wsocket = wsocket;

	//???????????????????????? ???????????? ???????????? ?????? ?????? ????????? ?????????.
	wsocket.on('message', function(msg) 
	{
		if(msg.type == 'binary') 
		{
			console.log('Received from client : ' + msg.binaryData.length);
			//console.log(msg.binaryData);
			console.log(msg.binaryData.toString());
			
						
			logger.info('msg.binaryData ===>[%s]',msg.binaryData); 
			logger.info('msg.binaryData.toString() ===>[%s]',msg.binaryData.toString()); 
			
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
			console.log('Received Message: ' + msg.utf8Data);
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


wsmwApp.prototype.writeToTarget = function(tsocket, data, callback)
{
	//????????? ????????? ????????? ????????? ??????, drain ????????? ???????????? ????????? ????????? ???????????? ?????? ?????? ????????? ????????????.	
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

wsmwApp.prototype.sendIpToClient = function(wsocket)
{
	var ipAddr = wsocket.remoteAddresses[0].split(':')[3];

	if(ipAddr && ipAddr.length)
	{
		var offset = 0, ipSize = 20, i = 0, sendLen = ipSize + 7;

		//--------------------------------------------------
		//	XT_SOCK_PACKET
		//--------------------------------------------------
		this.ipBuf.writeUInt8(0x02, offset++);					//?????? ?????? ?????????
		this.ipBuf.writeUInt8((sendLen-4)/256, offset++);		//?????? ?????? hi
		this.ipBuf.writeUInt8((sendLen-4)%256, offset++);		//?????? ?????? lo

		//--------------------------------------------------
		//	XT_COMM_HEAD
		//--------------------------------------------------
		this.ipBuf.writeUInt8(0x03, offset++);		//?????? ?????? ??????
		this.ipBuf.writeUInt8(0, offset++);		//???????????? ????????? 0~255
		this.ipBuf.writeUInt8(0x59, offset++);		//????????? ??????, Y, ?????? ????????? ?????????

		for(; i<ipAddr.length; i++)
			this.ipBuf.writeUInt8(ipAddr.charCodeAt(i), offset++);

		//???????????? ??????????????? ??????
		for(; i<ipSize; i++)
			this.ipBuf.writeUInt8(0x20, offset++);

		this.ipBuf.writeUInt8(0x03, offset++); //?????? ?????????

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

