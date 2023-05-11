'use strict'

const BigN = require('bignumber.js')
const _last = require('lodash/last')
const Indicator = require('./indicator')
const getSinglePlotIndicator = require('./utils/get_single_plot_indicator_tv_config')

class WildersMA extends Indicator {
  constructor (args = []) {
    const [period, dataKey = 'close'] = args

    super({
      args,
      id: WildersMA.id,
      name: `Wilder MA(${period})`,
      seedPeriod: period,
      dataType: 'candle',
      dataKey
    })

    this._a = new BigN(1).div(new BigN(period))
  }

  static unserialize (args = []) {
    return new WildersMA(args)
  }

  update (v) {
    if (this.l() < 2) {
      return super.update(v)
    }

    return super.update(
      this._a.times(new BigN(v)).plus(
        (new BigN(1).minus(this._a).times(this.prev()))
      ).toNumber()
    )
  }

  add (v) {
    if (this.l() === 0) {
      return super.add(v)
    } else {
      return super.add(
        this._a.times(new BigN(v)).plus(
          (new BigN(1).minus(this._a).times(_last(this._values)))
        ).toNumber()
      )
    }
  }
}

WildersMA.id = 'wilderma'
WildersMA.label = 'Wilder MA'
WildersMA.humanLabel = 'Wilders Moving Average'
WildersMA.ui = {
  position: 'overlay',
  type: 'line',
  isPriceStudy: true,
  useCandles: false
}

WildersMA.args = [{
  label: 'Period',
  default: 20
}, {
  label: 'Candle Key',
  default: 'close'
}]

WildersMA.getTradingViewConfig = function (args) {
  return getSinglePlotIndicator({
    ...args,
    IndicatorConstructor: WildersMA
  })
}

module.exports = WildersMA
