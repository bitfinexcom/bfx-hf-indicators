'use strict'

const _isFinite = require('lodash/isFinite')
const _isEmpty = require('lodash/isEmpty')
const _isNaN = require('lodash/isNaN')
const _max = require('lodash/max')
const _min = require('lodash/min')
const _sum = require('lodash/sum')
const _findIndex = require('lodash/findIndex')
const Indicator = require('./indicator')

class Aroon extends Indicator {
  constructor (args = []) {
    const [period] = args

    super({
      args,
      id: Aroon.id,
      name: `Aroon(${period})`,
      seedPeriod: period
    })

    this._p = period
  }

  static unserialize (args = []) {
    return new Aroon(args)
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
      return { up: 0, down: 0 }
    }

    const max = _max(this._buffer)
    const min = _min(this._buffer)
    const daysSinceMax = this._buffer.length - _findIndex(this._buffer, v => v === max)
    const daysSinceMin = this._buffer.length - _findIndex(this._buffer, v => v === min)

    return super.update({
      up: ((this._p - daysSinceMax) / this._p) * 100,
      down: ((this._p - daysSinceMin) / this._p) * 100
    })
  }

  add (value) {
    this._buffer.push(value)

    if (this._buffer.length > this._p) {
      this._buffer.splice(0, 1)
    } else if (this._buffer.length < this._p) {
      return { up: 0, down: 0 }
    }

    const max = _max(this._buffer)
    const min = _min(this._buffer)
    const daysSinceMax = this._buffer.length - _findIndex(this._buffer, v => v === max)
    const daysSinceMin = this._buffer.length - _findIndex(this._buffer, v => v === min)

    return super.add({
      up: ((this._p - daysSinceMax) / this._p) * 100,
      down: ((this._p - daysSinceMin) / this._p) * 100
    })
  }

  ready () {
    return _isFinite((this.v() || {}).up)
  }

  crossed () { // nop
    return false
  }

  avg (n = 2) {
    return {
      up: _sum(this.nValues(n).map(v => v.up)) / n,
      down: _sum(this.nValues(n).map(v => v.down)) / n
    }
  }
}

Aroon.id = 'aroon'
Aroon.label = 'Aroon'
Aroon.humanLabel = 'Aroon'
Aroon.ui = {
  position: 'external',
  type: 'lines',
  lines: ['up', 'down'],
  isPriceStudy: false,
  useCandles: false
}

Aroon.args = [{
  label: 'Period',
  default: 14
}]

Aroon.getTradingViewConfig = function ({ indicator, index, PineJS }) {
  const [, args, [col1, col2], name] = indicator
  const [period] = args

  const AroonInstance = new Aroon(args)

  return {
    name,
    metainfo: {
      id: `${name}@tv-basicstudies-${index}`,
      name,
      _metainfoVersion: 0,
      description: name,
      shortDescription: name,
      is_hidden_study: false,
      is_price_study: false,
      isCustomIndicator: true,
      defaults: {
        styles: {
          plot_0: {
            linestyle: 0,
            linewidth: 2,
            plottype: 0,
            transparency: 0,
            color: col1
          },
          plot_1: {
            linestyle: 0,
            linewidth: 2,
            plottype: 0,
            transparency: 0,
            visible: true,
            color: col2
          }
        },
        inputs: {
          period
        }
      },
      plots: [
        {
          id: 'plot_0',
          type: 'line'
        },
        {
          id: 'plot_1',
          type: 'line'
        }
      ],
      styles: {
        plot_0: {
          title: 'Up',
          histogramBase: 0
        },
        plot_1: {
          title: 'Down',
          histogramBase: 0
        }
      },
      inputs: [],
      format: { precision: 2, type: 'percent' }
    },
    constructor: function constructor () {
      this.lastUpdatedTime = null
      this.main = function (ctx, inputCallback) {
        this._context = ctx
        this._input = inputCallback

        const closePrice = PineJS.Std.close(this._context)
        console.log(closePrice)
        if (!_isNaN(closePrice)) {
          const currentTime = PineJS.Std.updatetime(this._context)
          if (this.lastUpdatedTime && this.lastUpdatedTime === currentTime) {
            const { up, down } = AroonInstance.update(closePrice)
            return [up, down]
          }
          this.lastUpdatedTime = currentTime
          const { up, down } = AroonInstance.add(closePrice)
          return [up, down]
        }

        return [0, 0]
      }
    }
  }
}

module.exports = Aroon
