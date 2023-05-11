'use strict'

const _sum = require('lodash/sum')
const Indicator = require('./indicator')
const getSinglePlotIndicator = require('./utils/get_single_plot_indicator_tv_config')

class ATR extends Indicator {
  constructor (args = []) {
    const [period] = args

    super({
      args,
      id: ATR.id,
      name: `ATR(${period})`,
      seedPeriod: period,
      dataType: 'candle',
      dataKey: '*'
    })

    this._p = period
    this._prevCandle = null
  }

  static unserialize (args = []) {
    return new ATR(args)
  }

  static seed (candles = []) {
    return _sum(
      candles.map((c, i) => ATR.tr(i === 0 ? null : candles[i - 1], c))
    ) / candles.length
  }

  static calc (prevATR, p, prevCandle, candle) {
    return (prevATR * (p - 1) + ATR.tr(prevCandle, candle)) / p
  }

  static tr (prevCandle, candle = {}) {
    return Math.max(
      prevCandle ? (prevCandle.high - prevCandle.low) : 0,
      prevCandle ? Math.abs(candle.high - prevCandle.close) : 0,
      prevCandle ? Math.abs(candle.low - prevCandle.close) : 0
    )
  }

  reset () {
    super.reset()
    this._buffer = [] // used to seed first value
    this._prevCandle = null
  }

  update (candle) {
    if (this.l() === 0) {
      if (this._buffer.length < this._p) {
        this._buffer.push(candle)
      } else {
        this._buffer[this._buffer.length - 1] = candle
      }

      if (this._buffer.length === this._p) {
        super.update(ATR.seed(this._buffer))
      }
    } else {
      super.update(ATR.calc(this.prev(), this._p, this._prevCandle, candle))
    }

    return this.v()
  }

  add (candle) {
    if (this.l() === 0) {
      if (this._buffer.length < this._p) {
        this._buffer.push(candle)
      }

      if (this._buffer.length === this._p) {
        super.add(ATR.seed(this._buffer))
      }
    } else {
      super.add(ATR.calc(this.v(), this._p, this._prevCandle, candle))
    }

    this._prevCandle = candle
    return this.v()
  }
}

ATR.id = 'atr'
ATR.label = 'ATR'
ATR.humanLabel = 'Average True Range'
ATR.ui = {
  position: 'external',
  type: 'line',
  isPriceStudy: false,
  useCandles: true
}

ATR.args = [{
  label: 'Period',
  default: 14
}]

ATR.getTradingViewConfig = function (args) {
  return getSinglePlotIndicator({
    ...args,
    IndicatorConstructor: ATR
  })
}

module.exports = ATR
