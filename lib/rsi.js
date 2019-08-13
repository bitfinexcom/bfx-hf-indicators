'use strict'

const _isFinite = require('lodash/isFinite')
const Indicator = require('./indicator')
const MA = require('./sma')

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
      u: delta > 0 ? delta : 0,
      d: delta < 0 ? delta * -1 : 0
    }
  }

  _rs () {
    const uAvg = this._uMA.v()
    const dAvg = this._dMA.v()

    return !_isFinite(uAvg) || !_isFinite(dAvg) || dAvg === 0
      ? null
      : uAvg / dAvg
  }

  update (value) {
    if (this._prevInputValue === null) {
      return this.v()
    }

    const { u, d } = this._ud(value)

    this._uMA.update(u)
    this._dMA.update(d)

    const rs = this._rs()

    if (_isFinite(rs)) {
      super.update(100 - (100 / (1 + rs)))
    }

    return this.v()
  }

  add (value) {
    if (this._prevInputValue === null) {
      this._prevInputValue = value
    }

    const { u, d } = this._ud(value)

    this._uMA.add(u)
    this._dMA.add(d)

    const rs = this._rs()

    if (_isFinite(rs)) {
      super.add(100 - (100 / (1 + rs)))
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
  default: 14,
}]

module.exports = RSI
