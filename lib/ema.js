'use strict'

const _last = require('lodash/last')
const Indicator = require('./indicator')

class EMA extends Indicator {
  constructor (args = []) {
    const [ period ] = args

    super({
      args,
      id: EMA.id,
      name: `EMA(${period})`,
      seedPeriod: period
    })

    this._a = 2 / (period + 1)
  }

  update (v) {
    if (this.l() < 2) {
      return super.update(v)
    }

    return super.update((this._a * v) + ((1 - this._a) * this.prev()))
  }

  add (v) {
    if (this.l() === 0) {
      return super.add(v)
    } else {
      return super.add((this._a * v) + ((1 - this._a) * _last(this._values)))
    }
  }
}

EMA.id = 'ema'
EMA.label = 'EMA'
EMA.humanLabel = 'Exponential Moving Average'
EMA.ui = {
  position: 'overlay',
  type: 'line'
}

EMA.args = [{
  label: 'Period'
}]

module.exports = EMA
