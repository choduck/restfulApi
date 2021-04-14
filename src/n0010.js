var KVQueryManager = require('../lib/KVQueryManager.js').createApp();
var tcpClient_ = require('../tcpClient.js');

//n0010 함수 선언
function n0010()
{
    this.response = null;
}

//n0010 메인 class 생성
n0010.prototype.onRun = function(res)
{

    try {
        
        //tr 매니저 사용위해 셋팅
        KVQueryManager.setQueryBuffer(12000, null, 'utf-8', null, 0x20);
        //tr name 셋팅
        KVQueryManager.sendProcessByName('n0010', (queryData)=> {	

            //파리미터 입력을 위해 셋팅
            var block = queryData.getBlockData('InBlock1')[0];
            //입력데이타 셋팅
            block['i_qrydiv'] = 0;
            //입력데이타 셋팅 완료
        
        }, (queryData)=> {

                            
            //mca에서 tr 데이타 받음 
            tcpClient_.rcvMcaData(queryData,function(rcvData,client) {
        
                console.log('1.rcvData ===========>',rcvData); 

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
        console.log('n0010 ERROR===========>',e); 
    }  
}

//n0010 class생성
module.exports = new n0010()