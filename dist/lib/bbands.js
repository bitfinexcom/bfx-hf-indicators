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

var _isFinite = require('lodash/isFinite');

var SMA = require('./sma');

var StdDeviation = require('./stddev');

var Indicator = require('./indicator');

var BollingerBands = /*#__PURE__*/function (_Indicator) {
  _inherits(BollingerBands, _Indicator);

  var _super = _createSuper(BollingerBands);

  function BollingerBands() {
    var _this;

    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, BollingerBands);

    var _args = _slicedToArray(args, 2),
        _args$ = _args[0],
        period = _args$ === void 0 ? 20 : _args$,
        _args$2 = _args[1],
        mul = _args$2 === void 0 ? 2 : _args$2;

    _this = _super.call(this, {
      args: args,
      id: BollingerBands.id,
      name: "BBANDS(".concat(period, ", ").concat(mul, ")"),
      seedPeriod: period
    });
    _this._p = period;
    _this._m = mul;
    _this._ema = new SMA([period]);
    _this._stddev = new StdDeviation([period]);
    return _this;
  }

  _createClass(BollingerBands, [{
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(BollingerBands.prototype), "reset", this).call(this);

      if (this._ema) this._ema.reset();
      if (this._stddev) this._stddev.reset();
    }
  }, {
    key: "update",
    value: function update(value) {
      this._ema.update(value);

      this._stddev.update(value);

      var middle = this._ema.v();

      var stddev = this._stddev.v();

      return _get(_getPrototypeOf(BollingerBands.prototype), "update", this).call(this, {
        top: middle + this._m * stddev,
        middle: middle,
        bottom: middle - this._m * stddev
      });
    }
  }, {
    key: "add",
    value: function add(value) {
      this._ema.add(value);

      this._stddev.add(value);

      var middle = this._ema.v();

      var stddev = this._stddev.v();

      return _get(_getPrototypeOf(BollingerBands.prototype), "add", this).call(this, {
        top: middle + this._m * stddev,
        middle: middle,
        bottom: middle - this._m * stddev
      });
    }
  }, {
    key: "ready",
    value: function ready() {
      return _isFinite((this.v() || {}).middle);
    }
  }, {
    key: "crossed",
    value: function crossed(target) {
      if (this.l() < 2) {
        return false;
      }

      var v = this.v().middle;
      var prev = this.prev().middle;
      return v >= target && prev <= target || v <= target && prev >= target;
    }
  }, {
    key: "avg",
    value: function avg() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
      return _sum(this.nValues(n).map(function (v) {
        return v.middle;
      })) / n;
    }
  }], [{
    key: "unserialize",
    value: function unserialize() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return new BollingerBands(args);
    }
  }]);

  return BollingerBands;
}(Indicator);

BollingerBands.id = 'bbands';
BollingerBands.label = 'BB';
BollingerBands.humanLabel = 'Bollinger Bands';
BollingerBands.ui = {
  position: 'overlay',
  type: 'bbands'
};
BollingerBands.args = [{
  label: 'Period',
  "default": 20
}, {
  label: 'Multiplier',
  "default": 2
}];
module.exports = BollingerBands;