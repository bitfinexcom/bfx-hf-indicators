'use strict'

const Indicator = require('./indicator')
const getSinglePlotIndicator = require('./utils/get_single_plot_indicator_tv_config')

class VWAP extends Indicator {
  constructor () {
    super({
      args: [],
      id: VWAP.id,
      name: 'VWAP',
      seedPeriod: 0,
      dataType: 'candle',
      dataKey: '*'
    })

    this._totalNum = 0
    this._totalDen = 0
    this._lastNum = 0
    this._lastDen = 0
  }

  static unserialize (args = []) {
    return new VWAP(args)
  }

  reset () {
    super.reset()

    this._totalNum = 0
    this._totalDen = 0
    this._lastNum = 0
    this._lastDen = 0
  }

  update (candle) {
    const { high, low, close, volume } = candle
    const typ = (high + low + close) / 3

    this._totalDen = this._lastDen
    this._totalNum = this._lastNum

    this._totalNum += typ * volume
    this._totalDen += volume

    return super.update(this._totalNum / this._totalDen)
  }

  add (candle) {
    const { high, low, close, volume } = candle
    const typ = (high + low + close) / 3

    this._lastNum = this._totalNum
    this._lastDen = this._totalDen

    this._totalNum += typ * volume
    this._totalDen += volume

    return super.add(this._totalNum / this._totalDen)
  }
}

VWAP.id = 'vwap'
VWAP.label = 'VWAP'
VWAP.humanLabel = 'Volume Weighted Average Price'
VWAP.ui = {
  position: 'overlay',
  type: 'line',
  isPriceStudy: true,
  useCandles: true
}

VWAP.args = []

VWAP.getTradingViewConfig = function (args) {
  return getSinglePlotIndicator({
    ...args,
    IndicatorConstructor: VWAP
  })
}

module.exports = VWAP
