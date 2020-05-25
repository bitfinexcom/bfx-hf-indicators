'use strict'

const _isObject = require('lodash/isObject')
const _max = require('lodash/max')

const Indicator = require('./indicator')
const EMA = require('./ema')

/**
 * True Strength Index
 *
 * @class
 * @memberof module:bfx-hf-indicators
 * @augments module:bfx-hf-indicators.Indicator
 */
class TSI extends Indicator {
  constructor (args = []) {
    const [long, short, signal] = args

    super({
      args,
      id: TSI.id,
      name: `TSI(${long}, ${short}, ${signal})`,
      seedPeriod: _max([long, short, signal])
    })

    this._pcEMA = new EMA([long])
    this._pc2EMA = new EMA([short])
    this._apcEMA = new EMA([long])
    this._apc2EMA = new EMA([short])
    this._sEMA = new EMA([signal])
    this._lastPrice = null
  }

  static unserialize (args = []) {
    return new TSI(args)
  }

  reset () {
    super.reset()

    if (this._pcEMA) this._pcEMA.reset()
    if (this._pc2EMA) this._pc2EMA.reset()
    if (this._apcEMA) this._apcEMA.reset()
    if (this._apc2EMA) this._apc2EMA.reset()
    if (this._sEMA) this._sEMA.reset()

    this._lastPrice = null
  }

  update (v) {
    if (!this._lastPrice) {
      return this.v()
    }

    const pc = v - this._lastPrice
    const apc = Math.abs(v - this._lastPrice)

    this._pcEMA.update(pc)
    this._apcEMA.update(apc)

    if (this._pcEMA.ready()) {
      this._pc2EMA.update(this._pcEMA.v())
    } else {
      return this.v()
    }

    if (this._apcEMA.ready()) {
      this._apc2EMA.update(this._apcEMA.v())
    } else {
      return this.v()
    }

    if (!this._pc2EMA.ready() || !this._apc2EMA.ready()) {
      return this.v()
    }

    const tsi = 100 * (this._pc2EMA.v() / this._apc2EMA.v())
    this._sEMA.update(tsi)

    return super.update({
      v: tsi,
      signal: this._sEMA.v()
    })
  }

  add (v) {
    if (!this._lastPrice) {
      this._lastPrice = v
      return this.v()
    }

    const pc = v - this._lastPrice
    const apc = Math.abs(v - this._lastPrice)

    this._pcEMA.add(pc)
    this._apcEMA.add(apc)

    if (this._pcEMA.ready()) {
      this._pc2EMA.add(this._pcEMA.v())
    } else {
      return this.v()
    }

    if (this._apcEMA.ready()) {
      this._apc2EMA.add(this._apcEMA.v())
    } else {
      return this.v()
    }

    if (!this._pc2EMA.ready() || !this._apc2EMA.ready()) {
      return this.v()
    }

    const tsi = 100 * (this._pc2EMA.v() / this._apc2EMA.v())
    this._sEMA.add(tsi)

    super.add({
      v: tsi,
      signal: this._sEMA.v()
    })

    this._lastPrice = v

    return this.v()
  }

  ready () {
    return _isObject(this.v())
  }
}

TSI.id = 'tsi'
TSI.label = 'TSI'
TSI.humanLabel = 'True Strength Index'
TSI.ui = {
  position: 'external',
  type: 'lines',
  lines: ['v', 'signal']
}

TSI.args = [{
  label: 'Long Smoothing',
  default: 25
}, {
  label: 'Short Smoothing',
  default: 13
}, {
  label: 'Signal Length',
  default: 13
}]

module.exports = TSI
