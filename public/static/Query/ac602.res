BEGIN_FUNCTION_MAP
	.Func,(ac602)잔고이동수신,ac602,headtype=A;
	BEGIN_DATA_MAP
		ac602In_c,입력공통,input;
		begin
			계정ID		, user_id			, user_id			, char  , 10;
			제휴계정ID		, alac_id			, alac_id			, char  , 20;
			요청건수		, req_cnt			, req_cnt           , long	, 5;
		end
		ac602In,입력,input,occurs;
		begin
			화폐코드		, cur_cd			, cur_cd			, char	, 5;
			거래금액		, trd_amt			, trd_amt			, double, 20;
			제휴거래일시	, alac_trd_dtm		, alac_trd_dtm		, char  , 20;
		end
		ac602Out,출력,output;
		begin
			계정ID		, user_id			, user_id			, char  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
