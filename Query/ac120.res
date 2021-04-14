BEGIN_FUNCTION_MAP
	.Func,(ac120)----,ac120,headtype=A;
	BEGIN_DATA_MAP
		ac120In,입력,input;
		begin
			입력값			, input_value		, input_value		, char  , 50;
		end
		ac120Out,출력,output;
		begin
			단방향암호			, gnrl_pass			, gnrl_pass			, char	, 128;
			PCAPI암호			, pcapi_pass		, pcapi_pass		, char	, 128;
			자체암호			, our_pass			, our_pass			, char	, 128;
		end
	END_DATA_MAP
END_FUNCTION_MAP
