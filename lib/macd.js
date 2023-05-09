'use strict'

const _isObject = require('lodash/isObject')
const _isNaN = require('lodash/isNaN')
const Indicator = require('./indicator')
const EMA = require('./ema')

class MACD extends Indicator {
  constructor (args = []) {
    const [fastMA, slowMA, signalMA] = args

    super({
      args,
      id: MACD.id,
      name: `MACD(${fastMA},${slowMA},${signalMA})`,
      seedPeriod: Math.max(fastMA, slowMA) + signalMA
    })

    this._slowEMA = new EMA([slowMA])
    this._fastEMA = new EMA([fastMA])
    this._signalEMA = new EMA([signalMA])
  }

  static unserialize (args = []) {
    return new MACD(args)
  }

  reset () {
    super.reset()

    if (this._slowEMA) this._slowEMA.reset()
    if (this._fastEMA) this._fastEMA.reset()
    if (this._signalEMA) this._signalEMA.reset()
  }

  update (value) {
    const slowEMA = this._slowEMA.update(value)
    const fastEMA = this._fastEMA.update(value)

    const macd = fastEMA - slowEMA
    const signalEMA = this._signalEMA.update(macd)

    const divergence = macd - signalEMA

    return super.update({
      macd: macd,
      signal: signalEMA,
      divergence: divergence
    })
  }

  add (value) {
    const slowEMA = this._slowEMA.add(value)
    const fastEMA = this._fastEMA.add(value)

    const macd = fastEMA - slowEMA
    const signalEMA = this._signalEMA.add(macd)

    const divergence = macd - signalEMA

    return super.add({
      macd: macd,
      signal: signalEMA,
      divergence: divergence
    })
  }

  ready () {
    return _isObject(this.v())
  }
}

MACD.id = 'macd'
MACD.label = 'MACD'
MACD.humanLabel = 'Moving Average Convergence Divergence'
MACD.ui = {
  position: 'external',
  type: 'macd'
}

MACD.args = [{
  label: 'Fast MA Period',
  default: 12
}, {
  label: 'Slow MA Period',
  default: 26
}, {
  label: 'Signal MA Period',
  default: 9
}]

MACD.getTradingViewConfig = function ({ indicator, index, PineJS }) {
  const [, args, [col1, col2], name] = indicator
  const [fastMA, slowMA, source, signalMA] = args

  const MACDInstance = new MACD([fastMA, slowMA, signalMA])

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
            linewidth: 1,
            plottype: 5,
            transparency: 0,
            visible: true
          },
          plot_1: {
            linestyle: 0,
            linewidth: 2,
            plottype: 0,
            transparency: 0,
            visible: true,
            color: col1
          },
          plot_2: {
            linestyle: 0,
            linewidth: 2,
            plottype: 0,
            transparency: 0,
            visible: true,
            color: col2
          }
        },
        palettes: {
          palette_0: {
            colors: {
              0: {
                color: '#22ab94',
                width: 1,
                style: 0
              },
              1: {
                color: '#ace5dc',
                width: 1,
                style: 0
              },
              2: {
                color: '#fccbcd',
                width: 1,
                style: 0
              },
              3: {
                color: '#ff5252',
                width: 1,
                style: 0
              }
            }
          }
        },
        inputs: {
          fastMA,
          slowMA,
          source,
          signalMA
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
        },
        {
          id: 'plot_3',
          palette: 'palette_0',
          target: 'plot_0',
          type: 'colorer'
        }
      ],
      styles: {
        plot_0: {
          title: 'Histogram',
          histogramBase: 0
        },
        plot_1: {
          title: 'MACD',
          histogramBase: 0
        },
        plot_2: {
          title: 'Signal',
          histogramBase: 0
        }
      },
      palettes: {
        palette_0: {
          colors: {
            0: {
              name: 'Color 0'
            },
            1: {
              name: 'Color 1'
            },
            2: {
              name: 'Color 2'
            },
            3: {
              name: 'Color 3'
            }
          }
        }
      },
      inputs: [],
      format: {
        type: 'inherit'
      }
    },
    constructor: function constructor () {
      this.lastUpdatedTime = null
      this.calculateColumnColor = function (e) {
        const t = e > 0 ? 1 : 3
        const s = PineJS.Std.change(this._context.new_var(e))
        return t - (PineJS.Std.le(s, 0) ? 0 : 1)
      }
      this.main = function (ctx, inputCallback) {
        this._context = ctx
        this._input = inputCallback

        const closePrice = PineJS.Std.close(this._context)
        console.log(closePrice)
        if (!_isNaN(closePrice)) {
          const currentTime = PineJS.Std.updatetime(this._context)
          if (this.lastUpdatedTime && this.lastUpdatedTime === currentTime) {
            const { macd, signal, divergence } = MACDInstance.update(closePrice)
            return [divergence, macd, signal, this.calculateColumnColor(divergence)]
          }
          this.lastUpdatedTime = currentTime
          const { macd, signal, divergence } = MACDInstance.add(closePrice)
          return [divergence, macd, signal, this.calculateColumnColor(divergence)]
        }

        return [0, 0, 0, 0]
      }
    }
  }
}

module.exports = MACD
