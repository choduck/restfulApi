function AQueryData(t){this.aquery=t,this.queryObj=null,this.flagObj={},this.contiKey=null,this.headerInfo={},this.isReal=!1}AQueryData.prototype.setHeaderInfo=function(t){for(var e in t)t.hasOwnProperty(e)&&(this.headerInfo[e]=t[e])},AQueryData.prototype.getQueryName=function(){return this.aquery?this.aquery.getName():null},AQueryData.prototype.setQuery=function(t){this.aquery=t},AQueryData.prototype.getQuery=function(){return this.aquery},AQueryData.prototype.enableLazyUpdate=function(){this.isLazyUpdate=!0},AQueryData.prototype.getFlag=function(t){return void 0==t?this.flagObj:this.flagObj[t]},AQueryData.prototype.setFlag=function(t,e){this.flagObj[t]=e},AQueryData.prototype.getContiKey=function(){return this.contiKey},AQueryData.prototype.setContiKey=function(t){this.contiKey=t},AQueryData.prototype.outBlockOccurs=function(t,e){return 1},AQueryData.prototype.inBlockOccurs=function(t){return 1},AQueryData.prototype.outBlockData=function(t,e){this.queryObj||(this.queryObj={}),void 0!=e&&t.setOffset(e);for(var r,u,o,a,n,y,i,s,f=null,c=this,p=["output"],Q=0;Q<p.length;Q++)this.aquery.eachQueryBlock(p[Q],function(e,p){for(r=c.queryObj[e]=[],u=c.outBlockOccurs(p,f),n=p.format.length,o=0;o<u;o++){for(f=new Object,a=0;a<n;a++)(y=p.format[a])[AQuery.ITYPE]==AQuery.STRING?f[y[AQuery.IKEY]]=t.nextString(y[AQuery.ISIZE]):c.dblTostr?((s=t.nextString(y[AQuery.ISIZE]).split("."))[0]=parseInt(s[0],10),s=s.length>1?s[0]+"."+s[1]:s[0].toString(),f[y[AQuery.IKEY]]=s):(i=y[AQuery.IEXP],f[y[AQuery.IKEY]]=i>0?t.nextParseFloat(y[AQuery.ISIZE]).toFixed(i):t.nextParseFloat(y[AQuery.ISIZE]));r.push(f)}})},AQueryData.prototype.inBlockPrepare=function(){this.queryObj={};var t,e,r,u,o,a,n,y=this;this.aquery.eachQueryBlock("input",function(i,s){for(t=y.queryObj[i]=[],e=y.inBlockOccurs(s),o=s.format.length,r=0;r<e;r++){for(a=new Object,u=0;u<o;u++)n=s.format[u],a[n[AQuery.IKEY]]=n[AQuery.IVALUE];t.push(a)}})},AQueryData.prototype.inBlockBuffer=function(t,e){var r,u,o,a,n,y,i,s,f,c,p=this;t.fillBuffer(0,e),t.setOffset(e),this.aquery.eachQueryBlock("input",function(e,Q){for(r=p.queryObj[e],a=Q.format.length,u=0;u<r.length;u++)for(obj=r[u],o=0;o<a;o++)n=Q.format[o],f=n[AQuery.IKEY],c=n[AQuery.ISIZE],y=obj[f],(s=n[AQuery.ITYPE])==AQuery.STRING?t.addString(c,y):s==AQuery.BINARY?t.addBinary(c,y):(i=n[AQuery.IEXP])>0?t.addNumString(c,parseFloat(y).toFixed(i)):t.addNumString(c,y)})},AQueryData.prototype.getQueryObj=function(){return this.queryObj},AQueryData.prototype.setQueryObj=function(t){this.queryObj=t},AQueryData.prototype.getBlockData=function(t){return this.queryObj[t]},AQueryData.prototype.searchBlockData=function(t){var e=new Object;t||(t="Block");for(var r in this.queryObj)r.indexOf(t)>-1&&(e[r]=this.queryObj[r]);return e},AQueryData.prototype.printQueryData=function(){return afc.log("["+this.getQueryName()+"] AQueryData : =================================="),afc.log(this.queryObj)};