'use strict'

const _isFinite = require('lodash/isFinite')
const Indicator = require('./indicator')
const EMA = require('./ema')

/**
 * Exponential Moving Average of Volume
 *
 * @class
 * @augments Indicator
 */
class EMAVolume extends Indicator {
  constructor (args = []) {
    const [period] = args

    super({
      args,
      id: EMAVolume.id,
      name: `EMA Vol(${period})`,
      seedPeriod: period,
      dataType: 'candle',
      dataKey: '*'
    })

    this._ema = new EMA([period])
  }

  static unserialize (args = []) {
    return new EMAVolume(args)
  }

  reset () {
    super.reset()

    if (this._ema) this._ema.reset()
  }

  update (candle) {
    const { volume } = candle

    this._ema.update(volume)
    const ema = this._ema.v()

    if (_isFinite(ema)) {
      super.update(ema)
    }

    return this.v()
  }

  add (candle) {
    const { volume } = candle

    this._ema.add(volume)
    const ema = this._ema.v()

    if (_isFinite(ema)) {
      super.add(ema)
    }

    return this.v()
  }
}

EMAVolume.id = 'emavol'
EMAVolume.label = 'EMA Vol'
EMAVolume.humanLabel = 'EMA Volume'
EMAVolume.ui = {
  position: 'external',
  type: 'line'
}

EMAVolume.args = [{
  label: 'Period',
  default: 20
}]

module.exports = EMAVolume
