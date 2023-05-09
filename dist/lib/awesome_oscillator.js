'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
var Indicator = require('./indicator');
var AO = /*#__PURE__*/function (_Indicator) {
  _inherits(AO, _Indicator);
  var _super = _createSuper(AO);
  function AO() {
    var _this;
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    _classCallCheck(this, AO);
    _this = _super.call(this, {
      args: args,
      id: AO.id,
      name: 'AO',
      seedPeriod: 34,
      dataType: 'candle',
      dataKey: '*'
    });
    _this._smaShort = new SMA([5]);
    _this._smaLong = new SMA([34]);
    return _this;
  }
  _createClass(AO, [{
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(AO.prototype), "reset", this).call(this);
      if (this._smaShort) this._smaShort.reset();
      if (this._smaLong) this._smaLong.reset();
    }
  }, {
    key: "update",
    value: function update() {
      var candle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var high = candle.high,
        low = candle.low;
      var v = (high + low) / 2;
      this._smaShort.update(v);
      this._smaLong.update(v);
      return _get(_getPrototypeOf(AO.prototype), "update", this).call(this, this._smaShort.v() - this._smaLong.v());
    }
  }, {
    key: "add",
    value: function add() {
      var candle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var high = candle.high,
        low = candle.low;
      var v = (high + low) / 2;
      this._smaShort.add(v);
      this._smaLong.add(v);
      return _get(_getPrototypeOf(AO.prototype), "add", this).call(this, this._smaShort.v() - this._smaLong.v());
    }
  }], [{
    key: "unserialize",
    value: function unserialize() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return new AO(args);
    }
  }]);
  return AO;
}(Indicator);
AO.id = 'ao';
AO.label = 'AO';
AO.humanLabel = 'Awesome Oscillator';
AO.ui = {
  position: 'external',
  type: 'line'
};
AO.args = [];
module.exports = AO;