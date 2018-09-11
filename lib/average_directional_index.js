'use strict'

const SMA = require('./sma')
const ATR = require('./atr')
const Indicator = require('./indicator')

// NOTE: Doesn't work properly, online algo descriptions are vague/worded poorly
// TODO: Fix
class ADX extends Indicator {

  constructor (args = []) {
    const [ smoothing, length ] = args

    super({
      args,
      id: ADX.id,
      name: `ADX(${smoothing}, ${length})`,
      seedPeriod: Math.max(smoothing, length),
      dataType: 'candle',
      dataKey: '*',
    })

    this._lastCandle = null

    this._adxSMA = new SMA([smoothing])
    this._upSMA = new SMA([length])
    this._downSMA = new SMA([length])
    this._atr = new ATR([length])
  }

  reset () {
    super.reset()

    if (this._adxSMA) this._adxSMA.reset()
    if (this._upSMA) this._upSMA.reset()
    if (this._downSMA) this._downSMA.reset()
    if (this._atr) this._atr.reset()

    this._lastCandle = null
  }

  static calcUpdate (candle = {}, lastCandle = {}, indicators = {}, type) {
    if (type !== 'add' && type !== 'update') {
      throw new Error('invalid calcUpdate type')
    }

    const { atr, upSMA, downSMA, adxSMA } = indicators
    const { high, low } = candle
    const upMove = high - lastCandle.high
    const downMove = lastCandle.low - low

    const dmUp = upMove > downMove && upMove > 0
      ? upMove
      : 0

    const dmDown = downMove > upMove && downMove > 0
      ? downMove
      : 0

    atr[type](candle)
    upSMA[type](dmUp)
    downSMA[type](dmDown)

    const atrV = atr.v()

    if (atrV === 0) {
      return 0
    }

    const diUp = (upSMA.v() / atrV) * 100
    const diDown = (downSMA.v() / atrV) * 100

    adxSMA[type](Math.abs((diUp - diDown) / (diUp + diDown)))

    return 100 * adxSMA.v()
  }

  update (candle) {
    if (this._lastCandle === null) {
      return
    }

    const adx = ADX.calcUpdate(candle, this._lastCandle, {
      atr: this._atr,
      upSMA: this._upSMA,
      downSMA: this._downSMA,
      adxSMA: this._adxSMA
    }, 'update')

    super.update(adx)
  }

  add (candle) {
    if (this._lastCandle === null) {
      this._lastCandle = candle
      return
    }

    const adx = ADX.calcUpdate(candle, this._lastCandle, {
      atr: this._atr,
      upSMA: this._upSMA,
      downSMA: this._downSMA,
      adxSMA: this._adxSMA
    }, 'add')

    super.add(adx)

    this._lastCandle = candle
  }
}

ADX.id = 'adx'
ADX.label = 'ADX'
ADX.humanLabel = 'Average Directional Index'
ADX.ui = {
  position: 'external',
  type: 'line'
}

ADX.args = [{
  label: 'Smoothing',
  default: 14,
}, {
  label: 'Length',
  default: 14,
}]

module.exports = ADX
