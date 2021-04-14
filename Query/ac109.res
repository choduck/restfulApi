BEGIN_FUNCTION_MAP
	.Func,(ac109)회원탈퇴처리,ac109,headtype=A;
	BEGIN_DATA_MAP
		ac109In,입력,input;
		begin
			계정ID		, user_id		, user_id		, char  , 10;
		end
		ac109Out,출력,output;
		begin
			계정ID		, user_id		, user_id		, char  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
