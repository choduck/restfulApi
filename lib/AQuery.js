// var jsdom = require('jsdom'); 
// var window = jsdom.jsdom().createWindow(); 
// var $ = require('jquery')(window);
// var $ = require('jquery')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const $ = require('jquery')(window);
/**
 * @author asoocool
 */


/*
this.query = 
{
	"meta":
	{
	},
	
	"name": "obcpp_logn_101a",
	"queryType": ".STRT" or .SFID or .BFID
	"pattern": 1,//"단순조회"
	"mids":[1],
	
	"input":
	{
		"InBlock1":
		{
			//"type": "input",
			"format":
			[
				//설명,필드키,FID,custom,데이터형,사이즈,지수
				[단축코드,D1단축코드,16013,,string,16,0],
				...
			]
		},
		
		...
	},
	
	"output":
	{
		"OutBlock1":
		{
			//"type": "output",
			"format":
			[
				//설명,필드키,FID,custom,데이터형,사이즈,지수
	    		[현재가,D1현재가,15001,,ULONG,4,-2], 
				...
			]
		},
		
		...
	}
};

*/

function AQuery()
{
	this.query = null;
	
	//쿼리와 연결된 컴포넌트
	this.queryComps = {};
}

//-------------------------------------------------------------
//	static area
//

AQuery.FORMAT = 'res';	//qry, xml, res



// [ 단축코드, D1단축코드, 16013, 105, STRING, 16, 0 ],
AQuery.IDESC = 0;
AQuery.IKEY = 1;
AQuery.IFID = 2;
AQuery.IVALUE = 3;
AQuery.ITYPE = 4;
AQuery.ISIZE = 5;
AQuery.IEXP = 6;


//데이터 타입 문자열을 숫자 상수로 지정
//ABuffer 의 getType 의 파라미터로 넣기 위해
AQuery.BINARY = -2;
AQuery.STRING = -1;
AQuery.UNSIGNED = 1;
AQuery.SIGNED = 0;

//로드된 쿼리 풀
AQuery.queryMap = {};
AQuery.getQuery = function(qryName) { 
	console.log(AQuery.queryMap[qryName]);
	return AQuery.queryMap[qryName]; };
AQuery.setQuery = function(qryName, aquery) { AQuery.queryMap[qryName] = aquery; };

//AQuery.queryCallbacks = {};


AQuery.getSafeQuery = function(qryName)
{
	console.log('qryName = ', qryName);
	var aquery = AQuery.getQuery(qryName);
	
	//쿼리맵에 없으면 로드
	if(!aquery)
	{
		aquery = new AQuery();
		
		
		aquery.loadQuery(qryName+'.'+AQuery.FORMAT, function(success)
		//aquery.loadQuery('Query/'+qryName+'.'+AQuery.FORMAT, function(success)
		{
			console.log('aquery.loadQuery================>');
			
			//if(!success) alert('load fail : Query/'+qryName+'.'+AQuery.FORMAT);
			
			if(success) AQuery.setQuery(qryName, aquery);
			else 
			{
				//console.log('load fail! : Query/'+qryName+'.'+AQuery.FORMAT);
				aquery = null;
			}
		});
	}
	
	return aquery;
};


/*
0 번째 자리에 name 셋팅, mid 값이 1부터 시작하므로
AQuery.fidInfoMap = 
{
	'16013':
	[
		'D1단축코드', ['SHORT',4,-2],,,,,,,['STRING',6,0] --> mid 개수만큼
	]
};
*/

//--------------------------------------------------------------

AQuery.prototype.loadQuery = function(url, callback)
{
	var thisObj = this;
	console.log(url);

	
	var fs = require('fs');
		
	var result = fs.readFileSync('C:\\project\\working\\wsmw (4) (5)\\Query\\' + url, 'utf8');
	//var result = fs.readFileSync('C:\\project\\working\\wsmw (4)\\Query\\i0004.res', 'utf8');

	if(result) 
	{
		//console.log('result = ', result);
		thisObj.query = AQuery.parseQuery(result);
		if(callback) callback.call(thisObj, true);
	}
	else if(callback) {
		callback.call(thisObj, false);
	}else{
	}

	
	
	// fs.readFile('C:\\project\\working\\wsmw (4)\\Query\\i0004.res', 'utf8', function(err, result){
		
	// 	console.log('fs.readFile====>');
	// 	//console.log(result);
	
	// 	if(result) 
	// 	{
	// 		//console.log('result = ', result);
	// 		console.log('--------------------------');
	// 		thisObj.query = AQuery.parseQuery(result);
	// 		console.log('--------------------------');
			
	// 		if(callback) callback.call(thisObj, true);
	// 	}
	// 	else if(callback) {
	// 		console.log('callabck');
	// 		callback.call(thisObj, false);
	// 	}else{
	// 		console.log('test');
	// 	}

	
	// });
	
	// $.ajax(
    // {
    // 	//async:false, url: `http://localhost:4789/${url}`, dataType: 'text',
	// 	type:'post', url: `http://localhost:4789/${url}`, dataType: 'text',

	// 	success: function(result)
    //     {
			
	// 		console.log(result);
			
	// 		if(result) 
	// 		{
	// 			console.log('result = ', result);
	// 			thisObj.query = AQuery.parseQuery(result);
    //     		if(callback) callback.call(thisObj, true);
	// 		}
	// 		else if(callback) {
	// 			console.log('callabck');
	// 			callback.call(thisObj, false);
	// 		}else{
	// 			console.log('test');
	// 		}
		    
		
	// 	},
        
    //     error: function()
    //     {
	// 		console.log('error');
    //     	if(callback) callback.call(thisObj, false);
    //     }
	// });
	
};

AQuery.parseQuery = function(strQuery)
{
	try
	{
		
		//console.log('222222222222222222');
		
		var func = AQuery['parse_'+AQuery.FORMAT];
		
		//console.log('111111111');

		if(func) return func.call(this, strQuery);
		else alert('There is no parse function : parse_' + AQuery.FORMAT);
	}
	catch(err) 
	{
		console.log('AQuery.parseQuery : ' + err.message);
		console.log(strQuery);	
	}

	return null;
};


//-----------------------------
//	strQuery qry format

AQuery.parse_qry = function(strQuery)
{
	return JSON.parse(strQuery);
};

//-----------------------------
//	strQuery res format
AQuery.parse_res = function(strQuery)
{
	var block, lines = strQuery.split(/\r?\n+/g), line, info, area, fmtArr, arr, inCnt = 0, outCnt = 0, tmp,
		data = {}, startStrArr = [
			'BEGIN_FUNCTION_MAP',
			'BEGIN_DATA_MAP',
			'begin',
			'end',
			'END_DATA_MAP',
			'END_FUNCTION_MAP'
		];
		
	var mode, i, j, k, tmp;
	for(i=0; i<lines.length; i++)
	{
		line = $.trim(lines[i]);
		
		tmp = startStrArr.indexOf(line);
		if(tmp > -1)
		{
			mode = tmp;
			continue;
		}
		
		info = line.split(';')[0].split(',');
		
		for(k=0; k<info.length; k++)
			info[k] = $.trim(info[k]);
		
		//BEGIN_FUNCTION_MAP
		if(mode == 0)
		{
			//----------------------------------------------------
			//	.Func, (i0001)현재가조회TR, i0001, headtype=B;
			
			data.queryType = info[0];
			//data.meta = info;
			data.name = info[2];
			
			//존재하는 경우만 셋팅
			for(j=3; j<info.length; j++)
			{
				tmp = info[j].split('=');
				data[tmp[0]] = tmp[1];
			}
		}
		
		// before begin
		else if(mode == 1 || mode == 3)
		{
			//----------------------------------------------------
			//	info --> i0001Out1,출력,output,occurs;
			
			if(!data[info[2]]) area = data[info[2]] = {};
			
			if(info[2]=='input') block = area['InBlock'+(++inCnt)] = {};
			else if(info[2]=='output') block = area['OutBlock'+(++outCnt)] = {};
			
			fmtArr = block['format'] = [];
			
			//occurs 정보 저장
			if(info[3])
			{
				if(data['headtype']=='A') block['occurs'] = 'rsp_cnt';
				else block['occurs'] = 'out_cnt';
			
				//block['occurs'] = true;

				//tmp = info[3].split('=');
				//if(tmp[1] > 1) block[tmp[0]] = tmp[1];
			}
		}
		
		//begin
		else if(mode == 2)
		{
			//설명,필드키,FID,custom,데이터형,사이즈,지수
			tmp = info[4].split('.');
			arr = [ info[0], info[1], null, null, info[3]=='char'?AQuery.STRING:AQuery.SIGNED, parseInt(tmp[0], 10), tmp[1]?parseInt(tmp[1], 10):0 ];
			fmtArr.push(arr);
		}
	}
	return data;
};

//strQuery is xxx.xml file
//상단 query 포맷 참조
AQuery.parse_xml = function(strQuery)
{
	var parser = new DOMParser();
	var xmlQuery = parser.parseFromString(strQuery, "text/xml");

//	try{
	var $queryXml = $(xmlQuery).find("resource"),
		blockName, data = {}, attr, i, j, k, l,
		$inOutXml, area, $formatXml, block, blockName, blockIndex, isStart, prevFieldName;
	var resourceObj = { 'resourceType': 'queryType', 'physicalName': 'name', 'logicalName': 'meta', },
		inoutArr = [ 'physicalName', 'logicalName', 'resourceGroup', 'resourceVersion', 'renewalDate' ],
		fieldArr = [ 'logicalName', 'physicalName', '', '', 'fieldType', 'length', 'decimal', 'desc', 'metaGroup' ];
		//설명,필드키,FID,custom,데이터형,사이즈,지수		
	
	// resourceType, physicalName, logicalName, resourceGroup, resourceVersion, renewalDate
	for(i=0; i<$queryXml[0].attributes.length; i++)
	{
		attr = $queryXml[0].attributes[i];
		if(resourceObj[attr.nodeName]) data[resourceObj[attr.nodeName]] = attr.nodeValue;
		else data[attr.nodeName] = attr.nodeValue;
	}
	for(i=0; i<$queryXml.children().length; i++)
	{
		$inOutXml = $($queryXml.children()[i]);
		area = data[$inOutXml[0].tagName] = {};
		blockName = $inOutXml[0].tagName=='input'?'InBlock':'OutBlock';
		blockIndex = 1;
		isStart = true;
		
		for(j=0; j<$inOutXml.children().length; j++)
		{
			$formatXml = $($inOutXml.children()[j]);
			
			if(!area[blockName + blockIndex])
				block = area[blockName + blockIndex] = { "format": [] };
			
			// input 또는 output 의 자식노드가 structure 인 경우
			if($formatXml[0].tagName == 'structure')
			{
				if(!isStart)
				{
					blockIndex++;
					block = area[blockName + blockIndex] = { "format": [] };
				}
				
				// structure 속성값 세팅
				// physicalName, logicalName, occurs, occursRef, includeStructureName
				for(k=0; k<$formatXml[0].attributes.length; k++)
				{
					attr = $formatXml[0].attributes[k];
					block[attr.nodeName] = attr.nodeValue;
				}
				
				// attr변수를 임시로 사용
				if(block.occursRef)
				{
					attr = block.occursRef.split('.');
					for(var key in area)
					{
						if(area[key]['physicalName'] == attr[0])
						{
							block.occursRef = key + '.' + attr[1];
							break;
						}
					}
				}
				
				// occurs가 2 이상이고 occursRef가 정해지지 않은 경우 바로 위의 항목으로 연결한다.
				if(block.occurs > 1 && !block.occursRef)
					block.occursRef = blockName + (blockIndex-1) + '.' + prevFieldName;
				
				for(k=0; k<$formatXml.children().length; k++)
					block['format'].push(formatFunc($($formatXml.children()[k])));
			}
			// input 또는 output 의 자식노드가 field 인 경우
			else
			{
				if($formatXml.attr(fieldArr[AQuery.IKEY]).indexOf('grid_cnt') > -1)
				{
					if(!isStart)
					{
						blockIndex++;
						block = area[blockName + blockIndex] = { "format": [] };
					}
				}
				
				block['format'].push(formatFunc($formatXml));
			}
		}
		
	}
	
	function formatFunc(fmtXml)
	{
		isStart = false;
		var arr = [];
		
		prevFieldName = fmtXml.attr(fieldArr[AQuery.IKEY]);
		
		//[설명,필드키,FID,custom,데이터형,사이즈,지수,상세설명,필드그룹]
		for(l=0; l<fieldArr.length; l++)
		{
			if(l == AQuery.ITYPE)
			{
				if(fmtXml.attr(fieldArr[l]) == 'char') arr.push(AQuery.STRING);
				else arr.push(AQuery.SIGNED);
			}
			else
			{
				if(l == AQuery.ISIZE || l == AQuery.IEXP) arr.push(parseInt(fmtXml.attr(fieldArr[l]), 10));
				else arr.push(fmtXml.attr(fieldArr[l])?fmtXml.attr(fieldArr[l]):'');
			}
		}
		// 상세설명, 필드그룹 정보가 없었을 때 사용했던 로직
		//[설명,필드키,FID,custom,데이터형,사이즈,지수,상세설명,필드그룹]
		//for(l=0; l<fmtXml.attributes.length; l++)
		//{
		//	attr = fmtXml.attributes[l];
// 			if(fieldArr.indexOf(attr.nodeName) < 0)
// 				arr.push(attr.nodeValue);
// 		}
		return arr;
	}
	return data;
	//}catch(e){alert(e);}
};

AQuery.prototype.getTypeIndex = function(mid)
{
	if(mid==AQuery.REP_MARKET) return AQuery.ITYPE;
	
	var mids = this.getValue('mids');
	
	for(var i=0; i<mids.length; i++)
	{
		if(mids[i]==mid) return AQuery.ITYPE + (3 * i);
	}
	
	var log = afc.log(mid + ' : 존재하지 않는 타입입니다. 임시로 첫번째값으로 처리합니다. (mid 한정 요망)');
	if(log) alert(log);
	
	return AQuery.ITYPE;
};


AQuery.prototype.getName = function() { return this.query.name; };
AQuery.prototype.getMeta = function() { return this.query.meta; };
AQuery.prototype.getQueryType = function() { return this.query.queryType; };
AQuery.prototype.getTrType = function() { return this.query.trType; };
AQuery.prototype.getIoVer = function() { return this.query.resourceVersion; };

AQuery.prototype.getValue = function(key) { return this.query[key]; };

AQuery.prototype.getQueryBlock = function(type, blockName)
{
	return this.query[type][blockName];
};

//type is input/output/nextflag, null is both
AQuery.prototype.eachQueryBlock = function(type, callback)
{
	var blocks = this.query[type];
	
	for(var name in blocks)
       	callback.call(this, name, blocks[name]);
};

AQuery.prototype.addQueryComp = function(containerId, type, acomp)
{
	var compArray = this.queryComps[containerId];
	if(!compArray) 
	{
		compArray = this.queryComps[containerId] = { 'input':[], 'output':[] };
	}
	
	compArray[type].push(acomp);
};

AQuery.prototype.removeQueryComp = function(containerId, type, acomp)
{
	var compArray = this.queryComps[containerId];
	if(!compArray) return;
	
	var typeArr = compArray[type];
	for(var i=0; i<typeArr.length; i++)
	{
		if(typeArr[i]===acomp)
		{
			typeArr.splice(i, 1);
			return;
		}
	}
};

AQuery.prototype.getQueryComps = function(containerId, type)
{
	var comps = this.queryComps[containerId];
	if(comps) return comps[type];
	else return null;
};

/*
AQuery.prototype.hasQueryDataKey = function(type, blockName, queryData)
{
	var block = this.getQueryBlock(type, blockName);
	var key, len = block.format.length;
	var blockData = queryData.getBlockData(blockName)[0];
	
	for(var i=0; i<len; i++)
	{
		key = block.format[i][AQuery.IKEY];
		if(blockData[key]) return true;
	}
	
	return false;
};
*/

//!! 주의 !!
//이 함수는 자신이 사용하는 fid key 가 있는지만을 체크한다.
//자신과 관계없는 fid 가 다수 있어도 자신과 관계 있는 fid 가 하나라도 있으면 true 를 리턴한다.
AQuery.prototype.hasQueryDataKey = function(queryData)
{
	var block = this.getQueryBlock('output', 'OutBlock1');
	var key, len = block.format.length;
	var blockData = queryData.getBlockData('OutBlock1')[0];
	
	for(var i=0; i<len; i++)
	{
		key = block.format[i][AQuery.IKEY];
		if(blockData[key]!=undefined) return true;
	}
	
	return false;
};

module.exports = AQuery;