BEGIN_FUNCTION_MAP
	.Func,(n0010)전체 종목정보 조회,n0010;
	BEGIN_DATA_MAP
		n0010In1,입력,input;
		begin
			조회구분                 , i_qrydiv             , i_qrydiv             , char   ,  1;
		end
		n0010Out1,출력,output;
		begin
			출력개수                 , out_cnt              , out_cnt              , char   ,  5;
		end
		n0010Out2,출력,output,occurs;
		begin
			거래소ID                 , o_exch_id            , o_exch_id            , char   ,  3;
			종목코드                 , o_symbol             , o_symbol             , char   , 15;
			수신일자                 , o_recv_dt            , o_recv_dt            , char   , 20;
			종목한글명               , o_inst_kor_nm        , o_inst_kor_nm        , char   , 50;
			종목영문명               , o_inst_eng_nm        , o_inst_eng_nm        , char   , 50;
			종목한글약어             , o_inst_kor_abbr      , o_inst_kor_abbr      , char   , 40;
			종목영문약어             , o_inst_eng_abbr      , o_inst_eng_abbr      , char   , 40;
			대상통화코드             , o_trgt_cur_cd        , o_trgt_cur_cd        , char   ,  5;
			결제통화코드             , o_setl_cur_cd        , o_setl_cur_cd        , char   ,  5;
			최소주문수량             , o_min_ord_qty        , o_min_ord_qty        , double , 10;
			주문단위수량             , o_ord_unit_qty       , o_ord_unit_qty       , double , 10;
			거래소상장구분           , o_exch_list_tp       , o_exch_list_tp       , char   ,  1;
			거래소상장일시           , o_exch_list_dtm      , o_exch_list_dtm      , char   , 14;
			거래소상장폐지일시       , o_exch_dlist_dtm     , o_exch_dlist_dtm     , char   , 14;
			대상통화소수점자리수     , o_trgt_dec_digt      , o_trgt_dec_digt      , long   ,  2;
			결제통화소수점자리수     , o_setl_dec_digt      , o_setl_dec_digt      , long   ,  2;
			결제통화소수점표시자리수 , o_trgt_dec_disp_digt , o_trgt_dec_disp_digt , long   ,  2;
			결제통화소수점표시자리수 , o_setl_dec_disp_digt , o_setl_dec_disp_digt , long   ,  2;
		end
		n0010Out3,출력,output;
		begin
			출력개수                 , out_cnt              , out_cnt              , char   ,  5;
		end
		n0010Out4,출력,output,occurs;
		begin
			거래소ID                 , o_exch_id            , o_exch_id            , char   ,  3;
			종목코드                 , o_symbol             , o_symbol             , char   , 15;
			종목한글명               , o_inst_kor_nm        , o_inst_kor_nm        , char   , 50;
			종목영문명               , o_inst_eng_nm        , o_inst_eng_nm        , char   , 50;
			종목한글약어             , o_inst_kor_abbr      , o_inst_kor_abbr      , char   , 40;
			종목영문약어             , o_inst_eng_abbr      , o_inst_eng_abbr      , char   , 40;
			대상통화코드             , o_trgt_cur_cd        , o_trgt_cur_cd        , char   ,  5;
			결제통화코드             , o_setl_cur_cd        , o_setl_cur_cd        , char   ,  5;
			최소주문수량             , o_min_ord_qty        , o_min_ord_qty        , double , 10;
			주문단위수량             , o_ord_unit_qty       , o_ord_unit_qty       , double , 10;
			거래소상장구분           , o_exch_list_tp       , o_exch_list_tp       , char   ,  1;
			거래소상장일시           , o_exch_list_dt       , o_exch_list_dt       , char   , 14;
			거래소상장폐지일시       , o_exch_dlist_dt      , o_exch_dlist_dt      , char   , 14;
			대상통화소수점자리수     , o_trgt_dec_digt      , o_trgt_dec_digt      , long   ,  2;
			결제통화소수점자리수     , o_setl_dec_digt      , o_setl_dec_digt      , long   ,  2;
			결제통화소수점표시자리수 , o_trgt_dec_disp_digt , o_trgt_dec_disp_digt , long   ,  2;
			결제통화소수점표시자리수 , o_setl_dec_disp_digt , o_setl_dec_disp_digt , long   ,  2;
			거래소체결구분           , o_exch_cntr_tp       , o_exch_cntr_tp       , char   ,  1;
			종목상태구분             , o_inst_stat_tp       , o_inst_stat_tp       , char   ,  1;
			마진거래가능구분         , o_mrgn_trd_able_tp   , o_mrgn_trd_able_tp   , char   ,  1;
			Section ID               , o_mt_sect_id         , o_mt_sect_id         , char   , 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
