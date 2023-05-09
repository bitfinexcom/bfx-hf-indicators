'use strict';

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var _isFunction = require('lodash/isFunction');
var _isNaN = require('lodash/isNaN');
function getSinglePlotIndicator(_ref) {
  var indicator = _ref.indicator,
    index = _ref.index,
    PineJS = _ref.PineJS,
    IndicatorConstructor = _ref.IndicatorConstructor;
  var _indicator = _slicedToArray(indicator, 4),
    args = _indicator[1],
    _indicator$ = _slicedToArray(_indicator[2], 1),
    color = _indicator$[0],
    name = _indicator[3];
  var _args = _slicedToArray(args, 2),
    period = _args[0],
    _args$ = _args[1],
    source = _args$ === void 0 ? 'close' : _args$;
  var inputs = {
    period: period,
    source: source
  };
  var instance = new IndicatorConstructor(args);
  var _IndicatorConstructor = IndicatorConstructor.ui,
    _IndicatorConstructor2 = _IndicatorConstructor.isPriceStudy,
    isPriceStudy = _IndicatorConstructor2 === void 0 ? false : _IndicatorConstructor2,
    _IndicatorConstructor3 = _IndicatorConstructor.useCandles,
    useCandles = _IndicatorConstructor3 === void 0 ? false : _IndicatorConstructor3;
  console.log({
    name: name,
    inputs: inputs,
    args: args,
    isPriceStudy: isPriceStudy,
    useCandles: useCandles
  });
  return {
    name: name,
    metainfo: {
      id: "".concat(name, "@tv-basicstudies-").concat(index),
      name: name,
      _metainfoVersion: 0,
      description: name,
      shortDescription: name,
      is_hidden_study: false,
      is_price_study: isPriceStudy,
      isCustomIndicator: true,
      defaults: {
        styles: {
          plot_0: {
            linestyle: 0,
            linewidth: 2,
            plottype: 0,
            transparency: 0,
            visible: true,
            color: color
          }
        },
        inputs: inputs
      },
      plots: [{
        id: 'plot_0',
        type: 'line'
      }],
      styles: {
        plot_0: {
          title: 'Plot1',
          histogramBase: 0
        }
      },
      inputs: [],
      format: {
        type: 'inherit'
      }
    },
    constructor: function constructor() {
      this.lastUpdatedTime = null;
      this.main = function (ctx, inputCallback) {
        this._context = ctx;
        this._input = inputCallback;
        var price;
        if (useCandles) {
          price = {
            high: PineJS.Std.high(this._context),
            low: PineJS.Std.low(this._context),
            close: PineJS.Std.close(this._context),
            volume: PineJS.Std.volume(this._context)
          };
          if (_isNaN(price.high) || _isNaN(price.low) || _isNaN(price.close) || _isNaN(price.volume)) {
            return [NaN];
          }
        } else {
          var studyFn = PineJS.Std[source];
          if (!_isFunction(studyFn)) {
            return [NaN];
          }
          price = studyFn(this._context);
          if (_isNaN(price)) {
            return [NaN];
          }
        }
        var currentTime = PineJS.Std.updatetime(this._context);
        if (this.lastUpdatedTime && this.lastUpdatedTime === currentTime) {
          var _v = instance.update(price);
          console.log('update', {
            price: price,
            source: source,
            v: _v
          });
          return [_v];
        }
        this.lastUpdatedTime = currentTime;
        var v = instance.add(price);
        console.log('add', {
          price: price,
          source: source,
          v: v,
          instance: instance
        });
        return [v];
      };
    }
  };
}
module.exports = getSinglePlotIndicator;