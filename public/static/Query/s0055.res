BEGIN_FUNCTION_MAP
    .Func,(s0055)가상화폐 서버자동주문 자동주문내역 조회 ,s0055,headtype=B;
    BEGIN_DATA_MAP
        s0055InBlock,입력,input;
        begin
			USER ID             ,    user_id        ,    user_id          ,  char  ,  10;
			사용자구분          ,    mbr_ccd         ,    mbr_ccd          ,  char  ,   2;
			조건상태            ,    hndl_st_vl      ,    hndl_st_vl       ,  char  ,   2;
			종목코드            ,    symbol          ,    symbol           ,  char  ,   15;
        end
        s0055OutBlock1,출력,output;
        begin
            츨력개수       , out_cnt        , out_cnt        , char    ,  5;
        end
        s0055OutBlock2,출력,output,occurs;
        begin
			시퀀스번호		,		sq            	,	sq            ,		long	,	10 ;
			원주문번호		,	  orgn_ordr_no  	,   orgn_ordr_no  ,		char	,     10 ;
			주문번호		 ,	  ordr_no       	,   ordr_no       ,		char	,     10 ;
			모주문번호		,	  mthr_ordr_no  	,   mthr_ordr_no  ,		char	,     10 ;
			설정일자시간	,	  cndt_est_dy_tm	,   cndt_est_dy_tm,		char	,     20 ;
			상태변경일시	,	  st_upt_dy_tm  	,   st_upt_dy_tm  ,		char	,     20 ;
			대상통화코드	,	  tradcurrcode  	,   tradcurrcode  ,		char	,     30 ;
			결제통화코드	,	  paycurrcode   	,   paycurrcode   ,		char	,     30 ;
			종목코드		 ,	  symbol        	,   symbol        ,		char	,     15 ;
			종목코드약어	,	  symbol_abbr   	,   symbol_abbr   ,		char	,     40 ;
			자동주문구분	,	  md_cd         	,   md_cd         ,		char	,     1  ;
			매수도구분		,	  trd_ccd       	,   trd_ccd       ,		char	,     1  ;
			주문구분		 ,	  ordr_typ_cd   	,   ordr_typ_cd   ,		char	,     1  ;
			스탑가격		 ,	  stop_prc      	,   stop_prc      ,		double	,     40 ;
			주문수량		 ,	  ordr_q        	,   ordr_q        ,		double	,     40 ;
			주문가격		 ,	  ordr_prc      	,   ordr_prc      ,		double	,     40 ;
			주문금액		 ,	  ordr_amt      	,   ordr_amt      ,		double	,     40 ;
			상승폭			 ,	  distance      	,   distance     ,		double ,      40 ;
			조건상태		 ,	  hndl_st_vl    	,   hndl_st_vl    ,		char	,     1  ;
			종료일자		 ,	  end_dt        	,   end_dt        ,		char	,     20 ;
			설정일자		 ,	  est_dt        	,   est_dt        ,		char	,     8  ;
			주문처리상태	,	  ordr_hndl_ccd 	,   ordr_hndl_ccd ,		char	,     1  ;
			거부메세지   ,	  rfsl_msg      	,   rfsl_msg      ,		char	,     100;
        end
    END_DATA_MAP
END_FUNCTION_MAP
