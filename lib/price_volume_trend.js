'use strict'

const Indicator = require('./indicator')

class PVT extends Indicator {

  constructor (args = []) {
    super({
      args,
      id: PVT.id,
      name: 'PVT',
      seedPeriod: 0,
      dataType: 'candle',
      dataKey: '*',
    })

    this._lastCandle = null
  }

  static unserialize (args = []) {
    return new PVT(args)
  }

  reset () {
    super.reset()
    this._lastCandle = null
  }

  update (candle) {
    if (this._lastCandle === null) {
      return
    }

    const { close, vol } = candle
    const pvt = ((close - this._lastCandle.close) / this._lastCandle.close) * vol
    const v = this.l() > 1 ? this.prev() : 0

    super.update(pvt + v)
  }

  add (candle) {
    if (this._lastCandle === null) {
      this._lastCandle = candle
      return
    }

    const { close, vol } = candle
    const pvt = ((close - this._lastCandle.close) / this._lastCandle.close) * vol
    const v = this.l() > 0 ? this.v() : 0

    super.add(pvt + v)

    this._lastCandle = candle
  }
}

PVT.id = 'pvt'
PVT.label = 'PVT'
PVT.humanLabel = 'Price Volume Trend'
PVT.ui = {
  position: 'external',
  type: 'line'
}

PVT.args = []

module.exports = PVT
