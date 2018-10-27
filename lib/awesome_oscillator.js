'use strict'

const SMA = require('./sma')
const Indicator = require('./indicator')

class AO extends Indicator {
  constructor (args = []) {
    super({
      args,
      id: AO.id,
      name: 'AO',
      seedPeriod: 34,
      dataType: 'candle',
      dataKey: '*',
    })

    this._smaShort = new SMA([5])
    this._smaLong = new SMA([34])
  }

  static unserialize (args = []) {
    return new AO(args)
  }

  reset () {
    super.reset()

    if (this._smaShort) this._smaShort.reset()
    if (this._smaLong) this._smaLong.reset()
  }

  update (candle = {}) {
    const { high, low } = candle
    const v = (high + low) / 2

    this._smaShort.update(v)
    this._smaLong.update(v)

    return super.update(this._smaShort.v() - this._smaLong.v())
  }

  add (candle = {}) {
    const { high, low } = candle
    const v = (high + low) / 2

    this._smaShort.add(v)
    this._smaLong.add(v)

    return super.add(this._smaShort.v() - this._smaLong.v())
  }
}

AO.id = 'ao'
AO.label = 'AO'
AO.humanLabel = 'Awesome Oscillator'
AO.ui = {
  position: 'external',
  type: 'line'
}

AO.args = []

module.exports = AO
