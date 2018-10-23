'use strict'

const Indicator = require('./indicator')

class BOP extends Indicator {
  constructor (args = []) {
    super({
      args,
      id: BOP.id,
      name: 'Balance of Power',
      seedPeriod: 0,
      dataType: 'candle',
      dataKey: '*',
    })
  }

  static unserialize (args = []) {
    return new BOP(args)
  }

  update (candle = {}) {
    const { open, high, low, close } = candle

    super.update((close - open) / (high - low))
  }

  add (candle = {}) {
    const { open, high, low, close } = candle

    super.add((close - open) / (high - low))
  }
}

BOP.id = 'bop'
BOP.label = 'Balance of Power'
BOP.humanLabel = 'Balance of Power'
BOP.ui = {
  position: 'external',
  type: 'line'
}

BOP.args = []

module.exports = BOP
