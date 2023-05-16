'use strict'

const _isEmpty = require('lodash/isEmpty')
const Indicator = require('./indicator')

class ALMA extends Indicator {
  constructor (args = []) {
    const [period, offset, sigma, dataKey = 'close'] = args

    super({
      args,
      id: ALMA.id,
      name: `ALMA(${period}, ${offset}, ${sigma})`,
      seedPeriod: period,
      dataType: 'candle',
      dataKey
    })

    this._p = period
    this._offset = offset
    this._s = sigma
  }

  static unserialize (args = []) {
    return new ALMA(args)
  }

  static calc (buffer, period, offset, sigma) {
    const m = offset * (period - 1)
    const s = period / sigma

    let windowSum = 0
    let sum = 0

    for (let i = 0; i < period; i += 1) {
      const ex = Math.exp(-1 * (Math.pow(i - m, 2) / (2 * Math.pow(s, 2))))
      windowSum += ex * buffer[i]
      sum += ex
    }

    return windowSum / sum
  }

  reset () {
    super.reset()
    this._buffer = []
  }

  update (value) {
    if (_isEmpty(this._buffer)) {
      this._buffer.push(value)
    } else {
      this._buffer[this._buffer.length - 1] = value
    }

    if (this._buffer.length < this._p) {
      return
    }

    return super.update(
      ALMA.calc(this._buffer, this._p, this._offset, this._s)
    )
  }

  add (value) {
    this._buffer.push(value)

    if (this._buffer.length > this._p) {
      this._buffer.splice(0, 1)
    }

    return super.add(ALMA.calc(this._buffer, this._p, this._offset, this._s))
  }
}

ALMA.id = 'alma'
ALMA.label = 'ALMA'
ALMA.humanLabel = 'Arnaud Legoux Moving Average'
ALMA.ui = {
  position: 'overlay',
  type: 'line'
}

ALMA.args = [
  {
    label: 'Period',
    default: 20
  },
  {
    label: 'Offset',
    default: 0.86
  },
  {
    label: 'Sigma',
    default: 6
  },
  {
    label: 'Candle Key',
    default: 'close'
  }
]

module.exports = ALMA
