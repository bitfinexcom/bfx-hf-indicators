'use strict'

const Indicator = require('./indicator')

/**
 * Price Volume Trend
 *
 * @class
 * @memberof module:bfx-hf-indicators
 * @augments module:bfx-hf-indicators.Indicator
 */
class PVT extends Indicator {
  constructor (args = []) {
    super({
      args,
      id: PVT.id,
      name: 'PVT',
      seedPeriod: 0,
      dataType: 'candle',
      dataKey: '*'
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
      return this.v()
    }

    const { close, volume } = candle
    const pvt = ((close - this._lastCandle.close) / this._lastCandle.close) * volume
    const v = this.l() > 1 ? this.prev() : 0

    return super.update(pvt + v)
  }

  add (candle) {
    if (this._lastCandle === null) {
      this._lastCandle = candle
      return this.v()
    }

    const { close, volume } = candle
    const pvt = ((close - this._lastCandle.close) / this._lastCandle.close) * volume
    const v = this.l() > 0 ? this.v() : 0

    super.add(pvt + v)

    this._lastCandle = candle

    return this.v()
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
