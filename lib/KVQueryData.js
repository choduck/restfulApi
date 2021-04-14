
/**
 * @author asoocool
 */
var AQuery = require('./AQuery.js');
var afc = require('./afc.js');
var AQueryData = require('./AQueryData.js');

var PACKET_FLAG = 
{
	FIRST:		0x01,
	MID:		0x02,
	LAST:		0x03,
	ENCRYPT:	0x10,
	COMPRESS:	0x20,
	BLOCKING:	0x40,
};

var PACKET_ETX = 0x03;

AQuery.FORMAT = 'res';	//qry, xml, res

//-----------------------------------------------------------------------------------------
//	class KVQueryData
//-----------------------------------------------------------------------------------------

function KVQueryData(aquery)
{
	AQueryData.call(this, aquery);

	this.encFlag = 0x00;
	this.zipFlag = 0x00;

}

afc.extendsClass(KVQueryData, AQueryData);


KVQueryData.prototype.outBlockOccurs = function(block, prevData)
{
	if(block.occurs) 
	{
		//바로 이전 블럭의 out_cnt, rsp_cnt 안에 값이 들어 있음.
		return parseInt(prevData[block.occurs], 10);
	}

	else return 1;
};

KVQueryData.prototype.inBlockOccurs = function(block)
{
	//복수개 이므로 입력하는 시점에 추가하기 위해 지금은 추가하지 않는다.
	if(block.occurs) return 0;

	else return 1;
};

//QueryData to InBlock Buffer
KVQueryData.prototype.inBlockBuffer = function(abuf, offset)
{
	AQueryData.prototype.inBlockBuffer.call(this, abuf, offset);

	//패킷 종료 플래그
	abuf.addByte(PACKET_ETX);
};

// ENCRYPT
KVQueryData.prototype.enableEnc = function(enable)
{
	//웹에서 보안 해제 후 F12로 디버그 테스트 하려는 경우 아래 코드 주석처리할 것
	if(!afc.isEmbedded)
		this.encFlag = enable ? PACKET_FLAG.ENCRYPT : 0x00; 
};

// COMPRESS
KVQueryData.prototype.enableZip = function(enable)
{
	this.zipFlag = enable ? PACKET_FLAG.COMPRESS : 0x00; 
};

module.exports = KVQueryData;