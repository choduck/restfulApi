BEGIN_FUNCTION_MAP
	.Func,(tr412)마진레버리지 등록_수정,tr412,headtype=A;
	BEGIN_DATA_MAP
		tr412In,입력,input;
		begin
			처리구분      ,proc_tp      ,proc_tp      ,char    , 1 ;
			적용시작일    ,aply_sta_dt  ,aply_sta_dt  ,char    , 8 ;
			통화코드      ,cur_cd       ,cur_cd       ,char    , 5 ;
			고객등급      ,user_levl    ,user_levl    ,char    , 2;
			개시담보비율  ,open_wrnt_rt ,open_wrnt_rt ,double  , 15;
			유지담보비율  ,keep_wrnt_rt ,keep_wrnt_rt ,double  , 15;
			적용종료일    ,aply_end_dt  ,aply_end_dt  ,char    , 8 ;
		end
		tr412Out,출력,output;
		begin
			DUMMY         ,dummy        ,dummy        ,char    , 1 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
