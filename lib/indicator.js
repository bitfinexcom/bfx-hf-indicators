'use strict'

const _sum = require('lodash/sum')
const _last = require('lodash/last')
const _isEmpty = require('lodash/isEmpty')
const _isFinite = require('lodash/isFinite')
const _isString = require('lodash/isString')
const { sprintf } = require('sprintf-js')

/**
 * Base indicator class, providing logic to track and query calculated values.
 *
 * @class
 * @memberof module:bfx-hf-indicators
 */
class Indicator {
  /**
   * @param {object} opts - options
   * @param {string} opts.id - unique indicator ID
   * @param {string} [opts.name] - indicator name to be shown in an UI,
   *   including provided arguments (i.e. 'RSI(14)')
   * @param {number} [opts.seedPeriod=0] - number of input values required
   *   before the indicator can provide a valid calculated output.
   * @param {Array} [opts.args=[]] - arguments as passed to the child class
   *   constructor. Used for serialization.
   * @param {string} [opts.dataType='*'] - indicates input data type. Either
   *   'trade', 'candle', or '*' indicating both may be provided. If '*' the
   *   `dataKey` field is ignored.
   * @param {string} [opts.dataKey='close'] - key on input data object,
   *   {@link module:bfx-api-node-models.Trade} or
   *   {@link module:bfx-api-node-models.Candle}, to be accessed as the input
   *   value. See the `dataType` field.
   */
  constructor ({
    id,
    name = '',
    seedPeriod = 0,
    args = [],
    dataType = '*',
    dataKey = 'close'
  } = {}) {
    if (!_isString(id)) {
      throw new Error(`string id required (${id})`)
    }

    // Copy metadata
    this.ui = this.constructor.ui
    this.argsDef = this.constructor.args
    this.label = this.constructor.label
    this.humanLabel = this.constructor.humanLabel

    this._name = name
    this._seedPeriod = seedPeriod
    this._id = id
    this._args = args
    this._dataType = dataType
    this._dataKey = dataKey
    this.reset()
  }

  /**
   * @returns {string} name - human readable label, i.e. 'RSI(14)'
   */
  getName () {
    return this._name
  }

  /**
   * @returns {number} seedPeriod - seed period
   */
  getSeedPeriod () {
    return this._seedPeriod
  }

  /**
   * @returns {string} dataType - data type
   */
  getDataType () {
    return this._dataType
  }

  /**
   * @returns {string} dataKey - data key
   */
  getDataKey () {
    return this._dataKey
  }

  /**
   * @param {number} v - calculated value to replace the current value
   */
  update (v) {
    if (_isEmpty(this._values)) {
      return this.add(v)
    }

    this._values[this._values.length - 1] = v
    return v
  }

  /**
   * @param {number} v - new calculated value
   */
  add (v) {
    this._values.push(v)
    return v
  }

  /**
   * Clears historical data
   */
  reset () {
    this._values = []
  }

  /**
   * Query a historical data point
   *
   * @param {number} [n=1] - index where `0` is the current value
   */
  prev (n = 1) {
    return this._values[this._values.length - (n + 1)]
  }

  /**
   * Query the current value
   *
   * @returns {Object|number} v - may be an object depending on the child class
   */
  v () {
    return _last(this._values)
  }

  /**
   * Query the number of calculated values
   *
   * @returns {number} length
   */
  l () {
    return this._values.length
  }

  /**
   * Returns a slice of historical data points
   *
   * @param {number} [n=2] - number of historical data points to include in
   *   result
   * @returns {number[]|Object[]} values - historical values
   */
  nValues (n = 2) {
    return this._values.slice(this._values.length - n)
  }

  /**
   * Returns the average of historical data points. Only valid for indicators
   * storing numeric values, undefined behavior otherwise.
   *
   * @param {number} [n=2] - number of historical data points to include in
   *   average
   * @returns {number} avg
   */
  avg (n = 2) {
    return _sum(this.nValues(n)) / n
  }

  /**
   * Query if the indicator value has crossed the provided numeric value
   * between the most recent 2 data points. Only valid for indicators working
   * with numeric values, undefined behavior otherwise.
   *
   * @param {number} target - target
   * @returns {boolean} crossed
   */
  crossed (target) {
    if (this.l() < 2) {
      return false
    }

    const v = this.v()
    const prev = this.prev()

    return (
      (v >= target && prev <= target) ||
      (v <= target && prev >= target)
    )
  }

  /**
   * Returns a string with the indicator name and current value. Only valid for
   * indicators working with numeric values, undefined behavior otherwise.
   *
   * @returns {string} str
   */
  logStr () {
    const v = this.v()
    return sprintf('%s %.2f', this._name, _isFinite(v) ? v : NaN)
  }

  /**
   * Query if the indicator has a finite current value. Only valid for
   * indicators working with numeric values, undefined behavior otherwise. The
   * seed period provided to the constructor should reflect the ready state
   * based on the number of processed inputs.
   *
   * @returns {boolean} isReady
   */
  ready () {
    return _isFinite(this.v())
  }

  /**
   * Returns an object containing all data necessary to reconstruct the
   * indicator.
   *
   * @returns {object} data
   */
  serialize () {
    return {
      seedPeriod: this._seedPeriod,
      name: this._name,
      id: this._id,
      args: this._args
    }
  }
}

module.exports = Indicator
