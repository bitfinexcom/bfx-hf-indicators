'use strict'

const _sum = require('lodash/sum')
const Indicator = require('./indicator')
const EMA = require('./ema')

class MassIndex extends Indicator {
  constructor (args = []) {
    const [period] = args

    super({
      args,
      id: MassIndex.id,
      name: `Mass Index (${period})`,
      seedPeriod: 9 + period,
      dataType: 'candle',
      dataKey: '*'
    })

    this._smoothing = period
    this._singleEMA = new EMA([9])
    this._doubleEMA = new EMA([9])
    this._buffer = []
  }

  static unserialize (args = []) {
    return new MassIndex(args)
  }

  reset () {
    super.reset()
    this._buffer = []

    if (this._singleEMA) this._singleEMA.reset()
    if (this._doubleEMA) this._doubleEMA.reset()
  }

  update (candle) {
    const { high, low } = candle

    this._singleEMA.update(high - low)
    this._doubleEMA.update(this._singleEMA.v())

    if (this._buffer.length === 0) {
      this._buffer.push(this._singleEMA.v() / this._doubleEMA.v())
    } else {
      this._buffer[this._buffer.length - 1] = this._singleEMA.v() / this._doubleEMA.v()
    }

    if (this._buffer.length < this._smoothing) {
      return this.v()
    }

    return super.update(_sum(this._buffer))
  }

  add (candle) {
    const { high, low } = candle

    this._singleEMA.add(high - low)
    this._doubleEMA.add(this._singleEMA.v())

    this._buffer.push(this._singleEMA.v() / this._doubleEMA.v())

    if (this._buffer.length > this._smoothing) {
      this._buffer.splice(0, 1)
    } else if (this._buffer.length < this._smoothing) {
      return this.v()
    }

    return super.add(_sum(this._buffer))
  }
}

MassIndex.id = 'mi'
MassIndex.label = 'Mass Index'
MassIndex.humanLabel = 'Mass Index'
MassIndex.ui = {
  position: 'external',
  type: 'line'
}

MassIndex.args = [{
  label: 'Period',
  default: 10
}]

module.exports = MassIndex
