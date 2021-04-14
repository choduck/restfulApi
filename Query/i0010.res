BEGIN_FUNCTION_MAP
	.Func,(i0010)글로벌시세 조회,i0010,headtype=B;
	BEGIN_DATA_MAP
		i0010In1,입력,input;
		begin
			종목건수     ,   symbolcnt  , symbolcnt  , long   ,  5;
		end
		i0010In2,입력,input,occurs;
		begin
			종목코드     ,   symbol     , symbol     , char   , 15;
			주기         ,   cyc        , cyc        , char   ,  3;
			조회건수     ,   qrycnt     , qrycnt     , char   ,  5;
		end
		i0010Out1,출력,output;
		begin
			출력개수     ,   out_cnt    , out_cnt    , char   ,  5;
		end
		i0010Out2,출력,output,occurs;
		begin
			종목코드     ,   symbol     , symbol     , char   , 15;
			현재가       ,   curprc     , curprc     , double , 20;
			등락률       ,   dtupdnrate , dtupdnrate , double ,  6;
		end
		i0010Out3,출력,output;
		begin
			출력개수     ,   out_cnt    , out_cnt    , char   ,  5;
		end
		i0010Out4,출력,output,occurs;
		begin
			종목코드     ,   symbol     , symbol     , char   , 15;
			시가         ,   openprc    , openprc    , double , 20;
			고가         ,   highprc    , highprc    , double , 20;
			저가         ,   lowprc     , lowprc     , double , 20;
			종가         ,   closeprc   , closeprc   , double , 20;
			일자         ,   date       , date       , char   ,  8;
			시간         ,   time       , time       , char   ,  6;
		end
		i0010Out5,출력,output;
		begin
			출력개수     ,   out_cnt    , out_cnt    , char   ,  5;
		end
		i0010Out6,출력,output,occurs;
		begin
			종목코드     ,   symbol     , symbol     , char   , 15;
			거래소명     ,   exkorname  , exkorname  , char   , 50;
			현재가       ,   curprc     , curprc     , double , 20;
			거래량       ,   cumdealqty , cumdealqty , double , 20;
			등락률       ,   dtupdnrate , dtupdnrate , double ,  6;
		end
	END_DATA_MAP
END_FUNCTION_MAP
