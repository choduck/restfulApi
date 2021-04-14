BEGIN_FUNCTION_MAP
	.Func,(ss013)스마트시그널_전문가선택_상세_신호히스토리,ss013,headtype=B;
	BEGIN_DATA_MAP
		ss013In,입력,input;
		begin
			전문가_등록_번호 ,   expt_rgst_no ,   expt_rgst_no,    char    ,                  20;
			종목코드         ,   symbol       ,   symbol      ,    char    ,                  15;
		end
		ss013Out_c,출력공통,output;
		begin
			조회결과         ,   rslt_cls     ,   rslt_cls    ,    char    ,                   1;
			결과메시지       ,   rslt_msg     ,   rslt_msg    ,    char    ,                 100;
			종목코드         ,   symbol       ,   symbol      ,    char    ,                  15;
			결과갯수         ,   rslt_cnt     ,   rslt_cnt    ,    char    ,                   4;
		end
		ss013Out,출력,output,occurs;
		begin
			발생일자         ,   date         ,   date        ,    char    ,                   8;
			발생시간         ,   time         ,   time        ,    char    ,                   6;
			매수가           ,   sig_buy      ,   sig_buy     ,    char    ,                  10;
			매도가           ,   sig_sell     ,   sig_sell    ,    char    ,                  10;
			목표가           ,   sig_target   ,   sig_target  ,    char    ,                  10;
			손절가           ,   sig_sales    ,   sig_sales   ,    char    ,                  10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
