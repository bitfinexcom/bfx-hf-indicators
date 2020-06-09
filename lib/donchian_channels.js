'use strict'

const _isObject = require('lodash/isObject')
const _max = require('lodash/max')
const _min = require('lodash/min')
const Indicator = require('./indicator')

/**
 * Donchian Channels
 *
 * @class
 * @augments Indicator
 */
class DC extends Indicator {
  constructor (args = []) {
    const [period] = args

    super({
      args,
      id: DC.id,
      name: `DC (${period})`,
      seedPeriod: period,
      dataType: 'candle',
      dataKey: '*'
    })

    this._p = period
    this._buffer = []
  }

  static unserialize (args = []) {
    return new DC(args)
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

    const max = _max(this._buffer.map(c => c.high))
    const min = _min(this._buffer.map(c => c.low))

    return super.update({
      upper: max,
      middle: (max + min) / 2,
      lower: min
    })
  }

  add (candle) {
    this._buffer.push(candle)

    if (this._buffer.length > this._p) {
      this._buffer.splice(0, 1)
    } else if (this._buffer.length < this._p) {
      return
    }

    const max = _max(this._buffer.map(c => c.high))
    const min = _min(this._buffer.map(c => c.low))

    return super.add({
      upper: max,
      middle: (max + min) / 2,
      lower: min
    })
  }

  ready () {
    return _isObject(this.v())
  }
}

DC.id = 'dc'
DC.label = 'DC'
DC.humanLabel = 'Donchian Channels'
DC.ui = {
  position: 'overlay',
  type: 'lines',
  lines: ['upper', 'middle', 'lower']
}

DC.args = [{
  label: 'Period',
  default: 20
}]

module.exports = DC
