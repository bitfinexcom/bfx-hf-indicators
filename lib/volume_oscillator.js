'use strict'

const Indicator = require('./indicator')
const EMA = require('./ema')

class VO extends Indicator {
  constructor (args = []) {
    const [shortPeriod, longPeriod] = args

    super({
      args,
      id: VO.id,
      name: `VO(${shortPeriod}, ${longPeriod})`,
      seedPeriod: longPeriod,
      dataType: 'candle',
      dataKey: '*'
    })

    this._shortEMA = new EMA([shortPeriod])
    this._longEMA = new EMA([longPeriod])
  }

  static unserialize (args = []) {
    return new VO(args)
  }

  reset () {
    super.reset()

    if (this._shortSMA) this._shortSMA.reset()
    if (this._longSMA) this._longSMA.reset()
  }

  update (candle) {
    const { volume } = candle

    this._shortEMA.update(volume)
    this._longEMA.update(volume)

    const short = this._shortEMA.v()
    const long = this._longEMA.v()

    if (long === 0) {
      return super.update(0)
    }

    return super.update(((short - long) / long) * 100)
  }

  add (candle) {
    const { volume } = candle

    this._shortEMA.add(volume)
    this._longEMA.add(volume)

    const short = this._shortEMA.v()
    const long = this._longEMA.v()

    if (long === 0) {
      return super.add(0)
    }

    return super.add(((short - long) / long) * 100)
  }
}

VO.id = 'vo'
VO.label = 'VO'
VO.humanLabel = 'Volume Oscillator'
VO.ui = {
  position: 'external',
  type: 'line'
}

VO.args = [
  {
    label: 'Short Period',
    default: 5
  },
  {
    label: 'Long Period',
    default: 10
  }
]

module.exports = VO
