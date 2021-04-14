BEGIN_FUNCTION_MAP
	.Func,(ac504)가상계좌해지,ac504,headtype=A;
	BEGIN_DATA_MAP
		ac504In,입력,input;
		begin
			계정ID			, user_id			, user_id			, char  , 10;
			은행코드			, bank_cd			, bank_cd			, char  , 3;
		end
		ac504Out,출력,output;
		begin
			계정ID			, user_id			, user_id			, char  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
