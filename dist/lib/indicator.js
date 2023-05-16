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
var _sum = require('lodash/sum');
var _last = require('lodash/last');
var _isEmpty = require('lodash/isEmpty');
var _isFinite = require('lodash/isFinite');
var _isString = require('lodash/isString');
var _includes = require('lodash/includes');
var _require = require('sprintf-js'),
  sprintf = _require.sprintf;
var prepareTradingViewIndicatorConfig = require('./utils/prepare_tradingview_indicator_config');
var ALLOWED_TYPES = ['line', 'lines', 'rsi'];
var Indicator = /*#__PURE__*/function () {
  function Indicator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      id = _ref.id,
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? '' : _ref$name,
      _ref$seedPeriod = _ref.seedPeriod,
      seedPeriod = _ref$seedPeriod === void 0 ? 0 : _ref$seedPeriod,
      _ref$args = _ref.args,
      args = _ref$args === void 0 ? [] : _ref$args,
      _ref$dataType = _ref.dataType,
      dataType = _ref$dataType === void 0 ? '*' : _ref$dataType,
      _ref$dataKey = _ref.dataKey,
      dataKey = _ref$dataKey === void 0 ? 'close' : _ref$dataKey;
    _classCallCheck(this, Indicator);
    if (!_isString(id)) {
      throw new Error("string id required (".concat(id, ")"));
    }

    // Copy metadata
    this.ui = this.constructor.ui;
    this.argsDef = this.constructor.args;
    this.label = this.constructor.label;
    this.humanLabel = this.constructor.humanLabel;
    this._name = name;
    this._seedPeriod = seedPeriod;
    this._id = id;
    this._args = args;
    this._dataType = dataType;
    this._dataKey = dataKey;
    this.reset();
  }
  _createClass(Indicator, [{
    key: "getName",
    value: function getName() {
      return this._name;
    }
  }, {
    key: "getSeedPeriod",
    value: function getSeedPeriod() {
      return this._seedPeriod;
    }
  }, {
    key: "getDataType",
    value: function getDataType() {
      return this._dataType;
    }
  }, {
    key: "getDataKey",
    value: function getDataKey() {
      return this._dataKey;
    }
  }, {
    key: "update",
    value: function update(v) {
      if (_isEmpty(this._values)) {
        return this.add(v);
      }
      this._values[this._values.length - 1] = v;
      return v;
    }
  }, {
    key: "add",
    value: function add(v) {
      this._values.push(v);
      return v;
    }
  }, {
    key: "reset",
    value: function reset() {
      this._values = [];
    }
  }, {
    key: "prev",
    value: function prev() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return this._values[this._values.length - (n + 1)];
    }
  }, {
    key: "v",
    value: function v() {
      return _last(this._values);
    }
  }, {
    key: "l",
    value: function l() {
      return this._values.length;
    }
  }, {
    key: "nValues",
    value: function nValues() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
      return this._values.slice(this._values.length - n);
    }
  }, {
    key: "avg",
    value: function avg() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
      return _sum(this.nValues(n)) / n;
    }
  }, {
    key: "crossed",
    value: function crossed(target) {
      if (this.l() < 2) {
        return false;
      }
      var v = this.v();
      var prev = this.prev();
      return v >= target && prev <= target || v <= target && prev >= target;
    }
  }, {
    key: "logStr",
    value: function logStr(mts) {
      var v = this.v();
      return sprintf('%s %.2f', this._name, _isFinite(v) ? v : NaN);
    }
  }, {
    key: "ready",
    value: function ready() {
      return _isFinite(this.v());
    }

    /**
     * @returns {object} data
     */
  }, {
    key: "serialize",
    value: function serialize() {
      return {
        seedPeriod: this._seedPeriod,
        name: this._name,
        id: this._id,
        args: this._args
      };
    }
  }], [{
    key: "getTradingViewConfig",
    value: function getTradingViewConfig(args) {
      if (_includes(ALLOWED_TYPES, this.ui.type)) {
        return prepareTradingViewIndicatorConfig(_objectSpread(_objectSpread({}, args), {}, {
          IndicatorConstructor: this
        }));
      }
    }
  }]);
  return Indicator;
}();
Indicator.label = 'Indicator';
module.exports = Indicator;