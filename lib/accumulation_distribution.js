'use strict'

const _isFinite = require('lodash/isFinite')
const Indicator = require('./indicator')

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

  reset () {
    super.reset()
  }

  update (candle) {
    const { high, low, close, vol } = candle
    const moneyFlowMult = high === low
      ? 0
      : ((close - low) - (high - close)) / (high - low)

    const moneyFlowVol = moneyFlowMult * vol
    const prev = this.prev()

    super.update(_isFinite(prev)
      ? prev + moneyFlowVol
      : moneyFlowVol
    )
  }

  add (candle) {
    const { high, low, close, vol } = candle
    const moneyFlowMult = high === low
      ? 0
      : ((close - low) - (high - close)) / (high - low)

    const moneyFlowVol = moneyFlowMult * vol
    const prev = this.v()

    super.add(_isFinite(prev)
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
  type: 'line'
}

AccumulationDistribution.args = []

module.exports = AccumulationDistribution
