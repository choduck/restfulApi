BEGIN_FUNCTION_MAP
	.Func,(i0003)일별조회,i0003,headtype=B;
	BEGIN_DATA_MAP
		i0003In1,입력,input;
		begin
			종목코드       , symbol         , symbol         , char   , 15;
			입력개수       , in_cnt         , in_cnt         , char   ,  5;
		end
		i0003Out1,출력,output;
		begin
			출력개수       , out_cnt        , out_cnt        , char   ,  5;
		end
		i0003Out2,출력,output,occurs;
		begin
			종목코드       , symbol         , symbol         , char   , 15;
			일자           , date           , date           , char   ,  8;
			시가           , openprc        , openprc        , double , 20;
			고가           , highprc        , highprc        , double , 20;
			저가           , lowprc         , lowprc         , double , 20;
			종가           , closeprc       , closeprc       , double , 20;
			전일대비구분   , diffdiv        , diffdiv        , char   ,  1;
			전일대비       , diff           , diff           , double , 20;
			등락률         , updnrate       , updnrate       , double ,  6;
			매도누적체결량 , sellcumexecqty , sellcumexecqty , double , 20;
			매수누적체결량 , buycumexecqty  , buycumexecqty  , double , 20;
			누적거래량     , cumdealqty     , cumdealqty     , double , 20;
			누적거래대금   , cumdealcost    , cumdealcost    , double , 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
