window.Modernizr=function(e,n,t){function r(e){h.cssText=e}function a(e,n){return typeof e===n}function i(e,n){return!!~(""+e).indexOf(n)}function s(e,n){for(var r in e){var a=e[r];if(!i(a,"-")&&h[a]!==t)return"pfx"!=n||a}return!1}function o(e,n,r){for(var i in e){var s=n[e[i]];if(s!==t)return!1===r?e[i]:a(s,"function")?s.bind(r||n):s}return!1}function u(e,n,t){var r=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+y.join(r+" ")+r).split(" ");return a(n,"string")||a(n,"undefined")?s(i,n):(i=(e+" "+v.join(r+" ")+r).split(" "),o(i,n,t))}var f,c,p={},l=n.documentElement,m="modernizr",d=n.createElement(m),h=d.style,x=" -webkit- -moz- -o- -ms- ".split(" "),g="Webkit Moz O ms",y=g.split(" "),v=g.toLowerCase().split(" "),O={},b=[],I=b.slice,k=function(e,t,r,a){var i,s,o,u,f=n.createElement("div"),c=n.body,p=c||n.createElement("body");if(parseInt(r,10))for(;r--;)o=n.createElement("div"),o.id=a?a[r]:m+(r+1),f.appendChild(o);return i=["&#173;",'<style id="s',m,'">',e,"</style>"].join(""),f.id=m,(c?f:p).innerHTML+=i,p.appendChild(f),c||(p.style.background="",p.style.overflow="hidden",u=l.style.overflow,l.style.overflow="hidden",l.appendChild(p)),s=t(f,e),c?f.parentNode.removeChild(f):(p.parentNode.removeChild(p),l.style.overflow=u),!!s},w={}.hasOwnProperty;c=a(w,"undefined")||a(w.call,"undefined")?function(e,n){return n in e&&a(e.constructor.prototype[n],"undefined")}:function(e,n){return w.call(e,n)},Function.prototype.bind||(Function.prototype.bind=function(e){var n=this;if("function"!=typeof n)throw new TypeError;var t=I.call(arguments,1),r=function(){if(this instanceof r){var a=function(){};a.prototype=n.prototype;var i=new a,s=n.apply(i,t.concat(I.call(arguments)));return Object(s)===s?s:i}return n.apply(e,t.concat(I.call(arguments)))};return r}),O.csstransforms=function(){return!!u("transform")},O.csstransforms3d=function(){var e=!!u("perspective");return e&&"webkitPerspective"in l.style&&k("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(n,t){e=9===n.offsetLeft&&3===n.offsetHeight}),e},O.csstransitions=function(){return u("transition")};for(var P in O)c(O,P)&&(f=P.toLowerCase(),p[f]=O[P](),b.push((p[f]?"":"no-")+f));return p.addTest=function(e,n){if("object"==typeof e)for(var r in e)c(e,r)&&p.addTest(r,e[r]);else{if(e=e.toLowerCase(),p[e]!==t)return p;n="function"==typeof n?n():n,"undefined"!=typeof enableClasses&&enableClasses&&(l.className+=" "+(n?"":"no-")+e),p[e]=n}return p},r(""),d=null,p._version="2.6.2",p._prefixes=x,p._domPrefixes=v,p._cssomPrefixes=y,p.testProp=function(e){return s([e])},p.testAllProps=u,p.testStyles=k,p.prefixed=function(e,n,t){return n?u(e,n,t):u(e,"pfx")},p}(0,this.document),function(e){jQuery.extend({bez:function(n){var t="bez_"+e.makeArray(arguments).join("_").replace(".","p");if("function"!=typeof jQuery.easing[t]){var r=function(e,n){var t=[null,null],r=[null,null],a=[null,null],i=function(i,s){return a[s]=3*e[s],r[s]=3*(n[s]-e[s])-a[s],t[s]=1-a[s]-r[s],i*(a[s]+i*(r[s]+i*t[s]))},s=function(e){return a[0]+e*(2*r[0]+3*t[0]*e)},o=function(e){for(var n,t=e,r=0;++r<14&&(n=i(t,0)-e,!(Math.abs(n)<.001));)t-=n/s(t);return t};return function(e){return i(o(e),1)}};jQuery.easing[t]=function(e,t,a,i,s){return i*r([n[0],n[1]],[n[2],n[3]])(t/s)+a}}return t}})}(jQuery),function(e,n,t,r,a){function i(n){var t,a,n=n.split(")"),i=e.trim,s=-1,o=n.length-1,u=g?new Float32Array(6):[],c=g?new Float32Array(6):[],p=g?new Float32Array(6):[1,0,0,1,0,0];for(u[0]=u[3]=p[0]=p[3]=1,u[1]=u[2]=u[4]=u[5]=0;++s<o;){switch(t=n[s].split("("),a=i(t[0]),t=t[1],c[0]=c[3]=1,c[1]=c[2]=c[4]=c[5]=0,a){case O+"X":c[4]=parseInt(t,10);break;case O+"Y":c[5]=parseInt(t,10);break;case O:t=t.split(","),c[4]=parseInt(t[0],10),c[5]=parseInt(t[1]||0,10);break;case b:t=f(t),c[0]=r.cos(t),c[1]=r.sin(t),c[2]=-r.sin(t),c[3]=r.cos(t);break;case I+"X":c[0]=+t;break;case I+"Y":c[3]=t;break;case I:t=t.split(","),c[0]=t[0],c[3]=1<t.length?t[1]:t[0];break;case k+"X":c[2]=r.tan(f(t));break;case k+"Y":c[1]=r.tan(f(t));break;case w:t=t.split(","),c[0]=t[0],c[1]=t[1],c[2]=t[2],c[3]=t[3],c[4]=parseInt(t[4],10),c[5]=parseInt(t[5],10)}p[0]=u[0]*c[0]+u[2]*c[1],p[1]=u[1]*c[0]+u[3]*c[1],p[2]=u[0]*c[2]+u[2]*c[3],p[3]=u[1]*c[2]+u[3]*c[3],p[4]=u[0]*c[4]+u[2]*c[5]+u[4],p[5]=u[1]*c[4]+u[3]*c[5]+u[5],u=[p[0],p[1],p[2],p[3],p[4],p[5]]}return p}function s(e){var n,t,a,i=e[0],s=e[1],o=e[2],u=e[3];return i*u-s*o?(n=r.sqrt(i*i+s*s),i/=n,s/=n,a=i*o+s*u,o-=i*a,u-=s*a,t=r.sqrt(o*o+u*u),a/=t,i*(u/t)<s*(o/t)&&(i=-i,s=-s,a=-a,n=-n)):n=t=a=0,[[O,[+e[4],+e[5]]],[b,r.atan2(s,i)],[k+"X",r.atan(a)],[I,[n,t]]]}function o(n,t){var r,a,o,f,p={start:[],end:[]},l=-1;if(("none"==n||v.test(n))&&(n=""),("none"==t||v.test(t))&&(t=""),n&&t&&!t.indexOf("matrix")&&c(n).join()==c(t.split(")")[0]).join()&&(p.origin=n,n="",t=t.slice(t.indexOf(")")+1)),n||t){if(n&&t&&n.replace(/(?:\([^)]*\))|\s/g,"")!=t.replace(/(?:\([^)]*\))|\s/g,""))p.start=s(i(n)),p.end=s(i(t));else for(n&&(n=n.split(")"))&&(r=n.length),t&&(t=t.split(")"))&&(r=t.length);++l<r-1;){n[l]&&(a=n[l].split("(")),t[l]&&(o=t[l].split("(")),f=e.trim((a||o)[0]);for(var m=p.start,d=u(f,a?a[1]:0),h=void 0;h=d.shift();)m.push(h);for(m=p.end,f=u(f,o?o[1]:0),d=void 0;d=f.shift();)m.push(d)}return p}}function u(e,n){var t,r=+!e.indexOf(I),a=e.replace(/e[XY]/,"e");switch(e){case O+"Y":case I+"Y":n=[r,n?parseFloat(n):r];break;case O+"X":case O:case I+"X":t=1;case I:n=n?(n=n.split(","))&&[parseFloat(n[0]),parseFloat(1<n.length?n[1]:e==I?t||n[0]:r+"")]:[r,r];break;case k+"X":case k+"Y":case b:n=n?f(n):0;break;case w:return s(n?c(n):[1,0,0,1,0,0])}return[[a,n]]}function f(e){return~e.indexOf("deg")?parseInt(e,10)*(2*r.PI/360):~e.indexOf("grad")?parseInt(e,10)*(r.PI/200):parseFloat(e)}function c(e){return e=/([^,]*),([^,]*),([^,]*),([^,]*),([^,p]*)(?:px)?,([^)p]*)(?:px)?/.exec(e),[e[1],e[2],e[3],e[4],e[5],e[6]]}for(var p,l,m,d,t=t.createElement("div").style,h=["OTransform","msTransform","WebkitTransform","MozTransform"],x=h.length,g=("Float32Array"in n),y=/Matrix([^)]*)/,v=/^\s*matrix\(\s*1\s*,\s*0\s*,\s*0\s*,\s*1\s*(?:,\s*0(?:px)?\s*){2}\)\s*$/,O="translate",b="rotate",I="scale",k="skew",w="matrix";x--;)h[x]in t&&(e.support.transform=p=h[x],e.support.transformOrigin=p+"Origin");p||(e.support.matrixFilter=l=""===t.filter),e.cssNumber.transform=e.cssNumber.transformOrigin=!0,p&&"transform"!=p?(e.cssProps.transform=p,e.cssProps.transformOrigin=p+"Origin","MozTransform"==p?m={get:function(n,t){return t?e.css(n,p).split("px").join(""):n.style[p]},set:function(e,n){e.style[p]=/matrix\([^)p]*\)/.test(n)?n.replace(/matrix((?:[^,]*,){4})([^,]*),([^)]*)/,w+"$1$2px,$3px"):n}}:/^1\.[0-5](?:\.|$)/.test(e.fn.jquery)&&(m={get:function(n,t){return t?e.css(n,p.replace(/^ms/,"Ms")):n.style[p]}})):l&&(m={get:function(n,t,r){var a=t&&n.currentStyle?n.currentStyle:n.style;return a&&y.test(a.filter)?(t=RegExp.$1.split(","),t=[t[0].split("=")[1],t[2].split("=")[1],t[1].split("=")[1],t[3].split("=")[1]]):t=[1,0,0,1],e.cssHooks.transformOrigin?(n=e._data(n,"transformTranslate",void 0),t[4]=n?n[0]:0,t[5]=n?n[1]:0):(t[4]=a?parseInt(a.left,10)||0:0,t[5]=a?parseInt(a.top,10)||0:0),r?t:w+"("+t+")"},set:function(n,t,r){var a,s,o=n.style;r||(o.zoom=1),r=["Matrix(M11="+(t=i(t))[0],"M12="+t[2],"M21="+t[1],"M22="+t[3],"SizingMethod='auto expand'"].join(),s=(a=n.currentStyle)&&a.filter||o.filter||"",o.filter=y.test(s)?s.replace(y,r):s+" progid:DXImageTransform.Microsoft."+r+")",e.cssHooks.transformOrigin?e.cssHooks.transformOrigin.set(n,t):((a=e.transform.centerOrigin)&&(o["margin"==a?"marginLeft":"left"]=-n.offsetWidth/2+n.clientWidth/2+"px",o["margin"==a?"marginTop":"top"]=-n.offsetHeight/2+n.clientHeight/2+"px"),o.left=t[4]+"px",o.top=t[5]+"px")}}),m&&(e.cssHooks.transform=m),d=m&&m.get||e.css,e.fx.step.transform=function(n){var t,a,i,s,u=n.elem,f=n.start,c=n.end,h=n.pos,x="";for(f&&"string"!=typeof f||(f||(f=d(u,p)),l&&(u.style.zoom=1),c=c.split("+=").join(f),e.extend(n,o(f,c)),f=n.start,c=n.end),t=f.length;t--;)switch(a=f[t],i=c[t],s=0,a[0]){case O:s="px";case I:s||(s=""),x=a[0]+"("+r.round(1e5*(a[1][0]+(i[1][0]-a[1][0])*h))/1e5+s+","+r.round(1e5*(a[1][1]+(i[1][1]-a[1][1])*h))/1e5+s+")"+x;break;case k+"X":case k+"Y":case b:x=a[0]+"("+r.round(1e5*(a[1]+(i[1]-a[1])*h))/1e5+"rad)"+x}n.origin&&(x=n.origin+x),m&&m.set?m.set(u,x,1):u.style[p]=x},e.transform={centerOrigin:"margin"}}(jQuery,window,document,Math),function(e){function n(e){return void 0!==e}e.anima={partialSupport:null,noSupport:null,uniquePrefixIndex:0,transformProps:[],transformProps1:["x","y","z","translateX","translateY","translateZ","translate","translate3d"],transformProps2:["scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","rotate","rotateX","rotateY","rotateZ","perspective"],cssEase:{linear:".25,.25,.75,.75",ease:".25,.1,.25,1",easeIn:".42,0,1,1",easeOut:"0,0,.58,1",easeInOut:".42,0,.58,10",easeInQuad:".55,.085,.68,.53",easeInCubic:".55,.055,.675,.19",easeInQuart:".895,.03,.685,.22",easeInQuint:".755,.05,.855,.06",easeInSine:".470,0,.745,.715",easeInExpo:".95,.05,.795,.035",easeInCirc:".6,.04,.98,.335",easeInBack:".6,-0.28,.735,.045",easeOutQuad:".25,.46,.45,.94",easeOutCubic:".215,.61,.355,1",easeOutQuart:".165,.84,.44,1",easeOutQuint:".23,1,.32,1",easeOutSine:".39,.575,.565,1",easeOutExpo:".19,1,.22,1",easeOutCirc:".075,.82,.165,1",easeOutBack:".175,.885,.32,1.275",easeInOutQuad:".455,.03,.515,.955",easeInOutCubic:".645,.045,.355,1",easeInOutQuart:".77,0,.175,1",easeInOutQuint:".86,0,.07,10",easeInOutSine:".445,.05,.55,.95",easeInOutExpo:"1,0,0,1",easeInOutCirc:".785,.135,.15,.86",easeInOutBack:".68,-0.55,.265,1.55"}},e.anima.transformProps=e.anima.transformProps1.concat(e.anima.transformProps2),e.anima.unit=function(e,n){return"string"!=typeof e||e.match(/^[\-0-9\.]+$/)?""+e+n:e};var t=function(e){return!!e&&e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}(Modernizr.prefixed("transform")),r=(Modernizr.prefixed("transition"),window.Modernizr.csstransforms),a=window.Modernizr.csstransforms3d,s=window.Modernizr.csstransitions;e.anima.noSupport=!r,e.anima.partialSupport=!a||!s,e.fn.anima2d=function(n,t,r,a){return e.anima.partialSupport?e(this).anima(n,t,r,a,"anima2d"):e(this)},e.fn.anima3d=function(n,t,r,a){return e.anima.partialSupport?e(this):e(this).anima(n,t,r,a,"anima3d")},e.fn.anima=function(t,r,a,i,s){return"object"==typeof r&&(i=r,r=void 0),"object"==typeof a&&(i=a,a=void 0),n(s)||(s="anima"),n(r)||(r=0),n(a)||(a="easeOut"),n(i)||(i={}),n(i.skipInstant)||(i.skipInstant=!1),e.anima.cssEase[a]&&(a=e.anima.cssEase[a]),e(this).each(function(){var n=e(this);n.data("uniquePrefix")||n.data("uniquePrefix","animaPrefix"+ ++e.anima.uniquePrefixIndex),e.anima[n.data("uniquePrefix")]||(e.anima[n.data("uniquePrefix")]={}),e.anima.noSupport?n.goAnima(t,r,a,i,s):n.queue(function(e){n.goAnima(t,r,a,i,s),0==r&&n.stopAnima()})})},e.fn.goAnima=function(r,a,s,o,u){var f=this,c=e(this),p=e.bez(s.split(",")),l="cubic-bezier("+s+")",m=a/1e3;if(e.anima.noSupport){if("anima3d"!=u&&!o.skipInstant){n(r.x)&&c.css("marginLeft",r.x),n(r.y)&&c.css("marginTop",r.x);for(var d in r)-1==e.inArray(d,g)&&c.css(d,r[d]);n(o.complete)&&o.complete.apply(f)}}else{var h=[],x=[],g=e.anima.transformProps,y=e.anima.transformProps1,v=e.anima.transformProps2;if(e.anima.partialSupport||"anima2d"==u){if(e.anima.partialSupport&&"anima3d"!=u){for(i=0;i<y.length;i++)n(r[O=y[i]])&&-1==O.toLowerCase().indexOf("z")&&(-1==O.indexOf("translate")&&(O="translate"+O.toUpperCase()),h.push(O+"("+e.anima.unit(r[y[i]],"px")+")"));for(i=0;i<v.length;i++)if(n(r[v[i]])){var O=v[i];-1==O.indexOf("scale")?h.push(O+"("+e.anima.unit(r[v[i]],"deg")+")"):h.push(O+"("+r[v[i]]+")")}h.length>0&&c.animate({transform:h.join(" ")},{queue:!1,duration:a,specialEasing:{transform:p}});for(var d in r)if(-1==e.inArray(d,g)){var b=d.replace(/-([a-z])/g,function(e){return e[1].toUpperCase()}),I={};I[b]=r[d];var k={};k[b]=p,c.animate(I,{queue:!1,duration:a,specialEasing:k})}}}else{var w=e.anima[c.data("uniquePrefix")];for(i=0;i<y.length;i++)n(r[O=y[i]])&&(-1==O.indexOf("translate")&&(O="translate"+O.toUpperCase()),h.push(O+"("+e.anima.unit(r[y[i]],"px")+")"));for(i=0;i<v.length;i++)n(r[v[i]])&&(-1==(O=v[i]).indexOf("scale")?h.push(O+"("+e.anima.unit(r[v[i]],"deg")+")"):h.push(O+"("+r[v[i]]+")"));h.length>0&&(c.css(t,h.join(" ")),w[t]=!0,x.push(t+" "+m+"s "+l));for(var d in r)-1==e.inArray(d,g)&&x.push(d+" "+m+"s "+l);if(c.data("transitions")){var P=c.data("transitions"),j=[];for(i=0;i<P.length;i++){var C=P[i].slice(0,P[i].indexOf(" "));for(z=0;z<x.length&&C!=x[z].slice(0,x[z].indexOf(" "));z++)z==x.length-1&&j.push(P[i])}x=x.concat(j)}c.data("transitions",x),x.length>0&&c.css("transition",x.join(", "));for(var d in r)-1==e.inArray(d,g)&&(c.css(d,r[d]),w[d]=!0)}c.animate({fake:0},{queue:!1,duration:a,specialEasing:{fake:p},complete:function(){n(o.complete)&&o.complete.apply(f),c.dequeue()}})}},e.fn.delayAnima=function(n){return e(this).each(function(){e.anima.noSupport||e(this).delay(n)})},e.fn.clearAnima=function(){return e(this).each(function(){e.anima.noSupport||e(this).clearQueue()})},e.fn.stopAnima=function(t,r){return n(t)||(t=!1),n(r)||(r=!1),e(this).each(function(){if(!e.anima.noSupport){var n=e(this);if(!e.anima.partialSupport){if(n.data("transitions",""),r)n.css("transition","none");else{var a=e.anima[n.data("uniquePrefix")];if(a)for(var i in a)n.css(i,n.css(i));n.css("transition","all 0s")}e.anima[n.data("uniquePrefix")]={}}n.stop(t,r)}})}}(jQuery);