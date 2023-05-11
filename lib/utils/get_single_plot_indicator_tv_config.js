'use strict'

const _isFunction = require('lodash/isFunction')
const _isNaN = require('lodash/isNaN')

function getSinglePlotIndicator ({
  indicator,
  index,
  PineJS,
  IndicatorConstructor
}) {
  const [, args, [color], name] = indicator
  const [period, source = 'close'] = args
  const inputs = {
    period,
    source
  }

  const instance = new IndicatorConstructor(args)
  const { isPriceStudy = false, useCandles = false } = IndicatorConstructor.ui
  console.log({ name, inputs, args, isPriceStudy, useCandles })

  return {
    name,
    metainfo: {
      id: `${name}@tv-basicstudies-${index}`,
      name,
      _metainfoVersion: 0,
      description: name,
      shortDescription: name,
      is_hidden_study: false,
      is_price_study: isPriceStudy,
      isCustomIndicator: true,
      defaults: {
        styles: {
          plot_0: {
            linestyle: 0,
            linewidth: 2,
            plottype: 0,
            transparency: 0,
            visible: true,
            color
          }
        },
        inputs
      },
      plots: [
        {
          id: 'plot_0',
          type: 'line'
        }
      ],
      styles: {
        plot_0: {
          title: 'Plot1',
          histogramBase: 0
        }
      },
      inputs: [],
      format: { type: 'inherit' }
    },
    constructor: function constructor () {
      this.lastUpdatedTime = null
      this.main = function (ctx, inputCallback) {
        this._context = ctx
        this._input = inputCallback
        let price
        if (useCandles) {
          price = {
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
        } else {
          const studyFn = PineJS.Std[source]
          if (!_isFunction(studyFn)) {
            return [NaN]
          }
          price = studyFn(this._context)
          if (_isNaN(price)) {
            return [NaN]
          }
        }

        const currentTime = PineJS.Std.updatetime(this._context)
        if (this.lastUpdatedTime && this.lastUpdatedTime === currentTime) {
          const v = instance.update(price)
          console.log('update', { price, source, v })

          return [v]
        }
        this.lastUpdatedTime = currentTime
        const v = instance.add(price)
        console.log('add', { price, source, v, instance })

        return [v]
      }
    }
  }
}

module.exports = getSinglePlotIndicator
