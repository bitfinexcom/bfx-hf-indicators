'use strict'

const _sum = require('lodash/sum')
const _isFinite = require('lodash/isFinite')
const _isNaN = require('lodash/isNaN')

const SMA = require('./sma')
const StdDeviation = require('./stddev')
const Indicator = require('./indicator')

class BollingerBands extends Indicator {
  constructor (args = []) {
    const [period = 20, mul = 2] = args

    super({
      args,
      id: BollingerBands.id,
      name: `BBANDS(${period}, ${mul})`,
      seedPeriod: period
    })

    this._p = period
    this._m = mul
    this._ema = new SMA([period])
    this._stddev = new StdDeviation([period])
  }

  static unserialize (args = []) {
    return new BollingerBands(args)
  }

  reset () {
    super.reset()

    if (this._ema) this._ema.reset()
    if (this._stddev) this._stddev.reset()
  }

  update (value) {
    this._ema.update(value)
    this._stddev.update(value)

    const middle = this._ema.v()
    const stddev = this._stddev.v()

    return super.update({
      top: middle + this._m * stddev,
      middle,
      bottom: middle - this._m * stddev
    })
  }

  add (value) {
    this._ema.add(value)
    this._stddev.add(value)

    const middle = this._ema.v()
    const stddev = this._stddev.v()

    return super.add({
      top: middle + this._m * stddev,
      middle,
      bottom: middle - this._m * stddev
    })
  }

  ready () {
    return _isFinite((this.v() || {}).middle)
  }

  crossed (target) {
    if (this.l() < 2) {
      return false
    }

    const v = this.v().middle
    const prev = this.prev().middle

    return (v >= target && prev <= target) || (v <= target && prev >= target)
  }

  avg (n = 2) {
    return _sum(this.nValues(n).map((v) => v.middle)) / n
  }
}

BollingerBands.id = 'bbands'
BollingerBands.label = 'BB'
BollingerBands.humanLabel = 'Bollinger Bands'
BollingerBands.ui = {
  position: 'overlay',
  type: 'bbands'
}

BollingerBands.args = [
  {
    label: 'Period',
    default: 20
  },
  {
    label: 'Multiplier',
    default: 2
  }
]

BollingerBands.getTradingViewConfig = function ({ indicator, index, PineJS }) {
  const [, args, [col1, col2], name] = indicator
  const [period, mul] = args

  const BBInstance = new BollingerBands(args)

  return {
    name,
    metainfo: {
      id: `${name}@tv-basicstudies-${index}`,
      name,
      _metainfoVersion: 0,
      description: name,
      shortDescription: name,
      is_hidden_study: false,
      is_price_study: true,
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
          },
          plot_2: {
            linestyle: 0,
            linewidth: 2,
            plottype: 0,
            transparency: 0,
            visible: true,
            color: col1
          }
        },
        inputs: {
          period,
          mul
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
        },
        {
          id: 'plot_2',
          type: 'line'
        }
      ],
      styles: {
        plot_0: {
          title: 'Top',
          histogramBase: 0
        },
        plot_1: {
          title: 'Middle',
          histogramBase: 0
        },
        plot_2: {
          title: 'Bottom',
          histogramBase: 0
        }
      },
      inputs: [],
      format: {
        type: 'inherit'
      }
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
            const { top, middle, bottom } = BBInstance.update(closePrice)
            return [top, middle, bottom]
          }
          this.lastUpdatedTime = currentTime
          const { top, middle, bottom } = BBInstance.add(closePrice)
          return [top, middle, bottom]
        }

        return [0, 0, 0]
      }
    }
  }
}

module.exports = BollingerBands
