'use strict'

const _isFinite = require('lodash/isFinite')
const Indicator = require('./indicator')
const EMA = require('./ema')

class EMAVolume extends Indicator {
  constructor (args = []) {
    const [period] = args

    super({
      args,
      id: EMAVolume.id,
      name: `EMA Vol(${period})`,
      seedPeriod: period,
      dataType: 'candle',
      dataKey: '*',
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
    const { vol } = candle

    this._ema.update(vol)
    const ema = this._ema.v()

    if (_isFinite(ema)) {
      super.update(ema)
    }
  }

  add (candle) {
    const { vol } = candle

    this._ema.add(vol)
    const ema = this._ema.v()

    if (_isFinite(ema)) {
      super.add(ema)
    }
  }
}

EMAVolume.id = 'emavol'
EMAVolume.label = 'EMA Vol'
EMAVolume.humanLabel = 'EMA Volume'
EMAVolume.ui = {
  position: 'external',
  type: 'line',
}

EMAVolume.args = [{
  label: 'Period',
  default: 20,
}]

module.exports = EMAVolume
