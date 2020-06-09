'use strict'

const BigN = require('bignumber.js')
const Indicator = require('./indicator')

/**
 * Volume Weighted Moving Average
 *
 * @class
 * @augments Indicator
 */
class VWMA extends Indicator {
  constructor (args = []) {
    const [period] = args

    super({
      args,
      id: VWMA.id,
      name: `VWMA (${period})`,
      seedPeriod: period,
      dataType: 'candle',
      dataKey: '*'
    })

    this._p = period
    this._buffer = []
  }

  static unserialize (args = []) {
    return new VWMA(args)
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
      return this.v()
    }

    let c
    let volSum = new BigN(0)
    let sum = new BigN(0)

    for (let i = 0; i < this._buffer.length; i += 1) {
      volSum = volSum.plus(new BigN(this._buffer[i].volume))
    }

    for (let i = 0; i < this._buffer.length; i += 1) {
      c = this._buffer[i]

      sum = sum.plus(new BigN(c.close).times(new BigN(c.volume).div(volSum)))
    }

    return super.update(sum.toNumber())
  }

  add (candle) {
    this._buffer.push(candle)

    if (this._buffer.length > this._p) {
      this._buffer.splice(0, 1)
    } else if (this._buffer.length < this._p) {
      return this.v()
    }

    let c
    let volSum = new BigN(0)
    let sum = new BigN(0)

    for (let i = 0; i < this._buffer.length; i += 1) {
      volSum = volSum.plus(new BigN(this._buffer[i].volume))
    }

    for (let i = 0; i < this._buffer.length; i += 1) {
      c = this._buffer[i]

      sum = sum.plus(new BigN(c.close).times(new BigN(c.volume).div(volSum)))
    }

    return super.add(sum.toNumber())
  }
}

VWMA.id = 'vwma'
VWMA.label = 'VWMA'
VWMA.humanLabel = 'Volume Weighted Moving Average'
VWMA.ui = {
  position: 'overlay',
  type: 'line'
}

VWMA.args = [{
  label: 'Period',
  default: 20
}]

module.exports = VWMA
