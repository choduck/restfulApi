BEGIN_FUNCTION_MAP
	.Func,(tr503)잔고내역조회(자동주문서버),tr503,headtype=A;
	BEGIN_DATA_MAP
		tr503In,입력,input;
		begin
			계정ID              ,user_id         ,user_id         ,char    ,10 ;
			통화코드1           ,cur_cd1         ,cur_cd1         ,char    ,5  ;
			잔고구분1           ,act_tp1         ,act_tp1         ,char    ,1  ;
			통화코드2           ,cur_cd2         ,cur_cd2         ,char    ,5  ;
			잔고구분2           ,act_tp2         ,act_tp2         ,char    ,1  ;
		end
		tr503Out,출력,output;
		begin
			잔량1               ,cur_bal1        ,cur_bal1        ,double ,20 ;
			가용수량(금액)1     ,able_qty1       ,able_qty1       ,double  ,20 ;
			통화자리수1         ,cur_dp1         ,cur_dp1         ,long    ,3  ;
			평균매입단가(수수료미포함)1,avg_buy_prc_no_fee_1,avg_buy_prc_no_fee_1,double,20 ;
			평균매입단가(수수료포함)1,avg_buy_prc_fee_1,avg_buy_prc_fee_1,double,20 ;
			잔량2               ,cur_bal2        ,cur_bal2        ,double  ,20 ;
			가용수량(금액)2     ,able_qty2       ,able_qty2       ,double  ,20 ;
			통화자리수2         ,cur_dp2         ,cur_dp2         ,long    ,3  ;
			평균매입단가(수수료미포함)2,avg_buy_prc_no_fee_2,avg_buy_prc_no_fee_2,double,20 ;
			평균매입단가(수수료포함)2,avg_buy_prc_fee_2,avg_buy_prc_fee_2,double,20 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
