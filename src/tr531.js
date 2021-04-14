var KVQueryManager = require('../lib/KVQueryManager.js').createApp();
var tcpClient_ = require('../tcpClient.js');

//tr531 함수 선언
function tr531()
{
    this.response = null;
}

//tr531 메인 class 생성
tr531.prototype.onRun = function(req,res)
{

    try {
        
        
        //tr 매니저 사용위해 셋팅
        KVQueryManager.setQueryBuffer(12000, null, 'utf-8', null, 0x20);
        //tr 매니저에 userid 셋팅
        KVQueryManager.sendXtEncryptUserId(res.user_id);     
        //tr name 셋팅
        KVQueryManager.sendProcessByName('tr531', (queryData)=> {
            //파리미터 입력을 위해 셋팅
            var block = queryData.getBlockData('InBlock1')[0];
            //입력데이타 셋팅
            block['user_id'] = res.user_id
            block['cur_cd'] = null
            block['fee_tp'] = '1'
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
        console.log('tr531 ERROR===========>',e); 
    }  
}
//tr531 class생성
module.exports = new tr531()