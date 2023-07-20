'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var _isEmpty = require('lodash/isEmpty');
var _isFinite = require('lodash/isFinite');
var _isObject = require('lodash/isObject');
var _min = require('lodash/min');
var _max = require('lodash/max');
var Indicator = require('./indicator');
var SMA = require('./sma');
var RSI = require('./rsi');
var StochasticRSI = /*#__PURE__*/function (_Indicator) {
  _inherits(StochasticRSI, _Indicator);
  var _super = _createSuper(StochasticRSI);
  function StochasticRSI() {
    var _this;
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    _classCallCheck(this, StochasticRSI);
    var _args = _slicedToArray(args, 4),
      lengthRSI = _args[0],
      lengthStochastic = _args[1],
      smoothStoch = _args[2],
      smoothSignal = _args[3];
    _this = _super.call(this, {
      args: args,
      id: StochasticRSI.id,
      name: "Stoch RSI(".concat(lengthRSI, ", ").concat(lengthStochastic, ", ").concat(smoothStoch, ", ").concat(smoothSignal, ")"),
      seedPeriod: lengthRSI + lengthStochastic + smoothStoch
    });
    _this._buffer = [];
    _this._l = lengthStochastic;
    _this._rsi = new RSI([lengthRSI]);
    _this._smaStoch = new SMA([smoothStoch]);
    _this._smaSignal = new SMA([smoothSignal]);
    return _this;
  }
  _createClass(StochasticRSI, [{
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(StochasticRSI.prototype), "reset", this).call(this);
      this._buffer = [];
      if (this._rsi) this._rsi.reset();
      if (this._smaStoch) this._smaStoch.reset();
      if (this._smaSignal) this._smaSignal.reset();
    }
  }, {
    key: "update",
    value: function update(v) {
      this._rsi.update(v);
      var rsi = this._rsi.v();
      if (!_isFinite(rsi)) {
        return this.v();
      }
      if (_isEmpty(this._buffer)) {
        this._buffer.push(rsi);
      } else {
        this._buffer[this._buffer.length - 1] = rsi;
      }
      if (this._buffer.length < this._l) {
        return this.v();
      }
      var low = _min(this._buffer);
      var high = _max(this._buffer);
      var stoch = high === low ? 1 : (rsi - low) / (high - low);
      this._smaStoch.update(stoch * 100);
      var smaStoch = this._smaStoch.v();
      if (!_isFinite(smaStoch)) {
        return this.v();
      }
      this._smaSignal.update(smaStoch);
      var smaSignal = this._smaSignal.v();
      if (_isFinite(smaSignal)) {
        _get(_getPrototypeOf(StochasticRSI.prototype), "update", this).call(this, {
          v: smaStoch,
          signal: smaSignal
        });
      }
      return this.v();
    }
  }, {
    key: "add",
    value: function add(v) {
      this._rsi.add(v);
      var rsi = this._rsi.v();
      if (!_isFinite(rsi)) {
        return this.v();
      }
      this._buffer.push(rsi);
      if (this._buffer.length > this._l) {
        this._buffer.splice(0, 1);
      } else if (this._buffer.length < this._l) {
        return this.v();
      }
      var low = _min(this._buffer);
      var high = _max(this._buffer);
      var stoch = high === low ? 1 : (rsi - low) / (high - low);
      this._smaStoch.add(stoch * 100);
      var smaStoch = this._smaStoch.v();
      if (!_isFinite(smaStoch)) {
        return this.v();
      }
      this._smaSignal.add(smaStoch);
      var smaSignal = this._smaSignal.v();
      if (_isFinite(smaSignal)) {
        _get(_getPrototypeOf(StochasticRSI.prototype), "add", this).call(this, {
          v: smaStoch,
          signal: smaSignal
        });
      }
      return this.v();
    }
  }, {
    key: "ready",
    value: function ready() {
      return _isObject(this.v());
    }
  }], [{
    key: "unserialize",
    value: function unserialize() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return new StochasticRSI(args);
    }
  }]);
  return StochasticRSI;
}(Indicator);
StochasticRSI.id = 'stochrsi';
StochasticRSI.label = 'StochRSI';
StochasticRSI.humanLabel = 'Stochastic RSI';
StochasticRSI.ui = {
  position: 'external',
  type: 'lines',
  lines: ['v', 'signal']
};
StochasticRSI.args = [{
  label: 'Length RSI',
  "default": 14
}, {
  label: 'Length Stochastic',
  "default": 14
}, {
  label: 'Stoch Smoothing',
  "default": 3
}, {
  label: 'Signal Smoothing',
  "default": 3
}];
module.exports = StochasticRSI;