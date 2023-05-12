'use strict'

const Indicator = require('./indicator')
const getSinglePlotIndicator = require('./utils/get_single_plot_indicator_tv_config')

class BOP extends Indicator {
  constructor (args = []) {
    super({
      args,
      id: BOP.id,
      name: 'Balance of Power',
      seedPeriod: 0,
      dataType: 'candle',
      dataKey: '*'
    })
  }

  static unserialize (args = []) {
    return new BOP(args)
  }

  update (candle = {}) {
    const { open, high, low, close } = candle

    if (high === low) {
      super.update(1)
    } else {
      super.update((close - open) / (high - low))
    }

    return this.v()
  }

  add (candle = {}) {
    const { open, high, low, close } = candle

    if (high === low) {
      super.add(1)
    } else {
      super.add((close - open) / (high - low))
    }

    return this.v()
  }
}

BOP.id = 'bop'
BOP.label = 'Balance of Power'
BOP.humanLabel = 'Balance of Power'
BOP.ui = {
  position: 'external',
  type: 'line',
  useCandles: true,
  isPriceStudy: false
}

BOP.args = []

BOP.getTradingViewConfig = function (args) {
  return getSinglePlotIndicator({
    ...args,
    IndicatorConstructor: BOP
  })
}

module.exports = BOP
