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
var _isObject = require('lodash/isObject');
var _isNaN = require('lodash/isNaN');
var _last = require('lodash/last');
var Indicator = require('./indicator');
var EMA = require('./ema');
var MACD = /*#__PURE__*/function (_Indicator) {
  _inherits(MACD, _Indicator);
  var _super = _createSuper(MACD);
  function MACD() {
    var _this;
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    _classCallCheck(this, MACD);
    var _args = _slicedToArray(args, 3),
      fastMA = _args[0],
      slowMA = _args[1],
      signalMA = _args[2];
    _this = _super.call(this, {
      args: args,
      id: MACD.id,
      name: "MACD(".concat(fastMA, ",").concat(slowMA, ",").concat(signalMA, ")"),
      seedPeriod: Math.max(fastMA, slowMA) + signalMA
    });
    _this._slowEMA = new EMA([slowMA]);
    _this._fastEMA = new EMA([fastMA]);
    _this._signalEMA = new EMA([signalMA]);
    return _this;
  }
  _createClass(MACD, [{
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(MACD.prototype), "reset", this).call(this);
      if (this._slowEMA) this._slowEMA.reset();
      if (this._fastEMA) this._fastEMA.reset();
      if (this._signalEMA) this._signalEMA.reset();
    }
  }, {
    key: "update",
    value: function update(value) {
      var slowEMA = this._slowEMA.update(value);
      var fastEMA = this._fastEMA.update(value);
      var macd = fastEMA - slowEMA;
      var signalEMA = this._signalEMA.update(macd);
      var divergence = macd - signalEMA;
      return _get(_getPrototypeOf(MACD.prototype), "update", this).call(this, {
        macd: macd,
        signal: signalEMA,
        divergence: divergence
      });
    }
  }, {
    key: "add",
    value: function add(value) {
      var slowEMA = this._slowEMA.add(value);
      var fastEMA = this._fastEMA.add(value);
      var macd = fastEMA - slowEMA;
      var signalEMA = this._signalEMA.add(macd);
      var divergence = macd - signalEMA;
      return _get(_getPrototypeOf(MACD.prototype), "add", this).call(this, {
        macd: macd,
        signal: signalEMA,
        divergence: divergence
      });
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
      return new MACD(args);
    }
  }]);
  return MACD;
}(Indicator);
MACD.id = 'macd';
MACD.label = 'MACD';
MACD.humanLabel = 'Moving Average Convergence Divergence';
MACD.ui = {
  position: 'external',
  type: 'macd',
  lines: ['divergence', 'macd', 'signal']
};
MACD.args = [{
  label: 'Fast MA Period',
  "default": 12
}, {
  label: 'Slow MA Period',
  "default": 26
}, {
  label: 'Signal MA Period',
  "default": 9
}];
MACD.getTradingViewConfig = function (_ref) {
  var indicator = _ref.indicator,
    index = _ref.index,
    PineJS = _ref.PineJS;
  var _indicator = _slicedToArray(indicator, 4),
    args = _indicator[1],
    _indicator$ = _slicedToArray(_indicator[2], 2),
    col1 = _indicator$[0],
    col2 = _indicator$[1],
    name = _indicator[3];
  var _args2 = _slicedToArray(args, 2),
    fastMA = _args2[0],
    slowMA = _args2[1];
  var signalMA = _last(args);
  var inputs = {
    fastMA: fastMA,
    slowMA: slowMA,
    signalMA: signalMA
  };
  console.log({
    args: args,
    inputs: inputs
  });
  var MACDInstance = new MACD([fastMA, slowMA, signalMA]);
  return {
    name: name,
    metainfo: {
      id: "".concat(name, "@tv-basicstudies-").concat(index),
      name: name,
      _metainfoVersion: 0,
      description: name,
      shortDescription: name,
      is_hidden_study: false,
      is_price_study: false,
      isCustomIndicator: true,
      defaults: {
        styles: {
          plot_0: {
            linestyle: 0,
            linewidth: 1,
            plottype: 5,
            transparency: 0,
            visible: true
          },
          plot_1: {
            linestyle: 0,
            linewidth: 2,
            plottype: 0,
            transparency: 0,
            visible: true,
            color: col1
          },
          plot_2: {
            linestyle: 0,
            linewidth: 2,
            plottype: 0,
            transparency: 0,
            visible: true,
            color: col2
          }
        },
        palettes: {
          palette_0: {
            colors: {
              0: {
                color: '#22ab94',
                width: 1,
                style: 0
              },
              1: {
                color: '#ace5dc',
                width: 1,
                style: 0
              },
              2: {
                color: '#fccbcd',
                width: 1,
                style: 0
              },
              3: {
                color: '#ff5252',
                width: 1,
                style: 0
              }
            }
          }
        },
        inputs: inputs
      },
      plots: [{
        id: 'plot_0',
        type: 'line'
      }, {
        id: 'plot_1',
        type: 'line'
      }, {
        id: 'plot_2',
        type: 'line'
      }, {
        id: 'plot_3',
        palette: 'palette_0',
        target: 'plot_0',
        type: 'colorer'
      }],
      styles: {
        plot_0: {
          title: 'Histogram',
          histogramBase: 0
        },
        plot_1: {
          title: 'MACD',
          histogramBase: 0
        },
        plot_2: {
          title: 'Signal',
          histogramBase: 0
        }
      },
      palettes: {
        palette_0: {
          colors: {
            0: {
              name: 'Color 0'
            },
            1: {
              name: 'Color 1'
            },
            2: {
              name: 'Color 2'
            },
            3: {
              name: 'Color 3'
            }
          }
        }
      },
      inputs: [],
      format: {
        type: 'inherit'
      }
    },
    constructor: function constructor() {
      this.lastUpdatedTime = null;
      this.calculateColumnColor = function (e) {
        var t = e > 0 ? 1 : 3;
        var s = PineJS.Std.change(this._context.new_var(e));
        return t - (PineJS.Std.le(s, 0) ? 0 : 1);
      };
      this.main = function (ctx, inputCallback) {
        this._context = ctx;
        this._input = inputCallback;
        var closePrice = PineJS.Std.close(this._context);
        console.log(closePrice);
        if (!_isNaN(closePrice)) {
          var currentTime = PineJS.Std.updatetime(this._context);
          if (this.lastUpdatedTime && this.lastUpdatedTime === currentTime) {
            var _MACDInstance$update = MACDInstance.update(closePrice),
              _macd = _MACDInstance$update.macd,
              _signal = _MACDInstance$update.signal,
              _divergence = _MACDInstance$update.divergence;
            return [_divergence, _macd, _signal, this.calculateColumnColor(_divergence)];
          }
          this.lastUpdatedTime = currentTime;
          var _MACDInstance$add = MACDInstance.add(closePrice),
            macd = _MACDInstance$add.macd,
            signal = _MACDInstance$add.signal,
            divergence = _MACDInstance$add.divergence;
          return [divergence, macd, signal, this.calculateColumnColor(divergence)];
        }
        return [0, 0, 0, 0];
      };
    }
  };
};
module.exports = MACD;