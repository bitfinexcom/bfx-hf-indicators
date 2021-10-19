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

var _isObject = require('lodash/isObject');

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
  type: 'macd'
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
module.exports = MACD;