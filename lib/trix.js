'use strict'

const _isFinite = require('lodash/isFinite')
const Indicator = require('./indicator')
const EMA = require('./ema')

class TRIX extends Indicator {
  constructor (args = []) {
    const [period] = args

    super({
      args,
      id: TRIX.id,
      name: `TRIX(${period})`,
      seedPeriod: (period * 3) + 1
    })

    this._emaFirst = new EMA([period])
    this._emaSecond = new EMA([period])
    this._emaThird = new EMA([period])
  }

  static unserialize (args = []) {
    return new TRIX(args)
  }

  reset () {
    super.reset()

    if (this._emaFirst) this._emaFirst.reset()
    if (this._emaSecond) this._emaSecond.reset()
    if (this._emaThird) this._emaThird.reset()
  }

  update (v) {
    this._emaFirst.update(v)
    this._emaSecond.update(this._emaFirst.v())
    this._emaThird.update(this._emaSecond.v())

    const curr = this._emaThird.v()
    const prev = this._emaThird.prev()

    if (!_isFinite(curr) || !_isFinite(prev)) {
      return
    }

    super.update(((curr / prev) - 1) * 10000)
  }

  add (v) {
    this._emaFirst.add(v)
    this._emaSecond.add(this._emaFirst.v())
    this._emaThird.add(this._emaSecond.v())

    const curr = this._emaThird.v()
    const prev = this._emaThird.prev()

    if (!_isFinite(curr) || !_isFinite(prev)) {
      return
    }

    super.add(((curr / prev) - 1) * 10000)
  }
}

TRIX.id = 'trix'
TRIX.label = 'TRIX'
TRIX.humanLabel = 'TRIX'
TRIX.ui = {
  position: 'external',
  type: 'line'
}

TRIX.args = [{
  label: 'Length',
  default: 18,
}]

module.exports = TRIX
