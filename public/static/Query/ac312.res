BEGIN_FUNCTION_MAP
	.Func,(ac312)출납오류재처리,ac312,headtype=A;
	BEGIN_DATA_MAP
		ac312In,입력,input;
		begin
			모니터링오류구분		, mnt_err_tp		, mnt_err_tp		, char  , 2;
			순번				, err_seq			, err_seq			, char  , 30;
		end
		ac312Out,출력,output;
		begin
			순번				, err_seq			, err_seq			, char  , 30;
		end
	END_DATA_MAP
END_FUNCTION_MAP
