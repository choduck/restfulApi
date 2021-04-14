BEGIN_FUNCTION_MAP
	.Func,(ac126)회원탈퇴처리,ac126,headtype=A;
	BEGIN_DATA_MAP
		ac126In,입력,input;
		begin
			계정ID			, user_id			, user_id		, char , 10;
		end
		ac126Out,출력,output;
		begin
			DUMMY              ,dummy            ,dummy           ,char    ,1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
