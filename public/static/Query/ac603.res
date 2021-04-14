BEGIN_FUNCTION_MAP
	.Func,(ac603)회원탈퇴가능 확인,ac603,headtype=A;
	BEGIN_DATA_MAP
		ac603In,입력,input;
		begin
			계정ID		, user_id		, user_id		, char  , 10;
			제휴계정ID		, alac_id		, alac_id		, char  , 20;
		end
		ac603Out,출력,output;
		begin
			계정ID		, user_id		, user_id		, char  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
