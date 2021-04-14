BEGIN_FUNCTION_MAP
	.Func,(ac106)자동로그아웃시간설정,ac106,headtype=A;
	BEGIN_DATA_MAP
		ac106In,입력,input;
		begin
			계정ID		, user_id			, user_id			, char  , 10;
			자동로그아웃시간	, auto_logt_time	, auto_logt_time	, long  , 3;
		end
		ac106Out,출력,output;
		begin
			계정ID		, user_id			, user_id			, char  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
