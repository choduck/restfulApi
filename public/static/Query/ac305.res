BEGIN_FUNCTION_MAP
	.Func,(ac305)-----,ac305,headtype=A;
	BEGIN_DATA_MAP
		ac305In,입력,input;
		begin
			계정메일주소		, user_mail		, user_mail		, char  , 50;
		end
		ac305Out,출력,output;
		begin
			계정메일주소		, user_mail		, user_mail		, char  , 50;
			계정ID		, user_id		, user_id		, char  , 10;
			계정이름		, user_nm		, user_nm		, char  , 50;
			전화번호		, mobl_no		, mobl_no		, char  , 10;
			비밀번호		, user_pass		, user_pass		, char  , 64;
			보안번호		, secu_pass		, secu_pass		, char  , 64;
		end
	END_DATA_MAP
END_FUNCTION_MAP
