BEGIN_FUNCTION_MAP
	.Func,(i0011)원화고시환율 조회,i0011,headtype=B;
	BEGIN_DATA_MAP
		i0011In1,입력,input;
		begin
			통화코드   , currcode   , currcode   , char   ,  5;
		end
		i0011Out1,출력,output;
		begin
			출력개수   , out_cnt    , out_cnt    , char   ,  5;
		end
		i0011Out2,출력,output;
		begin
			통화코드   , currcode   , currcode   , char   ,  5;
			고시시간   , notitime   , notitime   , char   ,  6;
			회차       , cnt        , cnt        , char   ,  4;
			매매기준율 , trdbssrate , trdbssrate , double , 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
