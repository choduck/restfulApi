BEGIN_FUNCTION_MAP
	.Func,(ac213)출납모니터링조회,ac213,headtype=A;
	BEGIN_DATA_MAP
		ac213In,입력,input;
		begin
			요청건수			, req_cnt			, req_cnt           , long	, 5;
		end
		ac213Out_c,출력공통,output;
		begin
			응답건수			, rsp_cnt			, rsp_cnt			, long	, 5;
		end
		ac213Out,출력,output,occurs;
		begin
			모니터링 오류구분		, mnt_err_tp		, mnt_err_tp		, char  , 2;
			대기건수			, wait_cnt			, wait_cnt			, long  , 10;
			오류건수			, err_cnt			, err_cnt			, long  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
