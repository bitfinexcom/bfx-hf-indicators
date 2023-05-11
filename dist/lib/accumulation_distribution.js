'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
var _isFinite = require('lodash/isFinite');
var Indicator = require('./indicator');
var getSinglePlotIndicator = require('./utils/get_single_plot_indicator_tv_config');
var AccumulationDistribution = /*#__PURE__*/function (_Indicator) {
  _inherits(AccumulationDistribution, _Indicator);
  var _super = _createSuper(AccumulationDistribution);
  function AccumulationDistribution() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    _classCallCheck(this, AccumulationDistribution);
    return _super.call(this, {
      args: args,
      id: AccumulationDistribution.id,
      name: 'Accum/Dist',
      dataType: 'candle',
      dataKey: '*'
    });
  }
  _createClass(AccumulationDistribution, [{
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(AccumulationDistribution.prototype), "reset", this).call(this);
    }
  }, {
    key: "update",
    value: function update(candle) {
      var high = candle.high,
        low = candle.low,
        close = candle.close,
        volume = candle.volume;
      var moneyFlowMult = high === low ? 0 : (close - low - (high - close)) / (high - low);
      var moneyFlowVol = moneyFlowMult * volume;
      var prev = this.prev();
      return _get(_getPrototypeOf(AccumulationDistribution.prototype), "update", this).call(this, _isFinite(prev) ? prev + moneyFlowVol : moneyFlowVol);
    }
  }, {
    key: "add",
    value: function add(candle) {
      var high = candle.high,
        low = candle.low,
        close = candle.close,
        volume = candle.volume;
      var moneyFlowMult = high === low ? 0 : (close - low - (high - close)) / (high - low);
      var moneyFlowVol = moneyFlowMult * volume;
      var prev = this.v();
      return _get(_getPrototypeOf(AccumulationDistribution.prototype), "add", this).call(this, _isFinite(prev) ? prev + moneyFlowVol : moneyFlowVol);
    }
  }], [{
    key: "unserialize",
    value: function unserialize() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return new AccumulationDistribution(args);
    }
  }]);
  return AccumulationDistribution;
}(Indicator);
AccumulationDistribution.id = 'ad';
AccumulationDistribution.label = 'Accum/Dist';
AccumulationDistribution.humanLabel = 'Accum/Dist';
AccumulationDistribution.ui = {
  position: 'external',
  type: 'line',
  isPriceStudy: false,
  useCandles: true
};
AccumulationDistribution.args = [];
AccumulationDistribution.getTradingViewConfig = function (args) {
  return getSinglePlotIndicator(_objectSpread(_objectSpread({}, args), {}, {
    IndicatorConstructor: AccumulationDistribution
  }));
};
module.exports = AccumulationDistribution;