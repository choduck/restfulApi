BEGIN_FUNCTION_MAP
	.Head, 업무계공통, A;
	BEGIN_DATA_MAP
		input, 입력, input;
		begin
		계정ID                          , account_id                 , account_id                 , char  ,    10;
        매체구분                        , channel                    , channel                    , char  ,     2;
        공인IP주소                      , pub_ip                     , pub_ip                     , char  ,    16;
        사설IP주소                      , prv_ip                     , prv_ip                     , char  ,    16;
        MAC주소                         , mac_addr                   , mac_addr                   , char  ,    32;
        연속FLAG                        , conti_flag                 , conti_flag                 , char  ,     1;
        연속조회키                      , paging_key                 , paging_key                 , char  ,    80;
        채널영역                        , channel_area               , channel_area               , char  ,    20;
        filler                          , filler                     , filler                     , char  ,    23;
		end
	END_DATA_MAP
END_FUNCTION_MAP
