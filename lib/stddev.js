'use strict'

const _isEmpty = require('lodash/isEmpty')
const _sum = require('lodash/sum')
const Indicator = require('./indicator')
const getSinglePlotIndicator = require('./utils/get_single_plot_indicator_tv_config')

class StdDeviation extends Indicator {
  constructor (args = []) {
    const [period] = args

    super({
      args,
      id: StdDeviation.id,
      name: `STDDEV(${period})`,
      seedPeriod: period
    })

    this._p = period
  }

  static unserialize (args = []) {
    return new StdDeviation(args)
  }

  reset () {
    super.reset()
    this._buffer = []
  }

  _bufferStdDev () {
    if (this._buffer.length < this._p) {
      return 0
    }

    const avg = _sum(this._buffer) / this._buffer.length
    const dev = this._buffer.map(v => Math.pow(v - avg, 2))
    const variance = _sum(dev) / (this._p - 1)

    return Math.sqrt(variance)
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

    return super.update(this._bufferStdDev())
  }

  add (value) {
    this._buffer.push(value)

    if (this._buffer.length > this._p) {
      this._buffer.splice(0, 1)
    }

    if (this._buffer.length === this._p) {
      super.add(this._bufferStdDev())
    }

    return this.v()
  }
}

StdDeviation.id = 'stddev'
StdDeviation.label = 'STDDEV'
StdDeviation.humanLabel = 'Standard Deviation'
StdDeviation.ui = {
  position: 'external',
  type: 'line',
  isPriceStudy: false,
  useCandles: false
}

StdDeviation.args = [{
  label: 'Period',
  default: 20
}]

StdDeviation.getTradingViewConfig = function (args) {
  return getSinglePlotIndicator({
    ...args,
    IndicatorConstructor: StdDeviation
  })
}

module.exports = StdDeviation
