BEGIN_FUNCTION_MAP
	.Func,(ac116)신분증등록,ac116,headtype=A;
	BEGIN_DATA_MAP
		ac116In,입력,input;
		begin
			계정ID			, user_id		, user_id		, char  , 10;
			신분증이미지1			, iden_img_1	, iden_img_1	, char  , 102400;
			신분증이미지2			, iden_img_2	, iden_img_2	, char  , 102400;
		end
		ac116Out,출력,output;
		begin
			계정ID			, user_id		, user_id		, char  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
