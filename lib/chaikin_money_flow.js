'use strict'

const _sum = require('lodash/sum')
const Indicator = require('./indicator')

/**
 * Chaikin Money Flow
 *
 * @class
 * @memberof module:bfx-hf-indicators
 * @augments module:bfx-hf-indicators.Indicator
 */
class CMF extends Indicator {
  constructor (args = []) {
    const [period] = args

    super({
      args,
      id: CMF.id,
      name: `CMF (${period})`,
      seedPeriod: period,
      dataType: 'candle',
      dataKey: '*'
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
    const { high, low, close, volume } = candle
    const mf = high === low
      ? 0
      : ((close - low) - (high - close)) / (high - low)
    const mfv = mf * volume

    if (this._bufferVol.length === 0) {
      this._bufferVol.push(volume)
    } else {
      this._bufferVol[this._bufferVol.length - 1] = volume
    }

    if (this._bufferMFV.length === 0) {
      this._bufferMFV.push(volume)
    } else {
      this._bufferMFV[this._bufferMFV.length - 1] = mfv
    }

    if (this._bufferMFV.length < this._p || this._bufferVol.length < this._p) {
      return
    }

    return super.update(_sum(this._bufferMFV) / _sum(this._bufferVol))
  }

  add (candle) {
    const { high, low, close, volume } = candle
    const mf = high === low
      ? 0
      : ((close - low) - (high - close)) / (high - low)

    const mfv = mf * volume

    this._bufferVol.push(volume)
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
  default: 20
}]

module.exports = CMF
