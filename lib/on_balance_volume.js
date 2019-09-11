'use strict'

const Indicator = require('./indicator')

class OBV extends Indicator {

  constructor (args = []) {
    super({
      args,
      id: OBV.id,
      name: 'OBV',
      seedPeriod: 0,
      dataType: 'candle',
      dataKey: '*',
    })

    this._lastCandle = null
  }

  static unserialize (args = []) {
    return new OBV(args)
  }

  reset () {
    super.reset()
    this._lastCandle = null
  }

  update (candle) {
    if (this._lastCandle === null) {
      return this.v()
    }

    const { close, volume } = candle
    const v = this.l() > 1 ? this.prev() : 0
    let obv = v

    if (close > this._lastCandle.close) {
      obv = v + volume
    } else if (close < this._lastCandle.close) {
      obv = v - volume
    }

    return super.update(obv)
  }

  add (candle) {
    if (this._lastCandle === null) {
      this._lastCandle = candle
      return this.v()
    }

    const { close, volume } = candle
    const v = this.l() > 0 ? this.v() : 0
    let obv = v

    if (close > this._lastCandle.close) {
      obv = v + volume
    } else if (close < this._lastCandle.close) {
      obv = v - volume
    }

    super.add(obv)

    this._lastCandle = candle

    return this.v()
  }
}

OBV.id = 'obv'
OBV.label = 'OBV'
OBV.humanLabel = 'On Balance Volume'
OBV.ui = {
  position: 'external',
  type: 'line'
}

OBV.args = []

module.exports = OBV
