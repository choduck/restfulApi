BEGIN_FUNCTION_MAP
	.Func,(ss011)스마트시그널_전문가선택_목록,ss011,headtype=B;
	BEGIN_DATA_MAP
		ss011In,입력,input;
		begin
			계정ID                , usr_id          ,  usr_id        , char       ,      10;
		end
		ss011Out_c,출력공통,output;
		begin
			조희결과              , rslt_cls        ,  rslt_cls      , char       ,       1;
			결과메시지            , rslt_msg        ,  rslt_msg      , char       ,     100;
			결과갯수              , out_cnt        ,  out_cnt      , char       ,       4;
		end
		ss011Out,출력,output,occurs;
		begin
			전문가_등록_번호      , expt_rgst_no    ,  expt_rgst_no  , char       ,      20;
			전문가_이름           , expt_nm         ,  expt_nm       , char       ,      20;
			전문가_닉네임         , expt_nnm        ,  expt_nnm      , char       ,      40;
			전문가_프로파일_사진  , expt_prf_imge   ,  expt_prf_imge , char       ,  102400;
			전문가_한줄_소개      , expt_sinl_intr  ,  expt_sinl_intr, char       ,      20;
			전문가_한줄_전략      , expt_sinl_strtg ,  expt_sinl_strt, char       ,      20;
			URL                   , expt_url        ,  expt_url      , char       ,     100;
			구독상태여부          , stt_cls_gb      ,  stt_cls_gb    , char       ,       1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
