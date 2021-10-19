'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _sum = require('lodash/sum');

var _last = require('lodash/last');

var _isEmpty = require('lodash/isEmpty');

var _isFinite = require('lodash/isFinite');

var _isString = require('lodash/isString');

var _require = require('sprintf-js'),
    sprintf = _require.sprintf;

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
    } // Copy metadata


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
  }]);

  return Indicator;
}();

module.exports = Indicator;