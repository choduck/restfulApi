BEGIN_FUNCTION_MAP
	.Func,(tr501)주문내역조회(자동주문서버),tr501,headtype=A;
	BEGIN_DATA_MAP
		tr501In,입력,input;
		begin
			계정ID              ,user_id         ,user_id         ,char    ,10 ;
			주문번호            ,ord_no          ,ord_no          ,long    ,10 ;
		end
		tr501Out,출력,output;
		begin
			주문일시            ,ord_dtm         ,ord_dtm         ,char    ,17 ;
			주문번호            ,ord_no          ,ord_no          ,long    ,10 ;
			원주문번호          ,org_ord_no      ,org_ord_no      ,long    ,10 ;
			종목                ,symbol          ,symbol          ,char    ,15 ;
			주문구분            ,ord_tp          ,ord_tp          ,char    ,1  ;
			매수매도구분        ,buy_sell_tp     ,buy_sell_tp     ,char    ,1  ;
			호가유형            ,ord_prc_tp      ,ord_prc_tp      ,char    ,1  ;
			마진거래구분        ,mrgn_trd_tp     ,mrgn_trd_tp     ,char    ,1  ;
			주문상태            ,ord_stat        ,ord_stat        ,char    ,1  ;
			주문조건            ,ord_cond        ,ord_cond        ,char    ,1  ;
			반대매매주문구분    ,lqdt_ord_tp     ,lqdt_ord_tp     ,char    ,1  ;
			자동매매주문구분    ,auto_trd_ord_tp ,auto_trd_ord_tp ,char    ,1  ;
			대상통화코드        ,trgt_cur_cd     ,trgt_cur_cd     ,char    ,5  ;
			결제통화코드        ,setl_cur_cd     ,setl_cur_cd     ,char    ,5  ;
			대상통화소수자리수  ,trgt_dp         ,trgt_dp         ,long    ,3  ;
			결제통화소수자리수  ,stlc_dp         ,stlc_dp         ,long    ,3  ;
			주문수량            ,ord_qty         ,ord_qty         ,double  ,20 ;
			주문가격            ,ord_prc         ,ord_prc         ,double  ,20 ;
			주문금액            ,ord_amt         ,ord_amt         ,double  ,20 ;
			체결수량            ,cntr_qty        ,cntr_qty        ,double  ,20 ;
			체결금액            ,cntr_amt        ,cntr_amt        ,double  ,20 ;
			잔여수량            ,remn_qty        ,remn_qty        ,double  ,20 ;
			확인수량            ,cnfm_qty        ,cnfm_qty        ,double  ,20 ;
			정정확인수량        ,modi_cnfm_qty   ,modi_cnfm_qty   ,double  ,20 ;
			취소확인수량        ,cncl_cnfm_qty   ,cncl_cnfm_qty   ,double  ,20 ;
			자동취소수량        ,auto_cncl_qty   ,auto_cncl_qty   ,double  ,20 ;
			기한만료수량        ,expr_qty        ,expr_qty        ,double  ,20 ;
			주문만료일시        ,ord_expr_dtm    ,ord_expr_dtm    ,char    ,12 ;
			거부사유코드        ,rejt_resn_cd    ,rejt_resn_cd    ,char    ,2  ;
			채널코드            ,media_tp        ,media_tp        ,char    ,2  ;
			금액기준주문여부    ,amt_base_ord_yn ,amt_base_ord_yn ,char    ,1  ;
			통화잔고구분        ,cur_act_tp      ,cur_act_tp      ,char    ,1  ;
			전량체결여부        ,all_cntr_yn     ,all_cntr_yn     ,char    ,1  ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
