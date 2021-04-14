BEGIN_FUNCTION_MAP
	.Func,(ac171)API Key 차단&차단해제 메일전송,ac171,headtype=A;
	BEGIN_DATA_MAP
		ac171In,입력,input;
		begin
			계정ID			, user_id			, user_id			, char  , 10;
			알림구분		, noti_tp			, noti_tp		 	, char  , 1;
			Connect_key		, connect_key	   , connect_key		, char  , 32;
			차단/해지일시	 , blck_dtm	       , blck_dtm		    , char  , 14;
		end
		ac171Out,출력,output;
		begin
			계정ID			, user_id			, user_id			, char  , 10;
			알림구분		, noti_tp			, noti_tp			, char  , 1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
