'use strict'

const EMA = require('./ema')
const Indicator = require('./indicator')

class PPO extends Indicator {
  constructor (args = []) {
    const [ shortPeriod, longPeriod ] = args

    super({
      args,
      id: PPO.id,
      name: `PPO(${shortPeriod}, ${longPeriod})`,
      seedPeriod: longPeriod
    })

    this._shortEMA = new EMA([shortPeriod])
    this._longEMA = new EMA([longPeriod])
    this._signalEMA = new EMA([9])
  }

  static unserialize (args = []) {
    return new PPO(args)
  }

  reset () {
    super.reset()

    if (this._shortEMA) this._shortEMA.reset()
    if (this._longEMA) this._longEMA.reset()
  }

  update (v) {
    this._shortEMA.update(v)
    this._longEMA.update(v)

    const short = this._shortEMA.v()
    const long = this._longEMA.v()
    const ppo = long === 0 ? 0 : ((short - long) / long) * 100

    this._signalEMA.update(ppo)

    return super.update(this._signalEMA.v())
  }

  add (v) {
    this._shortEMA.add(v)
    this._longEMA.add(v)

    const short = this._shortEMA.v()
    const long = this._longEMA.v()
    const ppo = long === 0 ? 0 : ((short - long) / long) * 100

    this._signalEMA.add(ppo)

    return super.add(this._signalEMA.v())
  }
}

PPO.id = 'ppo'
PPO.label = 'PPO'
PPO.humanLabel = 'Price Oscillator'
PPO.ui = {
  position: 'external',
  type: 'line'
}

PPO.args = [{
  label: 'Short Period',
  default: 10,
}, {
  label: 'Long Period',
  default: 21
}]

module.exports = PPO
