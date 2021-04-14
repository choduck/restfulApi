BEGIN_FUNCTION_MAP
	.Func,(ac406)출금한도조회,ac406,headtype=A;
	BEGIN_DATA_MAP
		ac406In,입력,input;
		begin
			계정ID		, user_id			, user_id			, char  	, 10;
		  	통화코드 		, cur_cd			, cur_cd			, char  	, 5;
		end
		ac406Out,출력,output;
		begin
			일출금한도	   	, day_limt			, day_limt			, double	, 20;
			일회출금한도		, once_limt			, once_limt			, double	, 20;
			최소출금한도		, min_limt			, min_limt			, double  	, 20;
			일출금한도잔량		, day_limt_bal		, day_limt_bal		, double	, 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
