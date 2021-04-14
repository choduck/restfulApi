BEGIN_FUNCTION_MAP
	.Func,(ac601)회원가입확정수신,ac601,headtype=A;
	BEGIN_DATA_MAP
		ac601In,입력,input;
		begin
			제휴구분		, alac_tp		, alac_tp		, char  , 2;
			제휴계정ID		, alac_uid		, alac_uid		, char  , 50;
			계정메일주소	, user_mail		, user_mail		, char  , 50;
			계정비밀번호	, user_pass		, user_pass		, char	, 64;
		end
		ac601Out,출력,output;
		begin
			계정ID		, user_id		, user_id		, char  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
