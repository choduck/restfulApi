

/*
this.data = 
{
	'001':
	{
		
	},
	
	'002':
	{
	
	}
};

*/


function KVMaster()
{
	// stock item info
	this.itemInfo = null;
	
	this.TrgtCurCdDigitObj = null;//대상화폐소수점자리수 개체
	
	// trade currency info
	this.tcInfo = null;
	
	this.exKrwInfo	= null;
	this.exchList	= null;
	this.orderUnit	= new Array();
	
	this.callback = null;
	
	this.isSuccess	= true;
	
	this.mapMaxLenBelowDigitPerSetlCd = null;
}

//-------------------------------------------------------------------------------------------------------


//초성검색 관련
KVMaster.chosung = [ 'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ];
KVMaster.choHash = null;

KVMaster.getChosung = function(code)
{
	code -= 44032;
	if(code>-1 && code<11172) return KVMaster.chosung[Math.floor(code/588)].charCodeAt(0);
};

KVMaster.makeHash = function()
{
    var hash = {'0': 0}, arr = KVMaster.chosung;
	
    for (var i = 0; i<arr.length; i++) 
	{
		if(arr[i]) hash[arr[i].charCodeAt(0)] = i;
    }
	
	KVMaster.choHash = hash;
};

KVMaster.makeHash();

//---------------------------------------------------------------------------------------------------------


KVMaster.prototype.loadMaster = function(callback)
{
	this.itemInfo = {};
	this.tcInfo = {  };
	this.exKrwList = {};
	this.exchList = {};
	
	this.callback = callback;
	
	AIndicator.beginOltp();


	var thisObj	= this;
	CallbackDone.waitAll(function()
	{
		thisObj.loadDoneManage(thisObj.isSuccess);
	});
	
	this.sendN0003();
};


KVMaster.prototype.ReloadMaster = function(callback)
{
	this.callback = callback;
	
	AIndicator.beginOltp();

	var thisObj	= this;
	CallbackDone.waitAll(function()
	{
		thisObj.loadDoneManage(thisObj.isSuccess);
	});
	
	this.sendN0003();
}

KVMaster.prototype.loadDoneManage = function(success)
{
	var thisObj = this;//20180319 이문수 종목상장 처리 >>

	AIndicator.endOltp();
	
	theApp.totalItemDataList = new HistoryInfo();

	// 20180518 최성필 BTC, ETH 마켓 추가 >>
//	var exchObj = this.getItemListAsExch( 'KRW');
	var exchObj = this.getItemListAsExch();
	// 20180518 최성필 BTC, ETH 마켓 추가 <<

	//20180319 이문수 종목상장 처리 >>
	/*
	for( var nIndex in exchObj)
	{
		theApp.totalItemDataList.set( this.getItemInfo( nIndex), true);
	}
	*/
	for( var code in exchObj) 
	{
		var ItemInfo = this.getItemInfo(code);
		
		theApp.totalItemDataList.set( ItemInfo, true);
		
		//마스터 종목의 장운영 상태변경 실시간신호 등록		
		this.RegisterRealKVS3(code);				
	}	
	
	//마스터 종목추가 실시간신호 등록	
	this.RegisterRealKVS4();	
	//20180319 이문수 종목상장 처리 <<
	
	// 20180329 최성필 종목상장 처리 >>
	theApp.m_bReloadMasterData = true;
	// 20180329 최성필 종목상장 처리 <<
	
	if(this.callback)
		this.callback(success);
};

KVMaster.prototype.RegisterRealKVS3 = function(code)
{
	{
		var thisObj = this;
	
		var ItemInfo = this.getItemInfo(code);
		
		//마스터 종목의 장운영 상태변경 실시간신호 등록
		theApp.qm.registerReal('KVS3','symbol', [code], [theApp.rootContainer], null, function(queryData)
		{
			if(queryData)
			{
				var block = queryData.getBlockData('OutBlock1')[0];

				var symbol = block['symbol'];
				//symbol = 'KR001XRP__KRW__';////test
				var ItemMaster = thisObj.getItem(symbol);
				if(ItemMaster)
				{
					var strMarketOperType = block['marketopertype'];
					var strTrandDate = block['trandate'];
					var strTrandTime = block['trantime'];

					var bUpdate =false;

					//신규상장
					if(strMarketOperType == "31" && ItemMaster.o_exch_list_tp == "0")
					{
						ItemMaster.o_exch_list_tp = "1";
						bUpdate = true;
					}	
					//상장폐지
					else if(strMarketOperType == "34" && ItemMaster.o_exch_list_tp == "1")
					{
						ItemMaster.o_exch_list_tp = "0";
						bUpdate = true;
					}	

					if(bUpdate)
					{
						var korSymbolName = ItemMaster.o_inst_kor_abbr.split('/');
						var s = korSymbolName[0] + "(" + ItemMaster.o_trgt_cur_cd + ")";
						theApp.MasterItemUpdateTimerOn(s);
					}
				}
			}
		});
	}
}

KVMaster.prototype.RegisterRealKVS3s = function()
{
	// 20180518 최성필 BTC, ETH 마켓 추가 >>
//	var exchObj = this.getItemListAsExch( 'KRW');
	var exchObj = this.getItemListAsExch();
	// 20180518 최성필 BTC, ETH 마켓 추가 <<

	for( var code in exchObj) 
	{
		//마스터 종목의 장운영 상태변경 실시간신호 등록		
		this.RegisterRealKVS3(code);
	}
}

KVMaster.prototype.UnRegisterRealKVS3s = function()
{
	// 20180518 최성필 BTC, ETH 마켓 추가 >>
//	var exchObj = this.getItemListAsExch( 'KRW');
	var exchObj = this.getItemListAsExch();
	// 20180518 최성필 BTC, ETH 마켓 추가 <<

	var thisObj = this;

	for( var code in exchObj) 
	{
		//마스터 종목의 장운영 상태변경 실시간신호 등록
		theApp.qm.unregisterReal('KVS3', [code], [theApp.rootContainer]);
	}
}

KVMaster.prototype.RegisterRealKVS4 = function()
{
	var thisObj = this;
	//마스터 종목추가 실시간신호 등록	
	var sInput = '0';
	
	theApp.qm.registerReal('KVS4','qry_div', [sInput], [theApp.rootContainer], null, function(queryData)
	{
		var self = thisObj;
		
		var strPageId = theApp.menuInfo.navi.getActivePage().getId();
		
		var strLoginPageId = "6800", strPwdPageId = "6820";
		if(afc.isMobile)
		{
			strLoginPageId = "6300";
			strPwdPageId = "6320";
		}
		
		if(strPageId == strLoginPageId)
			return;//skip //로그인 성공하면 마스터 재조회 및 실시간 등록 발생하므로 두번 동작시킬 필요없으며 조회과정에서 로그인되면 서버 끊기므로 이상동작 할 수 있음
			
		else if(strPageId == strPwdPageId)//보안비번입력창에서는 상장알림창 띄우지 않고 바로 재조회발생
		{
			AIndicator.beginOltp();
			var bReload = true;
			self.sendN0001(bReload);				
		}
		else
		{
			theApp.OpenNewListingAddNoticeDlg( function(result){
			
			// 20180329 최성필 종목상장 처리 >>
			theApp.m_bReloadMasterData = result;
			// 20180329 최성필 종목상장 처리 <<
			
				if(result == 1)
				{
					AIndicator.beginOltp();
					var bReload = true;
					self.sendN0001(bReload);				
				}			
			});	
		}
	});	
}

KVMaster.prototype.UnRegisterRealKVS4 = function()
{
	var sInput = '0';
	theApp.qm.unregisterReal('KVS4', [sInput], [theApp.rootContainer]);	
}


// 거래소 코드 정보 조회
KVMaster.prototype.sendN0003 = function()
{
	CallbackDone.begin();
	var thisObj = this;
	
	theApp.qm.sendProcessByName('n0003', null, null,
	
	function(queryData)
	{
		var block = queryData.getBlockData('InBlock1')[0];
		// 조회구분
		block['i_qrydiv'] = 0;
		
		//queryData.printQueryData();
	},
	function(queryData)
	{
		if (queryData)
		{
			thisObj.exchList = {};
			
			var blockData = queryData.getBlockData('OutBlock2'), dataObj;
			
			for (var i=0; i<blockData.length; i++)
			{
				dataObj = blockData[i];
				thisObj.exchList[dataObj['o_exch_id']] = {name : dataObj['o_exch_kor_nm']};
			}
			thisObj.sendN0001();
			thisObj.sendN0007();
			thisObj.sendN0005();
			thisObj.sendTr401();
		}
		else thisObj.isSuccess	= false;
		
		CallbackDone.end();
	});
};

//종목 정보 조회
KVMaster.prototype.sendN0001 = function(bReload)//function KVMaster:sendN0001()//20180319 이문수 종목상장 처리 >>
{
	CallbackDone.begin();
	var thisObj = this;
	
	theApp.qm.sendProcessByName('n0010', null, null,
	
	function(queryData)
	{
		var block = queryData.getBlockData('InBlock1')[0];
		
		// 조회구분, 전체조회 0
		block['i_qrydiv'] = 0;
		
		//queryData.printQueryData();
	},
	
	function(queryData)
	{
		if (queryData)
		{		
			thisObj.itemInfo = {};//20180319 이문수 종목상장 처리 >>
			
			thisObj.TrgtCurCdDigitObj = {};//대상화폐소수점자리 개체 초기화
			
			var blockData = queryData.getBlockData('OutBlock2'), dataObj,
				exchObj = [];//thisObj.itemInfo['001'];

			for (var i=0; i<blockData.length; ++i)
			{
				dataObj = blockData[i];

				if (dataObj.o_symbol && dataObj.o_symbol.length == 15)
				{	
					dataObj.exch =	 thisObj.exchList[dataObj.o_symbol.substring(2,5)].name;
					thisObj.itemInfo[dataObj.o_symbol] = dataObj;
					
					//대상화폐소수점자리 개체 화폐별 자리수 셋팅
					if(thisObj.TrgtCurCdDigitObj[dataObj.o_trgt_cur_cd] == undefined)
						thisObj.TrgtCurCdDigitObj[dataObj.o_trgt_cur_cd] = dataObj.o_trgt_dec_digt;
				}
			}

			console.log('n0001 OutBlock2 : %o', blockData)
			console.log('KVMaster.itemInfo : %o', thisObj.itemInfo);

		//20180319 이문수 종목상장 처리 >>					
			if(bReload)
			{
				//실시간 등록 해제
				thisObj.UnRegisterRealKVS3s();
					
				//추가된 비상장종목까지 모두 다시 실시간 등록
				thisObj.RegisterRealKVS3s();				
				
				thisObj.sendN0007(bReload);
			}
		}
		else
		{
			if(bReload)
			{
				AIndicator.endOltp();
				theApp.currentRefresh();
			}
			thisObj.isSuccess	= false;
		//20180319 이문수 종목상장 처리 <<
		}
		
		CallbackDone.end();
	});
};

// 대상 통화코드 리스트 조회
KVMaster.prototype.sendN0007 = function(bReload)//function KVMaster:sendN0007()//20180319 이문수 종목상장 처리 >>
{
	CallbackDone.begin();
	var thisObj = this;
	
	theApp.qm.sendProcessByName('n0007', null, null,
	
	function(queryData)
	{
		var block = queryData.getBlockData('InBlock1')[0];
		// 조회구분
		block['qrydiv'] = 0;
		
		//queryData.printQueryData();
	},
	function(queryData)
	{
		if (queryData)
		{		
			thisObj.tcInfo = {};//20180319 이문수 종목상장 처리 >>
			
			var blockData = queryData.getBlockData('OutBlock2'), dataObj;
			
			for (var i=0; i<blockData.length; i++)
			{
				dataObj = blockData[i];
				thisObj.tcInfo[dataObj.tradcurrcode] = dataObj.cur_kor_nm;
			}
			
			//load success
			//thisObj.loadDoneManage(true);
		//20180319 이문수 종목상장 처리 >>
			if(bReload)
				thisObj.sendN0005( null, bReload);
		}
		else 
		{
			if(bReload)
			{
				AIndicator.endOltp();
				theApp.currentRefresh();
			}	
			thisObj.isSuccess	= false;
		//20180319 이문수 종목상장 처리 <<
		}
		
		CallbackDone.end();
	});
};

KVMaster.prototype.getTradeCurrencies = function()
{
	return this.tcInfo;
};

KVMaster.prototype.getExKrwList = function(callback) {
	this.sendN0005(callback);
};

// 원화고시환율 리스트 조회
KVMaster.prototype.sendN0005 = function(callback, bReload)//function KVMaster:sendN0005(callback)////20180319 이문수 종목상장 처리 >>
{
	CallbackDone.begin();
	var thisObj = this;
	
	theApp.qm.sendProcessByName('n0005', null, null,
		function(queryData)
		{
			var block = queryData.getBlockData('InBlock1')[0];
			// 조회구분, 전체조회 0
			block['qrydiv'] = 0;

// 			queryData.printQueryData();
		},
		function(queryData)
		{
			if (queryData)
			{
				thisObj.exKrwList	= {};
				var block = queryData.getBlockData('OutBlock2');
				
				for (var i = 0, item; item = block[i]; i++) {
					thisObj.exKrwList[item.currcode] = item;
				};
				
				if(callback)callback(thisObj.exKrwList);
			}
			//20180319 이문수 종목상장 처리 >>
			else 
			{
				thisObj.isSuccess	= false;
			}
			
			if(bReload)
			{
				// 20180329 최성필 종목상장 처리 >>
				theApp.m_bReloadMasterData = true;
				
				theApp.totalItemDataList = new HistoryInfo();

				// 20180518 최성필 BTC, ETH 마켓 추가 >>
//				var exchObj = thisObj.getItemListAsExch( 'KRW');
				var exchObj = thisObj.getItemListAsExch();
				// 20180518 최성필 BTC, ETH 마켓 추가 <<				
				
				for( var code in exchObj)
				{
					var ItemInfo = thisObj.getItemInfo(code);
					
					theApp.totalItemDataList.set( ItemInfo, true);
				}
				// 20180329 최성필 종목상장 처리 <<
				
				AIndicator.endOltp();
				theApp.currentRefresh( true);
			}
			//20180319 이문수 종목상장 처리 <<

		CallbackDone.end();
		});
};

KVMaster.prototype.getDefaultItemInfo = function()
{
	var item, tmp;
	for(var key in this.itemInfo)
	{
		item = this.itemInfo[key];
		// 20180503 최성필 상장종목인 경우만 DefaultItem으로 셋팅되도록 수정 >>
//		if(item.o_exch_list_tp)
		if( item.o_exch_list_tp == '1')
		// 20180503 최성필 상장종목인 경우만 DefaultItem으로 셋팅되도록 수정 <<
		{
			if(!tmp) tmp = item;
			if(item.o_setl_cur_cd == 'KRW')
			{
				return this.getItemInfo(key);	
			}
		}
	}
	
	return tmp;
};

KVMaster.prototype.getItemInfo = function(itemCode, exch)
{
	var ret = this.getItem(itemCode);
	if(ret) ret = [itemCode, this.getItemKrName(itemCode) + ' : ' + this.getItemValue(itemCode, 'o_inst_eng_abbr')];
	return ret;
};

KVMaster.prototype.getItem = function(itemCode, exch)
{
	/*
	if(!exch) exch = '001';

	var exchObj = this.itemInfo[exch];
	if(exchObj) return exchObj[itemCode];
	*/
	return this.itemInfo[itemCode];
};

//대상화폐소수점자리수
KVMaster.prototype.getDigitByTrgtCurCd = function(TrgtCurCd)
{
	if(this.TrgtCurCdDigitObj[TrgtCurCd])
		return this.TrgtCurCdDigitObj[TrgtCurCd];
	return 8;
};

KVMaster.prototype.getItemValue = function(itemCode, valueKey, exch)
{
	var info = this.getItem(itemCode, exch);
	if(info) 
		return info[valueKey];
	return null;
};

KVMaster.prototype.getItemKrName = function(itemCode, exch)
{
	var strName = this.getItemValue(itemCode, 'o_inst_kor_nm', exch);
	if(strName)
	{
		var strNameArray = strName.split('/');
		return strNameArray[0];
	}
	return null;
};

KVMaster.prototype.getItemEnName = function(itemCode, exch)
{
	var strName = this.getItemValue(itemCode, 'o_inst_eng_nm', exch);
	if(strName)
	{
		var strNameArray = strName.split('/');
		return strNameArray[0];
	}
	return null;
};

KVMaster.prototype.searchItem = function(srchTxt, exch)
{
	if(!exch) exch = '001';
	
	var cmprTxt, exchObj = this.itemInfo, info, arr, result = [];
	
	srchTxt = srchTxt.toLowerCase();
	
	//p 는 종목코드
	for(var p in exchObj)
	{
		info = exchObj[p];
		if(typeof info == 'string') continue;
		cmprTxt = info['o_inst_kor_nm'];
			
		//종목명 비교
		if(!srchTxt || this.compareText(srchTxt, cmprTxt.toLowerCase()) || info['o_inst_eng_abbr'].toLowerCase().indexOf(srchTxt)>-1)
		{
			arr = [p, cmprTxt];
			
			//차후 특정 조건으로 정렬해야 할 경우 값을 셋팅한다.
			//arr.sortKey = info[''];
			
			result.push(info);
		}
	}
	
	return this.sortArr(result);
	//return result;
};

KVMaster.prototype.searchItemInfo = function(srchTxt, exceptionExch, exch)
{
	if(!exch) exch = '001';
	
	var cmprTxt, exchObj = this.itemInfo, info, arr, result = [];
	
	srchTxt = srchTxt.toLowerCase();
	
	//p 는 종목코드
	for(var p in exchObj)
	{
		info = exchObj[p];
		if(typeof info == 'string') continue;
		cmprTxt = info['o_inst_kor_nm'];
			
		//종목명 비교
		if(!srchTxt || this.compareText(srchTxt, cmprTxt.toLowerCase()) || info['o_inst_eng_abbr'].toLowerCase().indexOf(srchTxt)>-1)
		{
			// exceptionExch외 종목들은 보여지지 않게 처리함
			if( exceptionExch)
			{
				if( !p.match( exceptionExch))
				{
					continue;
				}
			}
			
			arr = this.getItemInfo(p, exch);
			
			//차후 특정 조건으로 정렬해야 할 경우 값을 셋팅한다.
			//arr.sortKey = info[''];
			
			result.push(arr);
		}
	}
	
	return this.sortArr(result);
	//return result;
};

KVMaster.prototype.sortArr = function(arr)
{
	return arr;
	
	/*
	function compareFunc(a, b)
	{
		return a.sortKey-b.sortKey;
	}
	*/
	
	function compareFunc(a, b)
	{
		if(a.sortKey<b.sortKey) return -1;
		if(a.sortKey>b.sortKey) return 1;
		
		return 0;
	}
	
	
	return arr.sort(compareFunc);
};

KVMaster.prototype.compareText = function(srchTxt, cmprTxt)
{
	var code, code2;
	for(var i=0; i<srchTxt.length; i++)
	{
		if(i>=cmprTxt.length) return false;
		else
		{
			code = srchTxt.charCodeAt(i);
			code2 = cmprTxt.charCodeAt(i);
			
			if(KVMaster.choHash[code]!=undefined)
			{
				if(code!=KVMaster.getChosung(code2)) return false;
			}
			else if(code!=code2) return false;
		}
	}
	
	return true;
};

KVMaster.prototype.getItemList = function()
{
	return this.itemInfo;
};

KVMaster.prototype.getSymbolName = function(symbol)
{
	return this.itemInfo[symbol].o_inst_kor_nm;
};

KVMaster.prototype.sendTr401 = function()
{
	CallbackDone.begin();
	var thisObj = this;
	
	theApp.qm.sendProcessByName('tr401', null, null,
		function(queryData)
		{
			var block = queryData.getBlockData('InBlock1')[0];
			//전체조회 0
			block['req_cnt'] = 0;
		},
		function(queryData)
		{
			thisObj.mapMaxLenBelowDigitPerSetlCd = {};
			if (queryData)
			{
				thisObj.orderUnit.length = 0;
				
				var block = queryData.getBlockData('OutBlock2');
				for(var key in block)
				{					
					block[key].prc_LenBelowDigit = NumberUtil.getLenBelowDigit(block[key].prc_unit);
					if((thisObj.mapMaxLenBelowDigitPerSetlCd[block[key].setl_cur_cd] == undefined) ||
					   (thisObj.mapMaxLenBelowDigitPerSetlCd[block[key].setl_cur_cd] < block[key].prc_LenBelowDigit))
						thisObj.mapMaxLenBelowDigitPerSetlCd[block[key].setl_cur_cd] = block[key].prc_LenBelowDigit;
						
					thisObj.orderUnit.push(block[key]);
				}
			}
			else thisObj.isSuccess	= false;
			
			
		CallbackDone.end();
	});
};

// 20180311 최성필 종목코드 선택 및 히스토리 선택 시, 거래소 맞는 전체 종목 리스트가 나오도록 수정 >>
KVMaster.prototype.getItemListAsExch = function(exch)
{
	exchObj = this.itemInfo;

	var arrItemList = {};
	for(var nIndex in exchObj)
	{
		var item = exchObj[ nIndex];
		if( exch != null)
		{
			if( item.o_setl_cur_cd == exch)
			{
				arrItemList[ nIndex] = item;
			}
		}
		else
		{
			arrItemList[ nIndex] = item;
		}
	}
	
	return arrItemList;
};
// 20180311 최성필 종목코드 선택 및 히스토리 선택 시, 거래소 맞는 전체 종목 리스트가 나오도록 수정 <<


//20180504 이문수 대상코인코드의 코인명
KVMaster.prototype.getTargetCurCdName = function(strTargetCurCd)
{
	for(var key in this.itemInfo)
	{
		var item = this.itemInfo[key];

		if( item.o_trgt_cur_cd == strTargetCurCd)
		{
			var strNames = item.o_inst_kor_nm.split('/');
			return strNames[0];
		}
	}
	return "";
}

//20180515 이문수 금일상장종목 존재하거나 비상장종목 존재하는 경우를 검색하는 기능추가 >>
//비상장종목 존재할 경우 비상장종목리스트 리턴
//NoOpenItemArray : 종목정보를 담을 배열
KVMaster.prototype.getNoOpenItemArray = function(NoOpenItemArray)
{
	for(var key in this.itemInfo)
	{
		var item = this.itemInfo[key];
		if( item.o_exch_list_tp == "0" )//비상장인 경우
		{
			NoOpenItemArray[NoOpenItemArray.length] = item;
		}
	}
	return NoOpenItemArray.length;
}

//특정날짜에 상장한 종목을 어레이로 추출해주는 함수
//strSelectDate : 특정날짜(20180515)
//SelectDateOpenItemArray : 종목정보를 담을 배열
KVMaster.prototype.getSelectOpenItemArray = function(strSelectDate, SelectDateOpenItemArray)
{
	if(strSelectDate.length < 8)
		return 0;

	for(var key in this.itemInfo)
	{
		var item = this.itemInfo[key];
		
		var strItemDate = "" + item.o_exch_list_dtm;
		if(strItemDate.length < 8)
			continue;

		if(strSelectDate == strItemDate.substr(0, 8))
		{
			SelectDateOpenItemArray[SelectDateOpenItemArray.length] = item;
		}		
	}
	return SelectDateOpenItemArray.length;
}
//20180515 이문수 금일상장종목 존재하거나 비상장종목 존재하는 경우를 검색하는 기능추가 <<

// 20180518 최성필 BTC, ETH 마켓 추가 >>
// 종목코드
KVMaster.prototype.getSymbolInfo = function(curCd)
{
	var strSymbolName = (curCd + '_____').substring(0, 5);
	var strSymbol_Full =  'KR001' + strSymbolName + 'KRW__';
	var strSymbol = this.getItemKrName( strSymbol_Full);
	if( strSymbol)
		return strSymbol_Full;

	strSymbol_Full =  'KR001' + strSymbolName + 'BTC__';
	strSymbol = this.getItemKrName( strSymbol_Full);
	if( strSymbol)
		return strSymbol_Full;

	strSymbol_Full =  'KR001' + strSymbolName + 'ETH__';
	strSymbol = this.getItemKrName( strSymbol_Full);
	if( strSymbol)
		return strSymbol_Full;

	return null;
};
// 20180518 최성필 BTC, ETH 마켓 추가 <<