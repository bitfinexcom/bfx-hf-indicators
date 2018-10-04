'use strict'

const _isFinite = require('lodash/isFinite')
const _min = require('lodash/min')
const _max = require('lodash/max')
const Indicator = require('./indicator')
const SMA = require('./sma')
const RSI = require('./rsi')

class StochasticRSI extends Indicator {
  constructor (args = []) {
    const [ lengthRSI, lengthStochastic, smoothStoch, smoothSignal ] = args

    super({
      args,
      id: StochasticRSI.id,
      name: `Stoch RSI(${lengthRSI}, ${lengthStochastic}, ${smoothStoch}, ${smoothSignal})`,
      seedPeriod: lengthRSI + lengthStochastic + smoothStoch
    })

    this._buffer = []
    this._l = lengthStochastic
    this._rsi = new RSI([lengthRSI])
    this._smaStoch = new SMA([smoothStoch])
    this._smaSignal = new SMA([smoothSignal])
  }

  reset () {
    super.reset()
    this._buffer = []

    if (this._rsi) this._rsi.reset()
    if (this._smaStoch) this._smaStoch.reset()
    if (this._smaSignal) this._smaSignal.reset()
  }

  update (v) {
    this._rsi.update(v)
    const rsi = this._rsi.v()

    if (!_isFinite(rsi)) {
      return
    }

    if (_isEmpty(this._buffer)) {
      this._buffer.push(rsi)
    } else {
      this._buffer[this._buffer.length - 1] = rsi
    }

    if (this._buffer.length < this._l) {
      return
    }

    const low = _min(this._buffer)
    const high = _max(this._buffer)
    const stoch = high === low
      ? 1
      : (rsi - low) / (high - low)

    this._smaStoch.update(stoch * 100)

    const smaStoch = this._smaStoch.v()

    if (!_isFinite(smaStoch)) {
      return
    }

    this._smaSignal.update(smaStoch)

    const smaSignal = this._smaSignal.v()

    if (_isFinite(smaSignal)) {
      super.update({
        v: smaStoch,
        signal: smaSignal,
      })
    }
  }

  add (v) {
    this._rsi.add(v)
    const rsi = this._rsi.v()

    if (!_isFinite(rsi)) {
      return
    }

    this._buffer.push(rsi)

    if (this._buffer.length > this._l) {
      this._buffer.splice(0, 1)
    } else if (this._buffer.length < this._l) {
      return
    }

    const low = _min(this._buffer)
    const high = _max(this._buffer)
    const stoch = high === low
      ? 1
      : (rsi - low) / (high - low)

    this._smaStoch.add(stoch * 100)

    const smaStoch = this._smaStoch.v()

    if (!_isFinite(smaStoch)) {
      return
    }

    this._smaSignal.add(smaStoch)

    const smaSignal = this._smaSignal.v()

    if (_isFinite(smaSignal)) {
      super.add({
        v: smaStoch,
        signal: smaSignal,
      })
    }
  }
}

StochasticRSI.id = 'stochrsi'
StochasticRSI.label = 'StochRSI'
StochasticRSI.humanLabel = 'Stochastic RSI'
StochasticRSI.ui = {
  position: 'external',
  type: 'lines',
  lines: ['v', 'signal']
}

StochasticRSI.args = [{
  label: 'Length RSI',
  default: 14,
}, {
  label: 'Length Stochastic',
  default: 14,
}, {
  label: 'Stoch Smoothing',
  default: 3,
}, {
  label: 'Signal Smoothing',
  default: 3,
}]

module.exports = StochasticRSI
