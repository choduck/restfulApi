var KVQueryManager = require('../lib/KVQueryManager.js').createApp();
var tcpClient_ = require('../tcpClient.js');

//s0021 함수 선언
function s0021()
{
    this.response = null;
}
//s0021 메인 class 생성
s0021.prototype.onRun = function(req,res)
{

    try {
        
        
        //tr 매니저 사용위해 셋팅
        KVQueryManager.setQueryBuffer(12000, null, 'utf-8', null, 0x20);
        //tr 매니저에 userid 셋팅
        KVQueryManager.sendXtEncryptUserId(res.user_id);     
        //tr name 셋팅
        KVQueryManager.sendProcessByName('s0021', (queryData)=> {

            //파리미터 입력을 위해 셋팅
            var block = queryData.getBlockData('InBlock1')[0];
            
            //입력데이타 셋팅
            // s0021  체결
            block['user_id'] = res.user_id
            block['symbol'] = req.body.symbol;
            block['est_dt'] = req.body.est_dt;
            block['sq'] = req.body.sq;
            block['mbr_ccd'] = req.body.mbr_ccd;
            block['md_cd'] = req.body.md_cd;
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
        console.log('s0021 ERROR===========>',e); 
    }  
}

//s0021 class생성
module.exports = new s0021()