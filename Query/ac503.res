BEGIN_FUNCTION_MAP
	.Func,(ac503)출금이체,ac503,headtype=A;
	BEGIN_DATA_MAP
		ac503In,입력,input;
		begin
			계정ID	, user_id			, user_id			, char  	, 10;
			모계좌은행코드	, mbank_cd			, mbank_cd			, char		, 3;
			입금은행코드	, bank_cd			, bank_cd			, char		, 3;
			입금계좌번호	, acct_no			, acct_no			, char		, 16;
			출금액		, trd_amt			, trd_amt			, double	, 20;
			수수료		, fee				, fee				, double	, 20;
		end
		ac503Out,출력,output;
		begin
			예금주명	, cmf_nm			, cmf_nm			, char  	, 30;
		end
	END_DATA_MAP
END_FUNCTION_MAP
