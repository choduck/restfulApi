BEGIN_FUNCTION_MAP
	.Func,(tr003)마진신규주문,tr003,headtype=A;
	BEGIN_DATA_MAP
		tr003In,입력,input;
		begin
			계정ID              ,user_id         ,user_id         ,char    ,10 ;
			종목코드            ,symbol          ,symbol          ,char    ,15 ;
			매수매도구분        ,buy_sell_tp     ,buy_sell_tp     ,char    ,1  ;
			주문조건            ,ord_cond        ,ord_cond        ,char    ,1  ;
			주문수량            ,ord_qty         ,ord_qty         ,double  ,20 ;
			주문가격            ,ord_prc         ,ord_prc         ,double  ,20 ;
		end
		tr003Out,출력,output;
		begin
			주문번호             ,ord_no          ,ord_no         ,long    ,10 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
