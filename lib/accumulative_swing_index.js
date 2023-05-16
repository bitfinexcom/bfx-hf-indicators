'use strict'

const Indicator = require('./indicator')
const BigN = require('bignumber.js')

class AccumulativeSwingIndex extends Indicator {
  constructor (args = []) {
    const [limitMoveValue] = args

    super({
      args,
      id: AccumulativeSwingIndex.id,
      name: `ASI(${limitMoveValue})`,
      dataType: 'candle',
      dataKey: '*'
    })

    this._lmv = limitMoveValue
    this._prevCandle = null
  }

  static unserialize (args = []) {
    return new AccumulativeSwingIndex(args)
  }

  static calcSI (candle, prevCandle, _lmv) {
    if (_lmv === 0) {
      return 0
    }

    const lmv = new BigN(_lmv)
    const open = new BigN(candle.open)
    const high = new BigN(candle.high)
    const low = new BigN(candle.low)
    const close = new BigN(candle.close)
    const prevClose = new BigN(prevCandle.close)
    const prevOpen = new BigN(prevCandle.open)

    const k = BigN.max(high.minus(prevClose), prevClose.minus(low))
    const tr = BigN.max(k, high.minus(low))
    const sh = prevClose.minus(prevOpen)
    let er = new BigN(0)

    if (prevClose > high) {
      er = high.minus(prevClose)
    } else if (prevClose < low) {
      er = prevClose.minus(low)
    }

    const r = tr.minus(er.times(0.5)).plus(sh.times(0.25))

    if (r.isEqualTo(0)) {
      return 0
    }

    const siNum = close.minus(prevClose)
      .plus(close.minus(open).times(0.5))
      .plus(prevClose.minus(prevOpen).times(0.25))

    const si = k.dividedBy(lmv).times(50).times(siNum.dividedBy(r))

    return si.toNumber()
  }

  reset () {
    super.reset()
    this._prevCandle = null
  }

  update (candle) {
    if (this._prevCandle === null) {
      return super.update(0)
    }

    const si = AccumulativeSwingIndex.calcSI(candle, this._prevCandle, this._lmv)
    return super.update(this.prev() + si)
  }

  add (candle) {
    if (this._prevCandle === null) {
      super.add(0)
      this._prevCandle = candle
      return
    }

    const si = AccumulativeSwingIndex.calcSI(candle, this._prevCandle, this._lmv)
    super.add(this.v() + si)

    this._prevCandle = candle
    return this.v()
  }
}

AccumulativeSwingIndex.id = 'asi'
AccumulativeSwingIndex.label = 'ASI'
AccumulativeSwingIndex.humanLabel = 'Accumulative Swing Index'
AccumulativeSwingIndex.ui = {
  position: 'external',
  type: 'line'
}

AccumulativeSwingIndex.args = [{
  label: 'Limit Move Value',
  default: 10
}]

module.exports = AccumulativeSwingIndex
