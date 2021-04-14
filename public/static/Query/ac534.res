BEGIN_FUNCTION_MAP
	.Func,(ac534)빗썸으로잔고이동,ac534,headtype=A;
	BEGIN_DATA_MAP
		ac534In_c,입력공통,input;
		begin
			계정ID		, user_id		, user_id			, char  , 10;
			요청건수		, req_cnt		, req_cnt           , long	, 5;
		end
		ac534In,입력,input,occurs;
		begin
			화폐코드		, cur_cd		, cur_cd			, char	, 5;
			거래금액		, trd_amt		, trd_amt			, double, 20;
		end
		ac534Out_c,출력공통,output;
		begin
			응답건수 		, rsp_cnt		, rsp_cnt           , long	, 5;
		end
		ac534Out,출력,output,occurs;
		begin
			통화코드 		, cur_cd		, cur_cd            , char	, 5;
			PRO가능수량	, pro_bal		, pro_bal           , double, 20;
			빗썸가능수량	, bit_bal		, bit_bal           , double, 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
