BEGIN_FUNCTION_MAP
	.Func,(ac117)전화번호 등록,ac117,headtype=A;
	BEGIN_DATA_MAP
		ac117In,입력,input;
		begin
			계정ID			, user_id			, user_id			, char  , 10;
			사용자명			, user_nm			, user_nm			, char	, 50;
			계정전화국가번호		, user_phon_ctry	, user_phon_ctry	, char  , 4;
			계정전화앞번호			, user_phon_1		, user_phon_1		, char  , 4;
			계정전화중간번호		, user_phon_2		, user_phon_2		, char  , 4;
			계정전화뒷번호			, user_phon_3		, user_phon_3		, char  , 4;
			생년월일			, user_brth_day		, user_brth_day		, char  , 8;
			성별				, user_gend			, user_gend			, char  , 1;
			내외국인구분			, user_forn_tp		, user_forn_tp		, char  , 1;
		end
		ac117Out,출력,output;
		begin
			계정ID			, user_id			, user_id			, char  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
