'use strict'

const _last = require('lodash/last')
const Indicator = require('./indicator')

class WildersMA extends Indicator {
  constructor (args = []) {
    const [ period, dataKey = 'close' ] = args

    super({
      args,
      id: WildersMA.id,
      name: `Wilder MA(${period})`,
      seedPeriod: period,
      dataType: 'candle',
      dataKey
    })

    this._a = 1 / period
  }

  static unserialize (args = []) {
    return new EMA(args)
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

WildersMA.id = 'wilderma'
WildersMA.label = 'Wilder MA'
WildersMA.humanLabel = 'Wilders Moving Average'
WildersMA.ui = {
  position: 'overlay',
  type: 'line'
}

WildersMA.args = [{
  label: 'Period',
  default: 20
}, {
  label: 'Candle Key',
  default: 'close',
}]

module.exports = WildersMA
