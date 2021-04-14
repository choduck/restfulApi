BEGIN_FUNCTION_MAP
	.Func,(ac103)자동로그인처리,ac103,headtype=A;
	BEGIN_DATA_MAP
		ac103In,입력,input;
		begin
			계정ID				, user_id			, user_id			, char  , 10;
			세션ID				, sesn_id			, sesn_id			, char	, 50;
			자동로그인키값				, auto_key			, auto_key			, char	, 72;
		end
		ac103Out,출력,output;
		begin
			세션ID				, new_sesn_id		, new_sesn_id		, char	, 50;
			자동로그인키값				, new_auto_key		, new_auto_key		, char	, 72;
		end
	END_DATA_MAP
END_FUNCTION_MAP
