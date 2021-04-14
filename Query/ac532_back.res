BEGIN_FUNCTION_MAP
	.Func,(ac532)빗썸으로잔고이동,ac532,headtype=A;
	BEGIN_DATA_MAP
		ac532In,입력,input;
		begin
			처리구분		, proc_tp		, proc_tp		, char	, 1
			계정ID		, user_id		, user_id		, char  , 10;
			화폐코드		, cur_cd		, cur_cd		, char	, 5;
			거래금액		, trd_amt		, trd_amt		, double, 20;
		end
		ac532Out,출력,output;
		begin
			처리건수		, proc_cnt		, proc_cnt		, int   , 5;
		end
	END_DATA_MAP
END_FUNCTION_MAP
