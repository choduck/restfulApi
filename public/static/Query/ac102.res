BEGIN_FUNCTION_MAP
	.Func,(ac102)계정등록확인,ac102,headtype=A;
	BEGIN_DATA_MAP
		ac102In,입력,input;
		begin
			계정ID		, user_id		, user_id		, char  , 10;
			인증OTP값		, auth_otp		, auth_otp		, char  , 6;
		end
		ac102Out,출력,output;
		begin
			계정메일주소		, user_mail			, user_mail			, char  , 50;
		end
	END_DATA_MAP
END_FUNCTION_MAP
