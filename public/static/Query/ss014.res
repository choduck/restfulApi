BEGIN_FUNCTION_MAP
	.Func,(ss014)스마트시그널_전문가선택_상세_실적,ss014,headtype=B;
	BEGIN_DATA_MAP
		ss014In,입력,input;
		begin
			전문가_등록_번호 ,   expt_rgst_no ,   expt_rgst_no,    char    ,                  20;
			종목코드         ,   symbol       ,   symbol      ,    char    ,                  15;
			조회시점         ,   date         ,   date        ,    char    ,                   8;
			조회방향         ,   slt_dir      ,   slt_dir     ,    char    ,                   1;
		end
		ss014Out_c,출력공통,output;
		begin
			조회결과         ,   rslt_cls     ,   rslt_cls    ,    char    ,                   1;
			결과메시지       ,   rslt_msg     ,   rslt_msg    ,    char    ,                 100;
			종목코드         ,   symbol       ,   symbol      ,    char    ,                  15;
			결과갯수         ,   rslt_cnt     ,   rslt_cnt    ,    char    ,                   4;
		end
		ss014Out,출력,output,occurs;
		begin
			일자             ,   date         ,   date        ,    char    ,                   8;
			일별수익률       ,   td_prof      ,   td_prof     ,    char    ,                  10;
			누적수익률       ,   acc_prof     ,   acc_prof    ,    char    ,                  10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
