'use strict'

const BigN = require('bignumber.js')
const _isEmpty = require('lodash/isEmpty')
const Indicator = require('./indicator')

class SMA extends Indicator {
  constructor (args = []) {
    const [period] = args

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

    let sum = new BigN(0)
    this._buffer.forEach(val => {
      sum = sum.plus(val)
    })
    return super.update(sum.dividedBy(this._p).toNumber())
  }

  add (value) {
    let sum = new BigN(0)
    this._buffer.push(value)

    if (this._buffer.length > this._p) {
      this._buffer.splice(0, 1)
    }

    this._buffer.forEach(val => {
      sum = sum.plus(val)
    })
    return super.add(sum.dividedBy(this._p).toNumber())
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
  default: 20
}]

module.exports = SMA
