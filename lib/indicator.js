'use strict'

const { sum, last, isEmpty, isFinite, isString } = require('lodash')
const { sprintf } = require('sprintf-js')

class Indicator {
  constructor ({
    id,
    name = '',
    seedPeriod = 0,
    args = [],
    dataType = '*',
    dataKey = 'close'
  } = {}) {
    if (!isString(id)) {
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

  getName () {
    return this._name
  }

  getSeedPeriod () {
    return this._seedPeriod
  }

  getDataType () {
    return this._dataType
  }

  getDataKey () {
    return this._dataKey
  }

  update (v) {
    if (isEmpty(this._values)) {
      return this.add(v)
    }

    this._values[this._values.length - 1] = v
    return v
  }

  add (v) {
    this._values.push(v)
    return v
  }

  reset () {
    this._values = []
  }

  prev (n = 1) {
    return this._values[this._values.length - (n + 1)]
  }

  v () {
    return last(this._values)
  }

  l () {
    return this._values.length
  }

  nValues (n = 2) {
    return this._values.slice(this._values.length - n)
  }

  avg (n = 2) {
    return sum(this.nValues(n)) / n
  }

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

  logStr (mts) {
    const v = this.v()
    return sprintf(`%s %.2f`, this._name, isFinite(v) ? v : NaN)
  }

  ready () {
    return isFinite(this.v())
  }

  /**
   * @return {object} data
   */
  serialize () {
    return {
      seedPeriod: this._seedPeriod,
      name: this._name,
      id: this._id,
      args: this._args,
    }
  }
}

module.exports = Indicator
