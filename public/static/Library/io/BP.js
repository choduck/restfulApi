


//------------------------------------------------------------------------------------------------------------------
//	SIZE
//------------------------------------------------------------------------------------------------------------------

	var SZ_SIZE_HEADER				= 4;	// 사이즈를 얻어올 수 있는 헤더 영역 사이즈, SZ_SOCK_ETX 포함

	//--------------------------------------------------
	//	XT_SOCK_PACKET
	//--------------------------------------------------
	var SZ_SOCK_STX					= 1;	// 
	var SZ_SOCK_HI					= 1;	// 
	var SZ_SOCK_LO					= 1;	// 
	var SZ_SOCK_ETX					= 1;	//  이 값은 패킷의 맨 뒷 부분에 있다.
	
	//--------------------------------------------------
	//	XT_COMM_HEAD
	//--------------------------------------------------
	var SZ_COMM_FLAG				= 1;	// 
	var SZ_COMM_ID					= 1;	// 
	var SZ_COMM_CMD					= 1;	// 
	
	
	
	//-------------------------------------------------- ------------------------------------------------
	//	XT_MSG_PACKET
	//-------------------------------------------------- ------------------------------------------------
	var SZ_MSG_CODE					= 5;
	var SZ_MSG_MESSAGE				= 130;
	
	
	//-------------------------------------------------- ------------------------------------------------
	//	XT_TR_HEAD
	//-------------------------------------------------- ------------------------------------------------
	var SZ_TR_FLAG					= 1;	// 
	var SZ_TR_TRCODE				= 5;	// 
	var SZ_TR_MEDIA					= 1;	// 
	var SZ_TR_DHEAD_TYPE			= 1;	// 
	var SZ_TR_DHEAD_HI				= 1;	// 
	var SZ_TR_DHEAD_LO				= 1;	// 
	var SZ_TR_FID_OUT				= 1;	//	FID OutData Type 1:Json 2:Xml ' ':struct
	var SZ_TR_SEQCHK				= 5;	//	시퀀스 체크 1 ~ 99999 
	
	//--------------------------------------------------
	//	XT_DATA_HEAD (정보계)
	//--------------------------------------------------
	var SZ_BDH_CONTI_FLAG			= 1;	// 연속 FLAG 
	var SZ_BDH_PAGING_KEY			= 80;	// 연속 조회키 
	var SZ_BDH_SCREEN_NO			= 4;	// 화면 번호
	var SZ_BDH_FILLER				= 115;	// 필러 
	
	//--------------------------------------------------
	//	XT_DATA_HEAD (업무계)
	//--------------------------------------------------
	var SZ_ADH_ACCOUNT_ID			= 10;	// 계정
	var SZ_ADH_CHANNEL				= 2;	// 매체 구분
	var SZ_ADH_PUB_IP				= 16;	// 공인 IP 주소
	var SZ_ADH_PRV_IP				= 16;	// 사설 IP 주소
	var SZ_ADH_MAC_ADDR				= 32;	// MAC 주소
	var SZ_ADH_CONTI_FLAG			= 1;	// 연속 FLAG 
	var SZ_ADH_PAGING_KEY			= 80;	// 연속 조회키 
	var SZ_ADH_FILLER				= 43;	// 필러 

	var SZ_INF_DHEAD				= 200;
	var SZ_ACC_DHEAD				= 200;
	


	//and so on
	
	//var PACKET_CHAIN_SIZE			= 2048;
	var PACKET_CHAIN_SIZE			= 2055; //2048+7



//------------------------------------------------------------------------------------------------------------------
//	OFFSET
//------------------------------------------------------------------------------------------------------------------

	//--------------------------------------------------
	//	XT_SOCK_PACKET
	//--------------------------------------------------
	var OS_SOCK_STX					= 0;
	var OS_SOCK_HI					= OS_SOCK_STX + SZ_SOCK_STX;
	var OS_SOCK_LO					= OS_SOCK_HI + SZ_SOCK_HI;
	
	//--------------------------------------------------
	//	XT_COMM_HEAD
	//--------------------------------------------------
	var OS_COMM_FLAG				= OS_SOCK_LO + SZ_SOCK_LO;
	var OS_COMM_ID					= OS_COMM_FLAG + SZ_COMM_FLAG;
	var OS_COMM_CMD					= OS_COMM_ID + SZ_COMM_ID;
	
	
	
	//-------------------------------------------------- ------------------------------------------------
	//	XT_MSG_PACKET
	//-------------------------------------------------- ------------------------------------------------
	var OS_MSG_CODE					= OS_COMM_CMD + SZ_COMM_CMD;
	var OS_MSG_MESSAGE				= OS_MSG_CODE + SZ_MSG_CODE;
	
	
	//-------------------------------------------------- ------------------------------------------------
	//	XT_TR_HEAD
	//-------------------------------------------------- ------------------------------------------------
	var OS_TR_FLAG					= OS_COMM_CMD + SZ_COMM_CMD;
	var OS_TR_TRCODE				= OS_TR_FLAG + SZ_TR_FLAG;
	var OS_TR_MEDIA					= OS_TR_TRCODE + SZ_TR_TRCODE;
	var OS_TR_DHEAD_TYPE			= OS_TR_MEDIA + SZ_TR_MEDIA;
	var OS_TR_DHEAD_HI				= OS_TR_DHEAD_TYPE + SZ_TR_DHEAD_TYPE;
	var OS_TR_DHEAD_LO				= OS_TR_DHEAD_HI + SZ_TR_DHEAD_HI;

	//var OS_TR_FILLER				= OS_TR_DHEAD_LO + SZ_TR_DHEAD_LO;	//보안 시퀀스 작업으로 아래와 같이 변경됨.
	
	var OS_TR_FID_OUT				= OS_TR_DHEAD_LO + SZ_TR_DHEAD_LO;
	var OS_TR_SEQCHK				= OS_TR_FID_OUT + SZ_TR_FID_OUT;
	
	
	//데이터 헤드 시작 위치
	var OS_TR_DHEAD					= OS_TR_SEQCHK + SZ_TR_SEQCHK;
	
	//--------------------------------------------------
	//	XT_DATA_HEAD (정보계)
	//--------------------------------------------------
	var OS_BDH_CONTI_FLAG			= OS_TR_SEQCHK + SZ_TR_SEQCHK;
	var OS_BDH_PAGING_KEY			= OS_BDH_CONTI_FLAG + SZ_BDH_CONTI_FLAG;
	var OS_BDH_SCREEN_NO			= OS_BDH_PAGING_KEY + SZ_BDH_PAGING_KEY;
	var OS_BDH_FILLER				= OS_BDH_SCREEN_NO + SZ_BDH_SCREEN_NO;
	
	//--------------------------------------------------
	//	XT_DATA_HEAD (업무계)
	//--------------------------------------------------
	var OS_ADH_ACCOUNT_ID			= OS_TR_SEQCHK + SZ_TR_SEQCHK;
	var OS_ADH_CHANNEL				= OS_ADH_ACCOUNT_ID + SZ_ADH_ACCOUNT_ID;
	var OS_ADH_PUB_IP				= OS_ADH_CHANNEL + SZ_ADH_CHANNEL;
	var OS_ADH_PRV_IP				= OS_ADH_PUB_IP + SZ_ADH_PUB_IP;
	var OS_ADH_MAC_ADDR				= OS_ADH_PRV_IP + SZ_ADH_PRV_IP;
	var OS_ADH_CONTI_FLAG			= OS_ADH_MAC_ADDR + SZ_ADH_MAC_ADDR;
	var OS_ADH_PAGING_KEY			= OS_ADH_CONTI_FLAG + SZ_ADH_CONTI_FLAG;
	var OS_ADH_FILLER				= OS_ADH_PAGING_KEY + SZ_ADH_PAGING_KEY;
	
	

/*
var TR_RCV_SIZE_INFO = 
[
	SZ_EYE_CATCH,
	SZ_CMPRS_TCD,
	SZ_ENC_TCD,
	SZ_RQRS_TCD,
	SZ_SYS_LNK_TCD,
	SZ_BIZ_SYS_TCD,
	SZ_BIZ_SYS_SEQ,
	SZ_GUID_CRT,
	SZ_GUID_BP_HN,
	SZ_GUID_BP_PID,
	SZ_GUID_DATE,
	SZ_GUID_TIME,
	SZ_CONN_SRNO,
	SZ_CHNL_CD,
	SZ_TR_GB,
	SZ_SVC_ID,
	SZ_SCRN_NO,
	SZ_OBJECT_ID,
	SZ_OBJECT_IO_VER,
	SZ_SCRN_OPRT_TCD,
	SZ_AC_PWD_SKIP_YN,
	SZ_MEDIA,
	SZ_LANG_CD,
	SZ_USER_TCD,
	SZ_DEPT_ID,
	SZ_USER_ID,
	SZ_RESV_AREA,
	SZ_RTN_CODE,
	SZ_SVC_IO_VER,
	SZ_CONTI_FLAG,
	SZ_MSG_TYPE,
	SZ_MSG_CD,
	SZ_MSG_CN,
	SZ_SRM_NM,
	SZ_LINE_NO,
	SZ_EXT_MSG_LEN,
	SZ_EXT_MSG_CN
];
*/



