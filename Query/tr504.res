BEGIN_FUNCTION_MAP
	.Func,(tr504)계정통화잔고조회(자동주문서버),tr504,headtype=A;
	BEGIN_DATA_MAP
		tr504In,입력,input;
		begin
			계정ID(O)           ,user_id         ,user_id         ,char    ,10 ;
			잔고구분            ,act_tp          ,act_tp          ,char    ,1  ;
			요청건수            ,req_cnt         ,req_cnt         ,long    ,5  ;
		end
		tr504Out_c,출력공통,output;
		begin
			응답건수            ,rsp_cnt         ,rsp_cnt         ,long    ,5  ;
		end
		tr504Out,출력,output,occurs;
		begin
			통화코드            ,cur_cd          ,cur_cd          ,char    ,5  ;
			보유수량(금액)      ,remn_qty        ,remn_qty        ,double  ,20 ;
			주문가능수량(금액)  ,ord_able_qty    ,ord_able_qty    ,double  ,20 ;
			평균매입단가        ,avg_buy_prc     ,avg_buy_prc     ,double  ,20 ;
			현재가              ,curt_prc        ,curt_prc        ,double  ,20 ;
			평가금액            ,evlt_amt        ,evlt_amt        ,double  ,20 ;
			평가손익            ,evlt_pl         ,evlt_pl         ,double  ,20 ;
			수익률              ,prft_rt         ,prft_rt         ,double  ,15 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
