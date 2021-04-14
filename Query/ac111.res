BEGIN_FUNCTION_MAP
	.Func,(ac111)로그아웃처리,ac111,headtype=A;
	BEGIN_DATA_MAP
		ac111In,입력,input;
		begin
			계정ID		, user_id		, user_id		, char  , 10;
			세션ID		, sesn_id		, sesn_id		, char	, 50;
		end
		ac111Out,출력,output;
		begin
			계정ID		, user_id		, user_id		, char  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
