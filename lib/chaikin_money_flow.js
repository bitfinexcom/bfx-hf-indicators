'use strict'

const _sum = require('lodash/sum')
const Indicator = require('./indicator')

class CMF extends Indicator {

  constructor (args = []) {
    const [ period ] = args

    super({
      args,
      id: CMF.id,
      name: `CMF (${period})`,
      seedPeriod: period,
      dataType: 'candle',
      dataKey: '*',
    })

    this._p = period
    this._bufferVol = []
    this._bufferMFV = []
  }

  static unserialize (args = []) {
    return new CMF(args)
  }

  reset () {
    super.reset()
    this._bufferVol = []
    this._bufferMFV = []
  }

  update (candle) {
    const { high, low, close, vol } = candle
    const mf = high === low
      ? 0
      : ((close - low) - (high - close)) / (high - low)
    const mfv = mf * vol

    if (this._bufferVol.length === 0) {
      this._bufferVol.push(vol)
    } else {
      this._bufferVol[this._bufferVol.length - 1] = vol
    }

    if (this._bufferMFV.length === 0) {
      this._bufferMFV.push(vol)
    } else {
      this._bufferMFV[this._bufferMFV.length - 1] = mfv
    }

    if (this._bufferMFV.length < this._p || this._bufferVol.length < this._p) {
      return
    }

    return super.update(_sum(this._bufferMFV) / _sum(this._bufferVol))
  }

  add (candle) {
    const { high, low, close, vol } = candle
    const mf = high === low
      ? 0
      : ((close - low) - (high - close)) / (high - low)

    const mfv = mf * vol

    this._bufferVol.push(vol)
    this._bufferMFV.push(mfv)

    if (this._bufferVol.length > this._p) {
      this._bufferVol.splice(0, 1)
    }

    if (this._bufferMFV.length > this._p) {
      this._bufferMFV.splice(0, 1)
    }

    if (this._bufferMFV.length < this._p || this._bufferVol.length < this._p) {
      return
    }

    return super.add(_sum(this._bufferMFV) / _sum(this._bufferVol))
  }
}

CMF.id = 'cmf'
CMF.label = 'CMF'
CMF.humanLabel = 'Chaikin Money Flow'
CMF.ui = {
  position: 'external',
  type: 'line'
}

CMF.args = [{
  label: 'Period',
  default: 20,
}]

module.exports = CMF
