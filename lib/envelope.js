'use strict'

const _isFinite = require('lodash/isFinite')
const Indicator = require('./indicator')
const SMA = require('./sma')

class Envelope extends Indicator {
  constructor (args = []) {
    const [length, percent] = args

    super({
      args,
      id: Envelope.id,
      name: `Env(${length}, ${percent})`,
      seedPeriod: length,
    })

    this._sma = new SMA([length])
    this._p = percent / 100
  }

  reset () {
    super.reset()

    if (this._sma) this._sma.reset()
  }

  update (v) {
    this._sma.update(v)

    const basis = this._sma.v()

    if (!_isFinite(basis)) {
      return
    }

    const delta = basis * this._p

    super.update({
      upper: basis + delta,
      basis,
      lower: basis - delta
    })
  }

  add (v) {
    this._sma.add(v)

    const basis = this._sma.v()

    if (!_isFinite(basis)) {
      return
    }

    const delta = basis * this._p

    super.add({
      upper: basis + delta,
      basis,
      lower: basis - delta
    })
  }
}

Envelope.id = 'env'
Envelope.label = 'Env'
Envelope.humanLabel = 'Envelope'
Envelope.ui = {
  position: 'overlay',
  type: 'lines',
  lines: ['upper', 'basis', 'lower']
}

Envelope.args = [{
  label: 'Length',
  default: 20,
}, {
  label: 'Percent',
  default: 10,
}]

module.exports = Envelope
