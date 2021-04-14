var KVQueryManager = require('../lib/KVQueryManager.js').createApp();
var tcpClient_ = require('../tcpClient.js');


function ac532()
{
    this.response = null;
}

ac532.prototype.onRun = function(key,res,callback)
{

    try {
        
        
        //tr 매니저 사용위해 셋팅
        KVQueryManager.setQueryBuffer(12000, null, 'utf-8', null, 0x20);
        //tr name 셋팅
        KVQueryManager.sendProcessByName('ac532', (queryData)=> {

            //파리미터 입력을 위해 셋팅
            var block = queryData.getBlockData('InBlock1')[0];
            
            //access 키값 셋팅
            block['connect_key'] = key;
        
        
        }, (queryData)=> {

                            
            //mca에서 tr 데이타 받음 
            tcpClient_.rcvMcaData(queryData,function(rcvData,client) {
        
                console.log('1.rcvData ===========>',rcvData.toString()); 

                if (rcvData)
                {
                
                    //tr data parsing 한다.
                    KVQueryManager.onPreReceived(rcvData,function(data,data0) {
                    
                        console.log('ac532 data =====>',data0);
                        callback(data0);

                        //소켓 인스턴스 close
                        client.destroy();
               
                    });
                }

            });
        });


    } catch (e) {
        console.log('ac532 ERROR===========>',e); 
    }  
}

//ac532 class생성
module.exports = new ac532()