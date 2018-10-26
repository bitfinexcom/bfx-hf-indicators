'use strict'

const _isEmpty = require('lodash/isEmpty')
const Indicator = require('./indicator')

class ROC extends Indicator {
  constructor (args = []) {
    const [ period ] = args

    super({
      args,
      id: ROC.id,
      name: `ROC(${period})`,
      seedPeriod: period
    })

    this._p = period
  }

  static unserialize (args = []) {
    return new ROC(args)
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

    super.update(((value - this._buffer[0]) / this._buffer[0]) * 100)
  }

  add (value) {
    if (this._buffer.length === this._p) {
      super.add(((value - this._buffer[0]) / this._buffer[0]) * 100)
    }

    this._buffer.push(value)

    if (this._buffer.length > this._p) {
      this._buffer.splice(0, 1)
    }
  }
}

ROC.id = 'roc'
ROC.label = 'ROC'
ROC.humanLabel = 'Rate of Change'
ROC.ui = {
  position: 'external',
  type: 'line'
}

ROC.args = [{
  label: 'Period',
  default: 10,
}]

module.exports = ROC
