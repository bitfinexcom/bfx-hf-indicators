'use strict'

const _sum = require('lodash/sum')
const Indicator = require('./indicator')
const EMA = require('./ema')

class WMA extends Indicator {

  constructor (args = []) {
    const [ period ] = args

    super({
      args,
      id: WMA.id,
      name: `WMA (${period})`,
      seedPeriod: period,
    })

    let d = 0

    for (let i = 1; i <= period; i += 1) {
      d += i
    }

    this._p = period
    this._d = d
    this._buffer = []
  }

  static unserialize (args = []) {
    return new WMA(args)
  }

  reset () {
    super.reset()
    this._buffer = []
  }

  update (v) {
    if (this._buffer.length === 0) {
      this._buffer.push(v)
    } else {
      this._buffer[this._buffer.length - 1] = v
    }

    if (this._buffer.length < this._p) {
      return this.v()
    }

    let n = 0

    for (let i = 1; i <= this._p; i += 1) {
      n += this._buffer[this._buffer.length - i] * (this._p - (i - 1))
    }

    return super.update(n / this._d)
  }

  add (v) {
    this._buffer.push(v)

    if (this._buffer.length > this._p) {
      this._buffer.splice(0, 1)
    } else if (this._buffer.length < this._p) {
      return this.v()
    }

    let n = 0

    for (let i = 1; i <= this._p; i += 1) {
      n += this._buffer[this._buffer.length - i] * (this._p - (i - 1))
    }

    return super.add(n / this._d)
  }
}

WMA.id = 'wma'
WMA.label = 'WMA'
WMA.humanLabel = 'Weighted Moving Average'
WMA.ui = {
  position: 'overlay',
  type: 'line'
}

WMA.args = [{
  label: 'Period',
  default: 10,
}]

module.exports = WMA
