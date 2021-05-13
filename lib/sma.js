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
    this._buffer = []
  }

  static unserialize (args = []) {
    return new SMA(args)
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
      return null
    }

    const sum = this._buffer.reduce((acc, val) => {
      acc = acc.plus(val)
      return acc
    }, new BigN(0))

    return super.update(sum.dividedBy(this._p).toNumber())
  }

  add (value) {
    this._buffer.push(value)

    if (this._buffer.length < this._p) {
      return null
    } else if (this._buffer.length > this._p) {
      this._buffer.splice(0, 1)
    }

    const sum = this._buffer.reduce((acc, val) => {
      acc = acc.plus(val)
      return acc
    }, new BigN(0))

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
