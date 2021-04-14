var KVQueryManager = require('../lib/KVQueryManager.js').createApp();
var tcpClient_ = require('../tcpClient.js');

//s0055 함수 선언
function s0055()
{
    this.response = null;
}

//s0055 메인 class 생성
s0055.prototype.onRun = function(req,res)
{


    try {
        
        
        //tr 매니저 사용위해 셋팅
        KVQueryManager.setQueryBuffer(12000, null, 'utf-8', null, 0x20);
        //tr 매니저에 userid 셋팅
        KVQueryManager.sendXtEncryptUserId(res.user_id);     
        //tr name 셋팅
        KVQueryManager.sendProcessByName('s0055', (queryData)=> {

            //파리미터 입력을 위해 셋팅
            var block = queryData.getBlockData('InBlock1')[0];
            
            //입력데이타 셋팅
            // s0055  체결
            block['user_id'] = res.user_id
            block['hndl_st_vl'] = req.body.hndl_st_vl //0:감시해제 1:감시중 2:미체결감시중 3.조건만족 4:유효기간만료 98전체조회(감시중 제외, MTS용)99:전체
            //입력데이타 셋팅 완료
        
        }, (queryData)=> {

            //mca에서 tr 데이타 받음                 
            tcpClient_.rcvMcaData(queryData,function(rcvData,client) {
        

                if (rcvData)
                {
                    //tr data parsing 한다.
                    KVQueryManager.onPreReceived(rcvData,function(data) {
                    
                        if(typeof JSON.stringify(data) != 'undefined'){
                            //data를 string으로 변환하여 response
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
        console.log('s0055 ERROR===========>',e); 
    }  
}
//s0055 class생성
module.exports = new s0055()