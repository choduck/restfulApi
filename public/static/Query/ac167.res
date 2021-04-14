BEGIN_FUNCTION_MAP
	.Func,(ac167)API 이용 SMS확인,ac167,headtype=A;
	BEGIN_DATA_MAP
		ac167In,입력,input;
		begin
			계정ID			, user_id			, user_id		, char , 10;
			SMS_KIND		, sms_kind			, sms_kind		, char , 2;
			SMS인증번호		, sms_auth_no		, sms_auth_no	, char , 6;
		end
		ac167Out,출력,output;
		begin
			계정ID			, user_id			, user_id		, char , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
