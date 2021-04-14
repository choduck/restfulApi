BEGIN_FUNCTION_MAP
    .Func,(ac134)회원가입 인증확인,ac134,headtype=A;
    BEGIN_DATA_MAP
        ac134In,입력,input;
        begin
            계정ID           , user_id         , user_id          , char  , 10;
            인증OTP값        , auth_otp        , auth_otp         , char  , 6;
        end
        ac134Out,출력,output;
        begin
            계정ID              , user_id       , user_id         , char  , 10;
            계정메일주소        , user_mail     , user_mail       , char  , 50;
        end
    END_DATA_MAP
END_FUNCTION_MAP