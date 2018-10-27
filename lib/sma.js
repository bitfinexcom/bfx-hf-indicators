'use strict'

const _sum = require('lodash/sum')
const _isEmpty = require('lodash/isEmpty')
const Indicator = require('./indicator')

class SMA extends Indicator {
  constructor (args = []) {
    const [ period ] = args

    super({
      args,
      id: SMA.id,
      name: `SMA(${period})`,
      seedPeriod: period
    })

    this._p = period
  }

  static unserialize (args = []) {
    return new SMA(args)
  }

  reset () {
    super.reset()
    this._buffer = []
  }

  update (value) {
    if (_isEmpty(this._buffer)) {
      this._buffer.push(value)
    } else {
      this._buffer[this._buffer.length - 1] = value
    }

    if (this._buffer.length < this._p) {
      return this.v()
    }

    return super.update(_sum(this._buffer) / this._p)
  }

  add (value) {
    this._buffer.push(value)

    if (this._buffer.length > this._p) {
      this._buffer.splice(0, 1)
    }

    return super.add(_sum(this._buffer) / this._p)
  }
}

SMA.id = 'sma'
SMA.label = 'SMA'
SMA.humanLabel = 'Simple Moving Average'
SMA.ui = {
  position: 'overlay',
  type: 'line'
}

SMA.args = [{
  label: 'Period',
  default: 20,
}]

module.exports = SMA
