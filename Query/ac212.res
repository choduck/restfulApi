BEGIN_FUNCTION_MAP
	.Func,(ac212)전화번호중복체크,ac212,headtype=A;
	BEGIN_DATA_MAP
		ac212In,입력,input;
		begin
			계정전화국가번호	, user_phon_ctry	, user_phon_ctry	, char  , 4;
			계정전화앞번호		, user_phon_1		, user_phon_1		, char  , 4;
			계정전화중간번호	, user_phon_2		, user_phon_2		, char  , 4;
			계정전화뒷번호		, user_phon_3		, user_phon_3		, char  , 4;
		end
		ac212Out,출력,output;
		begin
			계정아이디		, user_id			, user_id			, char  , 1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
