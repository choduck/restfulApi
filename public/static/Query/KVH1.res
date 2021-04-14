BEGIN_FUNCTION_MAP
    .Feed, (KVH1)KVX 호가잔량, KVH1, key=15, keycnt=1000, bufcnt=1, group=1;
    BEGIN_DATA_MAP
    InBlock,입력,input;
    begin
    종목코드               , symbol               , symbol               , char   ,   15;
    end
    OutBlock,출력,output;
    begin
    종목코드               , symbol               , symbol               , char   ,   15;
    호가시간               , hotime               , hotime               , char   ,   10;
    매도호가1              , ask1                 , ask1                 , double ,   20;
    매수호가1              , bid1                 , bid1                 , double ,   20;
    매도호가 잔량1         , askrest1             , askrest1             , double ,   20;
    매수호가 잔량1         , bidrest1             , bidrest1             , double ,   20;
    매도호가 건수1         , askcnt1              , askcnt1              , long   ,   15;
    매수호가 건수1         , bidcnt1              , bidcnt1              , long   ,   15;
    직전매도대비수량1      , bfrsellcompqty1      , bfrsellcompqty1      , double ,   20;
    직전매수대비수량1      , bfrbuycompqty1       , bfrbuycompqty1       , double ,   20;
    매도호가2              , ask2                 , ask2                 , double ,   20;
    매수호가2              , bid2                 , bid2                 , double ,   20;
    매도호가 잔량2         , askrest2             , askrest2             , double ,   20;
    매수호가 잔량2         , bidrest2             , bidrest2             , double ,   20;
    매도호가 건수2         , askcnt2              , askcnt2              , long   ,   15;
    매수호가 건수2         , bidcnt2              , bidcnt2              , long   ,   15;
    직전매도대비수량2      , bfrsellcompqty2      , bfrsellcompqty2      , double ,   20;
    직전매수대비수량2      , bfrbuycompqty2       , bfrbuycompqty2       , double ,   20;
    매도호가3              , ask3                 , ask3                 , double ,   20;
    매수호가3              , bid3                 , bid3                 , double ,   20;
    매도호가 잔량3         , askrest3             , askrest3             , double ,   20;
    매수호가 잔량3         , bidrest3             , bidrest3             , double ,   20;
    매도호가 건수3         , askcnt3              , askcnt3              , long   ,   15;
    매수호가 건수3         , bidcnt3              , bidcnt3              , long   ,   15;
    직전매도대비수량3      , bfrsellcompqty3      , bfrsellcompqty3      , double ,   20;
    직전매수대비수량3      , bfrbuycompqty3       , bfrbuycompqty3       , double ,   20;
    매도호가4              , ask4                 , ask4                 , double ,   20;
    매수호가4              , bid4                 , bid4                 , double ,   20;
    매도호가 잔량4         , askrest4             , askrest4             , double ,   20;
    매수호가 잔량4         , bidrest4             , bidrest4             , double ,   20;
    매도호가 건수4         , askcnt4              , askcnt4              , long   ,   15;
    매수호가 건수4         , bidcnt4              , bidcnt4              , long   ,   15;
    직전매도대비수량4      , bfrsellcompqty4      , bfrsellcompqty4      , double ,   20;
    직전매수대비수량4      , bfrbuycompqty4       , bfrbuycompqty4       , double ,   20;
    매도호가5              , ask5                 , ask5                 , double ,   20;
    매수호가5              , bid5                 , bid5                 , double ,   20;
    매도호가 잔량5         , askrest5             , askrest5             , double ,   20;
    매수호가 잔량5         , bidrest5             , bidrest5             , double ,   20;
    매도호가 건수5         , askcnt5              , askcnt5              , long   ,   15;
    매수호가 건수5         , bidcnt5              , bidcnt5              , long   ,   15;
    직전매도대비수량5      , bfrsellcompqty5      , bfrsellcompqty5      , double ,   20;
    직전매수대비수량5      , bfrbuycompqty5       , bfrbuycompqty5       , double ,   20;
    매도호가6              , ask6                 , ask6                 , double ,   20;
    매수호가6              , bid6                 , bid6                 , double ,   20;
    매도호가 잔량6         , askrest6             , askrest6             , double ,   20;
    매수호가 잔량6         , bidrest6             , bidrest6             , double ,   20;
    매도호가 건수6         , askcnt6              , askcnt6              , long   ,   15;
    매수호가 건수6         , bidcnt6              , bidcnt6              , long   ,   15;
    직전매도대비수량6      , bfrsellcompqty6      , bfrsellcompqty6      , double ,   20;
    직전매수대비수량6      , bfrbuycompqty6       , bfrbuycompqty6       , double ,   20;
    매도호가7              , ask7                 , ask7                 , double ,   20;
    매수호가7              , bid7                 , bid7                 , double ,   20;
    매도호가 잔량7         , askrest7             , askrest7             , double ,   20;
    매수호가 잔량7         , bidrest7             , bidrest7             , double ,   20;
    매도호가 건수7         , askcnt7              , askcnt7              , long   ,   15;
    매수호가 건수7         , bidcnt7              , bidcnt7              , long   ,   15;
    직전매도대비수량7      , bfrsellcompqty7      , bfrsellcompqty7      , double ,   20;
    직전매수대비수량7      , bfrbuycompqty7       , bfrbuycompqty7       , double ,   20;
    매도호가8              , ask8                 , ask8                 , double ,   20;
    매수호가8              , bid8                 , bid8                 , double ,   20;
    매도호가 잔량8         , askrest8             , askrest8             , double ,   20;
    매수호가 잔량8         , bidrest8             , bidrest8             , double ,   20;
    매도호가 건수8         , askcnt8              , askcnt8              , long   ,   15;
    매수호가 건수8         , bidcnt8              , bidcnt8              , long   ,   15;
    직전매도대비수량8      , bfrsellcompqty8      , bfrsellcompqty8      , double ,   20;
    직전매수대비수량8      , bfrbuycompqty8       , bfrbuycompqty8       , double ,   20;
    매도호가9              , ask9                 , ask9                 , double ,   20;
    매수호가9              , bid9                 , bid9                 , double ,   20;
    매도호가 잔량9         , askrest9             , askrest9             , double ,   20;
    매수호가 잔량9         , bidrest9             , bidrest9             , double ,   20;
    매도호가 건수9         , askcnt9              , askcnt9              , long   ,   15;
    매수호가 건수9         , bidcnt9              , bidcnt9              , long   ,   15;
    직전매도대비수량9      , bfrsellcompqty9      , bfrsellcompqty9      , double ,   20;
    직전매수대비수량9      , bfrbuycompqty9       , bfrbuycompqty9       , double ,   20;
    매도호가10             , ask10                , ask10                , double ,   20;
    매수호가10             , bid10                , bid10                , double ,   20;
    매도호가 잔량10        , askrest10            , askrest10            , double ,   20;
    매수호가 잔량10        , bidrest10            , bidrest10            , double ,   20;
    매도호가 건수10        , askcnt10             , askcnt10             , long   ,   15;
    매수호가 건수10        , bidcnt10             , bidcnt10             , long   ,   15;
    직전매도대비수량10     , bfrsellcompqty10     , bfrsellcompqty10     , double ,   20;
    직전매수대비수량10     , bfrbuycompqty10      , bfrbuycompqty10      , double ,   20;
    10단계호가매도총잔량   , asktotal             , asktotal             , double ,   20;
    10단계호가매수총잔량   , bidtotal             , bidtotal             , double ,   20;
    10단계호가매도총건수   , asktotalcnt          , asktotalcnt          , long   ,   15;
    10단계호가매수총건수   , bidtotalcnt          , bidtotalcnt          , long   ,   15;
    직전매도대비총수량     , bfraskcomptotal      , bfraskcomptotal      , double ,   20;
    직전매수대비총수량     , bfrbidcomptotal      , bfrbidcomptotal      , double ,   20;
    end
    END_DATA_MAP
END_FUNCTION_MAP
