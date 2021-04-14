function AQuery() {
  this.query = null, this.queryComps = {}
}
AQuery.FORMAT = "res", AQuery.IDESC = 0, AQuery.IKEY = 1, AQuery.IFID = 2, AQuery.IVALUE = 3, AQuery.ITYPE = 4, AQuery.ISIZE = 5, AQuery.IEXP = 6, AQuery.BINARY = -2, AQuery.STRING = -1, AQuery.UNSIGNED = 1, AQuery.SIGNED = 0, AQuery.queryMap = {}, AQuery.getQuery = function (e) {
  return AQuery.queryMap[e]
}, AQuery.setQuery = function (e, r) {
  AQuery.queryMap[e] = r
}, AQuery.getSafeQuery = function (e) {
  if (!e) return null;
  var r = AQuery.getQuery(e);
  return r || (r = new AQuery).loadQuery("/static/Query/" + e + "." + AQuery.FORMAT, function (t) {
    t ? AQuery.setQuery(e, r) : (console.log("load fail! : Query/" + e + "." + AQuery.FORMAT), r = null)
  }), r
}, AQuery.prototype.loadQuery = function (e, r) {
  var t = this;
  $.ajax({
    async: !1,
    url: e,
    dataType: "text",
    success: function (e) {
      e ? (t.query = AQuery.parseQuery(e), r && r.call(t, !0)) : r && r.call(t, !1)
    },
    error: function () {
      r && r.call(t, !1)
    }
  })
}, AQuery.parseQuery = function (e) {
  try {
    var r = AQuery["parse_" + AQuery.FORMAT];
    if (r) return r.call(this, e);
    alert("There is no parse function : parse_" + AQuery.FORMAT)
  } catch (r) {
    console.log("AQuery.parseQuery : " + r.message), console.log(e)
  }
  return null
}, AQuery.parse_qry = function (e) {
  return JSON.parse(e)
}, AQuery.parse_res = function (e) {
  var r, t, u, n, o, y, a, i, s, l, c, p = e.split(/\r?\n+/g),
    Q = 0,
    A = 0,
    f = {},
    h = ["BEGIN_FUNCTION_MAP", "BEGIN_DATA_MAP", "begin", "end", "END_DATA_MAP", "END_FUNCTION_MAP"];
  for (i = 0; i < p.length; i++)
    if (t = $.trim(p[i]), (c = h.indexOf(t)) > -1) a = c;
    else {
      for (u = t.split(";")[0].split(","), l = 0; l < u.length; l++) u[l] = $.trim(u[l]);
      if (0 == a)
        for (f.queryType = u[0], f.name = u[2], s = 3; s < u.length; s++) f[(c = u[s].split("="))[0]] = c[1];
      else 1 == a || 3 == a ? (f[u[2]] || (n = f[u[2]] = {}), "input" == u[2] ? r = n["InBlock" + ++Q] = {} : "output" == u[2] && (r = n["OutBlock" + ++A] = {}), o = r.format = [], u[3] && ("A" == f.headtype ? r.occurs = "rsp_cnt" : r.occurs = "out_cnt")) : 2 == a && (c = u[4].split("."), y = [u[0], u[1], null, null, "char" == u[3] ? AQuery.STRING : AQuery.SIGNED, parseInt(c[0], 10), c[1] ? parseInt(c[1], 10) : 0], o.push(y))
    } return f
}, AQuery.parse_xml = function (e) {
  function r(e) {
    Q = !1;
    var r = [];
    for (A = e.attr(I[AQuery.IKEY]), y = 0; y < I.length; y++) y == AQuery.ITYPE ? "char" == e.attr(I[y]) ? r.push(AQuery.STRING) : r.push(AQuery.SIGNED) : y == AQuery.ISIZE || y == AQuery.IEXP ? r.push(parseInt(e.attr(I[y]), 10)) : r.push(e.attr(I[y]) ? e.attr(I[y]) : "");
    return r
  }
  var t, u, n, o, y, a, i, s, l, c, p, Q, A, f = (new DOMParser).parseFromString(e, "text/xml"),
    h = $(f).find("resource"),
    m = {},
    g = {
      resourceType: "queryType",
      physicalName: "name",
      logicalName: "meta"
    },
    I = ["logicalName", "physicalName", "", "", "fieldType", "length", "decimal", "desc", "metaGroup"];
  for (u = 0; u < h[0].attributes.length; u++) g[(t = h[0].attributes[u]).nodeName] ? m[g[t.nodeName]] = t.nodeValue : m[t.nodeName] = t.nodeValue;
  for (u = 0; u < h.children().length; u++)
    for (i = m[(a = $(h.children()[u]))[0].tagName] = {}, c = "input" == a[0].tagName ? "InBlock" : "OutBlock", p = 1, Q = !0, n = 0; n < a.children().length; n++)
      if (s = $(a.children()[n]), i[c + p] || (l = i[c + p] = {
          format: []
        }), "structure" == s[0].tagName) {
        for (Q || (l = i[c + ++p] = {
            format: []
          }), o = 0; o < s[0].attributes.length; o++) l[(t = s[0].attributes[o]).nodeName] = t.nodeValue;
        if (l.occursRef) {
          t = l.occursRef.split(".");
          for (var d in i)
            if (i[d].physicalName == t[0]) {
              l.occursRef = d + "." + t[1];
              break
            }
        }
        for (l.occurs > 1 && !l.occursRef && (l.occursRef = c + (p - 1) + "." + A), o = 0; o < s.children().length; o++) l.format.push(r($(s.children()[o])))
      } else s.attr(I[AQuery.IKEY]).indexOf("grid_cnt") > -1 && (Q || (l = i[c + ++p] = {
        format: []
      })), l.format.push(r(s));
  return m
}, AQuery.prototype.getTypeIndex = function (e) {
  if (e == AQuery.REP_MARKET) return AQuery.ITYPE;
  for (var r = this.getValue("mids"), t = 0; t < r.length; t++)
    if (r[t] == e) return AQuery.ITYPE + 3 * t;
  var u = afc.log(e + " : 존재하지 않는 타입입니다. 임시로 첫번째값으로 처리합니다. (mid 한정 요망)");
  return u && alert(u), AQuery.ITYPE
}, AQuery.prototype.getName = function () {
  return this.query.name
}, AQuery.prototype.getMeta = function () {
  return this.query.meta
}, AQuery.prototype.getQueryType = function () {
  return this.query.queryType
}, AQuery.prototype.getTrType = function () {
  return this.query.trType
}, AQuery.prototype.getIoVer = function () {
  return this.query.resourceVersion
}, AQuery.prototype.getValue = function (e) {
  return this.query[e]
}, AQuery.prototype.getQueryBlock = function (e, r) {
  return this.query[e][r]
}, AQuery.prototype.eachQueryBlock = function (e, r) {
  var t = this.query[e];
  for (var u in t) r.call(this, u, t[u])
}, AQuery.prototype.addQueryComp = function (e, r, t) {
  var u = this.queryComps[e];
  u || (u = this.queryComps[e] = {
    input: [],
    output: []
  }), u[r].push(t)
}, AQuery.prototype.removeQueryComp = function (e, r, t) {
  var u = this.queryComps[e];
  if (u)
    for (var n = u[r], o = 0; o < n.length; o++)
      if (n[o] === t) return void n.splice(o, 1)
}, AQuery.prototype.getQueryComps = function (e, r) {
  var t = this.queryComps[e];
  return t ? t[r] : null
}, AQuery.prototype.hasQueryDataKey = function (e) {
  for (var r, t = this.getQueryBlock("output", "OutBlock1"), u = t.format.length, n = e.getBlockData("OutBlock1")[0], o = 0; o < u; o++)
    if (r = t.format[o][AQuery.IKEY], void 0 != n[r]) return !0;
  return !1
};