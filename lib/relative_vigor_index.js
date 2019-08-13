'use strict'

const _isObject = require('lodash/isObject')
const BigN = require('bignumber.js')
const SMA = require('./sma')
const Indicator = require('./indicator')

class RVGI extends Indicator {
  constructor (args = []) {
    const [ period ] = args

    super({
      args,
      id: RVGI.id,
      name: `RVGI(${period})`,
      seedPeriod: period,
      dataType: 'candle',
      dataKey: '*',
    })

    this._numeratorSMA = new SMA([period])
    this._denominatorSMA = new SMA([period])
  }

  static unserialize (args = []) {
    return new RVGI(args)
  }

  reset () {
    super.reset()

    if (this._numeratorSMA) this._numeratorSMA.reset()
    if (this._denominatorSMA) this._denominatorSMA.reset()

    this._buffer = []
  }

  static calc (candle, buffer) {
    const { open, close, high, low } = candle
    const barA = new BigN(close - open)
    const barB = new BigN(buffer[2].close - buffer[2].open)
    const barC = new BigN(buffer[1].close - buffer[1].open)
    const barD = new BigN(buffer[0].close - buffer[0].open)
    const num = barA.plus(barB.times(2)).plus(barC.times(2)).plus(barD).div(6)

    const e = new BigN(high - low)
    const f = new BigN(buffer[2].high - buffer[2].low)
    const g = new BigN(buffer[1].high - buffer[1].low)
    const h = new BigN(buffer[0].high - buffer[0].low)
    const den = e.plus(f.times(2)).plus(g.times(2)).plus(h).div(6)

    return {
      num: num.toNumber(),
      den: den.toNumber(),
    }
  }

  update (candle) {
    if (this._buffer.length === 0) {
      this._buffer.push(candle)
    } else {
      this._buffer[this._buffer.length - 1] = candle
    }
  
    if (this._buffer.length < 4) {
      return super.update(0)
    }

    const { num, den } = RVGI.calc(candle, this._buffer)

    this._numeratorSMA.update(num)
    this._denominatorSMA.update(den)

    const rvi = this._numeratorSMA.v() / this._denominatorSMA.v()
    let signal = 0

    if (this.l() >= 3) {
      const i = new BigN(this.v().rvi)
      const j = new BigN(this.prev(1).rvi)
      const k = new BigN(this.prev(2).rvi)

      signal = new BigN(rvi).plus(i.times(2)).plus(j.times(2)).plus(k).div(6).toNumber()
    }

    return super.update({ rvi, signal })
  }

  add (candle) {
    this._buffer.push(candle)

    if (this._buffer.length > 4) {
      this._buffer.splice(0, 1)
    } else if (this._buffer.length < 4) {
      return this.v()
    }

    const { num, den } = RVGI.calc(candle, this._buffer)

    this._numeratorSMA.add(num)
    this._denominatorSMA.add(den)

    const rvi = this._numeratorSMA.v() / this._denominatorSMA.v()
    let signal = 0

    if (this.l() >= 4) {
      const i = new BigN(this.prev(1).rvi)
      const j = new BigN(this.prev(2).rvi)
      const k = new BigN(this.prev(3).rvi)

      signal = new BigN(rvi).plus(i.times(2)).plus(j.times(2)).plus(k).div(6).toNumber()
    }

    return super.add({ rvi, signal })
  }

  ready () {
    return _isObject(this.v())
  }
}

RVGI.id = 'rvgi'
RVGI.label = 'RVGI'
RVGI.humanLabel = 'Relative Vigor Index'
RVGI.ui = {
  position: 'external',
  type: 'lines',
  lines: ['rvi', 'signal']
}

RVGI.args = [{
  label: 'Period',
  default: 10,
}]

module.exports = RVGI
