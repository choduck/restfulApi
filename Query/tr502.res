BEGIN_FUNCTION_MAP
	.Func,(tr502)체결내역조회(자동주문서버),tr502,headtype=A;
	BEGIN_DATA_MAP
		tr502In,입력,input;
		begin
			계정ID              ,user_id         ,user_id         ,char    ,10 ;
			주문번호            ,ord_no          ,ord_no          ,long    ,10 ;
			거래소체결ID        ,exch_cntr_id    ,exch_cntr_id    ,char    ,16 ;
		end
		tr502Out,출력,output;
		begin
			체결시각            ,cntr_dtm        ,cntr_dtm        ,char    ,17 ;
			종목                ,symbol          ,symbol          ,char    ,15 ;
			매수매도구분        ,buy_sell_tp     ,buy_sell_tp     ,char    ,1  ;
			마진거래구분        ,mrgn_trd_tp     ,mrgn_trd_tp     ,char    ,1  ;
			자동매매주문구분    ,auto_trd_ord_tp ,auto_trd_ord_tp ,char    ,1  ;
			대상통화코드        ,trgt_cur_cd     ,trgt_cur_cd     ,char    ,5  ;
			결제통화코드        ,setl_cur_cd     ,setl_cur_cd     ,char    ,5  ;
			통화잔고구분        ,cur_act_tp      ,cur_act_tp      ,char    ,1  ;
			대상통화소수자리수  ,trgt_dp         ,trgt_dp         ,long    ,3  ;
			결제통화소수자리수  ,stlc_dp         ,stlc_dp         ,long    ,3  ;
			수수료통화소수자리수,fee_cur_dp      ,fee_cur_dp      ,long    ,3  ;
			수수료통화코드      ,fee_cur_cd      ,fee_cur_cd      ,char    ,5  ;
			체결수수료구분      ,cntr_fee_tp     ,cntr_fee_tp     ,char    ,1  ;
			수수료적용구분      ,fee_aplc_tp     ,fee_aplc_tp     ,char    ,1  ;
			체결수량            ,cntr_qty        ,cntr_qty        ,double  ,20 ;
			체결가격            ,cntr_prc        ,cntr_prc        ,double  ,20 ;
			체결금액            ,cntr_amt        ,cntr_amt        ,double  ,20 ;
			수수료              ,fee             ,fee             ,double  ,20 ;
			수수료율            ,fee_rt          ,fee_rt          ,double  ,10 ;
			대상통화전잔        ,trgt_pbal       ,trgt_pbal       ,double  ,20 ;
			대상통화금잔        ,trgt_nbal       ,trgt_nbal       ,double  ,20 ;
			결제통화전잔        ,setl_pbal       ,setl_pbal       ,double  ,20 ;
			결제통화금잔        ,setl_nbal       ,setl_nbal       ,double  ,20 ;
			KRW기준체결금액     ,krw_cntr_amt    ,krw_cntr_amt    ,double  ,20 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
