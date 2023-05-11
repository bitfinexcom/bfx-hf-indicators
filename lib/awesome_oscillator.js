'use strict'

const _isNaN = require('lodash/isNaN')

const SMA = require('./sma')
const Indicator = require('./indicator')

class AO extends Indicator {
  constructor (args = []) {
    super({
      args,
      id: AO.id,
      name: 'AO',
      seedPeriod: 34,
      dataType: 'candle',
      dataKey: '*'
    })

    this._smaShort = new SMA([5])
    this._smaLong = new SMA([34])
  }

  static unserialize (args = []) {
    return new AO(args)
  }

  reset () {
    super.reset()

    if (this._smaShort) this._smaShort.reset()
    if (this._smaLong) this._smaLong.reset()
  }

  update (candle = {}) {
    const { high, low } = candle
    const v = (high + low) / 2

    this._smaShort.update(v)
    this._smaLong.update(v)

    return super.update(this._smaShort.v() - this._smaLong.v())
  }

  add (candle = {}) {
    const { high, low } = candle
    const v = (high + low) / 2

    this._smaShort.add(v)
    this._smaLong.add(v)

    return super.add(this._smaShort.v() - this._smaLong.v())
  }
}

AO.id = 'ao'
AO.label = 'AO'
AO.humanLabel = 'Awesome Oscillator'
AO.ui = {
  position: 'external',
  type: 'line'
}

AO.args = []

AO.getTradingViewConfig = function ({ indicator, index, PineJS }) {
  const [, , , name] = indicator

  const AOInstance = new AO()

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
        inputs: {}
      },
      plots: [
        {
          id: 'plot_0',
          type: 'line'
        },
        {
          id: 'plot_1',
          palette: 'palette_0',
          target: 'plot_0',
          type: 'colorer'
        }
      ],
      styles: {
        plot_0: {
          title: 'Histogram',
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

        const price = {
          high: PineJS.Std.high(this._context),
          low: PineJS.Std.low(this._context),
          open: PineJS.Std.open(this._context),
          close: PineJS.Std.close(this._context),
          volume: PineJS.Std.volume(this._context)
        }
        if (
          _isNaN(price.high) ||
          _isNaN(price.low) ||
          _isNaN(price.close) ||
          _isNaN(price.volume) ||
          _isNaN(price.open)
        ) {
          return [NaN]
        }
        const currentTime = PineJS.Std.updatetime(this._context)
        if (this.lastUpdatedTime && this.lastUpdatedTime === currentTime) {
          const v = AOInstance.update(price)
          return [v, this.calculateColumnColor(v)]
        }
        this.lastUpdatedTime = currentTime
        const v = AOInstance.add(price)
        console.log(v)
        return [v, this.calculateColumnColor(v)]
      }
    }
  }
}

module.exports = AO
