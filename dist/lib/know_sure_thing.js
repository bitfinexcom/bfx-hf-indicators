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
var _max = require('lodash/max');
var Indicator = require('./indicator');
var ROC = require('./roc');
var SMA = require('./sma');
var KST = /*#__PURE__*/function (_Indicator) {
  _inherits(KST, _Indicator);
  var _super = _createSuper(KST);
  function KST() {
    var _this;
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    _classCallCheck(this, KST);
    var _args = _slicedToArray(args, 9),
      rocA = _args[0],
      rocB = _args[1],
      rocC = _args[2],
      rocD = _args[3],
      smaA = _args[4],
      smaB = _args[5],
      smaC = _args[6],
      smaD = _args[7],
      smaSignal = _args[8];
    _this = _super.call(this, {
      args: args,
      id: KST.id,
      name: "KST (".concat([rocA, rocB, rocC, rocD, smaA, smaB, smaC, smaD, smaSignal].join(','), ")"),
      seedPeriod: _max([rocA + smaA, rocB + smaB, rocC + smaC, rocD + smaD, smaSignal])
    });
    _this._rocA = new ROC([rocA]);
    _this._rocB = new ROC([rocB]);
    _this._rocC = new ROC([rocC]);
    _this._rocD = new ROC([rocD]);
    _this._smaA = new SMA([smaA]);
    _this._smaB = new SMA([smaB]);
    _this._smaC = new SMA([smaC]);
    _this._smaD = new SMA([smaD]);
    _this._smaSignal = new SMA([smaSignal]);
    return _this;
  }
  _createClass(KST, [{
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(KST.prototype), "reset", this).call(this);
      if (this._rocA) this._rocA.reset();
      if (this._rocB) this._rocB.reset();
      if (this._rocC) this._rocC.reset();
      if (this._rocD) this._rocD.reset();
      if (this._smaA) this._smaA.reset();
      if (this._smaB) this._smaB.reset();
      if (this._smaC) this._smaC.reset();
      if (this._smaD) this._smaD.reset();
      if (this._smaSignal) this._smaSignal.reset();
    }
  }, {
    key: "update",
    value: function update(v) {
      this._rocA.update(v);
      this._rocB.update(v);
      this._rocC.update(v);
      this._rocD.update(v);
      if (this._rocA.ready()) this._smaA.update(this._rocA.v());
      if (this._rocB.ready()) this._smaB.update(this._rocB.v());
      if (this._rocC.ready()) this._smaC.update(this._rocC.v());
      if (this._rocD.ready()) this._smaD.update(this._rocD.v());
      if (!this._smaA.ready() || !this._smaB.ready() || !this._smaC.ready() || !this._smaD.ready()) {
        return this.v();
      }
      var kst = this._smaA.v() + this._smaB.v() * 2 + this._smaC.v() * 3 + this._smaD.v() * 4;
      this._smaSignal.update(kst);
      return _get(_getPrototypeOf(KST.prototype), "update", this).call(this, {
        v: kst,
        signal: this._smaSignal.v()
      });
    }
  }, {
    key: "add",
    value: function add(v) {
      this._rocA.add(v);
      this._rocB.add(v);
      this._rocC.add(v);
      this._rocD.add(v);
      if (this._rocA.ready()) this._smaA.add(this._rocA.v());
      if (this._rocB.ready()) this._smaB.add(this._rocB.v());
      if (this._rocC.ready()) this._smaC.add(this._rocC.v());
      if (this._rocD.ready()) this._smaD.add(this._rocD.v());
      if (!this._smaA.ready() || !this._smaB.ready() || !this._smaC.ready() || !this._smaD.ready()) {
        return this.v();
      }
      var kst = this._smaA.v() + this._smaB.v() * 2 + this._smaC.v() * 3 + this._smaD.v() * 4;
      this._smaSignal.add(kst);
      return _get(_getPrototypeOf(KST.prototype), "add", this).call(this, {
        v: kst,
        signal: this._smaSignal.v()
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
      return new KST(args);
    }
  }]);
  return KST;
}(Indicator);
KST.id = 'kst';
KST.label = 'KST';
KST.humanLabel = 'Know Sure Thing';
KST.ui = {
  position: 'external',
  type: 'lines',
  lines: ['v', 'signal']
};
KST.args = [{
  label: 'ROC A Period',
  "default": 10
}, {
  label: 'ROC B Period',
  "default": 15
}, {
  label: 'ROC C Period',
  "default": 20
}, {
  label: 'ROC D Period',
  "default": 30
}, {
  label: 'SMA A Period',
  "default": 10
}, {
  label: 'SMA B Period',
  "default": 10
}, {
  label: 'SMA C Period',
  "default": 10
}, {
  label: 'SMA D Period',
  "default": 15
}, {
  label: 'Signal Period',
  "default": 9
}];
module.exports = KST;