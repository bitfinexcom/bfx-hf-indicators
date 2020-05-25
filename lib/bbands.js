'use strict'

const _sum = require('lodash/sum')
const _isFinite = require('lodash/isFinite')

const SMA = require('./sma')
const StdDeviation = require('./stddev')
const Indicator = require('./indicator')

/**
 * Bollinger Bands
 *
 * @class
 * @memberof module:bfx-hf-indicators
 * @augments module:bfx-hf-indicators.Indicator
 */
class BollingerBands extends Indicator {
  constructor (args = []) {
    const [period = 20, mul = 2] = args

    super({
      args,
      id: BollingerBands.id,
      name: `BBANDS(${period}, ${mul})`,
      seedPeriod: period
    })

    this._p = period
    this._m = mul
    this._ema = new SMA([period])
    this._stddev = new StdDeviation([period])
  }

  static unserialize (args = []) {
    return new BollingerBands(args)
  }

  reset () {
    super.reset()

    if (this._ema) this._ema.reset()
    if (this._stddev) this._stddev.reset()
  }

  update (value) {
    this._ema.update(value)
    this._stddev.update(value)

    const middle = this._ema.v()
    const stddev = this._stddev.v()

    return super.update({
      top: middle + (this._m * stddev),
      middle,
      bottom: middle - (this._m * stddev)
    })
  }

  add (value) {
    this._ema.add(value)
    this._stddev.add(value)

    const middle = this._ema.v()
    const stddev = this._stddev.v()

    return super.add({
      top: middle + (this._m * stddev),
      middle,
      bottom: middle - (this._m * stddev)
    })
  }

  ready () {
    return _isFinite((this.v() || {}).middle)
  }

  crossed (target) {
    if (this.l() < 2) {
      return false
    }

    const v = this.v().middle
    const prev = this.prev().middle

    return (
      (v >= target && prev <= target) ||
      (v <= target && prev >= target)
    )
  }

  avg (n = 2) {
    return _sum(this.nValues(n).map(v => v.middle)) / n
  }
}

BollingerBands.id = 'bbands'
BollingerBands.label = 'BB'
BollingerBands.humanLabel = 'Bollinger Bands'
BollingerBands.ui = {
  position: 'overlay',
  type: 'bbands'
}

BollingerBands.args = [{
  label: 'Period',
  default: 20
}, {
  label: 'Multiplier',
  default: 2
}]

module.exports = BollingerBands
