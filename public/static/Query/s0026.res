BEGIN_FUNCTION_MAP
    .Func,(s0026)가상화폐 신규주문설정 전체조건 삭제,s0026,headtype=B;
    BEGIN_DATA_MAP
        s0026InBlock,입력,input;
        begin
			USER ID              ,    user_id     ,    user_id        ,      char   , 10;
			사용자구분           ,    mbr_ccd     ,    mbr_ccd        ,      char   ,  2;
			매체구분             ,    md_cd       ,    md_cd          ,      char   ,  3;
        end
        s0026OutBlock,출력,output;
        begin
			USER ID              ,    user_id     ,    user_id        ,      char   , 10;
			매체구분             ,    md_cd       ,    md_cd          ,      char   ,  3;
			처리결과구분         ,    rslt_clsf   ,    rslt_clsf      ,      char   ,  4;
        end
    END_DATA_MAP
END_FUNCTION_MAP
