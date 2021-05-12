'use strict'

const BigN = require('bignumber.js')
const _isFinite = require('lodash/isFinite')
const Indicator = require('./indicator')
const MA = require('./wilders_ma')

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
    if (this._prevInputValue === null) return {
      u: new BigN(0),
      d: new BigN(0)
    }
    const lastClose = this._prevInputValue

    return value > lastClose ? {
      u: new BigN(value - lastClose),
      d: new BigN(0)
    } : {
      u: new BigN(0),
      d: new BigN(lastClose - value),
    }
  }

  _getRelativeStrength () {
    const uAvg = this._uMA.v()
    const dAvg = this._dMA.v()

    if (!_isFinite(uAvg) || !_isFinite(dAvg)) return null
    if (dAvg === 0) return new BigN(100)

    return new BigN(uAvg).div(new BigN(dAvg))
  }

  update (value) {
    if (this._prevInputValue === null) {
      return this.v()
    }

    const { u, d } = this._ud(value)

    this._uMA.update(u.toNumber())
    this._dMA.update(d.toNumber())

    const relativeStrength = this._getRelativeStrength()

    if (relativeStrength !== null) {
      const max = new BigN(100)

      super.update(max.minus(max.div(relativeStrength.plus(1))).toNumber())
    }

    return this.v()
  }

  add (value) {
    const { u, d } = this._ud(value)

    this._uMA.add(u.toNumber())
    this._dMA.add(d.toNumber())

    const relativeStrength = this._getRelativeStrength()

    if (relativeStrength !== null) {
      const max = new BigN(100)

      super.add(max.minus(max.div(relativeStrength.plus(1))).toNumber())
    }
    this._prevInputValue = value

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
