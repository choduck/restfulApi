BEGIN_FUNCTION_MAP
    .Func,(f0002)약관 동의 여부 확인/감시중인 신호 리스트 조회,f0002,headtype=B;
    BEGIN_DATA_MAP
        f0002In1,입력,input;
        begin
            계정ID        , id        , id        , char , 10;
        end
        f0002Out1,출력,output;
        begin
            동의여부      , result    , result    , char , 1;
            출력개수      , out_cnt   , out_cnt   , char , 5;
        end
        f0002Out2,출력,output,occurs;
        begin
            종목코드      , code      , code      , char , 15;
			신호번호      , sig_no    , sig_no    , char , 8;
            조건타입      , cond_type , cond_type , char , 4;
            상세조건설정1 , param1    , param1    , char , 16;
            상세조건설정2 , param2    , param2    , char , 16;
            상세조건설정3 , param3    , param3    , char , 16;
            상세조건설정4 , param4    , param4    , char , 16;
            상세조건설정5 , param5    , param5    , char , 16;
        end
    END_DATA_MAP
END_FUNCTION_MAP
