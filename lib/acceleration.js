'use strict'

const _isEmpty = require('lodash/isEmpty')
const Indicator = require('./indicator')
const ROC = require('./roc')
const getSinglePlotIndicator = require('./utils/get_single_plot_indicator_tv_config')

class Acceleration extends Indicator {
  constructor (args = []) {
    const [period] = args

    super({
      args,
      id: Acceleration.id,
      name: `Acceleration(${period})`,
      seedPeriod: period
    })

    this._roc = new ROC([period])
    this._p = period
  }

  static unserialize (args = []) {
    return new Acceleration(args)
  }

  reset () {
    super.reset()
    this._buffer = []

    if (this._roc) {
      this._roc.reset()
    }
  }

  update (value) {
    this._roc.update(value)
    const roc = this._roc.v()

    if (roc === null) {
      return
    }

    if (_isEmpty(this._buffer)) {
      this._buffer.push(roc)
    } else {
      this._buffer[this._buffer.length - 1] = roc
    }

    if (this._buffer.length < this._p) {
      return
    }

    return super.update(roc - this._buffer[0])
  }

  add (value) {
    this._roc.add(value)
    const roc = this._roc.v()

    if (roc === null) {
      return
    }

    if (this._buffer.length === this._p) {
      super.add(roc - this._buffer[0])
    }

    this._buffer.push(roc)

    if (this._buffer.length > this._p) {
      this._buffer.splice(0, 1)
    }

    return this.v()
  }
}

Acceleration.id = 'acc'
Acceleration.label = 'ACC'
Acceleration.humanLabel = 'Acceleration'
Acceleration.ui = {
  position: 'external',
  type: 'line',
  isPriceStudy: false,
  useCandles: false
}

Acceleration.args = [{
  label: 'Period',
  default: 10
}]

Acceleration.getTradingViewConfig = function (args) {
  return getSinglePlotIndicator({
    ...args,
    IndicatorConstructor: Acceleration
  })
}

module.exports = Acceleration
