BEGIN_FUNCTION_MAP
.Func,(ac543)빗썸자산리스트조회,ac543,headtype=A;
	BEGIN_DATA_MAP
	ac543In,입력,input;
		begin
			계정ID		, user_id	, user_id	, char	, 10;
			통화코드		, cur_cd	, cur_cd	, char	, 5;
		end
		ac543Out,출력,output;
		begin
			통화코드 		, cur_cd	, cur_cd	, char	, 5;
			빗썸가능수량	, bit_bal	, bit_bal	, double, 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
