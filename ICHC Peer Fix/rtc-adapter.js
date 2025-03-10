(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.adapter = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';
var _adapter_factory = require('./adapter_factory.js');var adapter = (0, _adapter_factory.adapterFactory)({ window: typeof window === 'undefined' ? undefined : window });module.exports = adapter; },{"./adapter_factory.js":2}],2:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
exports.adapterFactory = adapterFactory;
var _utils = require('./utils');
var utils = _interopRequireWildcard(_utils);
var _chrome_shim = require('./chrome/chrome_shim');
var chromeShim = _interopRequireWildcard(_chrome_shim);
var _edge_shim = require('./edge/edge_shim');
var edgeShim = _interopRequireWildcard(_edge_shim);
var _firefox_shim = require('./firefox/firefox_shim');
var firefoxShim = _interopRequireWildcard(_firefox_shim);
var _safari_shim = require('./safari/safari_shim');
var safariShim = _interopRequireWildcard(_safari_shim);
var _common_shim = require('./common_shim');
var commonShim = _interopRequireWildcard(_common_shim);
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function adapterFactory() {
var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
window = _ref.window;
var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {shimChrome: true,shimFirefox: true,shimEdge: true,shimSafari: true};
var logging = utils.log;
var browserDetails = utils.detectBrowser(window);
var adapter = {browserDetails: browserDetails,commonShim: commonShim,extractVersion: utils.extractVersion,disableLog: utils.disableLog,disableWarnings: utils.disableWarnings};
switch (browserDetails.browser) {case 'chrome':if (!chromeShim || !chromeShim.shimPeerConnection || !options.shimChrome) {logging('Chrome shim is not included in this adapter release.');return adapter;}if (browserDetails.version === null) {logging('Chrome shim can not determine version, not shimming.');return adapter;}logging('adapter.js shimming chrome.');adapter.browserShim = chromeShim;chromeShim.shimGetUserMedia(window);chromeShim.shimMediaStream(window);chromeShim.shimPeerConnection(window);chromeShim.shimOnTrack(window);chromeShim.shimAddTrackRemoveTrack(window);chromeShim.shimGetSendersWithDtmf(window);chromeShim.shimGetStats(window);chromeShim.shimSenderReceiverGetStats(window);chromeShim.fixNegotiationNeeded(window);commonShim.shimRTCIceCandidate(window);commonShim.shimConnectionState(window);commonShim.shimMaxMessageSize(window);commonShim.shimSendThrowTypeError(window);commonShim.removeAllowExtmapMixed(window);break;case 'firefox':if (!firefoxShim || !firefoxShim.shimPeerConnection || !options.shimFirefox) {logging('Firefox shim is not included in this adapter release.');return adapter;}logging('adapter.js shimming firefox.');adapter.browserShim = firefoxShim;firefoxShim.shimGetUserMedia(window);firefoxShim.shimPeerConnection(window);firefoxShim.shimOnTrack(window);firefoxShim.shimRemoveStream(window);firefoxShim.shimSenderGetStats(window);firefoxShim.shimReceiverGetStats(window);firefoxShim.shimRTCDataChannel(window);firefoxShim.shimAddTransceiver(window);firefoxShim.shimGetParameters(window);firefoxShim.shimCreateOffer(window);firefoxShim.shimCreateAnswer(window);commonShim.shimRTCIceCandidate(window);commonShim.shimConnectionState(window);commonShim.shimMaxMessageSize(window);commonShim.shimSendThrowTypeError(window);break;case 'edge':if (!edgeShim || !edgeShim.shimPeerConnection || !options.shimEdge) {logging('MS edge shim is not included in this adapter release.');return adapter;}logging('adapter.js shimming edge.');adapter.browserShim = edgeShim;edgeShim.shimGetUserMedia(window);edgeShim.shimGetDisplayMedia(window);edgeShim.shimPeerConnection(window);edgeShim.shimReplaceTrack(window);commonShim.shimMaxMessageSize(window);commonShim.shimSendThrowTypeError(window);break;case 'safari':if (!safariShim || !options.shimSafari) {logging('Safari shim is not included in this adapter release.');return adapter;}logging('adapter.js shimming safari.');adapter.browserShim = safariShim;safariShim.shimRTCIceServerUrls(window);safariShim.shimCreateOfferLegacy(window);safariShim.shimCallbacksAPI(window);safariShim.shimLocalStreamsAPI(window);safariShim.shimRemoteStreamsAPI(window);safariShim.shimTrackEventTransceiver(window);safariShim.shimGetUserMedia(window);safariShim.shimAudioContext(window);commonShim.shimRTCIceCandidate(window);commonShim.shimMaxMessageSize(window);commonShim.shimSendThrowTypeError(window);commonShim.removeAllowExtmapMixed(window);break;default:logging('Unsupported browser!');break;}return adapter;}
},{"./chrome/chrome_shim":3,"./common_shim":6,"./edge/edge_shim":7,"./firefox/firefox_shim":11,"./safari/safari_shim":14,"./utils":15}],3:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, "__esModule", {
value: true
});
exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
var _getusermedia = require('./getusermedia');
Object.defineProperty(exports, 'shimGetUserMedia', {
enumerable: true,
get: function get() {
return _getusermedia.shimGetUserMedia;
}
});
var _getdisplaymedia = require('./getdisplaymedia');
Object.defineProperty(exports, 'shimGetDisplayMedia', {
enumerable: true,
get: function get() {
return _getdisplaymedia.shimGetDisplayMedia;
}
});
exports.shimMediaStream = shimMediaStream;
exports.shimOnTrack = shimOnTrack;
exports.shimGetSendersWithDtmf = shimGetSendersWithDtmf;
exports.shimGetStats = shimGetStats;
exports.shimSenderReceiverGetStats = shimSenderReceiverGetStats;
exports.shimAddTrackRemoveTrackWithNative = shimAddTrackRemoveTrackWithNative;
exports.shimAddTrackRemoveTrack = shimAddTrackRemoveTrack;
exports.shimPeerConnection = shimPeerConnection;
exports.fixNegotiationNeeded = fixNegotiationNeeded;
var _utils = require('../utils.js');
var utils = _interopRequireWildcard(_utils);
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function shimMediaStream(window) {
window.MediaStream = window.MediaStream || window.webkitMediaStream;
}
function shimOnTrack(window) {
if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
get: function get() {
return this._ontrack;
},
set: function set(f) {
if (this._ontrack) {
this.removeEventListener('track', this._ontrack);
}
this.addEventListener('track', this._ontrack = f);
},
enumerable: true,
configurable: true
});
var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
var _this = this;
if (!this._ontrackpoly) {
this._ontrackpoly = function (e) {
e.stream.addEventListener('addtrack', function (te) {
var receiver = void 0;
if (window.RTCPeerConnection.prototype.getReceivers) {
receiver = _this.getReceivers().find(function (r) {
return r.track && r.track.id === te.track.id;
});
} else {
receiver = { track: te.track };
}
var event = new Event('track');
event.track = te.track;
event.receiver = receiver;
event.transceiver = { receiver: receiver };
event.streams = [e.stream];
_this.dispatchEvent(event);
});
e.stream.getTracks().forEach(function (track) {
var receiver = void 0;
if (window.RTCPeerConnection.prototype.getReceivers) {
receiver = _this.getReceivers().find(function (r) {
return r.track && r.track.id === track.id;
});
} else {
receiver = { track: track };
}
var event = new Event('track');
event.track = track;
event.receiver = receiver;
event.transceiver = { receiver: receiver };
event.streams = [e.stream];
_this.dispatchEvent(event);
});
};
this.addEventListener('addstream', this._ontrackpoly);
}
return origSetRemoteDescription.apply(this, arguments);
};
} else {
utils.wrapPeerConnectionEvent(window, 'track', function (e) {
if (!e.transceiver) {
Object.defineProperty(e, 'transceiver', { value: { receiver: e.receiver } });
}
return e;
});
}
}
function shimGetSendersWithDtmf(window) {
if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && !('getSenders' in window.RTCPeerConnection.prototype) && 'createDTMFSender' in window.RTCPeerConnection.prototype) {
var shimSenderWithDtmf = function shimSenderWithDtmf(pc, track) {
return {
track: track,
get dtmf() {
if (this._dtmf === undefined) {
if (track.kind === 'audio') {
this._dtmf = pc.createDTMFSender(track);
} else {
this._dtmf = null;
}
}
return this._dtmf;
},
_pc: pc
};
};
if (!window.RTCPeerConnection.prototype.getSenders) {
window.RTCPeerConnection.prototype.getSenders = function getSenders() {
this._senders = this._senders || [];
return this._senders.slice(); 
};
var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
var sender = origAddTrack.apply(this, arguments);
if (!sender) {
sender = shimSenderWithDtmf(this, track);
this._senders.push(sender);
}
return sender;
};
var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
origRemoveTrack.apply(this, arguments);
var idx = this._senders.indexOf(sender);
if (idx !== -1) {
this._senders.splice(idx, 1);
}
};
}
var origAddStream = window.RTCPeerConnection.prototype.addStream;
window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
var _this2 = this;
this._senders = this._senders || [];
origAddStream.apply(this, [stream]);
stream.getTracks().forEach(function (track) {
_this2._senders.push(shimSenderWithDtmf(_this2, track));
});
};
var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
var _this3 = this;
this._senders = this._senders || [];
origRemoveStream.apply(this, [stream]);
stream.getTracks().forEach(function (track) {
var sender = _this3._senders.find(function (s) {
return s.track === track;
});
if (sender) {
_this3._senders.splice(_this3._senders.indexOf(sender), 1);
}
});
};
} else if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && 'getSenders' in window.RTCPeerConnection.prototype && 'createDTMFSender' in window.RTCPeerConnection.prototype && window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
window.RTCPeerConnection.prototype.getSenders = function getSenders() {
var _this4 = this;
var senders = origGetSenders.apply(this, []);
senders.forEach(function (sender) {
return sender._pc = _this4;
});
return senders;
};
Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
get: function get() {
if (this._dtmf === undefined) {
if (this.track.kind === 'audio') {
this._dtmf = this._pc.createDTMFSender(this.track);
} else {
this._dtmf = null;
}
}
return this._dtmf;
}
});
}
}
function shimGetStats(window) {
if (!window.RTCPeerConnection) {
return;
}
var origGetStats = window.RTCPeerConnection.prototype.getStats;
window.RTCPeerConnection.prototype.getStats = function getStats() {
var _this5 = this;
var _arguments = Array.prototype.slice.call(arguments),
selector = _arguments[0],
onSucc = _arguments[1],
onErr = _arguments[2];
if (arguments.length > 0 && typeof selector === 'function') {
return origGetStats.apply(this, arguments);
}
if (origGetStats.length === 0 && (arguments.length === 0 || typeof selector !== 'function')) {
return origGetStats.apply(this, []);
}
var fixChromeStats_ = function fixChromeStats_(response) {
var standardReport = {};
var reports = response.result();
reports.forEach(function (report) {
var standardStats = {
id: report.id,
timestamp: report.timestamp,
type: {
localcandidate: 'local-candidate',
remotecandidate: 'remote-candidate'
}[report.type] || report.type
};
report.names().forEach(function (name) {
standardStats[name] = report.stat(name);
});
standardReport[standardStats.id] = standardStats;
});
return standardReport;
};
var makeMapStats = function makeMapStats(stats) {
return new Map(Object.keys(stats).map(function (key) {
return [key, stats[key]];
}));
};
if (arguments.length >= 2) {
var successCallbackWrapper_ = function successCallbackWrapper_(response) {
onSucc(makeMapStats(fixChromeStats_(response)));
};
return origGetStats.apply(this, [successCallbackWrapper_, selector]);
}
return new Promise(function (resolve, reject) {
origGetStats.apply(_this5, [function (response) {
resolve(makeMapStats(fixChromeStats_(response)));
}, reject]);
}).then(onSucc, onErr);
};
}
function shimSenderReceiverGetStats(window) {
if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender && window.RTCRtpReceiver)) {
return;
}
if (!('getStats' in window.RTCRtpSender.prototype)) {
var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
if (origGetSenders) {
window.RTCPeerConnection.prototype.getSenders = function getSenders() {
var _this6 = this;
var senders = origGetSenders.apply(this, []);
senders.forEach(function (sender) {
return sender._pc = _this6;
});
return senders;
};
}
var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
if (origAddTrack) {
window.RTCPeerConnection.prototype.addTrack = function addTrack() {
var sender = origAddTrack.apply(this, arguments);
sender._pc = this;
return sender;
};
}
window.RTCRtpSender.prototype.getStats = function getStats() {
var sender = this;
return this._pc.getStats().then(function (result) {
return (
utils.filterStats(result, sender.track, true)
);
});
};
}
if (!('getStats' in window.RTCRtpReceiver.prototype)) {
var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
if (origGetReceivers) {
window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
var _this7 = this;
var receivers = origGetReceivers.apply(this, []);
receivers.forEach(function (receiver) {
return receiver._pc = _this7;
});
return receivers;
};
}
utils.wrapPeerConnectionEvent(window, 'track', function (e) {
e.receiver._pc = e.srcElement;
return e;
});
window.RTCRtpReceiver.prototype.getStats = function getStats() {
var receiver = this;
return this._pc.getStats().then(function (result) {
return utils.filterStats(result, receiver.track, false);
});
};
}
if (!('getStats' in window.RTCRtpSender.prototype && 'getStats' in window.RTCRtpReceiver.prototype)) {
return;
}
var origGetStats = window.RTCPeerConnection.prototype.getStats;
window.RTCPeerConnection.prototype.getStats = function getStats() {
if (arguments.length > 0 && arguments[0] instanceof window.MediaStreamTrack) {
var track = arguments[0];
var sender = void 0;
var receiver = void 0;
var err = void 0;
this.getSenders().forEach(function (s) {
if (s.track === track) {
if (sender) {
err = true;
} else {
sender = s;
}
}
});
this.getReceivers().forEach(function (r) {
if (r.track === track) {
if (receiver) {
err = true;
} else {
receiver = r;
}
}
return r.track === track;
});
if (err || sender && receiver) {
return Promise.reject(new DOMException('There are more than one sender or receiver for the track.', 'InvalidAccessError'));
} else if (sender) {
return sender.getStats();
} else if (receiver) {
return receiver.getStats();
}
return Promise.reject(new DOMException('There is no sender or receiver for the track.', 'InvalidAccessError'));
}
return origGetStats.apply(this, arguments);
};
}
function shimAddTrackRemoveTrackWithNative(window) {
window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
var _this8 = this;
this._shimmedLocalStreams = this._shimmedLocalStreams || {};
return Object.keys(this._shimmedLocalStreams).map(function (streamId) {
return _this8._shimmedLocalStreams[streamId][0];
});
};
var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
if (!stream) {
return origAddTrack.apply(this, arguments);
}
this._shimmedLocalStreams = this._shimmedLocalStreams || {};
var sender = origAddTrack.apply(this, arguments);
if (!this._shimmedLocalStreams[stream.id]) {
this._shimmedLocalStreams[stream.id] = [stream, sender];
} else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) {
this._shimmedLocalStreams[stream.id].push(sender);
}
return sender;
};
var origAddStream = window.RTCPeerConnection.prototype.addStream;
window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
var _this9 = this;
this._shimmedLocalStreams = this._shimmedLocalStreams || {};
stream.getTracks().forEach(function (track) {
var alreadyExists = _this9.getSenders().find(function (s) {
return s.track === track;
});
if (alreadyExists) {
throw new DOMException('Track already exists.', 'InvalidAccessError');
}
});
var existingSenders = this.getSenders();
origAddStream.apply(this, arguments);
var newSenders = this.getSenders().filter(function (newSender) {
return existingSenders.indexOf(newSender) === -1;
});
this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
};
var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
this._shimmedLocalStreams = this._shimmedLocalStreams || {};
delete this._shimmedLocalStreams[stream.id];
return origRemoveStream.apply(this, arguments);
};
var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
var _this10 = this;
this._shimmedLocalStreams = this._shimmedLocalStreams || {};
if (sender) {
Object.keys(this._shimmedLocalStreams).forEach(function (streamId) {
var idx = _this10._shimmedLocalStreams[streamId].indexOf(sender);
if (idx !== -1) {
_this10._shimmedLocalStreams[streamId].splice(idx, 1);
}
if (_this10._shimmedLocalStreams[streamId].length === 1) {
delete _this10._shimmedLocalStreams[streamId];
}
});
}
return origRemoveTrack.apply(this, arguments);
};
}
function shimAddTrackRemoveTrack(window) {
if (!window.RTCPeerConnection) {
return;
}
var browserDetails = utils.detectBrowser(window);
if (window.RTCPeerConnection.prototype.addTrack && browserDetails.version >= 65) {
return shimAddTrackRemoveTrackWithNative(window);
}
var origGetLocalStreams = window.RTCPeerConnection.prototype.getLocalStreams;
window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
var _this11 = this;
var nativeStreams = origGetLocalStreams.apply(this);
this._reverseStreams = this._reverseStreams || {};
return nativeStreams.map(function (stream) {
return _this11._reverseStreams[stream.id];
});
};
var origAddStream = window.RTCPeerConnection.prototype.addStream;
window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
var _this12 = this;
this._streams = this._streams || {};
this._reverseStreams = this._reverseStreams || {};
stream.getTracks().forEach(function (track) {
var alreadyExists = _this12.getSenders().find(function (s) {
return s.track === track;
});
if (alreadyExists) {
throw new DOMException('Track already exists.', 'InvalidAccessError');
}
});
if (!this._reverseStreams[stream.id]) {
var newStream = new window.MediaStream(stream.getTracks());
this._streams[stream.id] = newStream;
this._reverseStreams[newStream.id] = stream;
stream = newStream;
}
origAddStream.apply(this, [stream]);
};
var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
this._streams = this._streams || {};
this._reverseStreams = this._reverseStreams || {};
origRemoveStream.apply(this, [this._streams[stream.id] || stream]);
delete this._reverseStreams[this._streams[stream.id] ? this._streams[stream.id].id : stream.id];
delete this._streams[stream.id];
};
window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
var _this13 = this;
if (this.signalingState === 'closed') {
throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
}
var streams = [].slice.call(arguments, 1);
if (streams.length !== 1 || !streams[0].getTracks().find(function (t) {
return t === track;
})) {
throw new DOMException('The adapter.js addTrack polyfill only supports a single ' + ' stream which is associated with the specified track.', 'NotSupportedError');
}
var alreadyExists = this.getSenders().find(function (s) {
return s.track === track;
});
if (alreadyExists) {
throw new DOMException('Track already exists.', 'InvalidAccessError');
}
this._streams = this._streams || {};
this._reverseStreams = this._reverseStreams || {};
var oldStream = this._streams[stream.id];
if (oldStream) {
oldStream.addTrack(track);
Promise.resolve().then(function () {
_this13.dispatchEvent(new Event('negotiationneeded'));
});
} else {
var newStream = new window.MediaStream([track]);
this._streams[stream.id] = newStream;
this._reverseStreams[newStream.id] = stream;
this.addStream(newStream);
}
return this.getSenders().find(function (s) {
return s.track === track;
});
};
function replaceInternalStreamId(pc, description) {
var sdp = description.sdp;
Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
var externalStream = pc._reverseStreams[internalId];
var internalStream = pc._streams[externalStream.id];
sdp = sdp.replace(new RegExp(internalStream.id, 'g'), externalStream.id);
});
return new RTCSessionDescription({
type: description.type,
sdp: sdp
});
}
function replaceExternalStreamId(pc, description) {
var sdp = description.sdp;
Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
var externalStream = pc._reverseStreams[internalId];
var internalStream = pc._streams[externalStream.id];
sdp = sdp.replace(new RegExp(externalStream.id, 'g'), internalStream.id);
});
return new RTCSessionDescription({
type: description.type,
sdp: sdp
});
}
['createOffer', 'createAnswer'].forEach(function (method) {
var nativeMethod = window.RTCPeerConnection.prototype[method];
var methodObj = _defineProperty({}, method, function () {
var _this14 = this;
var args = arguments;
var isLegacyCall = arguments.length && typeof arguments[0] === 'function';
if (isLegacyCall) {
return nativeMethod.apply(this, [function (description) {
var desc = replaceInternalStreamId(_this14, description);
args[0].apply(null, [desc]);
}, function (err) {
if (args[1]) {
args[1].apply(null, err);
}
}, arguments[2]]);
}
return nativeMethod.apply(this, arguments).then(function (description) {
return replaceInternalStreamId(_this14, description);
});
});
window.RTCPeerConnection.prototype[method] = methodObj[method];
});
var origSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;
window.RTCPeerConnection.prototype.setLocalDescription = function setLocalDescription() {
if (!arguments.length || !arguments[0].type) {
return origSetLocalDescription.apply(this, arguments);
}
arguments[0] = replaceExternalStreamId(this, arguments[0]);
return origSetLocalDescription.apply(this, arguments);
};
var origLocalDescription = Object.getOwnPropertyDescriptor(window.RTCPeerConnection.prototype, 'localDescription');
Object.defineProperty(window.RTCPeerConnection.prototype, 'localDescription', {
get: function get() {
var description = origLocalDescription.get.apply(this);
if (description.type === '') {
return description;
}
return replaceInternalStreamId(this, description);
}
});
window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
var _this15 = this;
if (this.signalingState === 'closed') {
throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
}
if (!sender._pc) {
throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack ' + 'does not implement interface RTCRtpSender.', 'TypeError');
}
var isLocal = sender._pc === this;
if (!isLocal) {
throw new DOMException('Sender was not created by this connection.', 'InvalidAccessError');
}
this._streams = this._streams || {};
var stream = void 0;
Object.keys(this._streams).forEach(function (streamid) {
var hasTrack = _this15._streams[streamid].getTracks().find(function (track) {
return sender.track === track;
});
if (hasTrack) {
stream = _this15._streams[streamid];
}
});
if (stream) {
if (stream.getTracks().length === 1) {
this.removeStream(this._reverseStreams[stream.id]);
} else {
stream.removeTrack(sender.track);
}
this.dispatchEvent(new Event('negotiationneeded'));
}
};
}
function shimPeerConnection(window) {
var browserDetails = utils.detectBrowser(window);
if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) {
window.RTCPeerConnection = window.webkitRTCPeerConnection;
}
if (!window.RTCPeerConnection) {
return;
}
var addIceCandidateNullSupported = window.RTCPeerConnection.prototype.addIceCandidate.length === 0;
if (browserDetails.version < 53) {
['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
var nativeMethod = window.RTCPeerConnection.prototype[method];
var methodObj = _defineProperty({}, method, function () {
arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
return nativeMethod.apply(this, arguments);
});
window.RTCPeerConnection.prototype[method] = methodObj[method];
});
}
var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
window.RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate() {
if (!addIceCandidateNullSupported && !arguments[0]) {
if (arguments[1]) {
arguments[1].apply(null);
}
return Promise.resolve();
}
if (browserDetails.version < 78 && arguments[0] && arguments[0].candidate === '') {
return Promise.resolve();
}
return nativeAddIceCandidate.apply(this, arguments);
};
}
function fixNegotiationNeeded(window) {
var browserDetails = utils.detectBrowser(window);
utils.wrapPeerConnectionEvent(window, 'negotiationneeded', function (e) {
var pc = e.target;
if (browserDetails.version < 72 || pc.getConfiguration && pc.getConfiguration().sdpSemantics === 'plan-b') {
if (pc.signalingState !== 'stable') {
return;
}
}
return e;
});
}
},{"../utils.js":15,"./getdisplaymedia":4,"./getusermedia":5}],4:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, "__esModule", {
value: true
});
exports.shimGetDisplayMedia = shimGetDisplayMedia;
function shimGetDisplayMedia(window, getSourceId) {
if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
return;
}
if (!window.navigator.mediaDevices) {
return;
}
if (typeof getSourceId !== 'function') {
console.error('shimGetDisplayMedia: getSourceId argument is not ' + 'a function');
return;
}
window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
return getSourceId(constraints).then(function (sourceId) {
var widthSpecified = constraints.video && constraints.video.width;
var heightSpecified = constraints.video && constraints.video.height;
var frameRateSpecified = constraints.video && constraints.video.frameRate;
constraints.video = {
mandatory: {
chromeMediaSource: 'desktop',
chromeMediaSourceId: sourceId,
maxFrameRate: frameRateSpecified || 3
}
};
if (widthSpecified) {
constraints.video.mandatory.maxWidth = widthSpecified;
}
if (heightSpecified) {
constraints.video.mandatory.maxHeight = heightSpecified;
}
return window.navigator.mediaDevices.getUserMedia(constraints);
});
};
}
},{}],5:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, "__esModule", {
value: true
});
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
exports.shimGetUserMedia = shimGetUserMedia;
var _utils = require('../utils.js');
var utils = _interopRequireWildcard(_utils);
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
var logging = utils.log;
function shimGetUserMedia(window) {
var navigator = window && window.navigator;
if (!navigator.mediaDevices) {
return;
}
var browserDetails = utils.detectBrowser(window);
var constraintsToChrome_ = function constraintsToChrome_(c) {
if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) !== 'object' || c.mandatory || c.optional) {
return c;
}
var cc = {};
Object.keys(c).forEach(function (key) {
if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
return;
}
var r = _typeof(c[key]) === 'object' ? c[key] : { ideal: c[key] };
if (r.exact !== undefined && typeof r.exact === 'number') {
r.min = r.max = r.exact;
}
var oldname_ = function oldname_(prefix, name) {
if (prefix) {
return prefix + name.charAt(0).toUpperCase() + name.slice(1);
}
return name === 'deviceId' ? 'sourceId' : name;
};
if (r.ideal !== undefined) {
cc.optional = cc.optional || [];
var oc = {};
if (typeof r.ideal === 'number') {
oc[oldname_('min', key)] = r.ideal;
cc.optional.push(oc);
oc = {};
oc[oldname_('max', key)] = r.ideal;
cc.optional.push(oc);
} else {
oc[oldname_('', key)] = r.ideal;
cc.optional.push(oc);
}
}
if (r.exact !== undefined && typeof r.exact !== 'number') {
cc.mandatory = cc.mandatory || {};
cc.mandatory[oldname_('', key)] = r.exact;
} else {
['min', 'max'].forEach(function (mix) {
if (r[mix] !== undefined) {
cc.mandatory = cc.mandatory || {};
cc.mandatory[oldname_(mix, key)] = r[mix];
}
});
}
});
if (c.advanced) {
cc.optional = (cc.optional || []).concat(c.advanced);
}
return cc;
};
var shimConstraints_ = function shimConstraints_(constraints, func) {
if (browserDetails.version >= 61) {
return func(constraints);
}
constraints = JSON.parse(JSON.stringify(constraints));
if (constraints && _typeof(constraints.audio) === 'object') {
var remap = function remap(obj, a, b) {
if (a in obj && !(b in obj)) {
obj[b] = obj[a];
delete obj[a];
}
};
constraints = JSON.parse(JSON.stringify(constraints));
remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
constraints.audio = constraintsToChrome_(constraints.audio);
}
if (constraints && _typeof(constraints.video) === 'object') {
var face = constraints.video.facingMode;
face = face && ((typeof face === 'undefined' ? 'undefined' : _typeof(face)) === 'object' ? face : { ideal: face });
var getSupportedFacingModeLies = browserDetails.version < 66;
if (face && (face.exact === 'user' || face.exact === 'environment' || face.ideal === 'user' || face.ideal === 'environment') && !(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().facingMode && !getSupportedFacingModeLies)) {
delete constraints.video.facingMode;
var matches = void 0;
if (face.exact === 'environment' || face.ideal === 'environment') {
matches = ['back', 'rear'];
} else if (face.exact === 'user' || face.ideal === 'user') {
matches = ['front'];
}
if (matches) {
return navigator.mediaDevices.enumerateDevices().then(function (devices) {
devices = devices.filter(function (d) {
return d.kind === 'videoinput';
});
var dev = devices.find(function (d) {
return matches.some(function (match) {
return d.label.toLowerCase().includes(match);
});
});
if (!dev && devices.length && matches.includes('back')) {
dev = devices[devices.length - 1]; 
}
if (dev) {
constraints.video.deviceId = face.exact ? { exact: dev.deviceId } : { ideal: dev.deviceId };
}
constraints.video = constraintsToChrome_(constraints.video);
logging('chrome: ' + JSON.stringify(constraints));
return func(constraints);
});
}
}
constraints.video = constraintsToChrome_(constraints.video);
}
logging('chrome: ' + JSON.stringify(constraints));
return func(constraints);
};
var shimError_ = function shimError_(e) {
if (browserDetails.version >= 64) {
return e;
}
return {
name: {PermissionDeniedError: 'NotAllowedError',PermissionDismissedError: 'NotAllowedError',InvalidStateError: 'NotAllowedError',DevicesNotFoundError: 'NotFoundError',ConstraintNotSatisfiedError: 'OverconstrainedError',TrackStartError: 'NotReadableError',MediaDeviceFailedDueToShutdown: 'NotAllowedError',MediaDeviceKillSwitchOn: 'NotAllowedError',TabCaptureError: 'AbortError',ScreenCaptureError: 'AbortError',DeviceCaptureError: 'AbortError'}[e.name] || e.name,message: e.message,constraint: e.constraint || e.constraintName,toString: function toString() {return this.name + (this.message && ': ') + this.message;}};};var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {shimConstraints_(constraints, function (c) {navigator.webkitGetUserMedia(c, onSuccess, function (e) {if (onError) {onError(shimError_(e));}});});};navigator.getUserMedia = getUserMedia_.bind(navigator);if (navigator.mediaDevices.getUserMedia) {var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);navigator.mediaDevices.getUserMedia = function (cs) {return shimConstraints_(cs, function (c) {return origGetUserMedia(c).then(function (stream) {if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {stream.getTracks().forEach(function (track) {track.stop();});throw new DOMException('', 'NotFoundError');}return stream;}, function (e) {return Promise.reject(shimError_(e));});});};}}
},{"../utils.js":15}],6:[function(require,module,exports){
'use strict';Object.defineProperty(exports, "__esModule", {value: true});var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };exports.shimRTCIceCandidate = shimRTCIceCandidate;exports.shimMaxMessageSize = shimMaxMessageSize;exports.shimSendThrowTypeError = shimSendThrowTypeError;exports.shimConnectionState = shimConnectionState;exports.removeAllowExtmapMixed = removeAllowExtmapMixed;
var _sdp = require('sdp');
var _sdp2 = _interopRequireDefault(_sdp);
var _utils = require('./utils');
var utils = _interopRequireWildcard(_utils);
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function shimRTCIceCandidate(window) {
if (!window.RTCIceCandidate || window.RTCIceCandidate && 'foundation' in window.RTCIceCandidate.prototype) {
return;
}
var NativeRTCIceCandidate = window.RTCIceCandidate;
window.RTCIceCandidate = function RTCIceCandidate(args) {
if ((typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' && args.candidate && args.candidate.indexOf('a=') === 0) {
args = JSON.parse(JSON.stringify(args));
args.candidate = args.candidate.substr(2);
}
if (args.candidate && args.candidate.length) {
var nativeCandidate = new NativeRTCIceCandidate(args);
var parsedCandidate = _sdp2.default.parseCandidate(args.candidate);
var augmentedCandidate = Object.assign(nativeCandidate, parsedCandidate);augmentedCandidate.toJSON = function toJSON() {return {candidate: augmentedCandidate.candidate,sdpMid: augmentedCandidate.sdpMid,sdpMLineIndex: augmentedCandidate.sdpMLineIndex,usernameFragment: augmentedCandidate.usernameFragment};};return augmentedCandidate;}return new NativeRTCIceCandidate(args);};window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;utils.wrapPeerConnectionEvent(window, 'icecandidate', function (e) {if (e.candidate) {Object.defineProperty(e, 'candidate', {value: new window.RTCIceCandidate(e.candidate),writable: 'false'});}return e;});}function shimMaxMessageSize(window) {if (!window.RTCPeerConnection) {return;}var browserDetails = utils.detectBrowser(window);if (!('sctp' in window.RTCPeerConnection.prototype)) {Object.defineProperty(window.RTCPeerConnection.prototype, 'sctp', {get: function get() {return typeof this._sctp === 'undefined' ? null : this._sctp;}});}var sctpInDescription = function sctpInDescription(description) {if (!description || !description.sdp) {return false;}var sections = _sdp2.default.splitSections(description.sdp);sections.shift();return sections.some(function (mediaSection) {var mLine = _sdp2.default.parseMLine(mediaSection);return mLine && mLine.kind === 'application' && mLine.protocol.indexOf('SCTP') !== -1;});};var getRemoteFirefoxVersion = function getRemoteFirefoxVersion(description) {var match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if (match === null || match.length < 2) {return -1;}var version = parseInt(match[1], 10);return version !== version ? -1 : version;};var getCanSendMaxMessageSize = function getCanSendMaxMessageSize(remoteIsFirefox) {var canSendMaxMessageSize = 65536;if (browserDetails.browser === 'firefox') {if (browserDetails.version < 57) {if (remoteIsFirefox === -1) {canSendMaxMessageSize = 16384;} else {canSendMaxMessageSize = 2147483637;}} else if (browserDetails.version < 60) {canSendMaxMessageSize = browserDetails.version === 57 ? 65535 : 65536;} else {canSendMaxMessageSize = 2147483637;}}return canSendMaxMessageSize;};var getMaxMessageSize = function getMaxMessageSize(description, remoteIsFirefox) {var maxMessageSize = 65536;if (browserDetails.browser === 'firefox' && browserDetails.version === 57) {maxMessageSize = 65535;}var match = _sdp2.default.matchPrefix(description.sdp, 'a=max-message-size:');if (match.length > 0) {maxMessageSize = parseInt(match[0].substr(19), 10);} else if (browserDetails.browser === 'firefox' && remoteIsFirefox !== -1) {maxMessageSize = 2147483637;}return maxMessageSize;};var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {this._sctp = null;if (browserDetails.browser === 'chrome' && browserDetails.version >= 76) {var _getConfiguration = this.getConfiguration(),sdpSemantics = _getConfiguration.sdpSemantics;if (sdpSemantics === 'plan-b') {Object.defineProperty(this, 'sctp', {get: function get() {return typeof this._sctp === 'undefined' ? null : this._sctp;},enumerable: true,configurable: true});}}if (sctpInDescription(arguments[0])) {var isFirefox = getRemoteFirefoxVersion(arguments[0]);var canSendMMS = getCanSendMaxMessageSize(isFirefox);var remoteMMS = getMaxMessageSize(arguments[0], isFirefox);var maxMessageSize = void 0;if (canSendMMS === 0 && remoteMMS === 0) {maxMessageSize = Number.POSITIVE_INFINITY;} else if (canSendMMS === 0 || remoteMMS === 0) {maxMessageSize = Math.max(canSendMMS, remoteMMS);} else {maxMessageSize = Math.min(canSendMMS, remoteMMS);}var sctp = {};Object.defineProperty(sctp, 'maxMessageSize', {get: function get() {return maxMessageSize;}});this._sctp = sctp;}return origSetRemoteDescription.apply(this, arguments);};}function shimSendThrowTypeError(window) {if (!(window.RTCPeerConnection && 'createDataChannel' in window.RTCPeerConnection.prototype)) {return;}function wrapDcSend(dc, pc) {var origDataChannelSend = dc.send;dc.send = function send() {var data = arguments[0];var length = data.length || data.size || data.byteLength;if (dc.readyState === 'open' && pc.sctp && length > pc.sctp.maxMessageSize) {throw new TypeError('Message too large (can send a maximum of ' + pc.sctp.maxMessageSize + ' bytes)');}return origDataChannelSend.apply(dc, arguments);};}var origCreateDataChannel = window.RTCPeerConnection.prototype.createDataChannel;window.RTCPeerConnection.prototype.createDataChannel = function createDataChannel() {var dataChannel = origCreateDataChannel.apply(this, arguments);wrapDcSend(dataChannel, this);return dataChannel;};utils.wrapPeerConnectionEvent(window, 'datachannel', function (e) {wrapDcSend(e.channel, e.target);return e;});}function shimConnectionState(window) {if (!window.RTCPeerConnection || 'connectionState' in window.RTCPeerConnection.prototype) {return;}var proto = window.RTCPeerConnection.prototype;Object.defineProperty(proto, 'connectionState', {get: function get() {return {completed: 'connected',checking: 'connecting'}[this.iceConnectionState] || this.iceConnectionState;},enumerable: true,configurable: true});Object.defineProperty(proto, 'onconnectionstatechange', {get: function get() {return this._onconnectionstatechange || null;},set: function set(cb) {if (this._onconnectionstatechange) {this.removeEventListener('connectionstatechange', this._onconnectionstatechange);delete this._onconnectionstatechange;}if (cb) {this.addEventListener('connectionstatechange', this._onconnectionstatechange = cb);}},enumerable: true,configurable: true});['setLocalDescription', 'setRemoteDescription'].forEach(function (method) {var origMethod = proto[method];proto[method] = function () {if (!this._connectionstatechangepoly) {this._connectionstatechangepoly = function (e) {var pc = e.target;if (pc._lastConnectionState !== pc.connectionState) {pc._lastConnectionState = pc.connectionState;var newEvent = new Event('connectionstatechange', e);pc.dispatchEvent(newEvent);}return e;};this.addEventListener('iceconnectionstatechange', this._connectionstatechangepoly);}return origMethod.apply(this, arguments);};});}function removeAllowExtmapMixed(window) {if (!window.RTCPeerConnection) {return;}var browserDetails = utils.detectBrowser(window);if (browserDetails.browser === 'chrome' && browserDetails.version >= 71) {return;}if (browserDetails.browser === 'safari' && browserDetails.version >= 605) {return;}var nativeSRD = window.RTCPeerConnection.prototype.setRemoteDescription;window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription(desc) {if (desc && desc.sdp && desc.sdp.indexOf('\na=extmap-allow-mixed') !== -1) {desc.sdp = desc.sdp.split('\n').filter(function (line) {return line.trim() !== 'a=extmap-allow-mixed';}).join('\n');}return nativeSRD.apply(this, arguments);};}
},{"./utils":15,"sdp":17}],7:[function(require,module,exports){
'use strict';Object.defineProperty(exports, "__esModule", {value: true});exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;var _getusermedia = require('./getusermedia');Object.defineProperty(exports, 'shimGetUserMedia', {enumerable: true,get: function get() {return _getusermedia.shimGetUserMedia;}});var _getdisplaymedia = require('./getdisplaymedia');Object.defineProperty(exports, 'shimGetDisplayMedia', {enumerable: true,get: function get() {return _getdisplaymedia.shimGetDisplayMedia;}});exports.shimPeerConnection = shimPeerConnection;exports.shimReplaceTrack = shimReplaceTrack;
var _utils = require('../utils');
var utils = _interopRequireWildcard(_utils);
var _filtericeservers = require('./filtericeservers');
var _rtcpeerconnectionShim = require('rtcpeerconnection-shim');
var _rtcpeerconnectionShim2 = _interopRequireDefault(_rtcpeerconnectionShim);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function shimPeerConnection(window) {
var browserDetails = utils.detectBrowser(window);
if (window.RTCIceGatherer) {
if (!window.RTCIceCandidate) {
window.RTCIceCandidate = function RTCIceCandidate(args) {
return args;
};
}
if (!window.RTCSessionDescription) {
window.RTCSessionDescription = function RTCSessionDescription(args) {
return args;
};
}
if (browserDetails.version < 15025) {
var origMSTEnabled = Object.getOwnPropertyDescriptor(window.MediaStreamTrack.prototype, 'enabled');
Object.defineProperty(window.MediaStreamTrack.prototype, 'enabled', {
set: function set(value) {
origMSTEnabled.set.call(this, value);
var ev = new Event('enabled');
ev.enabled = value;
this.dispatchEvent(ev);
}
});
}
}
if (window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
get: function get() {
if (this._dtmf === undefined) {
if (this.track.kind === 'audio') {
this._dtmf = new window.RTCDtmfSender(this);
} else if (this.track.kind === 'video') {
this._dtmf = null;
}
}
return this._dtmf;
}
});
}
if (window.RTCDtmfSender && !window.RTCDTMFSender) {
window.RTCDTMFSender = window.RTCDtmfSender;
}
var RTCPeerConnectionShim = (0, _rtcpeerconnectionShim2.default)(window, browserDetails.version);
window.RTCPeerConnection = function RTCPeerConnection(config) {
if (config && config.iceServers) {
config.iceServers = (0, _filtericeservers.filterIceServers)(config.iceServers, browserDetails.version);
utils.log('ICE servers after filtering:', config.iceServers);
}
return new RTCPeerConnectionShim(config);
};
window.RTCPeerConnection.prototype = RTCPeerConnectionShim.prototype;
}
function shimReplaceTrack(window) {
if (window.RTCRtpSender && !('replaceTrack' in window.RTCRtpSender.prototype)) {
window.RTCRtpSender.prototype.replaceTrack = window.RTCRtpSender.prototype.setTrack;
}
}
},{"../utils":15,"./filtericeservers":8,"./getdisplaymedia":9,"./getusermedia":10,"rtcpeerconnection-shim":16}],8:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, "__esModule", {
value: true
});
exports.filterIceServers = filterIceServers;
var _utils = require('../utils');
var utils = _interopRequireWildcard(_utils);
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function filterIceServers(iceServers, edgeVersion) {
var hasTurn = false;
iceServers = JSON.parse(JSON.stringify(iceServers));
return iceServers.filter(function (server) {
if (server && (server.urls || server.url)) {
var urls = server.urls || server.url;
if (server.url && !server.urls) {
utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
}
var isString = typeof urls === 'string';
if (isString) {
urls = [urls];
}
urls = urls.filter(function (url) {
if (url.indexOf('stun:') === 0) {
return false;
}
var validTurn = url.startsWith('turn') && !url.startsWith('turn:[') && url.includes('transport=udp');
if (validTurn && !hasTurn) {
hasTurn = true;
return true;
}
return validTurn && !hasTurn;
});
delete server.url;
server.urls = isString ? urls[0] : urls;
return !!urls.length;
}
});
}
},{"../utils":15}],9:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, "__esModule", {
value: true
});
exports.shimGetDisplayMedia = shimGetDisplayMedia;
function shimGetDisplayMedia(window) {
if (!('getDisplayMedia' in window.navigator)) {
return;
}
if (!window.navigator.mediaDevices) {
return;
}
if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
return;
}
window.navigator.mediaDevices.getDisplayMedia = window.navigator.getDisplayMedia.bind(window.navigator);
}
},{}],10:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, "__esModule", {
value: true
});
exports.shimGetUserMedia = shimGetUserMedia;
function shimGetUserMedia(window) {
var navigator = window && window.navigator;
var shimError_ = function shimError_(e) {
return {
name: { PermissionDeniedError: 'NotAllowedError' }[e.name] || e.name,
message: e.message,
constraint: e.constraint,
toString: function toString() {
return this.name;
}
};
};
var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
navigator.mediaDevices.getUserMedia = function (c) {
return origGetUserMedia(c).catch(function (e) {
return Promise.reject(shimError_(e));
});
};
}
},{}],11:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, "__esModule", {
value: true
});
exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
var _getusermedia = require('./getusermedia');
Object.defineProperty(exports, 'shimGetUserMedia', {
enumerable: true,
get: function get() {
return _getusermedia.shimGetUserMedia;
}
});
var _getdisplaymedia = require('./getdisplaymedia');
Object.defineProperty(exports, 'shimGetDisplayMedia', {
enumerable: true,
get: function get() {
return _getdisplaymedia.shimGetDisplayMedia;
}
});
exports.shimOnTrack = shimOnTrack;
exports.shimPeerConnection = shimPeerConnection;
exports.shimSenderGetStats = shimSenderGetStats;
exports.shimReceiverGetStats = shimReceiverGetStats;
exports.shimRemoveStream = shimRemoveStream;
exports.shimRTCDataChannel = shimRTCDataChannel;
exports.shimAddTransceiver = shimAddTransceiver;
exports.shimGetParameters = shimGetParameters;
exports.shimCreateOffer = shimCreateOffer;
exports.shimCreateAnswer = shimCreateAnswer;
var _utils = require('../utils');
var utils = _interopRequireWildcard(_utils);
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function shimOnTrack(window) {
if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
get: function get() {
return { receiver: this.receiver };
}
});
}
}
function shimPeerConnection(window) {
var browserDetails = utils.detectBrowser(window);
if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !(window.RTCPeerConnection || window.mozRTCPeerConnection)) {
return; 
}
if (!window.RTCPeerConnection && window.mozRTCPeerConnection) {
window.RTCPeerConnection = window.mozRTCPeerConnection;
}
if (browserDetails.version < 53) {
['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
var nativeMethod = window.RTCPeerConnection.prototype[method];
var methodObj = _defineProperty({}, method, function () {
arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
return nativeMethod.apply(this, arguments);
});
window.RTCPeerConnection.prototype[method] = methodObj[method];
});
}
if (browserDetails.version < 68) {
var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
window.RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate() {
if (!arguments[0]) {
if (arguments[1]) {
arguments[1].apply(null);
}
return Promise.resolve();
}
if (arguments[0] && arguments[0].candidate === '') {
return Promise.resolve();
}
return nativeAddIceCandidate.apply(this, arguments);
};
}
var modernStatsTypes = {
inboundrtp: 'inbound-rtp',
outboundrtp: 'outbound-rtp',
candidatepair: 'candidate-pair',
localcandidate: 'local-candidate',
remotecandidate: 'remote-candidate'
};
var nativeGetStats = window.RTCPeerConnection.prototype.getStats;
window.RTCPeerConnection.prototype.getStats = function getStats() {
var _arguments = Array.prototype.slice.call(arguments),
selector = _arguments[0],
onSucc = _arguments[1],
onErr = _arguments[2];
return nativeGetStats.apply(this, [selector || null]).then(function (stats) {
if (browserDetails.version < 53 && !onSucc) {
try {
stats.forEach(function (stat) {
stat.type = modernStatsTypes[stat.type] || stat.type;
});
} catch (e) {
if (e.name !== 'TypeError') {
throw e;
}
stats.forEach(function (stat, i) {
stats.set(i, Object.assign({}, stat, {
type: modernStatsTypes[stat.type] || stat.type
}));
});
}
}
return stats;
}).then(onSucc, onErr);
};
}
function shimSenderGetStats(window) {
if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
return;
}
if (window.RTCRtpSender && 'getStats' in window.RTCRtpSender.prototype) {
return;
}
var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
if (origGetSenders) {
window.RTCPeerConnection.prototype.getSenders = function getSenders() {
var _this = this;
var senders = origGetSenders.apply(this, []);
senders.forEach(function (sender) {
return sender._pc = _this;
});
return senders;
};
}
var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
if (origAddTrack) {
window.RTCPeerConnection.prototype.addTrack = function addTrack() {
var sender = origAddTrack.apply(this, arguments);
sender._pc = this;
return sender;
};
}
window.RTCRtpSender.prototype.getStats = function getStats() {
return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
};
}
function shimReceiverGetStats(window) {
if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
return;
}
if (window.RTCRtpSender && 'getStats' in window.RTCRtpReceiver.prototype) {
return;
}
var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
if (origGetReceivers) {
window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
var _this2 = this;
var receivers = origGetReceivers.apply(this, []);
receivers.forEach(function (receiver) {
return receiver._pc = _this2;
});
return receivers;
};
}
utils.wrapPeerConnectionEvent(window, 'track', function (e) {
e.receiver._pc = e.srcElement;
return e;
});
window.RTCRtpReceiver.prototype.getStats = function getStats() {
return this._pc.getStats(this.track);
};
}
function shimRemoveStream(window) {
if (!window.RTCPeerConnection || 'removeStream' in window.RTCPeerConnection.prototype) {
return;
}
window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
var _this3 = this;
utils.deprecated('removeStream', 'removeTrack');
this.getSenders().forEach(function (sender) {
if (sender.track && stream.getTracks().includes(sender.track)) {
_this3.removeTrack(sender);
}
});
};
}
function shimRTCDataChannel(window) {
if (window.DataChannel && !window.RTCDataChannel) {
window.RTCDataChannel = window.DataChannel;
}
}
function shimAddTransceiver(window) {
if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection)) {
return;
}
var origAddTransceiver = window.RTCPeerConnection.prototype.addTransceiver;
if (origAddTransceiver) {
window.RTCPeerConnection.prototype.addTransceiver = function addTransceiver() {
this.setParametersPromises = [];
var initParameters = arguments[1];
var shouldPerformCheck = initParameters && 'sendEncodings' in initParameters;
if (shouldPerformCheck) {
initParameters.sendEncodings.forEach(function (encodingParam) {
if ('rid' in encodingParam) {
var ridRegex = /^[a-z0-9]{0,16}$/i;
if (!ridRegex.test(encodingParam.rid)) {
throw new TypeError('Invalid RID value provided.');
}
}
if ('scaleResolutionDownBy' in encodingParam) {
if (!(parseFloat(encodingParam.scaleResolutionDownBy) >= 1.0)) {
throw new RangeError('scale_resolution_down_by must be >= 1.0');
}
}
if ('maxFramerate' in encodingParam) {
if (!(parseFloat(encodingParam.maxFramerate) >= 0)) {
throw new RangeError('max_framerate must be >= 0.0');
}
}
});
}
var transceiver = origAddTransceiver.apply(this, arguments);
if (shouldPerformCheck) {
var sender = transceiver.sender;
var params = sender.getParameters();
if (!('encodings' in params) ||
params.encodings.length === 1 && Object.keys(params.encodings[0]).length === 0) {
params.encodings = initParameters.sendEncodings;
sender.sendEncodings = initParameters.sendEncodings;
this.setParametersPromises.push(sender.setParameters(params).then(function () {
delete sender.sendEncodings;
}).catch(function () {
delete sender.sendEncodings;
}));
}
}
return transceiver;
};
}
}
function shimGetParameters(window) {
if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCRtpSender)) {
return;
}
var origGetParameters = window.RTCRtpSender.prototype.getParameters;
if (origGetParameters) {
window.RTCRtpSender.prototype.getParameters = function getParameters() {
var params = origGetParameters.apply(this, arguments);
if (!('encodings' in params)) {
params.encodings = [].concat(this.sendEncodings || [{}]);
}
return params;
};
}
}
function shimCreateOffer(window) {



if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection)) {
return;
}
var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
window.RTCPeerConnection.prototype.createOffer = function createOffer() {
var _this4 = this,
_arguments2 = arguments;
if (this.setParametersPromises && this.setParametersPromises.length) {
return Promise.all(this.setParametersPromises).then(function () {
return origCreateOffer.apply(_this4, _arguments2);
}).finally(function () {
_this4.setParametersPromises = [];
});
}
return origCreateOffer.apply(this, arguments);
};
}
function shimCreateAnswer(window) {



if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection)) {
return;
}
var origCreateAnswer = window.RTCPeerConnection.prototype.createAnswer;
window.RTCPeerConnection.prototype.createAnswer = function createAnswer() {
var _this5 = this,
_arguments3 = arguments;
if (this.setParametersPromises && this.setParametersPromises.length) {
return Promise.all(this.setParametersPromises).then(function () {
return origCreateAnswer.apply(_this5, _arguments3);
}).finally(function () {
_this5.setParametersPromises = [];
});
}
return origCreateAnswer.apply(this, arguments);
};
}
},{"../utils":15,"./getdisplaymedia":12,"./getusermedia":13}],12:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, "__esModule", {
value: true
});
exports.shimGetDisplayMedia = shimGetDisplayMedia;
function shimGetDisplayMedia(window, preferredMediaSource) {
if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
return;
}
if (!window.navigator.mediaDevices) {
return;
}
window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
if (!(constraints && constraints.video)) {
var err = new DOMException('getDisplayMedia without video ' + 'constraints is undefined');
err.name = 'NotFoundError';

err.code = 8;
return Promise.reject(err);
}
if (constraints.video === true) {
constraints.video = { mediaSource: preferredMediaSource };
} else {
constraints.video.mediaSource = preferredMediaSource;
}
return window.navigator.mediaDevices.getUserMedia(constraints);
};
}
},{}],13:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, "__esModule", {
value: true
});
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
exports.shimGetUserMedia = shimGetUserMedia;
var _utils = require('../utils');
var utils = _interopRequireWildcard(_utils);
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function shimGetUserMedia(window) {
var browserDetails = utils.detectBrowser(window);
var navigator = window && window.navigator;
var MediaStreamTrack = window && window.MediaStreamTrack;
navigator.getUserMedia = function (constraints, onSuccess, onError) {
utils.deprecated('navigator.getUserMedia', 'navigator.mediaDevices.getUserMedia');
navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
};
if (!(browserDetails.version > 55 && 'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
var remap = function remap(obj, a, b) {
if (a in obj && !(b in obj)) {
obj[b] = obj[a];
delete obj[a];
}
};
var nativeGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
navigator.mediaDevices.getUserMedia = function (c) {
if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object' && _typeof(c.audio) === 'object') {
c = JSON.parse(JSON.stringify(c));
remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
}
return nativeGetUserMedia(c);
};
if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
var nativeGetSettings = MediaStreamTrack.prototype.getSettings;
MediaStreamTrack.prototype.getSettings = function () {
var obj = nativeGetSettings.apply(this, arguments);
remap(obj, 'mozAutoGainControl', 'autoGainControl');
remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
return obj;
};
}
if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
var nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
MediaStreamTrack.prototype.applyConstraints = function (c) {
if (this.kind === 'audio' && (typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object') {
c = JSON.parse(JSON.stringify(c));
remap(c, 'autoGainControl', 'mozAutoGainControl');
remap(c, 'noiseSuppression', 'mozNoiseSuppression');
}
return nativeApplyConstraints.apply(this, [c]);
};
}
}
}
},{"../utils":15}],14:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, "__esModule", {
value: true
});
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
exports.shimLocalStreamsAPI = shimLocalStreamsAPI;
exports.shimRemoteStreamsAPI = shimRemoteStreamsAPI;
exports.shimCallbacksAPI = shimCallbacksAPI;
exports.shimGetUserMedia = shimGetUserMedia;
exports.shimConstraints = shimConstraints;
exports.shimRTCIceServerUrls = shimRTCIceServerUrls;
exports.shimTrackEventTransceiver = shimTrackEventTransceiver;
exports.shimCreateOfferLegacy = shimCreateOfferLegacy;
exports.shimAudioContext = shimAudioContext;
var _utils = require('../utils');
var utils = _interopRequireWildcard(_utils);
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function shimLocalStreamsAPI(window) {
if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
return;
}
if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) {
window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
if (!this._localStreams) {
this._localStreams = [];
}
return this._localStreams;
};
}
if (!('addStream' in window.RTCPeerConnection.prototype)) {
var _addTrack = window.RTCPeerConnection.prototype.addTrack;
window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
var _this = this;
if (!this._localStreams) {
this._localStreams = [];
}
if (!this._localStreams.includes(stream)) {
this._localStreams.push(stream);
}


stream.getAudioTracks().forEach(function (track) {
return _addTrack.call(_this, track, stream);
});
stream.getVideoTracks().forEach(function (track) {
return _addTrack.call(_this, track, stream);
});
};
window.RTCPeerConnection.prototype.addTrack = function addTrack(track) {
var _this2 = this;
for (var _len = arguments.length, streams = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
streams[_key - 1] = arguments[_key];
}
if (streams) {
streams.forEach(function (stream) {
if (!_this2._localStreams) {
_this2._localStreams = [stream];
} else if (!_this2._localStreams.includes(stream)) {
_this2._localStreams.push(stream);
}
});
}
return _addTrack.apply(this, arguments);
};
}
if (!('removeStream' in window.RTCPeerConnection.prototype)) {
window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
var _this3 = this;
if (!this._localStreams) {
this._localStreams = [];
}
var index = this._localStreams.indexOf(stream);
if (index === -1) {
return;
}
this._localStreams.splice(index, 1);
var tracks = stream.getTracks();
this.getSenders().forEach(function (sender) {
if (tracks.includes(sender.track)) {
_this3.removeTrack(sender);
}
});
};
}
}
function shimRemoteStreamsAPI(window) {
if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
return;
}
if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) {
window.RTCPeerConnection.prototype.getRemoteStreams = function getRemoteStreams() {
return this._remoteStreams ? this._remoteStreams : [];
};
}
if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
get: function get() {
return this._onaddstream;
},
set: function set(f) {
var _this4 = this;
if (this._onaddstream) {
this.removeEventListener('addstream', this._onaddstream);
this.removeEventListener('track', this._onaddstreampoly);
}
this.addEventListener('addstream', this._onaddstream = f);
this.addEventListener('track', this._onaddstreampoly = function (e) {
e.streams.forEach(function (stream) {
if (!_this4._remoteStreams) {
_this4._remoteStreams = [];
}
if (_this4._remoteStreams.includes(stream)) {
return;
}
_this4._remoteStreams.push(stream);
var event = new Event('addstream');
event.stream = stream;
_this4.dispatchEvent(event);
});
});
}
});
var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
var pc = this;
if (!this._onaddstreampoly) {
this.addEventListener('track', this._onaddstreampoly = function (e) {
e.streams.forEach(function (stream) {
if (!pc._remoteStreams) {
pc._remoteStreams = [];
}
if (pc._remoteStreams.indexOf(stream) >= 0) {
return;
}
pc._remoteStreams.push(stream);
var event = new Event('addstream');
event.stream = stream;
pc.dispatchEvent(event);
});
});
}
return origSetRemoteDescription.apply(pc, arguments);
};
}
}
function shimCallbacksAPI(window) {
if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
return;
}
var prototype = window.RTCPeerConnection.prototype;
var origCreateOffer = prototype.createOffer;
var origCreateAnswer = prototype.createAnswer;
var setLocalDescription = prototype.setLocalDescription;
var setRemoteDescription = prototype.setRemoteDescription;
var addIceCandidate = prototype.addIceCandidate;
prototype.createOffer = function createOffer(successCallback, failureCallback) {
var options = arguments.length >= 2 ? arguments[2] : arguments[0];
var promise = origCreateOffer.apply(this, [options]);
if (!failureCallback) {
return promise;
}
promise.then(successCallback, failureCallback);
return Promise.resolve();
};
prototype.createAnswer = function createAnswer(successCallback, failureCallback) {
var options = arguments.length >= 2 ? arguments[2] : arguments[0];
var promise = origCreateAnswer.apply(this, [options]);
if (!failureCallback) {
return promise;
}
promise.then(successCallback, failureCallback);
return Promise.resolve();
};
var withCallback = function withCallback(description, successCallback, failureCallback) {
var promise = setLocalDescription.apply(this, [description]);
if (!failureCallback) {
return promise;
}
promise.then(successCallback, failureCallback);
return Promise.resolve();
};
prototype.setLocalDescription = withCallback;
withCallback = function withCallback(description, successCallback, failureCallback) {
var promise = setRemoteDescription.apply(this, [description]);
if (!failureCallback) {
return promise;
}
promise.then(successCallback, failureCallback);
return Promise.resolve();
};
prototype.setRemoteDescription = withCallback;
withCallback = function withCallback(candidate, successCallback, failureCallback) {
var promise = addIceCandidate.apply(this, [candidate]);
if (!failureCallback) {
return promise;
}
promise.then(successCallback, failureCallback);
return Promise.resolve();
};
prototype.addIceCandidate = withCallback;
}
function shimGetUserMedia(window) {
var navigator = window && window.navigator;
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
var mediaDevices = navigator.mediaDevices;
var _getUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);
navigator.mediaDevices.getUserMedia = function (constraints) {
return _getUserMedia(shimConstraints(constraints));
};
}
if (!navigator.getUserMedia && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
navigator.getUserMedia = function getUserMedia(constraints, cb, errcb) {
navigator.mediaDevices.getUserMedia(constraints).then(cb, errcb);
}.bind(navigator);
}
}
function shimConstraints(constraints) {
if (constraints && constraints.video !== undefined) {
return Object.assign({}, constraints, { video: utils.compactObject(constraints.video) });
}
return constraints;
}
function shimRTCIceServerUrls(window) {
if (!window.RTCPeerConnection) {
return;
}

var OrigPeerConnection = window.RTCPeerConnection;
window.RTCPeerConnection = function RTCPeerConnection(pcConfig, pcConstraints) {
if (pcConfig && pcConfig.iceServers) {
var newIceServers = [];
for (var i = 0; i < pcConfig.iceServers.length; i++) {
var server = pcConfig.iceServers[i];
if (!server.hasOwnProperty('urls') && server.hasOwnProperty('url')) {
utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
server = JSON.parse(JSON.stringify(server));
server.urls = server.url;
delete server.url;
newIceServers.push(server);
} else {
newIceServers.push(pcConfig.iceServers[i]);
}
}
pcConfig.iceServers = newIceServers;
}
return new OrigPeerConnection(pcConfig, pcConstraints);
};
window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;

if ('generateCertificate' in OrigPeerConnection) {
Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
get: function get() {
return OrigPeerConnection.generateCertificate;
}
});
}
}
function shimTrackEventTransceiver(window) {

if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
get: function get() {
return { receiver: this.receiver };
}
});
}
}
function shimCreateOfferLegacy(window) {
var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
window.RTCPeerConnection.prototype.createOffer = function createOffer(offerOptions) {
if (offerOptions) {
if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
}
var audioTransceiver = this.getTransceivers().find(function (transceiver) {
return transceiver.receiver.track.kind === 'audio';
});
if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
if (audioTransceiver.direction === 'sendrecv') {
if (audioTransceiver.setDirection) {
audioTransceiver.setDirection('sendonly');
} else {
audioTransceiver.direction = 'sendonly';
}
} else if (audioTransceiver.direction === 'recvonly') {
if (audioTransceiver.setDirection) {
audioTransceiver.setDirection('inactive');
} else {
audioTransceiver.direction = 'inactive';
}
}
} else if (offerOptions.offerToReceiveAudio === true && !audioTransceiver) {
this.addTransceiver('audio');
}
if (typeof offerOptions.offerToReceiveVideo !== 'undefined') {
offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
}
var videoTransceiver = this.getTransceivers().find(function (transceiver) {
return transceiver.receiver.track.kind === 'video';
});
if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
if (videoTransceiver.direction === 'sendrecv') {
if (videoTransceiver.setDirection) {
videoTransceiver.setDirection('sendonly');
} else {
videoTransceiver.direction = 'sendonly';
}
} else if (videoTransceiver.direction === 'recvonly') {
if (videoTransceiver.setDirection) {
videoTransceiver.setDirection('inactive');
} else {
videoTransceiver.direction = 'inactive';
}
}
} else if (offerOptions.offerToReceiveVideo === true && !videoTransceiver) {
this.addTransceiver('video');
}
}
return origCreateOffer.apply(this, arguments);
};
}
function shimAudioContext(window) {
if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || window.AudioContext) {
return;
}
window.AudioContext = window.webkitAudioContext;
}
},{"../utils":15}],15:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, "__esModule", {
value: true
});
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
exports.extractVersion = extractVersion;
exports.wrapPeerConnectionEvent = wrapPeerConnectionEvent;
exports.disableLog = disableLog;
exports.disableWarnings = disableWarnings;
exports.log = log;
exports.deprecated = deprecated;
exports.detectBrowser = detectBrowser;
exports.compactObject = compactObject;
exports.walkStats = walkStats;
exports.filterStats = filterStats;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var logDisabled_ = true;
var deprecationWarnings_ = true;
function extractVersion(uastring, expr, pos) {
var match = uastring.match(expr);
return match && match.length >= pos && parseInt(match[pos], 10);
}
function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
if (!window.RTCPeerConnection) {
return;
}
var proto = window.RTCPeerConnection.prototype;
var nativeAddEventListener = proto.addEventListener;
proto.addEventListener = function (nativeEventName, cb) {
if (nativeEventName !== eventNameToWrap) {
return nativeAddEventListener.apply(this, arguments);
}
var wrappedCallback = function wrappedCallback(e) {
var modifiedEvent = wrapper(e);
if (modifiedEvent) {
if (cb.handleEvent) {
cb.handleEvent(modifiedEvent);
} else {
cb(modifiedEvent);
}
}
};
this._eventMap = this._eventMap || {};
if (!this._eventMap[eventNameToWrap]) {
this._eventMap[eventNameToWrap] = new Map();
}
this._eventMap[eventNameToWrap].set(cb, wrappedCallback);
return nativeAddEventListener.apply(this, [nativeEventName, wrappedCallback]);
};
var nativeRemoveEventListener = proto.removeEventListener;
proto.removeEventListener = function (nativeEventName, cb) {
if (nativeEventName !== eventNameToWrap || !this._eventMap || !this._eventMap[eventNameToWrap]) {
return nativeRemoveEventListener.apply(this, arguments);
}
if (!this._eventMap[eventNameToWrap].has(cb)) {
return nativeRemoveEventListener.apply(this, arguments);
}
var unwrappedCb = this._eventMap[eventNameToWrap].get(cb);
this._eventMap[eventNameToWrap].delete(cb);
if (this._eventMap[eventNameToWrap].size === 0) {
delete this._eventMap[eventNameToWrap];
}
if (Object.keys(this._eventMap).length === 0) {
delete this._eventMap;
}
return nativeRemoveEventListener.apply(this, [nativeEventName, unwrappedCb]);
};
Object.defineProperty(proto, 'on' + eventNameToWrap, {
get: function get() {
return this['_on' + eventNameToWrap];
},
set: function set(cb) {
if (this['_on' + eventNameToWrap]) {
this.removeEventListener(eventNameToWrap, this['_on' + eventNameToWrap]);
delete this['_on' + eventNameToWrap];
}
if (cb) {
this.addEventListener(eventNameToWrap, this['_on' + eventNameToWrap] = cb);
}
},
enumerable: true,
configurable: true
});
}
function disableLog(bool) {
if (typeof bool !== 'boolean') {
return new Error('Argument type: ' + (typeof bool === 'undefined' ? 'undefined' : _typeof(bool)) + '. Please use a boolean.');
}
logDisabled_ = bool;
return bool ? 'adapter.js logging disabled' : 'adapter.js logging enabled';
}
function disableWarnings(bool) {
if (typeof bool !== 'boolean') {
return new Error('Argument type: ' + (typeof bool === 'undefined' ? 'undefined' : _typeof(bool)) + '. Please use a boolean.');
}
deprecationWarnings_ = !bool;
return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
}
function log() {
if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
if (logDisabled_) {
return;
}
if (typeof console !== 'undefined' && typeof console.log === 'function') {
console.log.apply(console, arguments);
}
}
}
function deprecated(oldMethod, newMethod) {
if (!deprecationWarnings_) {
return;
}
console.warn(oldMethod + ' is deprecated, please use ' + newMethod + ' instead.');
}
function detectBrowser(window) {

var result = { browser: null, version: null };

if (typeof window === 'undefined' || !window.navigator) {
result.browser = 'Not a browser.';
return result;
}
var navigator = window.navigator;
if (navigator.mozGetUserMedia) {
result.browser = 'firefox';
result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
} else if (navigator.webkitGetUserMedia || window.isSecureContext === false && window.webkitRTCPeerConnection && !window.RTCIceGatherer) {
result.browser = 'chrome';
result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
} else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
result.browser = 'edge';
result.version = extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
} else if (window.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
result.browser = 'safari';
result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
result.supportsUnifiedPlan = window.RTCRtpTransceiver && 'currentDirection' in window.RTCRtpTransceiver.prototype;
} else {
result.browser = 'Not a supported browser.';
return result;
}
return result;
}
function isObject(val) {
return Object.prototype.toString.call(val) === '[object Object]';
}
function compactObject(data) {
if (!isObject(data)) {
return data;
}
return Object.keys(data).reduce(function (accumulator, key) {
var isObj = isObject(data[key]);
var value = isObj ? compactObject(data[key]) : data[key];
var isEmptyObject = isObj && !Object.keys(value).length;
if (value === undefined || isEmptyObject) {
return accumulator;
}
return Object.assign(accumulator, _defineProperty({}, key, value));
}, {});
}
function walkStats(stats, base, resultSet) {
if (!base || resultSet.has(base.id)) {
return;
}
resultSet.set(base.id, base);
Object.keys(base).forEach(function (name) {
if (name.endsWith('Id')) {
walkStats(stats, stats.get(base[name]), resultSet);
} else if (name.endsWith('Ids')) {
base[name].forEach(function (id) {
walkStats(stats, stats.get(id), resultSet);
});
}
});
}
function filterStats(result, track, outbound) {
var streamStatsType = outbound ? 'outbound-rtp' : 'inbound-rtp';
var filteredResult = new Map();
if (track === null) {
return filteredResult;
}
var trackStats = [];
result.forEach(function (value) {
if (value.type === 'track' && value.trackIdentifier === track.id) {
trackStats.push(value);
}
});
trackStats.forEach(function (trackStat) {
result.forEach(function (stats) {
if (stats.type === streamStatsType && stats.trackId === trackStat.id) {
walkStats(result, stats, filteredResult);
}
});
});
return filteredResult;
}
},{}],16:[function(require,module,exports){
'use strict';
var SDPUtils = require('sdp');
function fixStatsType(stat) {
return {
inboundrtp: 'inbound-rtp',
outboundrtp: 'outbound-rtp',
candidatepair: 'candidate-pair',
localcandidate: 'local-candidate',
remotecandidate: 'remote-candidate'
}[stat.type] || stat.type;
}
function writeMediaSection(transceiver, caps, type, stream, dtlsRole) {
var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

sdp += SDPUtils.writeIceParameters(
transceiver.iceGatherer.getLocalParameters());

sdp += SDPUtils.writeDtlsParameters(
transceiver.dtlsTransport.getLocalParameters(),
type === 'offer' ? 'actpass' : dtlsRole || 'active');
sdp += 'a=mid:' + transceiver.mid + '\r\n';
if (transceiver.rtpSender && transceiver.rtpReceiver) {
sdp += 'a=sendrecv\r\n';
} else if (transceiver.rtpSender) {
sdp += 'a=sendonly\r\n';
} else if (transceiver.rtpReceiver) {
sdp += 'a=recvonly\r\n';
} else {
sdp += 'a=inactive\r\n';
}
if (transceiver.rtpSender) {
var trackId = transceiver.rtpSender._initialTrackId ||
transceiver.rtpSender.track.id;
transceiver.rtpSender._initialTrackId = trackId;
var msid = 'msid:' + (stream ? stream.id : '-') + ' ' +
trackId + '\r\n';
sdp += 'a=' + msid;
sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
' ' + msid;
if (transceiver.sendEncodingParameters[0].rtx) {
sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
' ' + msid;
sdp += 'a=ssrc-group:FID ' +
transceiver.sendEncodingParameters[0].ssrc + ' ' +
transceiver.sendEncodingParameters[0].rtx.ssrc +
'\r\n';
}
}

sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
' cname:' + SDPUtils.localCName + '\r\n';
if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
' cname:' + SDPUtils.localCName + '\r\n';
}
return sdp;
}
function filterIceServers(iceServers, edgeVersion) {
var hasTurn = false;
iceServers = JSON.parse(JSON.stringify(iceServers));
return iceServers.filter(function(server) {
if (server && (server.urls || server.url)) {
var urls = server.urls || server.url;
if (server.url && !server.urls) {
console.warn('RTCIceServer.url is deprecated! Use urls instead.');
}
var isString = typeof urls === 'string';
if (isString) {
urls = [urls];
}
urls = urls.filter(function(url) {
var validTurn = url.indexOf('turn:') === 0 &&
url.indexOf('transport=udp') !== -1 &&
url.indexOf('turn:[') === -1 &&
!hasTurn;
if (validTurn) {
hasTurn = true;
return true;
}
return url.indexOf('stun:') === 0 && edgeVersion >= 14393 &&
url.indexOf('?transport=udp') === -1;
});
delete server.url;
server.urls = isString ? urls[0] : urls;
return !!urls.length;
}
});
}
function getCommonCapabilities(localCapabilities, remoteCapabilities) {
var commonCapabilities = {
codecs: [],
headerExtensions: [],
fecMechanisms: []
};
var findCodecByPayloadType = function(pt, codecs) {
pt = parseInt(pt, 10);
for (var i = 0; i < codecs.length; i++) {
if (codecs[i].payloadType === pt ||
codecs[i].preferredPayloadType === pt) {
return codecs[i];
}
}
};
var rtxCapabilityMatches = function(lRtx, rRtx, lCodecs, rCodecs) {
var lCodec = findCodecByPayloadType(lRtx.parameters.apt, lCodecs);
var rCodec = findCodecByPayloadType(rRtx.parameters.apt, rCodecs);
return lCodec && rCodec &&
lCodec.name.toLowerCase() === rCodec.name.toLowerCase();
};
localCapabilities.codecs.forEach(function(lCodec) {
for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
var rCodec = remoteCapabilities.codecs[i];
if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() &&
lCodec.clockRate === rCodec.clockRate) {
if (lCodec.name.toLowerCase() === 'rtx' &&
lCodec.parameters && rCodec.parameters.apt) {


if (!rtxCapabilityMatches(lCodec, rCodec,
localCapabilities.codecs, remoteCapabilities.codecs)) {
continue;
}
}
rCodec = JSON.parse(JSON.stringify(rCodec)); 
rCodec.numChannels = Math.min(lCodec.numChannels,
rCodec.numChannels);
commonCapabilities.codecs.push(rCodec);
rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(function(fb) {
for (var j = 0; j < lCodec.rtcpFeedback.length; j++) {
if (lCodec.rtcpFeedback[j].type === fb.type &&
lCodec.rtcpFeedback[j].parameter === fb.parameter) {
return true;
}
}
return false;
});
break;
}
}
});
localCapabilities.headerExtensions.forEach(function(lHeaderExtension) {
for (var i = 0; i < remoteCapabilities.headerExtensions.length;
 i++) {
var rHeaderExtension = remoteCapabilities.headerExtensions[i];
if (lHeaderExtension.uri === rHeaderExtension.uri) {
commonCapabilities.headerExtensions.push(rHeaderExtension);
break;
}
}
});

return commonCapabilities;
}
function isActionAllowedInSignalingState(action, type, signalingState) {
return {
offer: {
setLocalDescription: ['stable', 'have-local-offer'],
setRemoteDescription: ['stable', 'have-remote-offer']
},
answer: {
setLocalDescription: ['have-remote-offer', 'have-local-pranswer'],
setRemoteDescription: ['have-local-offer', 'have-remote-pranswer']
}
}[type][action].indexOf(signalingState) !== -1;
}
function maybeAddCandidate(iceTransport, candidate) {


var alreadyAdded = iceTransport.getRemoteCandidates()
.find(function(remoteCandidate) {
return candidate.foundation === remoteCandidate.foundation &&
candidate.ip === remoteCandidate.ip &&
candidate.port === remoteCandidate.port &&
candidate.priority === remoteCandidate.priority &&
candidate.protocol === remoteCandidate.protocol &&
candidate.type === remoteCandidate.type;
});
if (!alreadyAdded) {
iceTransport.addRemoteCandidate(candidate);
}
return !alreadyAdded;
}
function makeError(name, description) {
var e = new Error(description);
e.name = name;

e.code = {
NotSupportedError: 9,
InvalidStateError: 11,
InvalidAccessError: 15,
TypeError: undefined,
OperationError: undefined
}[name];
return e;
}
module.exports = function(window, edgeVersion) {



function addTrackToStreamAndFireEvent(track, stream) {
stream.addTrack(track);
stream.dispatchEvent(new window.MediaStreamTrackEvent('addtrack',
{track: track}));
}
function removeTrackFromStreamAndFireEvent(track, stream) {
stream.removeTrack(track);
stream.dispatchEvent(new window.MediaStreamTrackEvent('removetrack',
{track: track}));
}
function fireAddTrack(pc, track, receiver, streams) {
var trackEvent = new Event('track');
trackEvent.track = track;
trackEvent.receiver = receiver;
trackEvent.transceiver = {receiver: receiver};
trackEvent.streams = streams;
window.setTimeout(function() {
pc._dispatchEvent('track', trackEvent);
});
}
var RTCPeerConnection = function(config) {
var pc = this;
var _eventTarget = document.createDocumentFragment();
['addEventListener', 'removeEventListener', 'dispatchEvent']
.forEach(function(method) {
pc[method] = _eventTarget[method].bind(_eventTarget);
});
this.canTrickleIceCandidates = null;
this.needNegotiation = false;
this.localStreams = [];
this.remoteStreams = [];
this._localDescription = null;
this._remoteDescription = null;
this.signalingState = 'stable';
this.iceConnectionState = 'new';
this.connectionState = 'new';
this.iceGatheringState = 'new';
config = JSON.parse(JSON.stringify(config || {}));
this.usingBundle = config.bundlePolicy === 'max-bundle';
if (config.rtcpMuxPolicy === 'negotiate') {
throw(makeError('NotSupportedError',
'rtcpMuxPolicy \'negotiate\' is not supported'));
} else if (!config.rtcpMuxPolicy) {
config.rtcpMuxPolicy = 'require';
}
switch (config.iceTransportPolicy) {
case 'all':
case 'relay':
break;
default:
config.iceTransportPolicy = 'all';
break;
}
switch (config.bundlePolicy) {
case 'balanced':
case 'max-compat':
case 'max-bundle':
break;
default:
config.bundlePolicy = 'balanced';
break;
}
config.iceServers = filterIceServers(config.iceServers || [], edgeVersion);
this._iceGatherers = [];
if (config.iceCandidatePoolSize) {
for (var i = config.iceCandidatePoolSize; i > 0; i--) {
this._iceGatherers.push(new window.RTCIceGatherer({
iceServers: config.iceServers,
gatherPolicy: config.iceTransportPolicy
}));
}
} else {
config.iceCandidatePoolSize = 0;
}
this._config = config;
this.transceivers = [];
this._sdpSessionId = SDPUtils.generateSessionId();
this._sdpSessionVersion = 0;
this._dtlsRole = undefined; 
this._isClosed = false;
};
Object.defineProperty(RTCPeerConnection.prototype, 'localDescription', {
configurable: true,
get: function() {
return this._localDescription;
}
});
Object.defineProperty(RTCPeerConnection.prototype, 'remoteDescription', {
configurable: true,
get: function() {
return this._remoteDescription;
}
});

RTCPeerConnection.prototype.onicecandidate = null;
RTCPeerConnection.prototype.onaddstream = null;
RTCPeerConnection.prototype.ontrack = null;
RTCPeerConnection.prototype.onremovestream = null;
RTCPeerConnection.prototype.onsignalingstatechange = null;
RTCPeerConnection.prototype.oniceconnectionstatechange = null;
RTCPeerConnection.prototype.onconnectionstatechange = null;
RTCPeerConnection.prototype.onicegatheringstatechange = null;
RTCPeerConnection.prototype.onnegotiationneeded = null;
RTCPeerConnection.prototype.ondatachannel = null;
RTCPeerConnection.prototype._dispatchEvent = function(name, event) {
if (this._isClosed) {
return;
}
this.dispatchEvent(event);
if (typeof this['on' + name] === 'function') {
this['on' + name](event);
}
};
RTCPeerConnection.prototype._emitGatheringStateChange = function() {
var event = new Event('icegatheringstatechange');
this._dispatchEvent('icegatheringstatechange', event);
};
RTCPeerConnection.prototype.getConfiguration = function() {
return this._config;
};
RTCPeerConnection.prototype.getLocalStreams = function() {
return this.localStreams;
};
RTCPeerConnection.prototype.getRemoteStreams = function() {
return this.remoteStreams;
};


RTCPeerConnection.prototype._createTransceiver = function(kind, doNotAdd) {
var hasBundleTransport = this.transceivers.length > 0;
var transceiver = {
track: null,
iceGatherer: null,
iceTransport: null,
dtlsTransport: null,
localCapabilities: null,
remoteCapabilities: null,
rtpSender: null,
rtpReceiver: null,
kind: kind,
mid: null,
sendEncodingParameters: null,
recvEncodingParameters: null,
stream: null,
associatedRemoteMediaStreams: [],
wantReceive: true
};
if (this.usingBundle && hasBundleTransport) {
transceiver.iceTransport = this.transceivers[0].iceTransport;
transceiver.dtlsTransport = this.transceivers[0].dtlsTransport;
} else {
var transports = this._createIceAndDtlsTransports();
transceiver.iceTransport = transports.iceTransport;
transceiver.dtlsTransport = transports.dtlsTransport;
}
if (!doNotAdd) {
this.transceivers.push(transceiver);
}
return transceiver;
};
RTCPeerConnection.prototype.addTrack = function(track, stream) {
if (this._isClosed) {
throw makeError('InvalidStateError',
'Attempted to call addTrack on a closed peerconnection.');
}
var alreadyExists = this.transceivers.find(function(s) {
return s.track === track;
});
if (alreadyExists) {
throw makeError('InvalidAccessError', 'Track already exists.');
}
var transceiver;
for (var i = 0; i < this.transceivers.length; i++) {
if (!this.transceivers[i].track &&
this.transceivers[i].kind === track.kind) {
transceiver = this.transceivers[i];
}
}
if (!transceiver) {
transceiver = this._createTransceiver(track.kind);
}
this._maybeFireNegotiationNeeded();
if (this.localStreams.indexOf(stream) === -1) {
this.localStreams.push(stream);
}
transceiver.track = track;
transceiver.stream = stream;
transceiver.rtpSender = new window.RTCRtpSender(track,
transceiver.dtlsTransport);
return transceiver.rtpSender;
};
RTCPeerConnection.prototype.addStream = function(stream) {
var pc = this;
if (edgeVersion >= 15025) {
stream.getTracks().forEach(function(track) {
pc.addTrack(track, stream);
});
} else {



var clonedStream = stream.clone();
stream.getTracks().forEach(function(track, idx) {
var clonedTrack = clonedStream.getTracks()[idx];
track.addEventListener('enabled', function(event) {
clonedTrack.enabled = event.enabled;
});
});
clonedStream.getTracks().forEach(function(track) {
pc.addTrack(track, clonedStream);
});
}
};
RTCPeerConnection.prototype.removeTrack = function(sender) {
if (this._isClosed) {
throw makeError('InvalidStateError',
'Attempted to call removeTrack on a closed peerconnection.');
}
if (!(sender instanceof window.RTCRtpSender)) {
throw new TypeError('Argument 1 of RTCPeerConnection.removeTrack ' +
'does not implement interface RTCRtpSender.');
}
var transceiver = this.transceivers.find(function(t) {
return t.rtpSender === sender;
});
if (!transceiver) {
throw makeError('InvalidAccessError',
'Sender was not created by this connection.');
}
var stream = transceiver.stream;
transceiver.rtpSender.stop();
transceiver.rtpSender = null;
transceiver.track = null;
transceiver.stream = null;
var localStreams = this.transceivers.map(function(t) {
return t.stream;
});
if (localStreams.indexOf(stream) === -1 &&
this.localStreams.indexOf(stream) > -1) {
this.localStreams.splice(this.localStreams.indexOf(stream), 1);
}
this._maybeFireNegotiationNeeded();
};
RTCPeerConnection.prototype.removeStream = function(stream) {
var pc = this;
stream.getTracks().forEach(function(track) {
var sender = pc.getSenders().find(function(s) {
return s.track === track;
});
if (sender) {
pc.removeTrack(sender);
}
});
};
RTCPeerConnection.prototype.getSenders = function() {
return this.transceivers.filter(function(transceiver) {
return !!transceiver.rtpSender;
})
.map(function(transceiver) {
return transceiver.rtpSender;
});
};
RTCPeerConnection.prototype.getReceivers = function() {
return this.transceivers.filter(function(transceiver) {
return !!transceiver.rtpReceiver;
})
.map(function(transceiver) {
return transceiver.rtpReceiver;
});
};
RTCPeerConnection.prototype._createIceGatherer = function(sdpMLineIndex,
usingBundle) {
var pc = this;
if (usingBundle && sdpMLineIndex > 0) {
return this.transceivers[0].iceGatherer;
} else if (this._iceGatherers.length) {
return this._iceGatherers.shift();
}
var iceGatherer = new window.RTCIceGatherer({
iceServers: this._config.iceServers,
gatherPolicy: this._config.iceTransportPolicy
});
Object.defineProperty(iceGatherer, 'state',
{value: 'new', writable: true}
);
this.transceivers[sdpMLineIndex].bufferedCandidateEvents = [];
this.transceivers[sdpMLineIndex].bufferCandidates = function(event) {
var end = !event.candidate || Object.keys(event.candidate).length === 0;


iceGatherer.state = end ? 'completed' : 'gathering';
if (pc.transceivers[sdpMLineIndex].bufferedCandidateEvents !== null) {
pc.transceivers[sdpMLineIndex].bufferedCandidateEvents.push(event);
}
};
iceGatherer.addEventListener('localcandidate',
this.transceivers[sdpMLineIndex].bufferCandidates);
return iceGatherer;
};

RTCPeerConnection.prototype._gather = function(mid, sdpMLineIndex) {
var pc = this;
var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
if (iceGatherer.onlocalcandidate) {
return;
}
var bufferedCandidateEvents =
this.transceivers[sdpMLineIndex].bufferedCandidateEvents;
this.transceivers[sdpMLineIndex].bufferedCandidateEvents = null;
iceGatherer.removeEventListener('localcandidate',
this.transceivers[sdpMLineIndex].bufferCandidates);
iceGatherer.onlocalcandidate = function(evt) {
if (pc.usingBundle && sdpMLineIndex > 0) {
return;
}
var event = new Event('icecandidate');
event.candidate = {sdpMid: mid, sdpMLineIndex: sdpMLineIndex};
var cand = evt.candidate;

var end = !cand || Object.keys(cand).length === 0;
if (end) {
if (iceGatherer.state === 'new' || iceGatherer.state === 'gathering') {
iceGatherer.state = 'completed';
}
} else {
if (iceGatherer.state === 'new') {
iceGatherer.state = 'gathering';
}
cand.component = 1;
cand.ufrag = iceGatherer.getLocalParameters().usernameFragment;
var serializedCandidate = SDPUtils.writeCandidate(cand);
event.candidate = Object.assign(event.candidate,
SDPUtils.parseCandidate(serializedCandidate));
event.candidate.candidate = serializedCandidate;
event.candidate.toJSON = function() {
return {
candidate: event.candidate.candidate,
sdpMid: event.candidate.sdpMid,
sdpMLineIndex: event.candidate.sdpMLineIndex,
usernameFragment: event.candidate.usernameFragment
};
};
}

var sections = SDPUtils.getMediaSections(pc._localDescription.sdp);
if (!end) {
sections[event.candidate.sdpMLineIndex] +=
'a=' + event.candidate.candidate + '\r\n';
} else {
sections[event.candidate.sdpMLineIndex] +=
'a=end-of-candidates\r\n';
}
pc._localDescription.sdp =
SDPUtils.getDescription(pc._localDescription.sdp) +
sections.join('');
var complete = pc.transceivers.every(function(transceiver) {
return transceiver.iceGatherer &&
transceiver.iceGatherer.state === 'completed';
});
if (pc.iceGatheringState !== 'gathering') {
pc.iceGatheringState = 'gathering';
pc._emitGatheringStateChange();
}


if (!end) {
pc._dispatchEvent('icecandidate', event);
}
if (complete) {
pc._dispatchEvent('icecandidate', new Event('icecandidate'));
pc.iceGatheringState = 'complete';
pc._emitGatheringStateChange();
}
};
window.setTimeout(function() {
bufferedCandidateEvents.forEach(function(e) {
iceGatherer.onlocalcandidate(e);
});
}, 0);
};

RTCPeerConnection.prototype._createIceAndDtlsTransports = function() {
var pc = this;
var iceTransport = new window.RTCIceTransport(null);
iceTransport.onicestatechange = function() {
pc._updateIceConnectionState();
pc._updateConnectionState();
};
var dtlsTransport = new window.RTCDtlsTransport(iceTransport);
dtlsTransport.ondtlsstatechange = function() {
pc._updateConnectionState();
};
dtlsTransport.onerror = function() {

Object.defineProperty(dtlsTransport, 'state',
{value: 'failed', writable: true});
pc._updateConnectionState();
};
return {
iceTransport: iceTransport,
dtlsTransport: dtlsTransport
};
};


RTCPeerConnection.prototype._disposeIceAndDtlsTransports = function(
sdpMLineIndex) {
var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
if (iceGatherer) {
delete iceGatherer.onlocalcandidate;
delete this.transceivers[sdpMLineIndex].iceGatherer;
}
var iceTransport = this.transceivers[sdpMLineIndex].iceTransport;
if (iceTransport) {
delete iceTransport.onicestatechange;
delete this.transceivers[sdpMLineIndex].iceTransport;
}
var dtlsTransport = this.transceivers[sdpMLineIndex].dtlsTransport;
if (dtlsTransport) {
delete dtlsTransport.ondtlsstatechange;
delete dtlsTransport.onerror;
delete this.transceivers[sdpMLineIndex].dtlsTransport;
}
};

RTCPeerConnection.prototype._transceive = function(transceiver,
send, recv) {
var params = getCommonCapabilities(transceiver.localCapabilities,
transceiver.remoteCapabilities);
if (send && transceiver.rtpSender) {
params.encodings = transceiver.sendEncodingParameters;
params.rtcp = {
cname: SDPUtils.localCName,
compound: transceiver.rtcpParameters.compound
};
if (transceiver.recvEncodingParameters.length) {
params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
}
transceiver.rtpSender.send(params);
}
if (recv && transceiver.rtpReceiver && params.codecs.length > 0) {

if (transceiver.kind === 'video'
&& transceiver.recvEncodingParameters
&& edgeVersion < 15019) {
transceiver.recvEncodingParameters.forEach(function(p) {
delete p.rtx;
});
}
if (transceiver.recvEncodingParameters.length) {
params.encodings = transceiver.recvEncodingParameters;
} else {
params.encodings = [{}];
}
params.rtcp = {
compound: transceiver.rtcpParameters.compound
};
if (transceiver.rtcpParameters.cname) {
params.rtcp.cname = transceiver.rtcpParameters.cname;
}
if (transceiver.sendEncodingParameters.length) {
params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
}
transceiver.rtpReceiver.receive(params);
}
};
RTCPeerConnection.prototype.setLocalDescription = function(description) {
var pc = this;
if (['offer', 'answer'].indexOf(description.type) === -1) {
return Promise.reject(makeError('TypeError',
'Unsupported type "' + description.type + '"'));
}
if (!isActionAllowedInSignalingState('setLocalDescription',
description.type, pc.signalingState) || pc._isClosed) {
return Promise.reject(makeError('InvalidStateError',
'Can not set local ' + description.type +
' in state ' + pc.signalingState));
}
var sections;
var sessionpart;
if (description.type === 'offer') {


sections = SDPUtils.splitSections(description.sdp);
sessionpart = sections.shift();
sections.forEach(function(mediaSection, sdpMLineIndex) {
var caps = SDPUtils.parseRtpParameters(mediaSection);
pc.transceivers[sdpMLineIndex].localCapabilities = caps;
});
pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
pc._gather(transceiver.mid, sdpMLineIndex);
});
} else if (description.type === 'answer') {
sections = SDPUtils.splitSections(pc._remoteDescription.sdp);
sessionpart = sections.shift();
var isIceLite = SDPUtils.matchPrefix(sessionpart,
'a=ice-lite').length > 0;
sections.forEach(function(mediaSection, sdpMLineIndex) {
var transceiver = pc.transceivers[sdpMLineIndex];
var iceGatherer = transceiver.iceGatherer;
var iceTransport = transceiver.iceTransport;
var dtlsTransport = transceiver.dtlsTransport;
var localCapabilities = transceiver.localCapabilities;
var remoteCapabilities = transceiver.remoteCapabilities;
var rejected = SDPUtils.isRejected(mediaSection) &&
SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;
if (!rejected && !transceiver.rejected) {
var remoteIceParameters = SDPUtils.getIceParameters(
mediaSection, sessionpart);
var remoteDtlsParameters = SDPUtils.getDtlsParameters(
mediaSection, sessionpart);
if (isIceLite) {
remoteDtlsParameters.role = 'server';
}
if (!pc.usingBundle || sdpMLineIndex === 0) {
pc._gather(transceiver.mid, sdpMLineIndex);
if (iceTransport.state === 'new') {
iceTransport.start(iceGatherer, remoteIceParameters,
isIceLite ? 'controlling' : 'controlled');
}
if (dtlsTransport.state === 'new') {
dtlsTransport.start(remoteDtlsParameters);
}
}

var params = getCommonCapabilities(localCapabilities,
remoteCapabilities);


pc._transceive(transceiver,
params.codecs.length > 0,
false);
}
});
}
pc._localDescription = {
type: description.type,
sdp: description.sdp
};
if (description.type === 'offer') {
pc._updateSignalingState('have-local-offer');
} else {
pc._updateSignalingState('stable');
}
return Promise.resolve();
};
RTCPeerConnection.prototype.setRemoteDescription = function(description) {
var pc = this;
if (['offer', 'answer'].indexOf(description.type) === -1) {
return Promise.reject(makeError('TypeError',
'Unsupported type "' + description.type + '"'));
}
if (!isActionAllowedInSignalingState('setRemoteDescription',
description.type, pc.signalingState) || pc._isClosed) {
return Promise.reject(makeError('InvalidStateError',
'Can not set remote ' + description.type +
' in state ' + pc.signalingState));
}
var streams = {};
pc.remoteStreams.forEach(function(stream) {
streams[stream.id] = stream;
});
var receiverList = [];
var sections = SDPUtils.splitSections(description.sdp);
var sessionpart = sections.shift();
var isIceLite = SDPUtils.matchPrefix(sessionpart,
'a=ice-lite').length > 0;
var usingBundle = SDPUtils.matchPrefix(sessionpart,
'a=group:BUNDLE ').length > 0;
pc.usingBundle = usingBundle;
var iceOptions = SDPUtils.matchPrefix(sessionpart,
'a=ice-options:')[0];
if (iceOptions) {
pc.canTrickleIceCandidates = iceOptions.substr(14).split(' ')
.indexOf('trickle') >= 0;
} else {
pc.canTrickleIceCandidates = false;
}
sections.forEach(function(mediaSection, sdpMLineIndex) {
var lines = SDPUtils.splitLines(mediaSection);
var kind = SDPUtils.getKind(mediaSection);

var rejected = SDPUtils.isRejected(mediaSection) &&
SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;
var protocol = lines[0].substr(2).split(' ')[2];
var direction = SDPUtils.getDirection(mediaSection, sessionpart);
var remoteMsid = SDPUtils.parseMsid(mediaSection);
var mid = SDPUtils.getMid(mediaSection) || SDPUtils.generateIdentifier();

if (rejected || (kind === 'application' && (protocol === 'DTLS/SCTP' ||
protocol === 'UDP/DTLS/SCTP'))) {
pc.transceivers[sdpMLineIndex] = {
mid: mid,
kind: kind,
protocol: protocol,
rejected: true
};
return;
}
if (!rejected && pc.transceivers[sdpMLineIndex] &&
pc.transceivers[sdpMLineIndex].rejected) {
pc.transceivers[sdpMLineIndex] = pc._createTransceiver(kind, true);
}
var transceiver;
var iceGatherer;
var iceTransport;
var dtlsTransport;
var rtpReceiver;
var sendEncodingParameters;
var recvEncodingParameters;
var localCapabilities;
var track;

var remoteCapabilities = SDPUtils.parseRtpParameters(mediaSection);
var remoteIceParameters;
var remoteDtlsParameters;
if (!rejected) {
remoteIceParameters = SDPUtils.getIceParameters(mediaSection,
sessionpart);
remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection,
sessionpart);
remoteDtlsParameters.role = 'client';
}
recvEncodingParameters =
SDPUtils.parseRtpEncodingParameters(mediaSection);
var rtcpParameters = SDPUtils.parseRtcpParameters(mediaSection);
var isComplete = SDPUtils.matchPrefix(mediaSection,
'a=end-of-candidates', sessionpart).length > 0;
var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:')
.map(function(cand) {
return SDPUtils.parseCandidate(cand);
})
.filter(function(cand) {
return cand.component === 1;
});

if ((description.type === 'offer' || description.type === 'answer') &&
!rejected && usingBundle && sdpMLineIndex > 0 &&
pc.transceivers[sdpMLineIndex]) {
pc._disposeIceAndDtlsTransports(sdpMLineIndex);
pc.transceivers[sdpMLineIndex].iceGatherer =
pc.transceivers[0].iceGatherer;
pc.transceivers[sdpMLineIndex].iceTransport =
pc.transceivers[0].iceTransport;
pc.transceivers[sdpMLineIndex].dtlsTransport =
pc.transceivers[0].dtlsTransport;
if (pc.transceivers[sdpMLineIndex].rtpSender) {
pc.transceivers[sdpMLineIndex].rtpSender.setTransport(
pc.transceivers[0].dtlsTransport);
}
if (pc.transceivers[sdpMLineIndex].rtpReceiver) {
pc.transceivers[sdpMLineIndex].rtpReceiver.setTransport(
pc.transceivers[0].dtlsTransport);
}
}
if (description.type === 'offer' && !rejected) {
transceiver = pc.transceivers[sdpMLineIndex] ||
pc._createTransceiver(kind);
transceiver.mid = mid;
if (!transceiver.iceGatherer) {
transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex,
usingBundle);
}
if (cands.length && transceiver.iceTransport.state === 'new') {
if (isComplete && (!usingBundle || sdpMLineIndex === 0)) {
transceiver.iceTransport.setRemoteCandidates(cands);
} else {
cands.forEach(function(candidate) {
maybeAddCandidate(transceiver.iceTransport, candidate);
});
}
}
localCapabilities = window.RTCRtpReceiver.getCapabilities(kind);
if (edgeVersion < 15019) {
localCapabilities.codecs = localCapabilities.codecs.filter(
function(codec) {
return codec.name !== 'rtx';
});
}
sendEncodingParameters = transceiver.sendEncodingParameters || [{
ssrc: (2 * sdpMLineIndex + 2) * 1001
}];
var isNewTrack = false;
if (direction === 'sendrecv' || direction === 'sendonly') {
isNewTrack = !transceiver.rtpReceiver;
rtpReceiver = transceiver.rtpReceiver ||
new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);
if (isNewTrack) {
var stream;
track = rtpReceiver.track;
if (remoteMsid && remoteMsid.stream === '-') {

} else if (remoteMsid) {
if (!streams[remoteMsid.stream]) {
streams[remoteMsid.stream] = new window.MediaStream();
Object.defineProperty(streams[remoteMsid.stream], 'id', {
get: function() {
return remoteMsid.stream;
}
});
}
Object.defineProperty(track, 'id', {
get: function() {
return remoteMsid.track;
}
});
stream = streams[remoteMsid.stream];
} else {
if (!streams.default) {
streams.default = new window.MediaStream();
}
stream = streams.default;
}
if (stream) {
addTrackToStreamAndFireEvent(track, stream);
transceiver.associatedRemoteMediaStreams.push(stream);
}
receiverList.push([track, rtpReceiver, stream]);
}
} else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track) {
transceiver.associatedRemoteMediaStreams.forEach(function(s) {
var nativeTrack = s.getTracks().find(function(t) {
return t.id === transceiver.rtpReceiver.track.id;
});
if (nativeTrack) {
removeTrackFromStreamAndFireEvent(nativeTrack, s);
}
});
transceiver.associatedRemoteMediaStreams = [];
}
transceiver.localCapabilities = localCapabilities;
transceiver.remoteCapabilities = remoteCapabilities;
transceiver.rtpReceiver = rtpReceiver;
transceiver.rtcpParameters = rtcpParameters;
transceiver.sendEncodingParameters = sendEncodingParameters;
transceiver.recvEncodingParameters = recvEncodingParameters;
pc._transceive(pc.transceivers[sdpMLineIndex],
false,
isNewTrack);
} else if (description.type === 'answer' && !rejected) {
transceiver = pc.transceivers[sdpMLineIndex];
iceGatherer = transceiver.iceGatherer;
iceTransport = transceiver.iceTransport;
dtlsTransport = transceiver.dtlsTransport;
rtpReceiver = transceiver.rtpReceiver;
sendEncodingParameters = transceiver.sendEncodingParameters;
localCapabilities = transceiver.localCapabilities;
pc.transceivers[sdpMLineIndex].recvEncodingParameters =
recvEncodingParameters;
pc.transceivers[sdpMLineIndex].remoteCapabilities =
remoteCapabilities;
pc.transceivers[sdpMLineIndex].rtcpParameters = rtcpParameters;
if (cands.length && iceTransport.state === 'new') {
if ((isIceLite || isComplete) &&
(!usingBundle || sdpMLineIndex === 0)) {
iceTransport.setRemoteCandidates(cands);
} else {
cands.forEach(function(candidate) {
maybeAddCandidate(transceiver.iceTransport, candidate);
});
}
}
if (!usingBundle || sdpMLineIndex === 0) {
if (iceTransport.state === 'new') {
iceTransport.start(iceGatherer, remoteIceParameters,
'controlling');
}
if (dtlsTransport.state === 'new') {
dtlsTransport.start(remoteDtlsParameters);
}
}
var commonCapabilities = getCommonCapabilities(
transceiver.localCapabilities,
transceiver.remoteCapabilities);
var hasRtx = commonCapabilities.codecs.filter(function(c) {
return c.name.toLowerCase() === 'rtx';
}).length;
if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
delete transceiver.sendEncodingParameters[0].rtx;
}
pc._transceive(transceiver,
direction === 'sendrecv' || direction === 'recvonly',
direction === 'sendrecv' || direction === 'sendonly');
if (rtpReceiver &&
(direction === 'sendrecv' || direction === 'sendonly')) {
track = rtpReceiver.track;
if (remoteMsid) {
if (!streams[remoteMsid.stream]) {
streams[remoteMsid.stream] = new window.MediaStream();
}
addTrackToStreamAndFireEvent(track, streams[remoteMsid.stream]);
receiverList.push([track, rtpReceiver, streams[remoteMsid.stream]]);
} else {
if (!streams.default) {
streams.default = new window.MediaStream();
}
addTrackToStreamAndFireEvent(track, streams.default);
receiverList.push([track, rtpReceiver, streams.default]);
}
} else {

delete transceiver.rtpReceiver;
}
}
});
if (pc._dtlsRole === undefined) {
pc._dtlsRole = description.type === 'offer' ? 'active' : 'passive';
}
pc._remoteDescription = {
type: description.type,
sdp: description.sdp
};
if (description.type === 'offer') {
pc._updateSignalingState('have-remote-offer');
} else {
pc._updateSignalingState('stable');
}
Object.keys(streams).forEach(function(sid) {
var stream = streams[sid];
if (stream.getTracks().length) {
if (pc.remoteStreams.indexOf(stream) === -1) {
pc.remoteStreams.push(stream);
var event = new Event('addstream');
event.stream = stream;
window.setTimeout(function() {
pc._dispatchEvent('addstream', event);
});
}
receiverList.forEach(function(item) {
var track = item[0];
var receiver = item[1];
if (stream.id !== item[2].id) {
return;
}
fireAddTrack(pc, track, receiver, [stream]);
});
}
});
receiverList.forEach(function(item) {
if (item[2]) {
return;
}
fireAddTrack(pc, item[0], item[1], []);
});
window.setTimeout(function() {
if (!(pc && pc.transceivers)) {
return;
}
pc.transceivers.forEach(function(transceiver) {
if (transceiver.iceTransport &&
transceiver.iceTransport.state === 'new' &&
transceiver.iceTransport.getRemoteCandidates().length > 0) {
console.warn('Timeout for addRemoteCandidate. Consider sending ' +
'an end-of-candidates notification');
transceiver.iceTransport.addRemoteCandidate({});
}
});
}, 4000);
return Promise.resolve();
};
RTCPeerConnection.prototype.close = function() {
this.transceivers.forEach(function(transceiver) {
if (transceiver.iceTransport) {
transceiver.iceTransport.stop();
}
if (transceiver.dtlsTransport) {
transceiver.dtlsTransport.stop();
}
if (transceiver.rtpSender) {
transceiver.rtpSender.stop();
}
if (transceiver.rtpReceiver) {
transceiver.rtpReceiver.stop();
}
});
this._isClosed = true;
this._updateSignalingState('closed');
};

RTCPeerConnection.prototype._updateSignalingState = function(newState) {
this.signalingState = newState;
var event = new Event('signalingstatechange');
this._dispatchEvent('signalingstatechange', event);
};

RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function() {
var pc = this;
if (this.signalingState !== 'stable' || this.needNegotiation === true) {
return;
}
this.needNegotiation = true;
window.setTimeout(function() {
if (pc.needNegotiation) {
pc.needNegotiation = false;
var event = new Event('negotiationneeded');
pc._dispatchEvent('negotiationneeded', event);
}
}, 0);
};

RTCPeerConnection.prototype._updateIceConnectionState = function() {
var newState;
var states = {
'new': 0,
closed: 0,
checking: 0,
connected: 0,
completed: 0,
disconnected: 0,
failed: 0
};
this.transceivers.forEach(function(transceiver) {
if (transceiver.iceTransport && !transceiver.rejected) {
states[transceiver.iceTransport.state]++;
}
});
newState = 'new';
if (states.failed > 0) {
newState = 'failed';
} else if (states.checking > 0) {
newState = 'checking';
} else if (states.disconnected > 0) {
newState = 'disconnected';
} else if (states.new > 0) {
newState = 'new';
} else if (states.connected > 0) {
newState = 'connected';
} else if (states.completed > 0) {
newState = 'completed';
}
if (newState !== this.iceConnectionState) {
this.iceConnectionState = newState;
var event = new Event('iceconnectionstatechange');
this._dispatchEvent('iceconnectionstatechange', event);
}
};

RTCPeerConnection.prototype._updateConnectionState = function() {
var newState;
var states = {
'new': 0,
closed: 0,
connecting: 0,
connected: 0,
completed: 0,
disconnected: 0,
failed: 0
};
this.transceivers.forEach(function(transceiver) {
if (transceiver.iceTransport && transceiver.dtlsTransport &&
!transceiver.rejected) {
states[transceiver.iceTransport.state]++;
states[transceiver.dtlsTransport.state]++;
}
});
states.connected += states.completed;
newState = 'new';
if (states.failed > 0) {
newState = 'failed';
} else if (states.connecting > 0) {
newState = 'connecting';
} else if (states.disconnected > 0) {
newState = 'disconnected';
} else if (states.new > 0) {
newState = 'new';
} else if (states.connected > 0) {
newState = 'connected';
}
if (newState !== this.connectionState) {
this.connectionState = newState;
var event = new Event('connectionstatechange');
this._dispatchEvent('connectionstatechange', event);
}
};
RTCPeerConnection.prototype.createOffer = function() {
var pc = this;
if (pc._isClosed) {
return Promise.reject(makeError('InvalidStateError',
'Can not call createOffer after close'));
}
var numAudioTracks = pc.transceivers.filter(function(t) {
return t.kind === 'audio';
}).length;
var numVideoTracks = pc.transceivers.filter(function(t) {
return t.kind === 'video';
}).length;
var offerOptions = arguments[0];
if (offerOptions) {

if (offerOptions.mandatory || offerOptions.optional) {
throw new TypeError(
'Legacy mandatory/optional constraints not supported.');
}
if (offerOptions.offerToReceiveAudio !== undefined) {
if (offerOptions.offerToReceiveAudio === true) {
numAudioTracks = 1;
} else if (offerOptions.offerToReceiveAudio === false) {
numAudioTracks = 0;
} else {
numAudioTracks = offerOptions.offerToReceiveAudio;
}
}
if (offerOptions.offerToReceiveVideo !== undefined) {
if (offerOptions.offerToReceiveVideo === true) {
numVideoTracks = 1;
} else if (offerOptions.offerToReceiveVideo === false) {
numVideoTracks = 0;
} else {
numVideoTracks = offerOptions.offerToReceiveVideo;
}
}
}
pc.transceivers.forEach(function(transceiver) {
if (transceiver.kind === 'audio') {
numAudioTracks--;
if (numAudioTracks < 0) {
transceiver.wantReceive = false;
}
} else if (transceiver.kind === 'video') {
numVideoTracks--;
if (numVideoTracks < 0) {
transceiver.wantReceive = false;
}
}
});
while (numAudioTracks > 0 || numVideoTracks > 0) {
if (numAudioTracks > 0) {
pc._createTransceiver('audio');
numAudioTracks--;
}
if (numVideoTracks > 0) {
pc._createTransceiver('video');
numVideoTracks--;
}
}
var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId,
pc._sdpSessionVersion++);
pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {


var track = transceiver.track;
var kind = transceiver.kind;
var mid = transceiver.mid || SDPUtils.generateIdentifier();
transceiver.mid = mid;
if (!transceiver.iceGatherer) {
transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex,
pc.usingBundle);
}
var localCapabilities = window.RTCRtpSender.getCapabilities(kind);


if (edgeVersion < 15019) {
localCapabilities.codecs = localCapabilities.codecs.filter(
function(codec) {
return codec.name !== 'rtx';
});
}
localCapabilities.codecs.forEach(function(codec) {
if (codec.name === 'H264' &&
codec.parameters['level-asymmetry-allowed'] === undefined) {
codec.parameters['level-asymmetry-allowed'] = '1';
}
if (transceiver.remoteCapabilities &&
transceiver.remoteCapabilities.codecs) {
transceiver.remoteCapabilities.codecs.forEach(function(remoteCodec) {
if (codec.name.toLowerCase() === remoteCodec.name.toLowerCase() &&
codec.clockRate === remoteCodec.clockRate) {
codec.preferredPayloadType = remoteCodec.payloadType;
}
});
}
});
localCapabilities.headerExtensions.forEach(function(hdrExt) {
var remoteExtensions = transceiver.remoteCapabilities &&
transceiver.remoteCapabilities.headerExtensions || [];
remoteExtensions.forEach(function(rHdrExt) {
if (hdrExt.uri === rHdrExt.uri) {
hdrExt.id = rHdrExt.id;
}
});
});

var sendEncodingParameters = transceiver.sendEncodingParameters || [{
ssrc: (2 * sdpMLineIndex + 1) * 1001
}];
if (track) {
if (edgeVersion >= 15019 && kind === 'video' &&
!sendEncodingParameters[0].rtx) {
sendEncodingParameters[0].rtx = {
ssrc: sendEncodingParameters[0].ssrc + 1
};
}
}
if (transceiver.wantReceive) {
transceiver.rtpReceiver = new window.RTCRtpReceiver(
transceiver.dtlsTransport, kind);
}
transceiver.localCapabilities = localCapabilities;
transceiver.sendEncodingParameters = sendEncodingParameters;
});
if (pc._config.bundlePolicy !== 'max-compat') {
sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function(t) {
return t.mid;
}).join(' ') + '\r\n';
}
sdp += 'a=ice-options:trickle\r\n';
pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
sdp += writeMediaSection(transceiver, transceiver.localCapabilities,
'offer', transceiver.stream, pc._dtlsRole);
sdp += 'a=rtcp-rsize\r\n';
if (transceiver.iceGatherer && pc.iceGatheringState !== 'new' &&
(sdpMLineIndex === 0 || !pc.usingBundle)) {
transceiver.iceGatherer.getLocalCandidates().forEach(function(cand) {
cand.component = 1;
sdp += 'a=' + SDPUtils.writeCandidate(cand) + '\r\n';
});
if (transceiver.iceGatherer.state === 'completed') {
sdp += 'a=end-of-candidates\r\n';
}
}
});
var desc = new window.RTCSessionDescription({
type: 'offer',
sdp: sdp
});
return Promise.resolve(desc);
};
RTCPeerConnection.prototype.createAnswer = function() {
var pc = this;
if (pc._isClosed) {
return Promise.reject(makeError('InvalidStateError',
'Can not call createAnswer after close'));
}
if (!(pc.signalingState === 'have-remote-offer' ||
pc.signalingState === 'have-local-pranswer')) {
return Promise.reject(makeError('InvalidStateError',
'Can not call createAnswer in signalingState ' + pc.signalingState));
}
var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId,
pc._sdpSessionVersion++);
if (pc.usingBundle) {
sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function(t) {
return t.mid;
}).join(' ') + '\r\n';
}
sdp += 'a=ice-options:trickle\r\n';
var mediaSectionsInOffer = SDPUtils.getMediaSections(
pc._remoteDescription.sdp).length;
pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
if (sdpMLineIndex + 1 > mediaSectionsInOffer) {
return;
}
if (transceiver.rejected) {
if (transceiver.kind === 'application') {
if (transceiver.protocol === 'DTLS/SCTP') { 
sdp += 'm=application 0 DTLS/SCTP 5000\r\n';
} else {
sdp += 'm=application 0 ' + transceiver.protocol +
' webrtc-datachannel\r\n';
}
} else if (transceiver.kind === 'audio') {
sdp += 'm=audio 0 UDP/TLS/RTP/SAVPF 0\r\n' +
'a=rtpmap:0 PCMU/8000\r\n';
} else if (transceiver.kind === 'video') {
sdp += 'm=video 0 UDP/TLS/RTP/SAVPF 120\r\n' +
'a=rtpmap:120 VP8/90000\r\n';
}
sdp += 'c=IN IP4 0.0.0.0\r\n' +
'a=inactive\r\n' +
'a=mid:' + transceiver.mid + '\r\n';
return;
}

if (transceiver.stream) {
var localTrack;
if (transceiver.kind === 'audio') {
localTrack = transceiver.stream.getAudioTracks()[0];
} else if (transceiver.kind === 'video') {
localTrack = transceiver.stream.getVideoTracks()[0];
}
if (localTrack) {

if (edgeVersion >= 15019 && transceiver.kind === 'video' &&
!transceiver.sendEncodingParameters[0].rtx) {
transceiver.sendEncodingParameters[0].rtx = {
ssrc: transceiver.sendEncodingParameters[0].ssrc + 1
};
}
}
}

var commonCapabilities = getCommonCapabilities(
transceiver.localCapabilities,
transceiver.remoteCapabilities);
var hasRtx = commonCapabilities.codecs.filter(function(c) {
return c.name.toLowerCase() === 'rtx';
}).length;
if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
delete transceiver.sendEncodingParameters[0].rtx;
}
sdp += writeMediaSection(transceiver, commonCapabilities,
'answer', transceiver.stream, pc._dtlsRole);
if (transceiver.rtcpParameters &&
transceiver.rtcpParameters.reducedSize) {
sdp += 'a=rtcp-rsize\r\n';
}
});
var desc = new window.RTCSessionDescription({
type: 'answer',
sdp: sdp
});
return Promise.resolve(desc);
};
RTCPeerConnection.prototype.addIceCandidate = function(candidate) {
var pc = this;
var sections;
if (candidate && !(candidate.sdpMLineIndex !== undefined ||
candidate.sdpMid)) {
return Promise.reject(new TypeError('sdpMLineIndex or sdpMid required'));
}
return new Promise(function(resolve, reject) {
if (!pc._remoteDescription) {
return reject(makeError('InvalidStateError',
'Can not add ICE candidate without a remote description'));
} else if (!candidate || candidate.candidate === '') {
for (var j = 0; j < pc.transceivers.length; j++) {
if (pc.transceivers[j].rejected) {
continue;
}
pc.transceivers[j].iceTransport.addRemoteCandidate({});
sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
sections[j] += 'a=end-of-candidates\r\n';
pc._remoteDescription.sdp =
SDPUtils.getDescription(pc._remoteDescription.sdp) +
sections.join('');
if (pc.usingBundle) {
break;
}
}
} else {
var sdpMLineIndex = candidate.sdpMLineIndex;
if (candidate.sdpMid) {
for (var i = 0; i < pc.transceivers.length; i++) {
if (pc.transceivers[i].mid === candidate.sdpMid) {
sdpMLineIndex = i;
break;
}
}
}
var transceiver = pc.transceivers[sdpMLineIndex];
if (transceiver) {
if (transceiver.rejected) {
return resolve();
}
var cand = Object.keys(candidate.candidate).length > 0 ?
SDPUtils.parseCandidate(candidate.candidate) : {};

if (cand.protocol === 'tcp' && (cand.port === 0 || cand.port === 9)) {
return resolve();
}

if (cand.component && cand.component !== 1) {
return resolve();
}


if (sdpMLineIndex === 0 || (sdpMLineIndex > 0 &&
transceiver.iceTransport !== pc.transceivers[0].iceTransport)) {
if (!maybeAddCandidate(transceiver.iceTransport, cand)) {
return reject(makeError('OperationError',
'Can not add ICE candidate'));
}
}

var candidateString = candidate.candidate.trim();
if (candidateString.indexOf('a=') === 0) {
candidateString = candidateString.substr(2);
}
sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
sections[sdpMLineIndex] += 'a=' +
(cand.type ? candidateString : 'end-of-candidates')
+ '\r\n';
pc._remoteDescription.sdp =
SDPUtils.getDescription(pc._remoteDescription.sdp) +
sections.join('');
} else {
return reject(makeError('OperationError',
'Can not add ICE candidate'));
}
}
resolve();
});
};
RTCPeerConnection.prototype.getStats = function(selector) {
if (selector && selector instanceof window.MediaStreamTrack) {
var senderOrReceiver = null;
this.transceivers.forEach(function(transceiver) {
if (transceiver.rtpSender &&
transceiver.rtpSender.track === selector) {
senderOrReceiver = transceiver.rtpSender;
} else if (transceiver.rtpReceiver &&
transceiver.rtpReceiver.track === selector) {
senderOrReceiver = transceiver.rtpReceiver;
}
});
if (!senderOrReceiver) {
throw makeError('InvalidAccessError', 'Invalid selector.');
}
return senderOrReceiver.getStats();
}
var promises = [];
this.transceivers.forEach(function(transceiver) {
['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport',
'dtlsTransport'].forEach(function(method) {
if (transceiver[method]) {
promises.push(transceiver[method].getStats());
}
});
});
return Promise.all(promises).then(function(allStats) {
var results = new Map();
allStats.forEach(function(stats) {
stats.forEach(function(stat) {
results.set(stat.id, stat);
});
});
return results;
});
};

var ortcObjects = ['RTCRtpSender', 'RTCRtpReceiver', 'RTCIceGatherer',
'RTCIceTransport', 'RTCDtlsTransport'];
ortcObjects.forEach(function(ortcObjectName) {
var obj = window[ortcObjectName];
if (obj && obj.prototype && obj.prototype.getStats) {
var nativeGetstats = obj.prototype.getStats;
obj.prototype.getStats = function() {
return nativeGetstats.apply(this)
.then(function(nativeStats) {
var mapStats = new Map();
Object.keys(nativeStats).forEach(function(id) {
nativeStats[id].type = fixStatsType(nativeStats[id]);
mapStats.set(id, nativeStats[id]);
});
return mapStats;
});
};
}
});

var methods = ['createOffer', 'createAnswer'];
methods.forEach(function(method) {
var nativeMethod = RTCPeerConnection.prototype[method];
RTCPeerConnection.prototype[method] = function() {
var args = arguments;
if (typeof args[0] === 'function' ||
typeof args[1] === 'function') { 
return nativeMethod.apply(this, [arguments[2]])
.then(function(description) {
if (typeof args[0] === 'function') {
args[0].apply(null, [description]);
}
}, function(error) {
if (typeof args[1] === 'function') {
args[1].apply(null, [error]);
}
});
}
return nativeMethod.apply(this, arguments);
};
});
methods = ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'];
methods.forEach(function(method) {
var nativeMethod = RTCPeerConnection.prototype[method];
RTCPeerConnection.prototype[method] = function() {
var args = arguments;
if (typeof args[1] === 'function' ||
typeof args[2] === 'function') { 
return nativeMethod.apply(this, arguments)
.then(function() {
if (typeof args[1] === 'function') {
args[1].apply(null);
}
}, function(error) {
if (typeof args[2] === 'function') {
args[2].apply(null, [error]);
}
});
}
return nativeMethod.apply(this, arguments);
};
});


['getStats'].forEach(function(method) {
var nativeMethod = RTCPeerConnection.prototype[method];
RTCPeerConnection.prototype[method] = function() {
var args = arguments;
if (typeof args[1] === 'function') {
return nativeMethod.apply(this, arguments)
.then(function() {
if (typeof args[1] === 'function') {
args[1].apply(null);
}
});
}
return nativeMethod.apply(this, arguments);
};
});
return RTCPeerConnection;
};
},{"sdp":17}],17:[function(require,module,exports){
'use strict';
var SDPUtils = {};
SDPUtils.generateIdentifier = function() {
return Math.random().toString(36).substr(2, 10);
};
SDPUtils.localCName = SDPUtils.generateIdentifier();
SDPUtils.splitLines = function(blob) {
return blob.trim().split('\n').map(function(line) {
return line.trim();
});
};
SDPUtils.splitSections = function(blob) {
var parts = blob.split('\nm=');
return parts.map(function(part, index) {
return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
});
};
SDPUtils.getDescription = function(blob) {
var sections = SDPUtils.splitSections(blob);
return sections && sections[0];
};
SDPUtils.getMediaSections = function(blob) {
var sections = SDPUtils.splitSections(blob);
sections.shift();
return sections;
};
SDPUtils.matchPrefix = function(blob, prefix) {
return SDPUtils.splitLines(blob).filter(function(line) {
return line.indexOf(prefix) === 0;
});
};
SDPUtils.parseCandidate = function(line) {
var parts;

if (line.indexOf('a=candidate:') === 0) {
parts = line.substring(12).split(' ');
} else {
parts = line.substring(10).split(' ');
}
var candidate = {
foundation: parts[0],
component: parseInt(parts[1], 10),
protocol: parts[2].toLowerCase(),
priority: parseInt(parts[3], 10),
ip: parts[4],
address: parts[4], 
port: parseInt(parts[5], 10),
type: parts[7]
};
for (var i = 8; i < parts.length; i += 2) {
switch (parts[i]) {
case 'raddr':
candidate.relatedAddress = parts[i + 1];
break;
case 'rport':
candidate.relatedPort = parseInt(parts[i + 1], 10);
break;
case 'tcptype':
candidate.tcpType = parts[i + 1];
break;
case 'ufrag':
candidate.ufrag = parts[i + 1]; 
candidate.usernameFragment = parts[i + 1];
break;
default: 
candidate[parts[i]] = parts[i + 1];
break;
}
}
return candidate;
};
SDPUtils.writeCandidate = function(candidate) {
var sdp = [];
sdp.push(candidate.foundation);
sdp.push(candidate.component);
sdp.push(candidate.protocol.toUpperCase());
sdp.push(candidate.priority);
sdp.push(candidate.address || candidate.ip);
sdp.push(candidate.port);
var type = candidate.type;
sdp.push('typ');
sdp.push(type);
if (type !== 'host' && candidate.relatedAddress &&
candidate.relatedPort) {
sdp.push('raddr');
sdp.push(candidate.relatedAddress);
sdp.push('rport');
sdp.push(candidate.relatedPort);
}
if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
sdp.push('tcptype');
sdp.push(candidate.tcpType);
}
if (candidate.usernameFragment || candidate.ufrag) {
sdp.push('ufrag');
sdp.push(candidate.usernameFragment || candidate.ufrag);
}
return 'candidate:' + sdp.join(' ');
};
SDPUtils.parseIceOptions = function(line) {
return line.substr(14).split(' ');
};
SDPUtils.parseRtpMap = function(line) {
var parts = line.substr(9).split(' ');
var parsed = {
payloadType: parseInt(parts.shift(), 10) 
};
parts = parts[0].split('/');
parsed.name = parts[0];
parsed.clockRate = parseInt(parts[1], 10); 
parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;

parsed.numChannels = parsed.channels;
return parsed;
};
SDPUtils.writeRtpMap = function(codec) {
var pt = codec.payloadType;
if (codec.preferredPayloadType !== undefined) {
pt = codec.preferredPayloadType;
}
var channels = codec.channels || codec.numChannels || 1;
return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate +
(channels !== 1 ? '/' + channels : '') + '\r\n';
};
SDPUtils.parseExtmap = function(line) {
var parts = line.substr(9).split(' ');
return {
id: parseInt(parts[0], 10),
direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
uri: parts[1]
};
};
SDPUtils.writeExtmap = function(headerExtension) {
return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) +
(headerExtension.direction && headerExtension.direction !== 'sendrecv'
? '/' + headerExtension.direction
: '') +
' ' + headerExtension.uri + '\r\n';
};
SDPUtils.parseFmtp = function(line) {
var parsed = {};
var kv;
var parts = line.substr(line.indexOf(' ') + 1).split(';');
for (var j = 0; j < parts.length; j++) {
kv = parts[j].trim().split('=');
parsed[kv[0].trim()] = kv[1];
}
return parsed;
};
SDPUtils.writeFmtp = function(codec) {
var line = '';
var pt = codec.payloadType;
if (codec.preferredPayloadType !== undefined) {
pt = codec.preferredPayloadType;
}
if (codec.parameters && Object.keys(codec.parameters).length) {
var params = [];
Object.keys(codec.parameters).forEach(function(param) {
if (codec.parameters[param]) {
params.push(param + '=' + codec.parameters[param]);
} else {
params.push(param);
}
});
line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
}
return line;
};
SDPUtils.parseRtcpFb = function(line) {
var parts = line.substr(line.indexOf(' ') + 1).split(' ');
return {
type: parts.shift(),
parameter: parts.join(' ')
};
};
SDPUtils.writeRtcpFb = function(codec) {
var lines = '';
var pt = codec.payloadType;
if (codec.preferredPayloadType !== undefined) {
pt = codec.preferredPayloadType;
}
if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
codec.rtcpFeedback.forEach(function(fb) {
lines += 'a=rtcp-fb:' + pt + ' ' + fb.type +
(fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') +
'\r\n';
});
}
return lines;
};
SDPUtils.parseSsrcMedia = function(line) {
var sp = line.indexOf(' ');
var parts = {
ssrc: parseInt(line.substr(7, sp - 7), 10)
};
var colon = line.indexOf(':', sp);
if (colon > -1) {
parts.attribute = line.substr(sp + 1, colon - sp - 1);
parts.value = line.substr(colon + 1);
} else {
parts.attribute = line.substr(sp + 1);
}
return parts;
};
SDPUtils.parseSsrcGroup = function(line) {
var parts = line.substr(13).split(' ');
return {
semantics: parts.shift(),
ssrcs: parts.map(function(ssrc) {
return parseInt(ssrc, 10);
})
};
};
SDPUtils.getMid = function(mediaSection) {
var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
if (mid) {
return mid.substr(6);
}
};
SDPUtils.parseFingerprint = function(line) {
var parts = line.substr(14).split(' ');
return {
algorithm: parts[0].toLowerCase(), 
value: parts[1]
};
};
SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
var lines = SDPUtils.matchPrefix(mediaSection + sessionpart,
'a=fingerprint:');


return {
role: 'auto',
fingerprints: lines.map(SDPUtils.parseFingerprint)
};
};
SDPUtils.writeDtlsParameters = function(params, setupType) {
var sdp = 'a=setup:' + setupType + '\r\n';
params.fingerprints.forEach(function(fp) {
sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
});
return sdp;
};
SDPUtils.parseCryptoLine = function(line) {
var parts = line.substr(9).split(' ');
return {
tag: parseInt(parts[0], 10),
cryptoSuite: parts[1],
keyParams: parts[2],
sessionParams: parts.slice(3),
};
};
SDPUtils.writeCryptoLine = function(parameters) {
return 'a=crypto:' + parameters.tag + ' ' +
parameters.cryptoSuite + ' ' +
(typeof parameters.keyParams === 'object'
? SDPUtils.writeCryptoKeyParams(parameters.keyParams)
: parameters.keyParams) +
(parameters.sessionParams ? ' ' + parameters.sessionParams.join(' ') : '') +
'\r\n';
};
SDPUtils.parseCryptoKeyParams = function(keyParams) {
if (keyParams.indexOf('inline:') !== 0) {
return null;
}
var parts = keyParams.substr(7).split('|');
return {
keyMethod: 'inline',
keySalt: parts[0],
lifeTime: parts[1],
mkiValue: parts[2] ? parts[2].split(':')[0] : undefined,
mkiLength: parts[2] ? parts[2].split(':')[1] : undefined,
};
};
SDPUtils.writeCryptoKeyParams = function(keyParams) {
return keyParams.keyMethod + ':'
+ keyParams.keySalt +
(keyParams.lifeTime ? '|' + keyParams.lifeTime : '') +
(keyParams.mkiValue && keyParams.mkiLength
? '|' + keyParams.mkiValue + ':' + keyParams.mkiLength
: '');
};
SDPUtils.getCryptoParameters = function(mediaSection, sessionpart) {
var lines = SDPUtils.matchPrefix(mediaSection + sessionpart,
'a=crypto:');
return lines.map(SDPUtils.parseCryptoLine);
};
SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
var ufrag = SDPUtils.matchPrefix(mediaSection + sessionpart,
'a=ice-ufrag:')[0];
var pwd = SDPUtils.matchPrefix(mediaSection + sessionpart,
'a=ice-pwd:')[0];
if (!(ufrag && pwd)) {
return null;
}
return {
usernameFragment: ufrag.substr(12),
password: pwd.substr(10),
};
};
SDPUtils.writeIceParameters = function(params) {
return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' +
'a=ice-pwd:' + params.password + '\r\n';
};
SDPUtils.parseRtpParameters = function(mediaSection) {
var description = {
codecs: [],
headerExtensions: [],
fecMechanisms: [],
rtcp: []
};
var lines = SDPUtils.splitLines(mediaSection);
var mline = lines[0].split(' ');
for (var i = 3; i < mline.length; i++) { 
var pt = mline[i];
var rtpmapline = SDPUtils.matchPrefix(
mediaSection, 'a=rtpmap:' + pt + ' ')[0];
if (rtpmapline) {
var codec = SDPUtils.parseRtpMap(rtpmapline);
var fmtps = SDPUtils.matchPrefix(
mediaSection, 'a=fmtp:' + pt + ' ');

codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
codec.rtcpFeedback = SDPUtils.matchPrefix(
mediaSection, 'a=rtcp-fb:' + pt + ' ')
.map(SDPUtils.parseRtcpFb);
description.codecs.push(codec);

switch (codec.name.toUpperCase()) {
case 'RED':
case 'ULPFEC':
description.fecMechanisms.push(codec.name.toUpperCase());
break;
default: 
break;
}
}
}
SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function(line) {
description.headerExtensions.push(SDPUtils.parseExtmap(line));
});

return description;
};
SDPUtils.writeRtpDescription = function(kind, caps) {
var sdp = '';

sdp += 'm=' + kind + ' ';
sdp += caps.codecs.length > 0 ? '9' : '0'; 
sdp += ' UDP/TLS/RTP/SAVPF ';
sdp += caps.codecs.map(function(codec) {
if (codec.preferredPayloadType !== undefined) {
return codec.preferredPayloadType;
}
return codec.payloadType;
}).join(' ') + '\r\n';
sdp += 'c=IN IP4 0.0.0.0\r\n';
sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

caps.codecs.forEach(function(codec) {
sdp += SDPUtils.writeRtpMap(codec);
sdp += SDPUtils.writeFmtp(codec);
sdp += SDPUtils.writeRtcpFb(codec);
});
var maxptime = 0;
caps.codecs.forEach(function(codec) {
if (codec.maxptime > maxptime) {
maxptime = codec.maxptime;
}
});
if (maxptime > 0) {
sdp += 'a=maxptime:' + maxptime + '\r\n';
}
sdp += 'a=rtcp-mux\r\n';
if (caps.headerExtensions) {
caps.headerExtensions.forEach(function(extension) {
sdp += SDPUtils.writeExtmap(extension);
});
}

return sdp;
};
SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
var encodingParameters = [];
var description = SDPUtils.parseRtpParameters(mediaSection);
var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
.map(function(line) {
return SDPUtils.parseSsrcMedia(line);
})
.filter(function(parts) {
return parts.attribute === 'cname';
});
var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
var secondarySsrc;
var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID')
.map(function(line) {
var parts = line.substr(17).split(' ');
return parts.map(function(part) {
return parseInt(part, 10);
});
});
if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
secondarySsrc = flows[0][1];
}
description.codecs.forEach(function(codec) {
if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
var encParam = {
ssrc: primarySsrc,
codecPayloadType: parseInt(codec.parameters.apt, 10)
};
if (primarySsrc && secondarySsrc) {
encParam.rtx = {ssrc: secondarySsrc};
}
encodingParameters.push(encParam);
if (hasRed) {
encParam = JSON.parse(JSON.stringify(encParam));
encParam.fec = {
ssrc: primarySsrc,
mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
};
encodingParameters.push(encParam);
}
}
});
if (encodingParameters.length === 0 && primarySsrc) {
encodingParameters.push({
ssrc: primarySsrc
});
}

var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
if (bandwidth.length) {
if (bandwidth[0].indexOf('b=TIAS:') === 0) {
bandwidth = parseInt(bandwidth[0].substr(7), 10);
} else if (bandwidth[0].indexOf('b=AS:') === 0) {

bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95
- (50 * 40 * 8);
} else {
bandwidth = undefined;
}
encodingParameters.forEach(function(params) {
params.maxBitrate = bandwidth;
});
}
return encodingParameters;
};
SDPUtils.parseRtcpParameters = function(mediaSection) {
var rtcpParameters = {};


var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
.map(function(line) {
return SDPUtils.parseSsrcMedia(line);
})
.filter(function(obj) {
return obj.attribute === 'cname';
})[0];
if (remoteSsrc) {
rtcpParameters.cname = remoteSsrc.value;
rtcpParameters.ssrc = remoteSsrc.ssrc;
}


var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
rtcpParameters.reducedSize = rsize.length > 0;
rtcpParameters.compound = rsize.length === 0;


var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
rtcpParameters.mux = mux.length > 0;
return rtcpParameters;
};
SDPUtils.parseMsid = function(mediaSection) {
var parts;
var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
if (spec.length === 1) {
parts = spec[0].substr(7).split(' ');
return {stream: parts[0], track: parts[1]};
}
var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
.map(function(line) {
return SDPUtils.parseSsrcMedia(line);
})
.filter(function(msidParts) {
return msidParts.attribute === 'msid';
});
if (planB.length > 0) {
parts = planB[0].value.split(' ');
return {stream: parts[0], track: parts[1]};
}
};
SDPUtils.parseSctpDescription = function(mediaSection) {
var mline = SDPUtils.parseMLine(mediaSection);
var maxSizeLine = SDPUtils.matchPrefix(mediaSection, 'a=max-message-size:');
var maxMessageSize;
if (maxSizeLine.length > 0) {
maxMessageSize = parseInt(maxSizeLine[0].substr(19), 10);
}
if (isNaN(maxMessageSize)) {
maxMessageSize = 65536;
}
var sctpPort = SDPUtils.matchPrefix(mediaSection, 'a=sctp-port:');
if (sctpPort.length > 0) {
return {
port: parseInt(sctpPort[0].substr(12), 10),
protocol: mline.fmt,
maxMessageSize: maxMessageSize
};
}
var sctpMapLines = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:');
if (sctpMapLines.length > 0) {
var parts = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:')[0]
.substr(10)
.split(' ');
return {
port: parseInt(parts[0], 10),
protocol: parts[1],
maxMessageSize: maxMessageSize
};
}
};
SDPUtils.writeSctpDescription = function(media, sctp) {
var output = [];
if (media.protocol !== 'DTLS/SCTP') {
output = [
'm=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.protocol + '\r\n',
'c=IN IP4 0.0.0.0\r\n',
'a=sctp-port:' + sctp.port + '\r\n'
];
} else {
output = [
'm=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.port + '\r\n',
'c=IN IP4 0.0.0.0\r\n',
'a=sctpmap:' + sctp.port + ' ' + sctp.protocol + ' 65535\r\n'
];
}
if (sctp.maxMessageSize !== undefined) {
output.push('a=max-message-size:' + sctp.maxMessageSize + '\r\n');
}
return output.join('');
};
SDPUtils.generateSessionId = function() {
return Math.random().toString().substr(2, 21);
};
SDPUtils.writeSessionBoilerplate = function(sessId, sessVer, sessUser) {
var sessionId;
var version = sessVer !== undefined ? sessVer : 2;
if (sessId) {
sessionId = sessId;
} else {
sessionId = SDPUtils.generateSessionId();
}
var user = sessUser || 'thisisadapterortc';

return 'v=0\r\n' +
'o=' + user + ' ' + sessionId + ' ' + version +
' IN IP4 127.0.0.1\r\n' +
's=-\r\n' +
't=0 0\r\n';
};
SDPUtils.writeMediaSection = function(transceiver, caps, type, stream) {
var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

sdp += SDPUtils.writeIceParameters(
transceiver.iceGatherer.getLocalParameters());

sdp += SDPUtils.writeDtlsParameters(
transceiver.dtlsTransport.getLocalParameters(),
type === 'offer' ? 'actpass' : 'active');
sdp += 'a=mid:' + transceiver.mid + '\r\n';
if (transceiver.direction) {
sdp += 'a=' + transceiver.direction + '\r\n';
} else if (transceiver.rtpSender && transceiver.rtpReceiver) {
sdp += 'a=sendrecv\r\n';
} else if (transceiver.rtpSender) {
sdp += 'a=sendonly\r\n';
} else if (transceiver.rtpReceiver) {
sdp += 'a=recvonly\r\n';
} else {
sdp += 'a=inactive\r\n';
}
if (transceiver.rtpSender) {
var msid = 'msid:' + stream.id + ' ' +
transceiver.rtpSender.track.id + '\r\n';
sdp += 'a=' + msid;
sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
' ' + msid;
if (transceiver.sendEncodingParameters[0].rtx) {
sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
' ' + msid;
sdp += 'a=ssrc-group:FID ' +
transceiver.sendEncodingParameters[0].ssrc + ' ' +
transceiver.sendEncodingParameters[0].rtx.ssrc +
'\r\n';
}
}

sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
' cname:' + SDPUtils.localCName + '\r\n';
if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
' cname:' + SDPUtils.localCName + '\r\n';
}
return sdp;
};
SDPUtils.getDirection = function(mediaSection, sessionpart) {

var lines = SDPUtils.splitLines(mediaSection);
for (var i = 0; i < lines.length; i++) {
switch (lines[i]) {
case 'a=sendrecv':
case 'a=sendonly':
case 'a=recvonly':
case 'a=inactive':
return lines[i].substr(2);
default:
// FIXME: What should happen here?
}
}
if (sessionpart) {
return SDPUtils.getDirection(sessionpart);
}
return 'sendrecv';
};
SDPUtils.getKind = function(mediaSection) {
var lines = SDPUtils.splitLines(mediaSection);
var mline = lines[0].split(' ');
return mline[0].substr(2);
};
SDPUtils.isRejected = function(mediaSection) {
return mediaSection.split(' ', 2)[1] === '0';
};
SDPUtils.parseMLine = function(mediaSection) {
var lines = SDPUtils.splitLines(mediaSection);
var parts = lines[0].substr(2).split(' ');
return {
kind: parts[0],
port: parseInt(parts[1], 10),
protocol: parts[2],
fmt: parts.slice(3).join(' ')
};
};
SDPUtils.parseOLine = function(mediaSection) {
var line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
var parts = line.substr(2).split(' ');
return {
username: parts[0],
sessionId: parts[1],
sessionVersion: parseInt(parts[2], 10),
netType: parts[3],
addressType: parts[4],
address: parts[5]
};
};
SDPUtils.isValidSDP = function(blob) {
if (typeof blob !== 'string' || blob.length === 0) {
return false;
}
var lines = SDPUtils.splitLines(blob);
for (var i = 0; i < lines.length; i++) {
if (lines[i].length < 2 || lines[i].charAt(1) !== '=') {
return false;
}
}
return true;
};
if (typeof module === 'object') {
module.exports = SDPUtils;
}
},{}]},{},[1])(1)
});
