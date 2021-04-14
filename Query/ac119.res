BEGIN_FUNCTION_MAP
	.Func,(ac119)API서비스등록해지,ac119,headtype=A;
	BEGIN_DATA_MAP
		ac119In,입력,input;
		begin
			계정ID				, user_id			, user_id			, char  , 10;
			입력된 비밀번호			, iput_secu_pass	, iput_secu_pass	, char  , 64;
			API서비스신청구분		, api_stat			, api_stat			, char  , 1;
		end
		ac119Out,출력,output;
		begin
			계정ID				, user_id			, user_id			, char  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
