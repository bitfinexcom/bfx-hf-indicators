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
var _isFinite = require('lodash/isFinite');
var Indicator = require('./indicator');
var EMA = require('./ema');
var ADL = require('./accumulation_distribution');
var ChaikinOsc = /*#__PURE__*/function (_Indicator) {
  _inherits(ChaikinOsc, _Indicator);
  var _super = _createSuper(ChaikinOsc);
  function ChaikinOsc() {
    var _this;
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    _classCallCheck(this, ChaikinOsc);
    var _args = _slicedToArray(args, 2),
      _short = _args[0],
      _long = _args[1];
    _this = _super.call(this, {
      args: args,
      id: ChaikinOsc.id,
      name: "ChaikinOsc (".concat(_short, ", ").concat(_long, ")"),
      seedPeriod: Math.max(_short, _long),
      dataType: 'candle',
      dataKey: '*'
    });
    _this._shortEMA = new EMA([_short]);
    _this._longEMA = new EMA([_long]);
    _this._adl = new ADL();
    return _this;
  }
  _createClass(ChaikinOsc, [{
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(ChaikinOsc.prototype), "reset", this).call(this);
      if (this._shortEMA) this._shortEMA.reset();
      if (this._longEMA) this._longEMA.reset();
      if (this._adl) this._adl.reset();
    }
  }, {
    key: "update",
    value: function update(candle) {
      this._adl.update(candle);
      var adl = this._adl.v();
      if (!_isFinite(adl)) {
        return;
      }
      this._shortEMA.update(adl);
      this._longEMA.update(adl);
      var _short2 = this._shortEMA.v();
      var _long2 = this._longEMA.v();
      if (_isFinite(_short2) && _isFinite(_long2)) {
        _get(_getPrototypeOf(ChaikinOsc.prototype), "update", this).call(this, _short2 - _long2);
      }
      return this.v();
    }
  }, {
    key: "add",
    value: function add(candle) {
      this._adl.add(candle);
      var adl = this._adl.v();
      if (!_isFinite(adl)) {
        return;
      }
      this._shortEMA.add(adl);
      this._longEMA.add(adl);
      var _short3 = this._shortEMA.v();
      var _long3 = this._longEMA.v();
      if (_isFinite(_short3) && _isFinite(_long3)) {
        _get(_getPrototypeOf(ChaikinOsc.prototype), "add", this).call(this, _short3 - _long3);
      }
      return this.v();
    }
  }], [{
    key: "unserialize",
    value: function unserialize() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return new ChaikinOsc(args);
    }
  }]);
  return ChaikinOsc;
}(Indicator);
ChaikinOsc.id = 'chaikinosc';
ChaikinOsc.label = 'ChaikinOsc';
ChaikinOsc.humanLabel = 'Chaikin Oscillator';
ChaikinOsc.ui = {
  position: 'external',
  type: 'line'
};
ChaikinOsc.args = [{
  label: 'Short Period',
  "default": 3
}, {
  label: 'Long Period',
  "default": 10
}];
module.exports = ChaikinOsc;