'use strict'

const BigN = require('bignumber.js')
const _sum = require('lodash/sum')
const Indicator = require('./indicator')

class ChandeMO extends Indicator {

  constructor (args = []) {
    const [ period ] = args

    super({
      args,
      id: ChandeMO.id,
      name: `ChandeMO (${period})`,
      seedPeriod: period,
      dataType: 'candle',
      dataKey: '*',
    })

    this._p = period
    this._buffer = []
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

    const sU = new BigN(_sum(this._buffer
      .filter(({ open, close }) => close > open)
      .map(({ open, close }) => close - open)))

    const sD = new BigN(_sum(this._buffer
      .filter(({ open, close }) => close < open)
      .map(({ open, close }) => open - close)))

    super.update(sU.minus(sD).div(sU.plus(sD)).times(100).toNumber())
  }

  add (candle) {
    this._buffer.push(candle)

    if (this._buffer.length > this._p) {
      this._buffer.splice(0, 1)
    } else if (this._buffer.length < this._p) {
      return
    }

    const sU = new BigN(_sum(this._buffer
      .filter(({ open, close }) => close > open)
      .map(({ open, close }) => close - open)))

    const sD = new BigN(_sum(this._buffer
      .filter(({ open, close }) => close < open)
      .map(({ open, close }) => open - close)))

    super.add(sU.minus(sD).div(sU.plus(sD)).times(100).toNumber())
  }
}

ChandeMO.id = 'chandemo'
ChandeMO.label = 'ChandeMO'
ChandeMO.humanLabel = 'Chande Momentum Oscillator'
ChandeMO.ui = {
  position: 'external',
  type: 'line'
}

ChandeMO.args = [{
  label: 'Period',
  default: 9,
}]

module.exports = ChandeMO
