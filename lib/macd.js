'use strict'

const Indicator = require('./indicator')
const EMA = require('./ema')

class MACD extends Indicator {
  constructor (args = []) {
    const [ fastMA, slowMA, signalMA ] = args

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

    const histogram = macd - signalEMA

    super.update({
      macd: macd,
      signal: signalEMA,
      histogram: histogram
    })
  }

  add (value) {
    const slowEMA = this._slowEMA.add(value)
    const fastEMA = this._fastEMA.add(value)

    const macd = fastEMA - slowEMA
    const signalEMA = this._signalEMA.add(macd)

    const histogram = macd - signalEMA

    super.add({
      macd: macd,
      signal: signalEMA,
      histogram: histogram
    })
  }

  ready () {
    return this.getSeedPeriod() <= this.l()
  }

}

MACD.id = 'macd'
MACD.label = 'MACD'
MACD.humanLabel = 'Moving Average Convergence Divergence'
MACD.ui = {
  position: 'overlay',
  type: 'macd'
}

MACD.args = [{
  label: 'Fast MA Period',
  default: 12,
}, {
  label: 'Slow MA Period',
  default: 26,
}, {
  label: 'Signal MA Period',
  default: 9,
}]

module.exports = MACD
