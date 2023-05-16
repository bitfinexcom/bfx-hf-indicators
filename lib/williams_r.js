'use strict'

const _max = require('lodash/max')
const _min = require('lodash/min')
const Indicator = require('./indicator')

class WilliamsR extends Indicator {
  constructor (args = []) {
    const [period] = args

    super({
      args,
      id: WilliamsR.id,
      name: `%R (${period})`,
      seedPeriod: period,
      dataType: 'candle',
      dataKey: '*'
    })

    this._p = period
    this._buffer = []
  }

  static unserialize (args = []) {
    return new WilliamsR(args)
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

    if (this._buffer.length === this._p) {
      const { close } = candle
      const high = _max(this._buffer.map((c) => c.high))
      const low = _min(this._buffer.map((c) => c.low))

      super.update(((high - close) / (high - low)) * -100)
    }

    return this.v()
  }

  add (candle) {
    this._buffer.push(candle)

    if (this._buffer.length > this._p) {
      this._buffer.splice(0, 1)
    } else if (this._buffer.length < this._p) {
      return this.v()
    }

    const { close } = candle
    const high = _max(this._buffer.map((c) => c.high))
    const low = _min(this._buffer.map((c) => c.low))

    return super.add(((high - close) / (high - low)) * -100)
  }
}

WilliamsR.id = 'wir'
WilliamsR.label = '%R'
WilliamsR.humanLabel = 'Williams %R'
WilliamsR.ui = {
  position: 'external',
  type: 'line'
}

WilliamsR.args = [
  {
    label: 'Period',
    default: 14
  }
]

module.exports = WilliamsR
