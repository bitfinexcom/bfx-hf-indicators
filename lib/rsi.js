'use strict'

const BigN = require('bignumber.js')
const _isFinite = require('lodash/isFinite')
const Indicator = require('./indicator')
const MA = require('./wilders_ma')

/**
 * RSI
 *
 * @class
 * @memberof module:bfx-hf-indicators
 * @augments module:bfx-hf-indicators.Indicator
 */
class RSI extends Indicator {
  constructor (args = []) {
    const [period] = args

    super({
      args,
      id: RSI.id,
      name: `RSI(${period})`,
      seedPeriod: period
    })

    this._uMA = new MA([period])
    this._dMA = new MA([period])
    this._prevInputValue = null
  }

  static unserialize (args = []) {
    return new RSI(args)
  }

  reset () {
    super.reset()

    this._prevInputValue = null

    if (this._uMA) this._uMA.reset()
    if (this._dMA) this._dMA.reset()
  }

  _ud (value) {
    const delta = this._prevInputValue === null
      ? 0
      : value - this._prevInputValue

    return {
      u: new BigN(delta > 0 ? delta : 0),
      d: new BigN(delta < 0 ? delta * -1 : 0)
    }
  }

  _rs () {
    const uAvg = this._uMA.v()
    const dAvg = this._dMA.v()

    return !_isFinite(uAvg) || !_isFinite(dAvg) || dAvg === 0
      ? null
      : new BigN(uAvg).div(new BigN(dAvg))
  }

  update (value) {
    if (this._prevInputValue === null) {
      return this.v()
    }

    const { u, d } = this._ud(value)

    this._uMA.update(u.toNumber())
    this._dMA.update(d.toNumber())

    const rs = this._rs()

    if (rs !== null) {
      super.update(new BigN(100).minus(new BigN(100).div(new BigN(1).plus(rs))).toNumber())
    }

    return this.v()
  }

  add (value) {
    if (this._prevInputValue === null) {
      this._prevInputValue = value
    }

    const { u, d } = this._ud(value)

    this._uMA.add(u.toNumber())
    this._dMA.add(d.toNumber())

    const rs = this._rs()

    if (rs !== null) {
      super.add(new BigN(100).minus(new BigN(100).div(new BigN(1).plus(rs))).toNumber())
      this._prevInputValue = value
    }

    return this.v()
  }
}

RSI.id = 'rsi'
RSI.label = 'RSI'
RSI.humanLabel = 'Relative Strength Index'
RSI.ui = {
  position: 'external',
  type: 'rsi'
}

RSI.args = [{
  label: 'Period',
  default: 14
}]

module.exports = RSI
