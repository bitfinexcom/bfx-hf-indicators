'use strict'

const _isFinite = require('lodash/isFinite')
const Indicator = require('./indicator')
const ATR = require('./atr')
const getSinglePlotIndicator = require('./utils/get_single_plot_indicator_tv_config')

class NATR extends Indicator {
  constructor (args = []) {
    const [period] = args

    super({
      args,
      id: NATR.id,
      name: `NATR(${period})`,
      seedPeriod: period,
      dataType: 'candle',
      dataKey: '*'
    })

    this._p = period
    this._prevCandle = null
    this._atr = new ATR([period])
  }

  static unserialize (args = []) {
    return new NATR(args)
  }

  reset () {
    super.reset()

    if (this._atr) this._atr.reset()
  }

  update (candle) {
    this._atr.update(candle)

    if (_isFinite(this._atr.v())) {
      super.update((this._atr.v() / candle.close) * 100)
    }

    return this.v()
  }

  add (candle) {
    this._atr.add(candle)

    if (_isFinite(this._atr.v())) {
      super.add((this._atr.v() / candle.close) * 100)
    }

    return this.v()
  }
}

NATR.id = 'natr'
NATR.label = 'NATR'
NATR.humanLabel = 'Normalised Average True Range'
NATR.ui = {
  position: 'external',
  type: 'line',
  isPriceStudy: false,
  useCandles: true
}

NATR.args = [{
  label: 'Period',
  default: 14
}]

NATR.getTradingViewConfig = function (args) {
  return getSinglePlotIndicator({
    ...args,
    IndicatorConstructor: NATR
  })
}

module.exports = NATR
