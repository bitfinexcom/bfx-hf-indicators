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
var SMA = require('./sma');
var ATR = require('./atr');
var Indicator = require('./indicator');

// NOTE: Doesn't work properly, online algo descriptions are vague/worded poorly
var ADX = /*#__PURE__*/function (_Indicator) {
  _inherits(ADX, _Indicator);
  var _super = _createSuper(ADX);
  function ADX() {
    var _this;
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    _classCallCheck(this, ADX);
    var _args = _slicedToArray(args, 2),
      smoothing = _args[0],
      length = _args[1];
    _this = _super.call(this, {
      args: args,
      id: ADX.id,
      name: "ADX(".concat(smoothing, ", ").concat(length, ")"),
      seedPeriod: Math.max(smoothing, length),
      dataType: 'candle',
      dataKey: '*'
    });
    _this._lastCandle = null;
    _this._adxSMA = new SMA([smoothing]);
    _this._upSMA = new SMA([length]);
    _this._downSMA = new SMA([length]);
    _this._atr = new ATR([length]);
    return _this;
  }
  _createClass(ADX, [{
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(ADX.prototype), "reset", this).call(this);
      if (this._adxSMA) this._adxSMA.reset();
      if (this._upSMA) this._upSMA.reset();
      if (this._downSMA) this._downSMA.reset();
      if (this._atr) this._atr.reset();
      this._lastCandle = null;
    }
  }, {
    key: "update",
    value: function update(candle) {
      if (this._lastCandle === null) {
        return;
      }
      var adx = ADX.calcUpdate(candle, this._lastCandle, {
        atr: this._atr,
        upSMA: this._upSMA,
        downSMA: this._downSMA,
        adxSMA: this._adxSMA
      }, 'update');
      return _get(_getPrototypeOf(ADX.prototype), "update", this).call(this, adx);
    }
  }, {
    key: "add",
    value: function add(candle) {
      if (this._lastCandle === null) {
        this._lastCandle = candle;
        return;
      }
      var adx = ADX.calcUpdate(candle, this._lastCandle, {
        atr: this._atr,
        upSMA: this._upSMA,
        downSMA: this._downSMA,
        adxSMA: this._adxSMA
      }, 'add');
      _get(_getPrototypeOf(ADX.prototype), "add", this).call(this, adx);
      this._lastCandle = candle;
      return this.v();
    }
  }], [{
    key: "unserialize",
    value: function unserialize() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return new ADX(args);
    }
  }, {
    key: "calcUpdate",
    value: function calcUpdate() {
      var candle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var lastCandle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var indicators = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var type = arguments.length > 3 ? arguments[3] : undefined;
      if (type !== 'add' && type !== 'update') {
        throw new Error('invalid calcUpdate type');
      }
      var atr = indicators.atr,
        upSMA = indicators.upSMA,
        downSMA = indicators.downSMA,
        adxSMA = indicators.adxSMA;
      var high = candle.high,
        low = candle.low;
      var upMove = high - lastCandle.high;
      var downMove = lastCandle.low - low;
      var dmUp = upMove > downMove && upMove > 0 ? upMove : 0;
      var dmDown = downMove > upMove && downMove > 0 ? downMove : 0;
      atr[type](candle);
      upSMA[type](dmUp);
      downSMA[type](dmDown);
      var atrV = atr.v();
      if (atrV === 0) {
        return 0;
      }
      var diUp = upSMA.v() / atrV * 100;
      var diDown = downSMA.v() / atrV * 100;
      adxSMA[type](Math.abs((diUp - diDown) / (diUp + diDown)));
      return 100 * adxSMA.v();
    }
  }]);
  return ADX;
}(Indicator);
ADX.id = 'adx';
ADX.label = 'ADX';
ADX.humanLabel = 'Average Directional Index';
ADX.ui = {
  position: 'external',
  type: 'line'
};
ADX.args = [{
  label: 'Smoothing',
  "default": 14
}, {
  label: 'Length',
  "default": 14
}];
module.exports = ADX;