var net = require('net');
var logger = require('./lib/logger.js');

exports.rcvMcaData = function(tcpData,cb){

    var client ='';
    var options = {   // 접속 정보 설정

         port: 8801,
         host: "211.252.86.147"

    };
    
    client = net.connect(options, () => {     // 서버 접속
        console.log("connected");
    
        console.log('tcpData =====>',Utf8ArrayToStr(tcpData));
        logger.info('tcpData=== >[%s]',Utf8ArrayToStr(tcpData));
        
        //mca로 데이타 send
        client.write(tcpData);
    });

    client.on('data', (data) => {     // 데이터 수신 이벤트
        
        console.log('data ====> ',data.toString());
        //mca로 데이타를 받아 callback을 통해 데이타를 전송한다.
        cb(data,client);
        
            
    });

    client.on('end', () => {           // 접속 종료 이벤트
        console.log("disconnected");
    });

}

//utf8 ==> string으로 
function Utf8ArrayToStr(array)
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
