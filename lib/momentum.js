'use strict'

const _isEmpty = require('lodash/isEmpty')
const Indicator = require('./indicator')

class Momentum extends Indicator {
  constructor (args = []) {
    const [ period ] = args

    super({
      args,
      id: Momentum.id,
      name: `MO(${period})`,
      seedPeriod: period,
    })

    this._p = period
  }

  static unserialize (args = []) {
    return new Momentum(args)
  }

  reset () {
    this._buffer = []
    this._values = [0]
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

    return super.update(value - this._buffer[0])
  }

  add (value) {
    if (this._buffer.length === this._p) {
      super.add(value - this._buffer[0])
    }

    this._buffer.push(value)

    if (this._buffer.length > this._p) {
      this._buffer.splice(0, 1)
    }

    return this.v()
  }
}

Momentum.id = 'mo'
Momentum.label = 'MO'
Momentum.humanLabel = 'Momentum'
Momentum.ui = {
  position: 'external',
  type: 'line'
}

Momentum.args = [{
  label: 'Period',
  default: 10,
}]

module.exports = Momentum
