'use strict'

const _isFinite = require('lodash/isFinite')
const Indicator = require('./indicator')
const EMA = require('./ema')
const ADL = require('./accumulation_distribution')

/**
 * Chaikin Oscillator
 *
 * @class
 * @memberof module:bfx-hf-indicators
 * @augments module:bfx-hf-indicators.Indicator
 */
class ChaikinOsc extends Indicator {
  constructor (args = []) {
    const [short, long] = args

    super({
      args,
      id: ChaikinOsc.id,
      name: `ChaikinOsc (${short}, ${long})`,
      seedPeriod: Math.max(short, long),
      dataType: 'candle',
      dataKey: '*'
    })

    this._shortEMA = new EMA([short])
    this._longEMA = new EMA([long])
    this._adl = new ADL()
  }

  static unserialize (args = []) {
    return new ChaikinOsc(args)
  }

  reset () {
    super.reset()

    if (this._shortEMA) this._shortEMA.reset()
    if (this._longEMA) this._longEMA.reset()
    if (this._adl) this._adl.reset()
  }

  update (candle) {
    this._adl.update(candle)

    const adl = this._adl.v()

    if (!_isFinite(adl)) {
      return
    }

    this._shortEMA.update(adl)
    this._longEMA.update(adl)

    const short = this._shortEMA.v()
    const long = this._longEMA.v()

    if (_isFinite(short) && _isFinite(long)) {
      super.update(short - long)
    }

    return this.v()
  }

  add (candle) {
    this._adl.add(candle)

    const adl = this._adl.v()

    if (!_isFinite(adl)) {
      return
    }

    this._shortEMA.add(adl)
    this._longEMA.add(adl)

    const short = this._shortEMA.v()
    const long = this._longEMA.v()

    if (_isFinite(short) && _isFinite(long)) {
      super.add(short - long)
    }

    return this.v()
  }
}

ChaikinOsc.id = 'chaikinosc'
ChaikinOsc.label = 'ChaikinOsc'
ChaikinOsc.humanLabel = 'Chaikin Oscillator'
ChaikinOsc.ui = {
  position: 'external',
  type: 'line'
}

ChaikinOsc.args = [{
  label: 'Short Period',
  default: 3
}, {
  label: 'Long Period',
  default: 10
}]

module.exports = ChaikinOsc
