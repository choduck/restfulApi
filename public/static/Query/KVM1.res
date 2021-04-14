BEGIN_FUNCTION_MAP
    .Feed, (KVM1)KVM1 24시간 변동량, KVM1, key=15, keycnt=1000, bufcnt=1, group=1;
    BEGIN_DATA_MAP
    InBlock,입력,input;
    begin
    	종목코드             ,   symbol                ,   symbol              ,   char         ,            15;
    end
    OutBlock,출력,output;
    begin
    	종목코드             ,   symbol                ,   symbol              ,   char         ,            15;
        조회일자             ,   qry_date              ,   qry_date            ,   char         ,             8;
        조회시간             ,   qry_time              ,   qry_time            ,   char         ,             6;
        30분전시가           ,   openprc_30            ,   openprc_30          ,   double       ,            20;
        30분전고가           ,   highprc_30            ,   highprc_30          ,   double       ,            20;
        30분전저가           ,   lowprc_30             ,   lowprc_30           ,   double       ,            20;
        30분전종가           ,   curprc_30             ,   curprc_30           ,   double       ,            20;
        30분전등락율         ,   updnrate_30           ,   updnrate_30         ,   double       ,            20;
        30분전거래량         ,   cumdealqty_30         ,   cumdealqty_30       ,   double       ,            20;
        30분전거래대금       ,   cumdealcost_30        ,   cumdealcost_30      ,   long         ,            20;
        60분전시가           ,   openprc_60            ,   openprc_60          ,   double       ,            20;
        60분전고가           ,   highprc_60            ,   highprc_60          ,   double       ,            20;
        60분전저가           ,   lowprc_60             ,   lowprc_60           ,   double       ,            20;
        60분전종가           ,   curprc_60             ,   curprc_60           ,   double       ,            20;
        60분전등락율         ,   updnrate_60           ,   updnrate_60         ,   double       ,            20;
        60분전거래량         ,   cumdealqty_60         ,   cumdealqty_60       ,   double       ,            20;
        60분전거래대금       ,   cumdealcost_60        ,   cumdealcost_60      ,   long         ,            20;
        720분전시가          ,   openprc_720           ,   openprc_720         ,   double       ,            20;
        720분전고가          ,   highprc_720           ,   highprc_720         ,   double       ,            20;
        720분전저가          ,   lowprc_720            ,   lowprc_720          ,   double       ,            20;
        720분전종가          ,   curprc_720            ,   curprc_720          ,   double       ,            20;
        720분전등락율        ,   updnrate_720          ,   updnrate_720        ,   double       ,            20;
        720분전거래량        ,   cumdealqty_720        ,   cumdealqty_720      ,   double       ,            20;
        720분전거래대금      ,   cumdealcost_720       ,   cumdealcost_720     ,   long         ,            20;
        1440분전시가         ,   openprc_1440          ,   openprc_1440        ,   double       ,            20;
        1440분전고가         ,   highprc_1440          ,   highprc_1440        ,   double       ,            20;
        1440분전저가         ,   lowprc_1440           ,   lowprc_1440         ,   double       ,            20;
        1440분전종가         ,   curprc_1440           ,   curprc_1440         ,   double       ,            20;
        1440분전등락율       ,   updnrate_1440         ,   updnrate_1440       ,   double       ,            20;
        1440분전거래량       ,   cumdealqty_1440       ,   cumdealqty_1440     ,   double       ,            20;
        1440분전거래대금     ,   cumdealcost_1440      ,   cumdealcost_1440    ,   long         ,            20;
        당일시가             ,   openprc               ,   openprc             ,   double       ,            20;
        당일고가             ,   highprc               ,   highprc             ,   double       ,            20;
        당일저가             ,   lowprc                ,   lowprc              ,   double       ,            20;
        당일종가             ,   curprc                ,   curprc              ,   double       ,            20;
        당일등락율           ,   updnrate              ,   updnrate            ,   double       ,            20;
        당일거래량           ,   cumdealqty            ,   cumdealqty          ,   double       ,            20;
        당일거래대금         ,   cumdealcost           ,   cumdealcost         ,   long         ,            20;
    end
    END_DATA_MAP
END_FUNCTION_MAP
