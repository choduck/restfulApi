const http = require('http');

var options = {
    //host: "localhost",
    host: '59.6.135.38',
    port: 4790,
    headers: {
        'Content-Type': 'application/json'
    }
};

function request(params) {
    var req = http.request(options, (res) => {      
        var data = "";
        res.on('data', (chunk) => {                 
            data += chunk;
        
            console.log(data);
        });

        res.on('end', () => {                       
            console.log(options, data);
        });
    });

    if (params) {
        req.write(JSON.stringify(params));
    }

    req.end();
}

function api_get() {
    options.method = "GET";
    
    // 기본시세 i0018
    options.path = "/public/ticker/EOS";
    // 입출금 원화
    //options.path = "/public/bank/trans?sv_param=19022110414195/0481/665939141252/088/110489643124/50000";
    
    //options.path = "/public/order/nosign";
    //options.path = "/public/order/sign/6e6497b9614a888dbabbecd23277a6ac";
    //options.path = "/public/order/nosign/6e6497b9614a888dbabbecd23277a6ac";
    request()
}

function api_post() {
    options.method = "POST";
    //options.path = "/public/ticker/EOS"; //현재가
    // 미체결
    //options.path = "/public/order/nosign";
    // 체결
    //options.path = "/public/order/sign";
    // 미체결취소
    //options.path = "/public/order/signcancel";  
    // 감시중,감시완료
    //options.path = "/public/order/orderwatch";
    // 잔고청산 주문 조건 삭제 매도취소 s0003
    //options.path = "/public/order/watchcancel";
    //신규 주문 설정조건 삭제
    //options.path = "/public/order/watchcanceldel";
    
    //관심조회 d0003
    options.path = "/public/order/bookmark";
    //관심등록 d0004
    //options.path = "/public/order/bookmarkreg";
    //자산조회 tr531
    //options.path = "/public/order/assetdata";
    //options.path = "/public/order/ordernoti";
    //매수 tr101
    //options.path = "/public/order/buy";
    //매도 tr101
    //options.path = "/public/order/sell";

    //options.path = "/public/order/nosign/6e6497b9614a888dbabbecd23277a6ac";
    request({
        connect_key : 'aa2582d65be1ce325a7d35bd41fdc58b',
        
        fr_dt : '20181210 ',
        to_dt : '20190117',
         req_cnt : '30',
        symbol : 'KR001BTC__KRW__',
        flag : '0',
        //save_del_div : '0',
        symbol_seq: '0',
        grp_no : 0,
        in_cnt : 1,
        blnk_memo_yn: 1,
        bmrk_yn: 1,
        save_del_div: 0,


        //user_id :"dde+McxwqI",
 
        // 계정ID(O)          	,user_id         ,user_id         ,char    ,10 ;
        // 종목코드(O)         	,symbol          ,symbol          ,char    ,15 ;
        // 매수매도구분(O)      	,buy_sell_tp     ,buy_sell_tp     ,char    ,1  ;
        // 주문호가유형(O)      	,ord_prc_tp      ,ord_prc_tp      ,char    ,1  ;
        // 주문조건(O)         	,ord_cond        ,ord_cond        ,char    ,1  ;
        // 자동매매주문구분(O)   	,auto_trd_ord_tp ,auto_trd_ord_tp ,char    ,1  ;
        // 주문수량            			,ord_qty         ,ord_qty         ,double  ,20 ;
        // 주문가격            			,ord_prc         ,ord_prc         ,double  ,20 ;
        // 주문금액            			,ord_amt         ,ord_amt         ,double  ,20 ;
        // 주문만료일시         		,ord_expr_dtm    ,ord_expr_dtm    ,char    ,12 ;
        // 시스템매매구분(O)    	,sys_trd_tp      ,sys_trd_tp      ,char    ,1  ;
 
        
        // 원주문번호          		,org_ord_no      ,org_ord_no      ,long    ,10 ;
        // 정정취소구분         		,modi_cncl_tp    ,modi_cncl_tp    ,char    ,1  ;
        // 일부전부구분         		,part_all_tp     ,part_all_tp     ,char    ,1  ;
        // 주문수량            		,ord_qty         ,ord_qty         ,double  ,20 ;
        // 주문가격            		,ord_prc         ,ord_prc         ,double  ,20 ;

        // 미체결
        org_ord_no: '266',
        modi_cncl_tp : '2',
        part_all_tp : '2',
        ord_qty :'1',
        ord_prc :'',
        

        symbol: 'BCH',
        est_dt : '20190130',
        sq : '361',
        mbr_ccd :'01',
        md_cd :'',

        //0:감시해제 1:감시중 2:미체결감시중 3.조건만족 4:유효기간만료 98전체조회(감시중 제외, MTS용)99:전체
        hndl_st_vl : '1'



        //매도 1 매수 2 tr101
        // buy_sell_tp:'2', 
        // ord_prc_tp:'2',
        // ord_cond:'0',
        // auto_trd_ord_tp:'0',
        // ord_qty:'1',
        // ord_prc:'2629000',
        // ord_amt:'1',
        // ord_expr_dtm:'',
        // sys_trd_tp:'0'

    });
}

//{"user_id":"dde+McxwqI",
//"symbol":"KR001XRP__KRW__",
//"buy_sell_tp":"2",
//"ord_prc_tp":"2",
//"ord_cond":"0",
//"auto_trd_ord_tp":"0",
//"ord_qty":"1",
//"ord_prc":"1.1",
//"ord_amt":"",
//"ord_expr_dtm":"",
//"sys_trd_tp":"0"

api_get();


//api_post();
//exports.httpRequest = httpRequest;