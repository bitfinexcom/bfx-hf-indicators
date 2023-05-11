'use strict'

const _isFinite = require('lodash/isFinite')
const Indicator = require('./indicator')
const getSinglePlotIndicator = require('./utils/get_single_plot_indicator_tv_config')

class AccumulationDistribution extends Indicator {
  constructor (args = []) {
    super({
      args,
      id: AccumulationDistribution.id,
      name: 'Accum/Dist',
      dataType: 'candle',
      dataKey: '*'
    })
  }

  static unserialize (args = []) {
    return new AccumulationDistribution(args)
  }

  reset () {
    super.reset()
  }

  update (candle) {
    const { high, low, close, volume } = candle
    const moneyFlowMult = high === low
      ? 0
      : ((close - low) - (high - close)) / (high - low)

    const moneyFlowVol = moneyFlowMult * volume
    const prev = this.prev()

    return super.update(_isFinite(prev)
      ? prev + moneyFlowVol
      : moneyFlowVol
    )
  }

  add (candle) {
    const { high, low, close, volume } = candle
    const moneyFlowMult = high === low
      ? 0
      : ((close - low) - (high - close)) / (high - low)

    const moneyFlowVol = moneyFlowMult * volume
    const prev = this.v()

    return super.add(_isFinite(prev)
      ? prev + moneyFlowVol
      : moneyFlowVol
    )
  }
}

AccumulationDistribution.id = 'ad'
AccumulationDistribution.label = 'Accum/Dist'
AccumulationDistribution.humanLabel = 'Accum/Dist'
AccumulationDistribution.ui = {
  position: 'external',
  type: 'line',
  isPriceStudy: false,
  useCandles: true
}

AccumulationDistribution.args = []

AccumulationDistribution.getTradingViewConfig = function (args) {
  return getSinglePlotIndicator({
    ...args,
    IndicatorConstructor: AccumulationDistribution
  })
}

module.exports = AccumulationDistribution
