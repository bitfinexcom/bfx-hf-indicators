'use strict'

const _isFinite = require('lodash/isFinite')
const Indicator = require('./indicator')
const EMA = require('./ema')

class RSI extends Indicator {
  constructor (args = []) {
    const [ period ] = args

    super({
      args,
      id: RSI.id,
      name: `RSI(${period})`,
      seedPeriod: period
    })

    this._p = period
    this._uEMA = new EMA([period])
    this._dEMA = new EMA([period])
    this._prevInputValue = null
  }

  reset () {
    super.reset()

    this._prevInputValue = null

    if (this._uEMA) this._uEMA.reset()
    if (this._dEMA) this._dEMA.reset()
  }

  _ud (value) {
    const delta = this._prevInputValue === null
      ? 0
      : value - this._prevInputValue

    return {
      u: delta > 0 ? delta : 0,
      d: delta < 0 ? delta * -1 : 0
    }
  }

  _rs () {
    const uAvg = this._uEMA.v()
    const dAvg = this._dEMA.v()

    return !_isFinite(uAvg) || !_isFinite(dAvg) || dAvg === 0
      ? null
      : uAvg / dAvg
  }

  update (value) {
    if (this._prevInputValue === null) {
      return
    }

    const { u, d } = this._ud(value)

    this._uEMA.update(u)
    this._dEMA.update(d)

    const rs = this._rs()

    if (_isFinite(rs)) {
      super.update(100 - (100 / (1 + rs)))
    }
  }

  add (value) {
    if (this._prevInputValue === null) {
      this._prevInputValue = value
    }

    const { u, d } = this._ud(value)

    this._uEMA.add(u)
    this._dEMA.add(d)

    const rs = this._rs()

    if (_isFinite(rs)) {
      super.add(100 - (100 / (1 + rs)))
      this._prevInputValue = value
    }
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
  label: 'Period'
}]

module.exports = RSI
