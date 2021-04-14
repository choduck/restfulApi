var KVQueryManager = require('../lib/KVQueryManager.js').createApp();
var tcpClient_ = require('../tcpClient.js');

//tr101 함수 선언
function tr101()
{
    this.response = null;
}

//tr101 메인 class 생성
tr101.prototype.onRun = function(req,res)
{

    try {
        
        
        //tr 매니저 사용위해 셋팅
        KVQueryManager.setQueryBuffer(12000, null, 'utf-8', null, 0x20);
        //tr 매니저에 userid 셋팅
        KVQueryManager.sendXtEncryptUserId(res.user_id);     
        //tr name 셋팅
        KVQueryManager.sendProcessByName('tr101', (queryData)=> {

            //파리미터 입력을 위해 셋팅
            var block = queryData.getBlockData('InBlock1')[0];
            //입력데이타 셋팅
            block['user_id'] = res.user_id
            block['symbol'] = req.body.symbol
            block['buy_sell_tp'] = req.body.buy_sell_tp
            block['ord_prc_tp'] = req.body.ord_prc_tp
            block['ord_cond'] = req.body.ord_cond
            block['auto_trd_ord_tp'] = req.body.auto_trd_ord_tp
            block['ord_qty'] = req.body.ord_qty
            block['ord_prc'] = req.body.ord_prc
            block['ord_amt'] = req.body.ord_amt
            block['ord_expr_dtm'] = req.body.ord_expr_dtm
            block['sys_trd_tp'] = req.body.sys_trd_tp
            //입력데이타 셋팅 완료
        
        }, (queryData)=> {

                            
            //mca에서 tr 데이타 받음 
            tcpClient_.rcvMcaData(queryData,function(rcvData,client) {
        
                console.log('1.rcvData ===========>',Utf8ArrayToStr(rcvData)); 

                if (rcvData)
                {
                    //tr data parsing 한다.
                    KVQueryManager.onPreReceived(rcvData,function(data,data1) {
                    

                        if(typeof JSON.stringify(data) != 'undefined'){
                           //data를 string으로 변환하여 response 
                            res.send(JSON.stringify(data));
                            res.end();
                            //소켓 인스턴스 close
                            client.destroy();
                        }else {
                            //data를 string으로 변환하여 response
                            res.send(JSON.stringify(data1));
                            res.end();
                            //소켓 인스턴스 close
                            client.destroy();

                        }

                    });
                }

            });
        });


    } catch (e) {
        console.log('tr101 ERROR===========>',e); 
    }  
}

//utf8 ==> string변환
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

//tr101 class생성
module.exports = new tr101()