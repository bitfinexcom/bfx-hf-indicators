'use strict'

const _max = require('lodash/max')
const _min = require('lodash/min')
const Indicator = require('./indicator')
const SMA = require('./sma')

class Stochastic extends Indicator {
  constructor (args = []) {
    const [ period, smoothK, smoothD ] = args

    super({
      args,
      id: Stochastic.id,
      name: `Stoch(${period})`,
      seedPeriod: period,
      dataType: 'candle',
      dataKey: '*',
    })

    this._p = period
    this._kSMA = new SMA([smoothK])
    this._dSMA = new SMA([smoothD])
  }

  reset () {
    super.reset()
    this._buffer = []
  }

  update (candle) {
    if (this._buffer.length === 0) {
      this._buffer.push(candle)
    } else {
      this._buffer[this._buffer.length - 1] = candle
    }

    if (this._buffer.length < this._p) {
      return
    }

    const { close } = candle
    const lowestLow = _min(this._buffer.map(c => c.low))
    const highestHigh = _max(this._buffer.map(c => c.high))
    const k = 100 * ((close - lowestLow) / (highestHigh - lowestLow))

    this._kSMA.update(k)
    this._dSMA.update(this._kSMA.v())

    super.add({
      k: this._kSMA.v(),
      d: this._dSMA.v()
    })

  }

  add (candle) {
    this._buffer.push(candle)

    if (this._buffer.length > this._p) {
      this._buffer.splice(0, 1)
    } else if (this._buffer.length < this._p) {
      return
    }

    const { close } = candle
    const lowestLow = _min(this._buffer.map(c => c.low))
    const highestHigh = _max(this._buffer.map(c => c.high))
    const k = 100 * ((close - lowestLow) / (highestHigh - lowestLow))

    this._kSMA.add(k)
    this._dSMA.add(this._kSMA.v())

    super.add({
      k: this._kSMA.v(),
      d: this._dSMA.v()
    })
  }
}

Stochastic.id = 'stoch'
Stochastic.label = 'Stoch'
Stochastic.humanLabel = 'Stochastic'
Stochastic.ui = {
  position: 'external',
  type: 'lines',
  lines: ['k', 'd']
}

Stochastic.args = [{
  label: 'Period',
  default: 14
}, {
  label: 'K Smoothing',
  default: 1,
}, {
  label: 'D Smoothing',
  default: 3,
}]

module.exports = Stochastic
