'use strict'

const _isFinite = require('lodash/isFinite')
const Indicator = require('./indicator')
const EMA = require('./ema')
const StdDev = require('./stddev')

/**
 * Relative Volatility Index
 *
 * @class
 * @augments Indicator
 */
class RVI extends Indicator {
  constructor (args = []) {
    const [period] = args

    super({
      args,
      id: RVI.id,
      name: `RVI(${period})`,
      seedPeriod: period
    })

    this._stddev = new StdDev([period])
    this._uEMA = new EMA([period])
    this._dEMA = new EMA([period])
    this._prevInputValue = null
  }

  static unserialize (args = []) {
    return new RVI(args)
  }

  reset () {
    super.reset()

    if (this._stddev) this._stddev.reset()
    if (this._uEMA) this._uEMA.reset()
    if (this._dEMA) this._dEMA.reset()

    this._prevInputValue = null
  }

  _ud (candlePrice, stddev) {
    if (this._prevInputValue === null) {
      return { u: 0, d: 0 }
    } else if (candlePrice > this._prevInputValue) {
      return { u: stddev, d: 0 }
    } else if (candlePrice < this._prevInputValue) {
      return { u: 0, d: stddev }
    } else {
      return { u: 0, d: 0 }
    }
  }

  update (value) {
    if (this._prevInputValue === null) {
      return this.v()
    }

    this._stddev.update(value)
    const stddev = this._stddev.v()

    if (!_isFinite(stddev)) {
      return this.v()
    }

    const { u, d } = this._ud(value, this._stddev.v())

    this._uEMA.update(u)
    this._dEMA.update(d)

    const uSum = this._uEMA.v()
    const dSum = this._dEMA.v()

    if (uSum === dSum) {
      return super.update(0)
    } else {
      return super.update(100 * (uSum / (uSum + dSum)))
    }
  }

  add (value) {
    if (this._prevInputValue === null) {
      this._prevInputValue = value
      return this.v()
    }

    this._stddev.add(value)
    const stddev = this._stddev.v()

    if (!_isFinite(stddev)) {
      return this.v()
    }

    const { u, d } = this._ud(value, stddev)
    this._uEMA.add(u)
    this._dEMA.add(d)

    const uSum = this._uEMA.v()
    const dSum = this._dEMA.v()

    if (uSum === dSum) {
      super.add(0)
    } else {
      super.add(100 * (uSum / (uSum + dSum)))
    }

    this._prevInputValue = value

    return this.v()
  }
}

RVI.id = 'rvi'
RVI.label = 'RVI'
RVI.humanLabel = 'Relative Volatility Index'
RVI.ui = {
  position: 'external',
  type: 'rsi'
}

RVI.args = [{
  label: 'Period',
  default: 10
}]

module.exports = RVI
