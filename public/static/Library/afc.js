var afc = {
    BTN_STATE: ["normal", "touch", "disable"],
    CHECK_STATE: ["check", "normal"],
    ATTR_BASE: "data-base",
    ATTR_CLASS: "data-class",
    ATTR_GROUP: "data-group",
    ATTR_STYLE: "data-style",
    ATTR_STYLE_TAB: "data-style-tab",
    ATTR_DEFAULT: "data-default",
    ATTR_LISTENER: "data-listener",
    ATTR_QUERY_NAME: "data-query-name",
    ATTR_RESP: "data-responsive",
    ATTR_MASK: "data-mask",
    CLASS_MARK: "--",
    CMARK_LEN: 2,
    MASK_NONE: 0,
    MASK_MONEY: 1,
    MASK_FLOAT: 2,
    DISABLE_TIME: 500,
    TOUCH_DELAY_TIME: 300,
    CLICK_DELAY: 100,
    KEY_TAB: 9,
    KEY_ENTER: 13,
    KEY_ESC: 27,
    KEY_SPACE: 32,
    KEY_PGUP: 33,
    KEY_PGDOWN: 34,
    KEY_END: 35,
    KEY_HOME: 36,
    KEY_LEFT: 37,
    KEY_UP: 38,
    KEY_RIGHT: 39,
    KEY_DOWN: 40,
    KEY_DEL: 46,
    KEY_A: 65,
    KEY_B: 66,
    KEY_C: 67,
    KEY_D: 68,
    KEY_E: 69,
    KEY_F: 70,
    KEY_G: 71,
    KEY_H: 72,
    KEY_N: 78,
    KEY_O: 79,
    KEY_Q: 81,
    KEY_S: 83,
    KEY_V: 86,
    KEY_W: 87,
    KEY_X: 88,
    KEY_Y: 89,
    KEY_Z: 90,
    KEY_F1: 112,
    KEY_F2: 113,
    KEY_F3: 114,
    KEY_F4: 115,
    KEY_F5: 116,
    KEY_F6: 117,
    KEY_F7: 118,
    KEY_F8: 119,
    KEY_F9: 120,
    KEY_F10: 121,
    LBUTTON: 1,
    MBUTTON: 2,
    RBUTTON: 3
};
afc.ClassName = {
    LABEL: "ALabel",
    TEXTBOX: "ATextBox",
    BUTTON: "AButton",
    CHECKBOX: "ACheckBox",
    RADIOGROUP: "ARadioGroup",
    RADIOBUTTON: "ARadioButton",
    TEXTFIELD: "ATextField",
    TEXTAREA: "ATextArea",
    DROPBOX: "ADropBox",
    SELECTBOX: "ASelectBox",
    GRID: "AGrid",
    TREE: "ATree",
    SWITCHBUTTON: "ASwitchButton",
    IMAGE: "AImage",
    CANVAS: "ACanvas",
    PROGRESS: "AProgress",
    SLIDER: "ASlider",
    DATEPICKER: "ADatePicker",
    TIMEPICKER: "ATimePicker",
    SCROLLBAR: "AScrollBar",
    GRIDLAYOUT: "AGridLayout",
    FLEXLAYOUT: "AFlexLayout",
    VIEW: "AView",
    LISTVIEW: "AListView",
    TABVIEW: "ATabView",
    WEBVIEW: "AWebView",
    SLIDEVIEW: "ASlideView",
    FLEXVIEW: "AFlexView",
    SPLITVIEW: "ASplitView",
    ACCORDION: "AAccordion",
    BAR: "ABar",
    TOOLBAR: "AToolBar",
    MENUBAR: "AMenuBar",
    TABBAR: "ATabBar",
    FLOAT: "AFloat",
    TOAST: "AToast",
    INDICATOR: "AIndicator",
    MENU: "AMenu",
    PAGE: "APage",
    WINDOW: "AWindow",
    APPLICATION: "AApplication"
}, afc.COMP_CTX = {}, afc.compLabel = {
    ALabel: "Label",
    ATextBox: "TextBox",
    AButton: "Button",
    ACheckBox: "CheckBox",
    ARadioButton: "RadioButton",
    ADropBox: "DropBox",
    ASelectBox: "SelectBox",
    ATextField: "TextField",
    ATextArea: "TextArea",
    ASwitchButton: "SwitchButton",
    AImage: "Image",
    ACanvas: "Canvas",
    AGrid: "Grid",
    ATree: "Tree",
    AScrollBar: "ScrollBar",
    AView: "View",
    ARadioGroup: "RadioGroup",
    AListView: "ListView",
    ATabView: "TabView",
    AWebView: "WebView",
    AProgress: "Progress",
    ASlider: "Slider",
    AGridLayout: "GridLayout",
    AFlexLayout: "FlexLayout",
    AFlexView: "FlexView",
    ASplitView: "SplitView",
    AAccordion: "Accordion",
    ADataGrid: "DataGrid",
    ASlideView: "SlideView"
}, afc.defaultLib = {
    library: ["jquery-2.1.3.js", "jquery-ui.js", "jquery.ui.touch-punch.js", "afc.js", "ARect.js", "AUtil.js", "TabKeyController.js"],
    component: ["AComponent.js", "ALayout.js", "AFloat.js", "AContainer.js", "APanel.js", "AWindow.js", "APage.js", "ANavigator.js", "AApplication.js", "ADocument.js", "AView.js", "ATabView.js"],
    event: ["AEvent.js"],
    style: ["afc.css", "comp.css", "basicStyle.css", "compEx.css", "jquery-ui.css"]
}, afc.enableUserSelect = function (e, t) {
    var a;
    a = t ? $(t) : $("body"), e ? (a.css("-webkit-user-select", "auto"), a.find("span").css("-webkit-user-select", "auto")) : (a.css("-webkit-user-select", "none"), a.find("span").css("-webkit-user-select", "none"))
}, afc.disableLog = function () {
    afc.log = function () {
        return ""
    }, console.log = function () {}
}, afc.logFilter = "SpiderGen", afc.logOption = {
    compElement: !1
}, afc.log = function (e) {
    var t = "";
    return t = e instanceof AComponent || e instanceof AContainer ? e.toString() : e instanceof HTMLElement ? $(e)[0].outerHTML : e instanceof Object ? afc.stringifyOnce(e, void 0, 4) : e, t = afc.logFilter + " => " + t, console.log(t), afc.isIos && AppManager.consoleLog(t), t
}, afc.log2 = function (e) {
    var t = "";
    return t = e instanceof HTMLElement ? $(e)[0].outerHTML : e instanceof Object ? afc.stringifyOnce(e, void 0, 4) : e, t = afc.logFilter + " => " + t, console.log(t), afc.isIos && AppManager.consoleLog(t), t
}, afc.setLogFilter = function (e) {
    afc.logFilter = e
}, afc.setLogOption = function (e) {
    for (var t in e) e.hasOwnProperty(t) && (afc.logOption[t] = e[t])
}, afc.stringifyOnce = function (e, t, a) {
    var r = [],
        n = [];
    return JSON.stringify(e, function (a, o) {
        if (r.length > 200) return "object too long";
        var i = !1;
        if (r.forEach(function (e, t) {
                e === o && (i = t)
            }), "" == a) return r.push(e), n.push("root"), o;
        if (i + "" != "false" && "object" == typeof o) return "root" == n[i] ? "(pointer to root)" : "(see " + (o && o.constructor ? afc.getClassName(o).toLowerCase() : typeof o) + " with key " + n[i] + ")";
        var c = a || "(empty key)";
        return r.push(o), n.push(c), t ? t(a, o) : o
    }, a)
}, afc.startTime = 0, afc.oldTime = 0, afc.beginTimeCheck = function (e) {
    afc.startTime = afc.oldTime = Date.now(), e || (e = ""), afc.log(e + " Start time ==>\t\t\t" + afc.startTime + " --------------------------------------------------")
}, afc.ellapseCheck = function (e) {
    0 != afc.startTime && (e || (e = ""), afc.log(e + " Ellapsed time ==>\t\t" + (Date.now() - afc.oldTime)), afc.oldTime = Date.now())
}, afc.endTimeCheck = function (e) {
    e || (e = ""), afc.oldTime = Date.now(), afc.log(e + " End time ==> \t\t\t" + afc.oldTime + " -------------------------------------"), afc.log(e + " Total Ellapsed time ==>\t" + (afc.oldTime - afc.startTime) + " -------------------------------------"), afc.startTime = 0, afc.oldTime = 0
}, afc.extendsClass = function (e, t) {
    if (!e.prototype.superClass) {
        afc.setScriptMap();
        var a = new t;
        for (var r in a) a.hasOwnProperty(r) && delete a[r];
        e.prototype = a, e.prototype.constructor = e, e.prototype.superClass = t
    }
}, afc.mergeObject = function (e, t) {
    if (t)
        for (var a in t) t.hasOwnProperty(a) && (e[a] = t[a]);
    return e
}, afc.getClassName = function (e) {
    if (afc.isIE) {
        var t = /function (\w*)/.exec(e.constructor.toString());
        return t && t.length > 1 ? t[1] : ""
    }
    return e.constructor.name
}, afc.getUrlParameter = function () {
    var e = new Object,
        t = location.href;
    if (-1 == t.indexOf("?")) return e;
    for (var a = t.split("?")[1].split("&"), r = 0; r < a.length; r++) {
        var n = a[r].split("=");
        e[n[0]] = n[1]
    }
    return e
}, afc.loadSync = function (e, t, a, r, n) {
    t = t.replace(".lay", ".html"), $.ajax({
        async: !1,
        url: t,
        dataType: "text",
        success: function (t) {
            if (r && (t = t.replace(r, n)), e) {
                var o = $(e);
                o.children().remove(), o.append(t), a && a.call(e, !0)
            } else a && a(t)
        },
        error: function () {
            a && a.call(e, !1)
        }
    })
}, afc.scriptMap = {}, afc.cssMap = {}, afc.getFileSrc = function (e, t) {
    var a = "";
    return jQuery.ajax({
        async: !1,
        type: "GET",
        url: e,
        dataType: "text",
        success: function (e) {
            t || (a = e)
        },
        error: function (e, t, r) {
            a = null
        }
    }), a
}, afc.loadScript = function (e) {
    e = e.replace(".cls", ".js"), afc.scriptMap[e] || ($('<script src="' + e + '"><\/script>').appendTo("head"), afc.scriptMap[e] = !0)
}, afc.loadScriptSync = function (e, t) {
    afc.scriptMap[e] || ($('<script>eval(afc.getFileSrc("' + e + '", ' + t + "));<\/script>").appendTo("head"), afc.scriptMap[e] = !0)
}, afc.setScriptMap = function () {
    var e = document.getElementsByTagName("script"),
        t = e[e.length - 1].src,
        a = window.location.href;
    a = a.substring(0, a.lastIndexOf("/") + 1), t = t.replace(a, ""), afc.scriptMap[t] = !0
}, afc.loadCss = function (e) {
    afc.cssMap[e] || ($('<link rel="stylesheet" href="' + e + '"/>').appendTo("head"), afc.cssMap[e] = !0)
}, afc.removeCss = function (e) {
    $('head link[href="' + e + '"]').remove()
}, afc.touchDelay = function () {
    afc.enableApp(!1), setTimeout(function () {
        afc.enableApp(!0)
    }, afc.TOUCH_DELAY_TIME)
}, afc.enableApp = function (e) {
    AppManager.enableApp(e)
}, afc.refreshApp = function () {
    var e = $('<div style="position:absolute; z-index:0; width:1px; height:1px;"></div>');
    $("body").append(e), setTimeout(function () {
        e.remove()
    }, 700)
}, afc.getEventList = function (e) {
    var t = window[e].CONTEXT;
    return t ? t.events.concat(AEvent.defEvents) : []
}, afc.isAndroid = !1, afc.isIos = !1, afc.isTizen = !1, afc.isPC = !1, afc.isMobile = !1, afc.isSimulator = !1, afc.isChrome = !1, afc.isSystemWebview = !1, afc.isIE = !1, afc.isHybrid = !1, afc.isSamsungBrowser = !1, afc.andVer = 1e3, afc.iosVer = 1e3, afc.strAndVer = "", afc.strIosVer = "", afc.strIEVer = "", afc.strModuleName = "", afc.scrlWidth = 17, afc.OS = "", afc.DIV = "/", window.navigator.platform.indexOf("Win") > -1 ? (afc.OS = "WIN", afc.DIV = "\\") : window.navigator.platform.indexOf("Mac") > -1 ? (afc.OS = "MAC", afc.DIV = "/") : (afc.OS = "LNX", afc.DIV = "/"), afc.isDeviceOf = function (e) {
    return navigator.userAgent.indexOf(e) > -1
}, afc.androidVersion = function () {
    var e = navigator.userAgent.match(/Android\s([0-9\.]*)/);
    return afc.strAndVer = e ? e[1] : null, afc.strAndVer
}, afc.iosVersion = function () {
    var e = navigator.userAgent.match(/iPhone OS\s([0-9\_]*)/);
    return afc.strIosVer = e ? e[1] : null, afc.strIosVer ? (afc.strIosVer = afc.strIosVer.replace(/_/g, "."), afc.strIosVer) : null
}, afc.makeMeta = function () {
    var e = afc.getUrlParameter(),
        t = e.scale,
        a = e.density,
        r = null;
    if (PROJECT_OPTION.general.autoScale)
        if (a) r = '<meta name="viewport" content="width=device-width, target-densitydpi=' + a + "dpi";
        else {
            var n = Math.min(screen.width, screen.height);
            t || (t = n / PROJECT_OPTION.general.docWidth), t > 1 && (t = 1), r = '<meta name="viewport" content="width=device-width, initial-scale=' + t
        }
    else {
        var o = PROJECT_OPTION.general.docWidth;
        r = '<meta name="viewport" content="width=', r += o || "device-width", r += ", initial-scale=" + PROJECT_OPTION.general.scaleVal
    }
    PROJECT_OPTION.general.userScalable ? r += ', user-scalable=yes"/>' : r += ', user-scalable=no"/>', document.write(r), document.write("<meta http-equiv=\"Content-Security-Policy\" content=\"connect-src *; default-src * gap://ready file:; img-src * data:; style-src * 'unsafe-inline'; script-src * 'unsafe-inline' 'unsafe-eval'\">"), document.write('<meta name="format-detection" content="telephone=no"/>')
}, afc.browserCheck = function () {
    var e = navigator.userAgent.toLowerCase();
    "Microsoft Internet Explorer" == navigator.appName ? afc.strIEVer = "msie" : e.indexOf("trident") > -1 ? afc.strIEVer = "trident" : e.indexOf("edge/") > -1 ? (afc.strIEVer = "edge", afc.scrlWidth = 12) : e.indexOf("chrome") > -1 && (afc.isChrome = !0, afc.scrlWidth = 14), afc.isIE = "" != afc.strIEVer
}, afc.deviceCheck = function () {
    if (afc.isMobile = !0, afc.isHybrid = window.PROJECT_OPTION && "none" != PROJECT_OPTION.build.bridgeName, afc.isDeviceOf("Android") ? (afc.isAndroid = !0, afc.andVer = parseFloat(afc.androidVersion()), afc.isDeviceOf("Version/") && (afc.isSystemWebview = !0)) : afc.isDeviceOf("iPhone") || afc.isDeviceOf("iPad") || afc.isDeviceOf("iPod") ? (afc.isIos = !0, afc.iosVer = parseFloat(afc.iosVersion()), $(document).bind("touchend", function (e) {}), afc.isDeviceOf("Safari/") || (afc.isSystemWebview = !0)) : afc.isDeviceOf("Tizen") ? afc.isTizen = !0 : (afc.isPC = !0, afc.isMobile = !1, afc.isDeviceOf("Simulator") && (afc.isSimulator = !0)), afc.isDeviceOf("SamsungBrowser") && (afc.isSamsungBrowser = !0), afc.isSimulator && afc.isHybrid) {
        $("<style></style>").text("._global_style_ ::-webkit-scrollbar {width: 0px; height: 0px;}").appendTo("head")
    }
    window.PROJECT_OPTION && "phonegap" == PROJECT_OPTION.build.bridgeName && (afc.isIos ? afc.loadScript("Bridge/ios/cordova.js") : afc.isAndroid ? afc.loadScript("Bridge/android/cordova.js") : afc.isPC && afc.loadScript("Bridge/windows/cordova.js"))
}, afc.addRule = function (e, t, a) {
    return e.insertRule ? e.insertRule(t + "{" + a + "}") : e.addRule ? e.addRule(t, a) : void 0
}, afc.phoneCall = function (e) {
    var t = "tel:" + e;
    afc.isAndroid ? AppManager.goUrl(t) : afc.isIos && (window.location = t)
}, afc.floor = function (e, t) {
    var a = Math.pow(10, t);
    return parseFloat(parseInt(e * a, 10) / a).toFixed(t)
}, afc.floorPer = function (e, t) {
    var a = Math.pow(10, t);
    return parseFloat(parseInt(e * a, 10) / a).toFixed(t) + "%"
}, afc.floatFix = function (e, t) {
    return e = e ? parseFloat(e) : 0, t || (t = 2), e.toFixed(t)
}, afc.addComma = function (e) {
    if (void 0 != e) {
        var t = /(^[+-]?\d+)(\d{3})/;
        for (e += ""; t.test(e);) e = e.replace(t, "$1,$2");
        return e
    }
    return ""
}, afc.hogaComma = function (e) {
    if (0 != e) {
        var t = /(^[+-]?\d+)(\d{3})/;
        for (e += ""; t.test(e);) e = e.replace(t, "$1,$2");
        return e
    }
    return "　"
}, afc.removeComma = function (e) {
    return e ? e.toString().replace(/,/g, "") : ""
}, afc.makeDummyString = function (e) {
    for (var t = "", a = 0; a < e; a++) t += "●";
    return t
}, afc.makeAccText = function (e, t) {
    var a = e["D1계좌번호"];
    return theApp.systemInfo ? theApp.systemInfo.makeAccNumber(a) : a.substring(0, 3) + "-" + a.substring(3, 5) + "-" + a.substring(5, a.length)
}, afc.getRandomColor = function () {
    return "#" + ((1 << 24) * Math.random() | 0).toString(16)
}, afc.dateToString = function (e) {
    return sprintf("%4d%02d%02d", e.getFullYear(), e.getMonth() + 1, e.getDate())
}, afc.formatDate = function (e) {
    return parseInt(e, 10) ? (e += "").substring(0, 4) + "/" + e.substring(4, 6) + "/" + e.substring(6, 8) : ""
}, afc.formatDate2 = function (e) {
    return parseInt(e, 10) ? (e += "").substring(2, 4) + "/" + e.substring(4, 6) + "/" + e.substring(6, 8) : ""
}, afc.formatMonth = function (e) {
    return (e += "").substring(0, 4) + "/" + e.substring(4, 6)
}, afc.formatDateTime = function (e) {
    return (e += "").substring(0, 2) + "/" + e.substring(2, 4) + " " + e.substring(4, 6) + ":" + e.substring(6, 8)
}, afc.formatTime = function (e) {
    if (!parseInt(e, 10)) return "";
    var t = {
        31000000: "장마감",
        41000000: "시간외마감",
        51000000: "장전",
        61000000: "장중",
        71000000: "장후",
        81000000: "단일가",
        88000000: "단일가 마감",
        91000000: "BN 마감",
        91000001: "BN 마감",
        91000002: "BN 마감",
        91000003: "BN 마감",
        91000004: "BN 마감",
        91000005: "BN 마감",
        91000006: "BN 마감",
        91000007: "BN 마감",
        91000008: "단일가BN마감"
    };
    return t[e] ? t[e] : (e += "", ["3", "4", "5", "6", "7", "8", "9"].indexOf(e.substring(0, 1)) > -1 && (e = "0" + e), e.substring(0, 2) + ":" + e.substring(2, 4))
}, afc.formatHMS = function (e) {
    if (!parseInt(e, 10)) return "";
    var t = {
        31000000: "장마감",
        41000000: "시간외마감",
        51000000: "장전",
        61000000: "장중",
        71000000: "장후",
        81000000: "단일가 마감",
        88000000: "단일가 마감",
        91000000: "BN 마감",
        91000001: "BN 마감",
        91000002: "BN 마감",
        91000003: "BN 마감",
        91000004: "BN 마감",
        91000005: "BN 마감",
        91000006: "BN 마감",
        91000007: "BN 마감",
        91000008: "단일가BN마감"
    };
    return t[e] ? t[e] : (e += "", ["3", "4", "5", "6", "7", "8", "9"].indexOf(e.substring(0, 1)) > -1 && (e = "0" + e), e.substring(0, 2) + ":" + e.substring(2, 4) + ":" + e.substring(4, 6))
}, afc.formatTic = function (e) {
    return (e += "").substring(0, 2) + " " + e.substring(2, 4) + ":" + e.substring(4, 6) + ":" + e.substring(6, 8)
}, afc.formatSecond = function (e) {
    return 3600 * (e += "").substring(0, 2) + 60 * e.substring(2, 4) + 1 * e.substring(4, 6)
}, afc.switchButtonColor = function (e) {
    e.removeClass("BT38_K00007"), "ON" == e.getText() ? (e.removeClass("BT92_K06102"), e.addClass("BT91_K06101")) : (e.removeClass("BT91_K06101"), e.addClass("BT92_K06102"))
}, afc.returnAsIt = function (e) {
    return e
}, afc.abs = function (e) {
    return "-" == (e = e.toString()).charAt(0) ? e.substring(1) : e
}, afc.addPercent = function (e) {
    return e + "%"
}, afc.absComma = function (e) {
    return afc.addComma(afc.abs(e))
}, afc.intComma = function (e) {
    return afc.addComma(parseInt(e))
}, afc.absPercent = function (e) {
    return afc.abs(e) + "%"
}, afc.commaPercent = function (e) {
    return afc.addComma(e) + "%"
}, afc.absCommaPercent = function (e) {
    return afc.addComma(e) + "%"
}, afc.plusfloorPercent = function (e) {
    var t = Math.pow(10, 2);
    return parseFloat(parseInt(e * t, 10) / t).toFixed(2) + "%"
}, afc.floor2 = function (e) {
    var t = Math.pow(10, 2);
    return afc.addComma(parseFloat(parseInt(e * t, 10) / t).toFixed(2))
}, afc.toFixed2 = function (e) {
    return afc.addComma(e.toFixed(2))
}, afc.absFloor2 = function (e) {
    var t = Math.pow(10, 2);
    return e = afc.abs(e), afc.addComma(parseFloat(parseInt(e * t, 10) / t).toFixed(2))
}, afc.absFloor1 = function (e) {
    var t = Math.pow(10, 1);
    return e = afc.abs(e), afc.addComma(parseFloat(parseInt(e * t, 10) / t).toFixed(1))
}, afc.floor2Per = function (e) {
    return e ? afc.toFixed(e, 2) + "%" : null
}, afc.toFixed = function (e, t) {
    if (void 0 != e && void 0 != t) {
        var a = e.toString().split(".");
        return void 0 != a[1] && a[1].length > t ? parseFloat(a[0] + "." + a[1].substring(0, t)).toFixed(t) : parseFloat(e).toFixed(t)
    }
    for (var r = "0.", n = 0; n < t; n++) r += "0";
    return r
}, afc.absFloor2Per = function (e) {
    var t = Math.pow(10, 2);
    return e = afc.abs(e), parseFloat(parseInt(e * t, 10) / t).toFixed(2) + "%"
}, afc.sigaTotalAmount = function (e) {
    return e ? (e /= 1e9) < 0 ? e.toFixed(2) : afc.addComma(parseInt(e, 10)) : "0"
}, afc.capitalAmount = function (e) {
    return e ? (e /= 1e6) < 0 ? e.toFixed(2) : afc.addComma(parseInt(e, 10)) : "0"
}, afc.addCommaIfFixed = function (e) {
    return e ? e.toString().indexOf(".") > -1 ? (e < 0 && (e *= -1), e = 1 * parseFloat(e), afc.addComma(e.toFixed(2))) : afc.addComma(e) : 0
}, afc.absCommaIfFixed = function (e) {
    return e ? e.toString().indexOf(".") > -1 ? (e < 0 && (e *= -1), (e = 1 * afc.absComma(parseFloat(e))).toFixed(2)) : afc.absComma(e) : 0
}, afc.oneHundredMillionAmount = function (e) {
    return e ? (e /= 1e8) < 0 ? e.toFixed(2) : afc.addComma(parseInt(e, 10)) : "0"
}, afc.isResize = !0, Date.prototype.format = function (e) {
    if (!this.valueOf()) return " ";
    var t = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
        a = this;
    return e.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function (e) {
        switch (e) {
            case "yyyy":
                return a.getFullYear();
            case "yy":
                return (a.getFullYear() % 1e3).zf(2);
            case "MM":
                return (a.getMonth() + 1).zf(2);
            case "dd":
                return a.getDate().zf(2);
            case "E":
                return t[a.getDay()];
            case "HH":
                return a.getHours().zf(2);
            case "hh":
                return ((h = a.getHours() % 12) ? h : 12).zf(2);
            case "mm":
                return a.getMinutes().zf(2);
            case "ss":
                return a.getSeconds().zf(2);
            case "a/p":
                return a.getHours() < 12 ? "오전" : "오후";
            default:
                return e
        }
    })
}, String.prototype.str = function (e) {
    for (var t = "", a = 0; a++ < e;) t += this;
    return t
}, String.prototype.zf = function (e) {
    return "0".str(e - this.length) + this
}, Number.prototype.zf = function (e) {
    return this.toString().zf(e)
}, window.onerror = function (e, t, a) {
    // a && t && theApp && theApp.onError(e, t, a)
}
// afc.deviceCheck(), afc.browserCheck(), window._afc || afc.makeMeta(), afc.loadCSSIfNotLoaded = function () {
//     for (var e = document.styleSheets, t = document.getElementsByTagName("head")[0], a = e.length, r = 0; r < a; r++)
//         if (0 == e[r].cssRules.length) {
//             e[r].disabled = !0;
//             var n = document.createElement("link");
//             n.rel = "stylesheet", n.href = e[r].href, t.appendChild(n)
//         }
// };