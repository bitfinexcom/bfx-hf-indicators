'use strict'

const BigN = require('bignumber.js')
const _isEmpty = require('lodash/isEmpty')
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
    this._buffer = []
  }

  static unserialize (args = []) {
    return new EMA(args)
  }

  _calculateEMA (val, previousEma) {
    return new BigN(this._a).multipliedBy(val).plus(
      new BigN(1).minus(this._a).multipliedBy(previousEma)
    ).toNumber()
  }

  _calculateSMA () {
    const sum = this._buffer.reduce((acc, val) => {
      acc = acc.plus(val)
      return acc
    }, new BigN(0))
    return sum.dividedBy(this._seedPeriod).toNumber()
  }

  reset () {
    super.reset()
    this._buffer = []
  }

  isSeeded () {
    return !!this._buffer.length
  }

  bl () {
    return this._buffer.length
  }

  v () {
    if (this.l() === 0) {
      return null
    }
    return super.v()
  }

  update (v) {
    if (this._seedPeriod === 1) {
      return super.update(v)
    }

    if (_isEmpty(this._buffer)) {
      this._buffer.push(v)
      return null
    }

    if (this.l() === 0) {
      this._buffer[this._buffer.length - 1] = v
      return null
    }

    if (this.l() < 2) {
      this._buffer[this._buffer.length - 1] = v
      return super.update(this._calculateSMA())
    }

    return super.update(this._calculateEMA(v, this.prev()))
  }

  add (v) {
    if (this._seedPeriod === 1) {
      return super.add(v)
    }
    if (this._buffer.length < this._seedPeriod - 1) {
      this._buffer.push(v)
      return null
    }
    if (this.l() === 0) {
      this._buffer.push(v)
      return super.add(this._calculateSMA())
    }
    return super.add(this._calculateEMA(v, _last(this._values)))
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
