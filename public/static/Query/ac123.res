BEGIN_FUNCTION_MAP
	.Func,(ac123)SMS확인문자 발송,ac123,headtype=A;
	BEGIN_DATA_MAP
		ac123In,입력,input;
		begin
			계정ID			, user_id			, user_id			, char , 10;
			ARS인증용핸드폰국가	, ars_mobl_ctry		, ars_mobl_ctry		, char , 10;
			ARS인증용핸드폰번호	, ars_mobl_no		, ars_mobl_no		, char , 30;
		end
		ac123Out,출력,output;
		begin
			계정ID		, user_id			, user_id			, char , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
