var KVQueryManager = require('../lib/KVQueryManager.js').createApp();
var tcpClient_ = require('../tcpClient.js');


function ac171Unlock()
{
    this.response = null;
}

ac171Unlock.prototype.onRun = function(userInfo)
{


    try {
        
        
        //tr 매니저 사용위해 셋팅
        KVQueryManager.setQueryBuffer(12000, null, 'utf-8', null, 0x20);
        //tr 매니저에 userid 셋팅
        KVQueryManager.sendXtEncryptUserId(userInfo.user_id);     
        //tr name 셋팅
        KVQueryManager.sendProcessByName('ac171', (queryData)=> {

            var block = queryData.getBlockData('InBlock1')[0];
            
            //현재 날짜 셋팅위해 사용
            var date = new Date();

            var hour = date.getHours();
            hour = (hour < 10 ? "0" : "") + hour;
        
            var min  = date.getMinutes();
            min = (min < 10 ? "0" : "") + min;
        
            var sec  = date.getSeconds();
            sec = (sec < 10 ? "0" : "") + sec;
        
            var year = date.getFullYear();
        
            var month = date.getMonth() + 1;
            month = (month < 10 ? "0" : "") + month;
        
            var day  = date.getDate();
            day = (day < 10 ? "0" : "") + day;
        
            //입력데이타 셋팅
            block['user_id'] = userInfo.user_id
            block['noti_tp'] = userInfo.noti_tp
            block['connect_key'] = userInfo.connect_key
            block['blck_dtm'] = year +  month +  day +  hour +  min +  sec
            //입력데이타 셋팅 완료

            console.log('Date.now() ===>',year +  month +  day +  hour +  min +  sec)

        }, (queryData)=> {

                            
            //mca에서 tr 데이타 받음 
            tcpClient_.rcvMcaData(queryData,function(rcvData,client) {
        
               // console.log('ac171Unlock rcv Data ===========>',Utf8ArrayToStr(rcvData)); 

                if (rcvData)
                {
                
                    //tr data parsing 한다.
                    KVQueryManager.onPreReceived(rcvData,function(data) {
                    
                        console.log('ac171Unlock rcv Data ===========>', data); 
                        
                        //소켓 인스턴스 close
                        client.destroy();

                    });
                }

            });
        });


    } catch (e) {
        console.log('ac171 ERROR===========>',e); 
    }  
}

//utf8을 string으로 변환하기 위한 string
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

//ac171Unlock class생성
module.exports = new ac171Unlock()