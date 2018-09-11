'use strict'

const Indicator = require('./indicator')
const SMA = require('./sma')

class DPO extends Indicator {
  constructor (args = []) {
    const [ period ] = args

    super({
      args,
      id: DPO.id,
      name: `DPO(${period})`,
      seedPeriod: period
    })

    this._pricePeriod = Math.floor(period / 2) + 1
    this._sma = new SMA([period])
  }

  reset () {
    super.reset()

    if (this._sma) this._sma.reset()
  }

  update (v) {
    this._sma.update(v)

    super.update(v - this._sma.prev(this._pricePeriod - 1))
  }

  add (v) {
    this._sma.add(v)

    super.add(v - this._sma.prev(this._pricePeriod))
  }
}

DPO.id = 'dpo'
DPO.label = 'DPO'
DPO.humanLabel = 'Detrended Price Oscillator'
DPO.ui = {
  position: 'external',
  type: 'line'
}

DPO.args = [{
  label: 'Period',
  default: 21,
}]

module.exports = DPO
