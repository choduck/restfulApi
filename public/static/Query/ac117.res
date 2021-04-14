BEGIN_FUNCTION_MAP
	.Func,(ac117)휴대폰 등록,ac117,headtype=A;
	BEGIN_DATA_MAP
		ac117In,입력,input;
		begin
			계정ID			, user_id			, user_id			, char  , 10;
			ARS인증용핸드폰국가	, ars_mobl_ctry		, ars_mobl_ctry		, char  , 10;
			ARS인증용핸드폰번호	, ars_mobl_no		, ars_mobl_no		, char  , 30;
			인증OTP값			, sms_auth_no		, sms_auth_no		, char  , 6;
		end
		ac117Out,출력,output;
		begin
			계정ID			, user_id			, user_id			, char  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
