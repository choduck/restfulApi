var KVQueryManager = require('../lib/KVQueryManager.js').createApp();
var tcpClient_ = require('../tcpClient.js');


//tr102 함수 선언
function tr102()
{
    this.response = null;
}
//tr102 메인 class 생성
tr102.prototype.onRun = function(req,res)
{


    try {
        
        //tr 매니저 사용위해 셋팅
        KVQueryManager.setQueryBuffer(12000, null, 'utf-8', null, 0x20);
        //tr 매니저에 userid 셋팅        
        KVQueryManager.sendXtEncryptUserId(res.user_id);     
        //tr name 셋팅
        KVQueryManager.sendProcessByName('tr102', (queryData)=> {

            //파리미터 입력을 위해 셋팅
            var block = queryData.getBlockData('InBlock1')[0];
            //입력데이타 셋팅
            block['user_id'] = res.user_id
            block['org_ord_no'] = req.body.org_ord_no
            block['modi_cncl_tp'] = req.body.modi_cncl_tp
            block['part_all_tp'] = req.body.part_all_tp
            block['ord_qty'] = req.body.ord_qty
            block['ord_prc'] = req.body.ord_prc
            //입력데이타 셋팅 완료
        
        }, (queryData)=> {

                            
            //mca에서 tr 데이타 받음 
            tcpClient_.rcvMcaData(queryData,function(rcvData,client) {
        
                //console.log('1.rcvData ===========>',rcvData); 

                if (rcvData)
                {
                
                    //tr data parsing 한다.
                    KVQueryManager.onPreReceived(rcvData,function(data,data1) {
                    
                        console.log('rcvData ===========>',JSON.stringify(data)); 
                        
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
        console.log('tr102 ERROR===========>',e); 
    }  
}
//tr102 class생성
module.exports = new tr102()