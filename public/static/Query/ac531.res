BEGIN_FUNCTION_MAP
.Func,(ac531)자산이동잔고조회,ac531,headtype=A;
	BEGIN_DATA_MAP
	ac531In,입력,input;
	begin
		계정ID      		 	, user_id       , user_id           , char  	, 10;
		요청건수          		, req_cnt       , req_cnt           , long		, 5;
	end
		ac531Out_c,출력공통,output;
		begin
			응답건수 			, rsp_cnt		, rsp_cnt           , long		, 5;
		end
		ac531Out,출력,output,occurs;
		begin
			통화코드 			, cur_cd		, cur_cd            , char		, 5;
			일반총잔고			, gen_bal		, gen_bal           , double	, 20;
			이동가능금액 		, gen_mov		, gen_mov			, double	, 20;
			자산이동횟수		, mv_cnt		, mv_cnt            , int 		, 5;
		end
	END_DATA_MAP
END_FUNCTION_MAP
