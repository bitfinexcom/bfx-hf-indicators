'use strict'

const Indicator = require('./indicator')

/**
 * Net Volume
 *
 * @class
 * @augments Indicator
 */
class NetVolume extends Indicator {
  constructor (args = []) {
    super({
      args,
      id: NetVolume.id,
      name: 'Net Volume',
      seedPeriod: 0,
      dataType: 'candle',
      dataKey: '*'
    })
  }

  static unserialize (args = []) {
    return new NetVolume(args)
  }

  update (candle) {
    const { open, close, volume } = candle

    if (close >= open) {
      return super.update(volume)
    } else {
      return super.update(-volume)
    }
  }

  add (candle) {
    const { open, close, volume } = candle

    if (close >= open) {
      return super.add(volume)
    } else {
      return super.add(-volume)
    }
  }
}

NetVolume.id = 'nv'
NetVolume.label = 'Net Volume'
NetVolume.humanLabel = 'Net Volume'
NetVolume.ui = {
  position: 'external',
  type: 'line'
}

NetVolume.args = []

module.exports = NetVolume
