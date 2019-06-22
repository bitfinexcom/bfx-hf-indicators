'use strict'

const _sum = require('lodash/sum')
const Indicator = require('./indicator')
const ATR = require('./atr')

class NATR extends Indicator {
  constructor (args = []) {
    const [ period ] = args

    super({
      args,
      id: NATR.id,
      name: `NATR(${period})`,
      seedPeriod: period,
      dataType: 'candle',
      dataKey: '*',
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
    super.update((this._atr.v() / candle.close) * 100)
    return this.v()
  }

  add (candle) {
    this._atr.add(candle)
    super.add((this._atr.v() / candle.close) * 100)
    return this.v()
  }
}

NATR.id = 'natr'
NATR.label = 'NATR'
NATR.humanLabel = 'Normalised Average True Range'
NATR.ui = {
  position: 'external',
  type: 'line'
}

NATR.args = [{
  label: 'Period',
  default: 14,
}]

module.exports = NATR
