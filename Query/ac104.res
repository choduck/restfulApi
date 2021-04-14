BEGIN_FUNCTION_MAP
	.Func,(ac104)알림정보 변경,ac104,headtype=A;
	BEGIN_DATA_MAP
		ac104In,입력,input;
		begin
			계정ID			, user_id			, user_id			, char  , 10;
			알림종류			, noti_kind			, noti_kind			, char	, 2;
			메일알림설정	    	, mail_tp	        , mail_tp	        , char  , 1;
			SMS알림설정			, sms_tp		    , sms_tp		    , char  , 1;
			PUSH알림설정   		, push_tp		    , push_tp		    , char  , 1;
			스마트OS			, mobl_os	    	, mobl_os		    , char  , 1;
			스마트UID   		, mobl_uid		    , mobl_uid		    , char  , 160;
		end
		ac104Out,출력,output;
		begin
			계정ID			, user_id			, user_id			, char  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
