function WebsocketIO(t, o) {
  NetworkIO.call(this, t), this.socket = null, this.protocols = "", this.isSSL = o
}
afc.extendsClass(WebsocketIO, NetworkIO), WebsocketIO.prototype.isStart = function () {
  return null != this.socket
}, WebsocketIO.prototype.startIO = function (t, o) {
  if (!this.isStart()) {
    n = this;
    this.selfClose = !1, this.address = t, this.port = o;
    var s = "ws://";
    this.isSSL && (s = "wss://");
    var e = new WebSocket(s + t + ":" + o, this.protocols);
    e.binaryType = "arraybuffer";
    var n = this;
    e.onopen = function (t) {
      n.socket = e, n._onConnected(!0)
    }, e.onmessage = function (t) {
      n.onReceived(t.data)
    }, e.onclose = function (t) {
      afc.isIos && afc.iosVer < 11 && 1006 == t.code && (n.isStart() || (e.isConnectFail = !0, n._onConnected(!1))), e.isConnectFail || n.onClosed()
    }, e.onerror = function (t) {
      n.isStart() || (e.isConnectFail = !0, n._onConnected(!1))
    }
  }
}, WebsocketIO.prototype.stopIO = function (t) {
  this.isStart() && (this.selfClose = !t, this.socket.close(), this.socket = null)
}, WebsocketIO.prototype.sendData = function (t, o) {
  this.isStart() && this.socket.send(t, o)
}, WebsocketIO.prototype.onReceived = function (t) {};