BEGIN_FUNCTION_MAP
	.Func,(ac502)가상계좌발급,ac502,headtype=A;
	BEGIN_DATA_MAP
		ac502In,입력,input;
		begin
			계정ID			, user_id			, user_id			, char  , 10;
			은행코드			, bank_cd			, bank_cd			, char  , 3;
		end
		ac502Out,출력,output;
		begin
			은행명 				, bank_nm			, bank_nm			, char  , 20;
			가상계좌번호			, acct_no			, acct_no			, char  , 16;
			예금주명			, cmf_nm			, cmf_nm			, char  , 30;
		end
	END_DATA_MAP
END_FUNCTION_MAP
