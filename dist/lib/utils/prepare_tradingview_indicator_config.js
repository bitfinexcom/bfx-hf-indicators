'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var _isFunction = require('lodash/isFunction');
var _isNaN = require('lodash/isNaN');
var _reduce = require('lodash/reduce');
var _toLower = require('lodash/toLower');
var _forEach = require('lodash/forEach');
var _capitalize = require('lodash/capitalize');
var _isObject = require('lodash/isObject');
var _isUndefined = require('lodash/isUndefined');
var PLOT_DEFAULT_STYLE = {
  linestyle: 0,
  linewidth: 2,
  plottype: 0,
  transparency: 0,
  visible: true,
  color: 'red'
};
var RSI_DEFAULT_PROPERTIES = {
  bands: [{
    color: '#787B86',
    linestyle: 2,
    linewidth: 1,
    visible: true,
    value: 70
  }, {
    color: '#787B86',
    linestyle: 2,
    linewidth: 1,
    visible: true,
    value: 30
  }],
  filledAreasStyle: {
    fill_0: {
      color: '#7E57C2',
      transparency: 90,
      visible: true
    }
  }
};
var RSI_META_PROPERTIES = {
  bands: [{
    id: 'hline_0',
    name: 'UpperLimit'
  }, {
    id: 'hline_1',
    name: 'LowerLimit'
  }],
  filledAreas: [{
    id: 'fill_0',
    objAId: 'hline_0',
    objBId: 'hline_1',
    type: 'hline_hline',
    title: 'Hlines Background'
  }]
};
function prepareTradingViewIndicatorConfig(_ref) {
  var indicator = _ref.indicator,
    index = _ref.index,
    PineJS = _ref.PineJS,
    IndicatorConstructor = _ref.IndicatorConstructor,
    strategyStartTimestamp = _ref.strategyStartTimestamp;
  var _indicator = _slicedToArray(indicator, 4),
    args = _indicator[1],
    colors = _indicator[2],
    name = _indicator[3];
  var inputs = _reduce(IndicatorConstructor.args, function (acc, _ref2, index) {
    var label = _ref2.label;
    acc[_toLower(label)] = args[index];
    return acc;
  }, {});
  var _inputs$candleKey = inputs['candle key'],
    source = _inputs$candleKey === void 0 ? 'close' : _inputs$candleKey;
  var instance = new IndicatorConstructor(args);
  var _IndicatorConstructor = IndicatorConstructor.ui,
    position = _IndicatorConstructor.position,
    type = _IndicatorConstructor.type,
    _IndicatorConstructor2 = _IndicatorConstructor.format,
    format = _IndicatorConstructor2 === void 0 ? null : _IndicatorConstructor2,
    _IndicatorConstructor3 = _IndicatorConstructor.lines,
    lines = _IndicatorConstructor3 === void 0 ? null : _IndicatorConstructor3;
  var isPriceStudy = position === 'overlay';
  var useCandles = instance.getDataType() === 'candle';
  var isRSIIndicator = type === 'rsi';
  var isSinglePlot = (type === 'line' || isRSIIndicator) && !lines;
  var defaultStyles = {};
  var plots = [];
  var styles = [];
  if (isSinglePlot) {
    defaultStyles.plot_0 = _objectSpread(_objectSpread({}, PLOT_DEFAULT_STYLE), {}, {
      color: colors[0]
    });
    plots.push({
      id: 'plot_0',
      type: 'line'
    });
    styles.plot_0 = {
      title: IndicatorConstructor.humanLabel,
      histogramBase: 0
    };
  } else {
    _forEach(lines, function (l, index) {
      var id = "plot_".concat(index);
      defaultStyles[id] = _objectSpread(_objectSpread({}, PLOT_DEFAULT_STYLE), {}, {
        color: colors[index]
      });
      plots.push({
        id: id,
        type: 'line'
      });
      styles[id] = {
        title: _capitalize(l),
        histogramBase: 0
      };
    });
  }
  return {
    name: name,
    metainfo: _objectSpread({
      id: "".concat(name, "@tv-basicstudies-").concat(index),
      name: name,
      _metainfoVersion: 0,
      description: name,
      shortDescription: instance.getName(),
      is_hidden_study: false,
      is_price_study: isPriceStudy,
      isCustomIndicator: true,
      defaults: _objectSpread({
        styles: defaultStyles,
        inputs: inputs
      }, isRSIIndicator ? RSI_DEFAULT_PROPERTIES : {}),
      plots: plots,
      styles: styles,
      inputs: [],
      format: _isObject(format) ? format : {
        type: 'inherit'
      }
    }, isRSIIndicator ? RSI_META_PROPERTIES : {}),
    constructor: function constructor() {
      this.lastUpdatedTime = null;
      this.memoizedIndicatorValues = {};
      this.wasFirstCandle = false;
      this.prepareLinesPosition = function (v) {
        if (isSinglePlot && !_isObject(v)) {
          return [v];
        }
        var linesPosition = [];
        _forEach(lines, function (l) {
          linesPosition.push(v[l]);
        });
        return linesPosition;
      };
      this.main = function (ctx, inputCallback) {
        this._context = ctx;
        this._input = inputCallback;
        var currentTime = PineJS.Std.updatetime(this._context);

        // Start calculation from the first candle, skip another candles
        if (currentTime < strategyStartTimestamp) {
          return;
        }
        if (!this.wasFirstCandle) {
          if (currentTime !== strategyStartTimestamp) {
            return;
          }
          this.wasFirstCandle = true;
        }
        var price;
        if (useCandles) {
          price = {
            high: PineJS.Std.high(this._context),
            low: PineJS.Std.low(this._context),
            open: PineJS.Std.open(this._context),
            close: PineJS.Std.close(this._context),
            volume: PineJS.Std.volume(this._context)
          };
          if (_isNaN(price.high) || _isNaN(price.low) || _isNaN(price.close) || _isNaN(price.volume) || _isNaN(price.open)) {
            return this.prepareLinesPosition(NaN);
          }
        } else {
          var studyFn = PineJS.Std[source];
          if (!_isFunction(studyFn)) {
            return this.prepareLinesPosition(NaN);
          }
          price = studyFn(this._context);
          if (_isNaN(price)) {
            return this.prepareLinesPosition(NaN);
          }
        }
        if (this.lastUpdatedTime && this.lastUpdatedTime === currentTime) {
          var _v = instance.update(price);
          this.memoizedIndicatorValues[currentTime] = _v;
          return this.prepareLinesPosition(_v);
        }
        var memoizedValue = this.memoizedIndicatorValues[currentTime];
        var isExist = !_isUndefined(memoizedValue);
        if (isExist) {
          return this.prepareLinesPosition(memoizedValue);
        }
        var v = instance.add(price);
        this.lastUpdatedTime = currentTime;
        this.memoizedIndicatorValues[currentTime] = v;
        return this.prepareLinesPosition(v);
      };
    }
  };
}
module.exports = prepareTradingViewIndicatorConfig;