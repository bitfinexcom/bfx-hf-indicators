'use strict'

const _isObject = require('lodash/isObject')
const Indicator = require('./indicator')
const EMA = require('./ema')

/**
 * MACD
 *
 * @class
 * @memberof module:bfx-hf-indicators
 * @augments module:bfx-hf-indicators.Indicator
 */
class MACD extends Indicator {
  constructor (args = []) {
    const [fastMA, slowMA, signalMA] = args

    super({
      args,
      id: MACD.id,
      name: `MACD(${fastMA},${slowMA},${signalMA})`,
      seedPeriod: Math.max(fastMA, slowMA) + signalMA
    })

    this._slowEMA = new EMA([slowMA])
    this._fastEMA = new EMA([fastMA])
    this._signalEMA = new EMA([signalMA])
  }

  static unserialize (args = []) {
    return new MACD(args)
  }

  reset () {
    super.reset()

    if (this._slowEMA) this._slowEMA.reset()
    if (this._fastEMA) this._fastEMA.reset()
    if (this._signalEMA) this._signalEMA.reset()
  }

  update (value) {
    const slowEMA = this._slowEMA.update(value)
    const fastEMA = this._fastEMA.update(value)

    const macd = fastEMA - slowEMA
    const signalEMA = this._signalEMA.update(macd)

    const divergence = macd - signalEMA

    return super.update({
      macd: macd,
      signal: signalEMA,
      divergence: divergence
    })
  }

  add (value) {
    const slowEMA = this._slowEMA.add(value)
    const fastEMA = this._fastEMA.add(value)

    const macd = fastEMA - slowEMA
    const signalEMA = this._signalEMA.add(macd)

    const divergence = macd - signalEMA

    return super.add({
      macd: macd,
      signal: signalEMA,
      divergence: divergence
    })
  }

  ready () {
    return _isObject(this.v())
  }
}

MACD.id = 'macd'
MACD.label = 'MACD'
MACD.humanLabel = 'Moving Average Convergence Divergence'
MACD.ui = {
  position: 'external',
  type: 'macd'
}

MACD.args = [{
  label: 'Fast MA Period',
  default: 12
}, {
  label: 'Slow MA Period',
  default: 26
}, {
  label: 'Signal MA Period',
  default: 9
}]

module.exports = MACD
