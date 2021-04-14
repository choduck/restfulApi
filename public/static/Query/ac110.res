BEGIN_FUNCTION_MAP
	.Func,(ac110)로그인처리,ac110,headtype=A;
	BEGIN_DATA_MAP
		ac110In,입력,input;
		begin
			계정메일주소			, user_mail			, user_mail			, char  , 50;
			입력비밀번호			, iput_pass			, iput_pass			, char  , 64;
			입력보안비밀번호		, iput_secu_pass	, iput_secu_pass	, char  , 64;
		end
		ac110Out,출력,output;
		begin
			계정ID				, user_id			, user_id			, char  , 10;
			세션ID				, sesn_id			, sesn_id			, char	, 50;
			자동로그아웃시간	  		, auto_logt_time	, auto_logt_time	, long  , 3;
			자동로그인키값				, auto_key			, auto_key			, char	, 72;
			시그널메이커코드			, adt_svc_cd		, adt_svc_cd		, char	, 5;
			API사용여부				, api_use_tp		, api_use_tp		, char	, 1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
