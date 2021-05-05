'use strict'

const BigN = require('bignumber.js')
const _last = require('lodash/last')
const Indicator = require('./indicator')

class EMA extends Indicator {
  constructor (args = []) {
    const [period, dataKey = 'close'] = args

    super({
      args,
      id: EMA.id,
      name: `EMA(${period})`,
      seedPeriod: period,
      dataType: 'candle',
      dataKey
    })

    this._a = 2 / (period + 1)
  }

  static unserialize (args = []) {
    return new EMA(args)
  }

  update (v) {
    if (this.l() < 2) {
      return super.update(v)
    }

    return super.update(
      new BigN(this._a).multipliedBy(v).plus(
        new BigN(1).minus(this._a).multipliedBy(this.prev())
      ).toNumber()
    )
  }

  add (v) {
    if (this.l() === 0) {
      return super.add(v)
    } else {
      return super.add(
        new BigN(this._a).multipliedBy(v).plus(
          new BigN(1).minus(this._a).multipliedBy(_last(this._values))
        ).toNumber()
      )
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
  label: 'Period',
  default: 20
}, {
  label: 'Candle Key',
  default: 'close'
}]

module.exports = EMA
