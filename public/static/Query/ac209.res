BEGIN_FUNCTION_MAP
	.Func,(ac209)계정정보조회,ac209,headtype=A;
	BEGIN_DATA_MAP
		ac209In,입력,input;
		begin
			계정ID			, user_id			, user_id			, char  , 10;
		end
		ac209Out,출력,output;
		begin
			ARS국가번호		, ars_mobl_crty		, ars_mobl_crty		, char  , 10;
			ARS핸드폰번호		, ars_mobl_no		, ars_mobl_no		, char	, 30;
		end
	END_DATA_MAP
END_FUNCTION_MAP
