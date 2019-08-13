'use strict'

const BigN = require('bignumber.js')
const _isFinite = require('lodash/isFinite')

const Indicator = require('./indicator')
const SMA = require('./sma')

class EOM extends Indicator {
  constructor (args = []) {
    const [divisor, length] = args

    super({
      args,
      id: EOM.id,
      name: `EOM(${divisor}, ${length})`,
      seedPeriod: length,
      dataType: 'candle',
      dataKey: '*',
    })

    this._d = new BigN(divisor)
    this._sma = new SMA([length])
    this._lastCandle = null
  }

  static unserialize (args = []) {
    return new EOM(args)
  }

  reset () {
    super.reset()

    if (this._sma) this._sma.reset()

    this._lastCandle = null
  }

  update (candle) {
    if (!this._lastCandle) {
      return
    }

    const high = new BigN(candle.high)
    const low = new BigN(candle.low)
    const vol = new BigN(candle.volume)
    const lastHigh = new BigN(this._lastCandle.high)
    const lastLow = new BigN(this._lastCandle.low)

    const moved = high.plus(low).div(2).minus(lastHigh.plus(lastLow).div(2))
    const boxRatio = vol.div(this._d).div(high.minus(low))
    const eom = moved.div(boxRatio)

    this._sma.update(eom.toNumber())
    const v = this._sma.v()

    if (_isFinite(v)) {
      super.update(v)
    }

    return this.v()
  }

  add (candle) {
    if (!this._lastCandle) {
      this._lastCandle = candle
      return
    }

    const high = new BigN(candle.high)
    const low = new BigN(candle.low)
    const vol = new BigN(candle.volume)
    const lastHigh = new BigN(this._lastCandle.high)
    const lastLow = new BigN(this._lastCandle.low)

    const moved = high.plus(low).div(2).minus(lastHigh.plus(lastLow).div(2))
    const boxRatio = candle.high === candle.low
      ? 1
      : vol.div(this._d).div(high.minus(low))

    const eom = moved.div(boxRatio)

    this._sma.add(eom.toNumber())
    const v = this._sma.v()

    if (_isFinite(v)) {
      super.add(v)
    }

    this._lastCandle = candle
    return this.v()
  }
}

EOM.id = 'eom'
EOM.label = 'EOM'
EOM.humanLabel = 'Ease of Movement'
EOM.ui = {
  position: 'external',
  type: 'line',
}

EOM.args = [{
  label: 'Divisor',
  default: 10000,
}, {
  label: 'Length',
  default: 14,
}]

module.exports = EOM
