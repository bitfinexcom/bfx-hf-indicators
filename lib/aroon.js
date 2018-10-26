'use strict'

const _isEmpty = require('lodash/isEmpty')
const _max = require('lodash/max')
const _min = require('lodash/min')
const _findIndex = require('lodash/findIndex')
const Indicator = require('./indicator')

class Aroon extends Indicator {
  constructor (args = []) {
    const [ period ] = args

    super({
      args,
      id: Aroon.id,
      name: `Aroon(${period})`,
      seedPeriod: period
    })

    this._p = period
  }

  static unserialize (args = []) {
    return new Aroon(args)
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
      return
    }

    const max = _max(this._buffer)
    const min = _min(this._buffer)
    const daysSinceMax = this._buffer.length - _findIndex(this._buffer, v => v === max)
    const daysSinceMin = this._buffer.length - _findIndex(this._buffer, v => v === min)

    super.update({
      up: ((this._p - daysSinceMax) / this._p) * 100,
      down: ((this._p - daysSinceMin) / this._p) * 100,
    })
  }

  add (value) {
    this._buffer.push(value)

    if (this._buffer.length > this._p) {
      this._buffer.splice(0, 1)
    } else if (this._buffer.length < this._p) {
      return
    }

    const max = _max(this._buffer)
    const min = _min(this._buffer)
    const daysSinceMax = this._buffer.length - _findIndex(this._buffer, v => v === max)
    const daysSinceMin = this._buffer.length - _findIndex(this._buffer, v => v === min)

    super.add({
      up: ((this._p - daysSinceMax) / this._p) * 100,
      down: ((this._p - daysSinceMin) / this._p) * 100,
    })
  }

  ready () {
    return _isFinite((this.v() || {}).up)
  }

  crossed () { // nop
    return false
  }

  avg (n = 2) {
    return {
      up: _sum(this.nValues(n).map(v => v.up)) / n,
      down: _sum(this.nValues(n).map(v => v.down)) / n,
    }
  }
}

Aroon.id = 'aroon'
Aroon.label = 'Aroon'
Aroon.humanLabel = 'Aroon'
Aroon.ui = {
  position: 'external',
  type: 'lines',
  lines: ['up', 'down']
}

Aroon.args = [{
  label: 'Period',
  default: 14,
}]

module.exports = Aroon
