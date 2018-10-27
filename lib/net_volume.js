'use strict'

const Indicator = require('./indicator')

class NetVolume extends Indicator {
  constructor (args = []) {
    super({
      args,
      id: NetVolume.id,
      name: 'Net Volume',
      seedPeriod: 0,
      dataType: 'candle',
      dataKey: '*',
    })
  }

  static unserialize (args = []) {
    return new NetVolume(args)
  }

  update (candle) {
    const { open, close, vol } = candle

    if (close >= open) {
      return super.update(vol)
    } else {
      return super.update(-vol)
    }
  }

  add (candle) {
    const { open, close, vol } = candle

    if (close >= open) {
      return super.add(vol)
    } else {
      return super.add(-vol)
    }
  }
}

NetVolume.id = 'nv'
NetVolume.label = 'Net Volume'
NetVolume.humanLabel = 'Net Volume'
NetVolume.ui = {
  position: 'external',
  type: 'line',
}

NetVolume.args = []

module.exports = NetVolume
