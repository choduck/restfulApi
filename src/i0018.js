var KVQueryManager = require('../lib/KVQueryManager.js').createApp();
var tcpClient_ = require('../tcpClient.js');


//i0018 함수 선언
function i0018()
{
    this.response = null;
}

//i0018 메인 class 생성
i0018.prototype.onRun = function(res,pname)
{

    try {
        
        
        //tr 매니저 사용위해 셋팅
        KVQueryManager.setQueryBuffer(12000, null, 'utf-8', null, 0x20);
        //tr name 셋팅
        KVQueryManager.sendProcessByName('i0018', (queryData)=> {

            //파리미터 입력을 위해 셋팅
            var block = queryData.getBlockData('InBlock1')[0];
            
            //입력데이타 셋팅
            block['symbolcnt'] = '1';
            block['qry_div'] = '4';
            block['paycurrcode'] = '99999';
            block['excode'] = '001';
            var block2 = queryData.queryObj['InBlock2'];
            block2.push({
              'symbol': 'KR001' + pname + '__KRW__'
            });
            //입력데이타 셋팅 완료

        
        }, (queryData)=> {

            //mca에서 tr 데이타 받음 
            tcpClient_.rcvMcaData(queryData,function(rcvData,client) {
        
                console.log('1.rcvData ===========>',rcvData); 

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
        console.log('i0018 ERROR===========>',e); 
    }  
}

//i0018 class생성
module.exports = new i0018()