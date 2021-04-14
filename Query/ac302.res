BEGIN_FUNCTION_MAP
	.Func,(ac302)TEST출금계좌인증번호확인,ac302,headtype=A;
	BEGIN_DATA_MAP
		ac302In,입력,input;
		begin
			계정ID		, user_id			, user_id			, char  , 10;
			은행코드		, bank_cd			, bank_cd			, char	, 3;
			출금계좌번호		, acct_no			, acct_no			, char	, 16;
			인증번호		, auth_no			, auth_no			, char	, 8;
		end
		ac302Out,출력,output;
		begin
			계좌인증상태		, acct_st			, acct_st			, char  , 1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
