'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _sum = require('lodash/sum');

var Indicator = require('./indicator');

var ATR = /*#__PURE__*/function (_Indicator) {
  _inherits(ATR, _Indicator);

  var _super = _createSuper(ATR);

  function ATR() {
    var _this;

    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, ATR);

    var _args = _slicedToArray(args, 1),
        period = _args[0];

    _this = _super.call(this, {
      args: args,
      id: ATR.id,
      name: "ATR(".concat(period, ")"),
      seedPeriod: period,
      dataType: 'candle',
      dataKey: '*'
    });
    _this._p = period;
    _this._prevCandle = null;
    return _this;
  }

  _createClass(ATR, [{
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(ATR.prototype), "reset", this).call(this);

      this._buffer = []; // used to seed first value

      this._prevCandle = null;
    }
  }, {
    key: "update",
    value: function update(candle) {
      if (this.l() === 0) {
        if (this._buffer.length < this._p) {
          this._buffer.push(candle);
        } else {
          this._buffer[this._buffer.length - 1] = candle;
        }

        if (this._buffer.length === this._p) {
          _get(_getPrototypeOf(ATR.prototype), "update", this).call(this, ATR.seed(this._buffer));
        }
      } else {
        _get(_getPrototypeOf(ATR.prototype), "update", this).call(this, ATR.calc(this.prev(), this._p, this._prevCandle, candle));
      }

      return this.v();
    }
  }, {
    key: "add",
    value: function add(candle) {
      if (this.l() === 0) {
        if (this._buffer.length < this._p) {
          this._buffer.push(candle);
        }

        if (this._buffer.length === this._p) {
          _get(_getPrototypeOf(ATR.prototype), "add", this).call(this, ATR.seed(this._buffer));
        }
      } else {
        _get(_getPrototypeOf(ATR.prototype), "add", this).call(this, ATR.calc(this.v(), this._p, this._prevCandle, candle));
      }

      this._prevCandle = candle;
      return this.v();
    }
  }], [{
    key: "unserialize",
    value: function unserialize() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return new ATR(args);
    }
  }, {
    key: "seed",
    value: function seed() {
      var candles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return _sum(candles.map(function (c, i) {
        return ATR.tr(i === 0 ? null : candles[i - 1], c);
      })) / candles.length;
    }
  }, {
    key: "calc",
    value: function calc(prevATR, p, prevCandle, candle) {
      return (prevATR * (p - 1) + ATR.tr(prevCandle, candle)) / p;
    }
  }, {
    key: "tr",
    value: function tr(prevCandle) {
      var candle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return Math.max(prevCandle ? prevCandle.high - prevCandle.low : 0, prevCandle ? Math.abs(candle.high - prevCandle.close) : 0, prevCandle ? Math.abs(candle.low - prevCandle.close) : 0);
    }
  }]);

  return ATR;
}(Indicator);

ATR.id = 'atr';
ATR.label = 'ATR';
ATR.humanLabel = 'Average True Range';
ATR.ui = {
  position: 'external',
  type: 'line'
};
ATR.args = [{
  label: 'Period',
  "default": 14
}];
module.exports = ATR;