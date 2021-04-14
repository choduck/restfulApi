BEGIN_FUNCTION_MAP
    .Func,(ac137)인증이메일 발송,ac137,headtype=A;
    BEGIN_DATA_MAP
        ac137In,입력,input;
        begin
            계정ID            , user_id         , user_id          , char  , 10;
            메일발송타입      , auth_otp        , auth_otp         , char  , 2;
            재발송여부        , resnd_tp        , resnd_tp         , char  , 1;
        end
        ac137Out,출력,output;
        begin
            계정ID            , user_id         , user_id          , char  , 10;
        end
    END_DATA_MAP
END_FUNCTION_MAP