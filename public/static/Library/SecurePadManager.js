/**
 * @author hjh
 */
//----------------------------------------------------------------------------------------------------
//보안키패드
//----------------------------------------------------------------------------------------------------

var SecurePadManager = {};

SecurePadManager.callbackFunc = null;
SecurePadManager.padWorkDone = function(code, data, len)
{
	SecurePadManager.callbackFunc(code, data, len);
	SecurePadManager.resetCallback()
};

SecurePadManager.callBackCheck = function(callback)
{
	if(SecurePadManager.callbackFunc) return false;
		
	SecurePadManager.callbackFunc = callback;
	return true;
};

SecurePadManager.resetCallback = function()
{
	SecurePadManager.callbackFunc = null;
};

//--------------------------------------------------------------------------------

//	패드 띄우기

//	@function getDeviceId(Object option, Function);

/*  option = 
	{
		title: '비밀번호 입력', 	//키패드 타이틀
		padType: 'char', 	//키패드 타입('char'/'num'/'popup') * 현재팝업으로 통일되어 num+popup은 같은 숫자팝업 키패드이고 char는 문자팝업 키패드로 변경되었습니다.
		returnType: 1,		//텍스트 표시형태(0:평문, 1:암호화값)  1의 경우엔 (길이, 암호화값) 형식으로 데이터가 옴
		maxLength: 20,			//max 길이
		minLength: 4,			//min 길이
		genKey: null         //generateKey
	}
*/ 
//	callback(int code, String data);

SecurePadManager.openPad = function( option, callback)
{
		
	if(!afc.isIos) theApp.offLifeCycle = true;
	if(SecurePadManager.callBackCheck(callback))
	{
		var unikeyAir = theApp.qm.netIo.unikeyAIR;
		if(option.genKey == undefined) option.genKey = null;
		else option.genKey = unikeyAir.genPassKey();
		var wnd = new AWindow('PopUpKeyPadWin');
		wnd.open('Source/PopUpKeyPadWin.lay', null, 0, 0, '100%', '100%');	
				
		cordova.exec(function(result){
			if(option.padType == "char")
			{
				if(result.state == "ing") 
				{
					callback(true, null, result.data);
					return;
				}
				else if(result.state == "complete") 
				{
					if(result.data.length > 0)
					{
						var str = result.data.split(',');
						callback(true, str[1], str[0]);
					}
					
				}
				else if(result.state == "cancle") callback(true, null, 0);
			}
			else
			{
				if(result.state == "ing") 
				{
					callback(true, null, result.data); 
					return;
				}
				else if(result.state == "complete") 
				{
					if(result.data.length > 0)
					{
						var str = result.data.split(',');
						callback(true, str[1], str[0]);
					}
				}
				else if(result.state == "cancle") callback(true, null, 0);
			}
			
			//back btn
			if(wnd && !wnd.isEnd)
			{
				wnd.isEnd = true;
				wnd.close(0);
			}
			SecurePadManager.resetCallback();
			
		}, null, "SecurePadPlugin", "openPad", [option]);
	}
};

SecurePadManager.closePopupPad = function()
{
	cordova.exec(null, null, "SecurePadPlugin", "closePopupPad", null);
};

SecurePadManager.getDeviceUUID = function(callback)
{
	cordova.exec(callback, null, "SecurePadPlugin", "getDeviceUUID", null);
	
};