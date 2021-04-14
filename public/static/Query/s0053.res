BEGIN_FUNCTION_MAP
    .Func,(s0053)가상화폐 서버자동주문 자동주문내역 조회 ,s0053,headtype=B;
    BEGIN_DATA_MAP
        s0053InBlock,입력,input;
        begin
			USER ID              ,    user_id         ,    user_id          ,  char  ,  10;
			조회일자FROM          ,    from_dt         ,    from_dt          ,  char  ,   8;
			조회일자TO            ,    end_dt          ,    end_dt           ,  char  ,   8;
			사용자구분            ,    mbr_ccd         ,    mbr_ccd          ,  char  ,   2;
			조건상태              ,    hndl_st_vl      ,    hndl_st_vl       ,  char  ,   2;
        end
        s0053OutBlock1,출력,output;
        begin
            츨력개수       , out_cnt        , out_cnt        , char    ,  5;
        end
        s0053OutBlock2,출력,output,occurs;
        begin
			시퀀스번호        	,  sq            		   , sq            		    ,  char  ,  10;
			원주문번호        	,  orgn_ordr_no  		   , orgn_ordr_no  		    ,  char  ,  15;
			주문번호          	,  ordr_no       		   , ordr_no       		    ,  char  ,   8;
			모주문번호        	,  mthr_ordr_no  		   , mthr_ordr_no  		    ,  long  ,  10;
			설정일자시간      	,  cndt_est_dy_tm		   , cndt_est_dy_tm		    ,  char  ,   8;
			대상통화코드      	,  tradcurrcode  		   , tradcurrcode  		    ,  char  ,   8;
			결제통화코드      	,  paycurrcode   		   , paycurrcode   		    ,  long  ,  10;
			종목코드          	,  symbol        		   , symbol        		    ,  char  ,  50;
			종목코드약어      	,  symbol_abbr   		   , symbol_abbr   		    ,  char  ,  20;
			자동주문구분      	,  md_cd         		   , md_cd         		    ,  char  ,  22;
			매수도구분        	,  trd_ccd       		   , trd_ccd       		    ,  char  ,  20;
			주문구분          	,  ordr_typ_cd   		   , ordr_typ_cd   		    ,  char  ,  20;
			스탑가격          	,  stop_prc      		   , stop_prc      		    ,  double,  20;
			DetailedCondition	, cond    				  , cond					,  char,   40;
			주문수량          	,  ordr_q        		   , ordr_q        		    ,  double,  20;
			주문가격            ,  ordr_prc      		   , ordr_prc      		    ,  char  ,  20;
			조건상태            ,  hndl_st_vl    		   , hndl_st_vl    		    ,  char  , 100;
			종료일자            ,  end_dt        		   , end_dt        		    ,  char  ,   8;
        end
    END_DATA_MAP
END_FUNCTION_MAP
