var KVQueryManager = require('../lib/KVQueryManager.js').createApp();
var tcpClient_ = require('../tcpClient.js');

//smsxxx 함수 선언
function smsxxx()
{
    this.response = null;
}
//smsxxx 메인 class 생성
smsxxx.prototype.onRun = function(req,res)
{

    try {
        
        
        //tr 매니저 사용위해 셋팅
        KVQueryManager.setQueryBuffer(12000, null, 'utf-8', null, 0x20);
        //tr 매니저에 userid 셋팅
        KVQueryManager.sendXtEncryptUserId(res.user_id);     
        //tr name 셋팅
        KVQueryManager.sendProcessByName('smsxxx', (queryData)=> {

            //파리미터 입력을 위해 셋팅
            var block = queryData.getBlockData('InBlock1')[0];
            
            //입력데이타 셋팅
            // smsxxx  체결
            block['user_id'] = res.user_id
            //입력데이타 셋팅 완료
        
        }, (queryData)=> {

            //mca에서 tr 데이타 받음                 
            tcpClient_.rcvMcaData(queryData,function(rcvData,client) {
        
                //console.log('1.rcvData ===========>',rcvData); 

                if (rcvData)
                {
                    //tr data parsing 한다.
                    KVQueryManager.onPreReceived(rcvData,function(data) {
                    
                        //data를 string으로 변환하여 response
                        if(typeof JSON.stringify(data) != 'undefined'){
                            res.send(JSON.stringify(data));
                            res.end();
                            //소켓 인스턴스 close
                            client.destroy();
                        }    
                    
                    });
                }

            });
        });


    } catch (e) {
        console.log('smsxxx ERROR===========>',e); 
    }  
}

//smsxxx class생성
module.exports = new smsxxx()