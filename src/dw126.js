var KVQueryManager = require('../lib/KVQueryManager.js').createApp();
var tcpClient_ = require('../tcpClient.js');

//dw126 함수 선언
function dw126()
{
    this.response = null;
}

//dw126 메인 class 생성
dw126.prototype.onRun = function(sv_param,res)
{


    try {
        
        
        //tr 매니저 사용위해 셋팅
        KVQueryManager.setQueryBuffer(12000, null, 'utf-8', null, 0x20);
        //tr name 셋팅
        KVQueryManager.sendProcessByName('dw126', (queryData)=> {

            //파리미터 입력을 위해 셋팅
            var block = queryData.getBlockData('InBlock1')[0];
            
            
            //입력데이타 셋팅
            console.log('dw126 sv_param ===>',sv_param);
             var svc_param = JSON.stringify(sv_param).split('/');
             
             var regExp = /[\"]/gi;

            console.log(svc_param[0].replace(regExp, ""));
            console.log(svc_param[1]);
            console.log(svc_param[2]);
            console.log(svc_param[3]);
            console.log(svc_param[4]);
            console.log(svc_param[5].replace(regExp, ""));
            
            block['txid'] = svc_param[0].replace(regExp, "");
            block['depo_bank_cd'] = svc_param[1];
            block['depo_acct_no'] = svc_param[2];
            block['widr_bank_cd'] = svc_param[3];
            block['widr_acct_no'] = svc_param[4];
            block['trd_amt'] = svc_param[5].replace(regExp, "");
            //입력데이타 셋팅 완료  
        
        }, (queryData)=> {

            //mca에서 tr 데이타 받음                 
            tcpClient_.rcvMcaData(queryData,function(rcvData,client) {
        
                console.log('1.rcvData ===========>',rcvData); 

                if (rcvData)
                {
                    //tr data parsing 한다.
                    KVQueryManager.onPreReceived(rcvData,function(data,data0) {
                    
                        if(typeof JSON.stringify(data0) != 'undefined'){
                            
                           //XML Data 셋팅하여 response한다.
                            var output = '';
                            output +='<?xml version="1.0" encoding="EUC-KR"?>';
                            output +='<RESULT>' + data0[0].conf_yn + '</RESULT>';    
                            console.log('output ===>',output);
                            
                            res.send(output);
                            res.end();
                            //소켓 인스턴스 close
                            client.destroy();
                        }else{
                            
                            //데이타 값이 없을 경우 N으로 샛팅하여 response한다.
                            var output = '';
                            output +='<?xml version="1.0" encoding="EUC-KR"?>';
                            output +='<RESULT>N</RESULT>';    
                            
                            console.log('output ===>',output);
                            
                            res.send(output);
                            res.end();
                            //소켓 인스턴스 close
                            client.destroy();
                        }    
                    
               
                    });
                }

            });
        });


    } catch (e) {
        console.log('dw126 ERROR===========>',e); 
    }  
}
//dw126 class생성
module.exports = new dw126()