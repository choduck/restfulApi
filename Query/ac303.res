BEGIN_FUNCTION_MAP
	.Func,(ac303)계좌간대체,ac303,headtype=A;
	BEGIN_DATA_MAP
		ac303In,입력,input;
		begin
			계정ID		, user_id			, user_id			, char  	, 10;
			거래금액		, trd_amt			, trd_amt			, double	, 20;
			통화코드		, cur_cd			, cur_cd			, char		, 5;
			출금계좌구분		, widr_act_tp		, widr_act_tp		, char  	, 1;
			입금계좌구분		, depo_act_tp		, depo_act_tp		, char  	, 1;
		end
		ac303Out,출력,output;
		begin
			계정ID		, user_id			, user_id			, char  	, 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
