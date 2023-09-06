'use strict'

const _isFunction = require('lodash/isFunction')
const _isNaN = require('lodash/isNaN')
const _reduce = require('lodash/reduce')
const _toLower = require('lodash/toLower')
const _map = require('lodash/map')
const _some = require('lodash/some')
const _forEach = require('lodash/forEach')
const _capitalize = require('lodash/capitalize')
const _isObject = require('lodash/isObject')
const _isUndefined = require('lodash/isUndefined')

const PLOT_DEFAULT_STYLE = {
  linestyle: 0,
  linewidth: 2,
  plottype: 0,
  transparency: 0,
  visible: true,
  color: 'red'
}

const RSI_DEFAULT_PROPERTIES = {
  bands: [
    {
      color: '#787B86',
      linestyle: 2,
      linewidth: 1,
      visible: true,
      value: 70
    },
    {
      color: '#787B86',
      linestyle: 2,
      linewidth: 1,
      visible: true,
      value: 30
    }
  ],
  filledAreasStyle: {
    fill_0: { color: '#7E57C2', transparency: 90, visible: true }
  }
}

const RSI_META_PROPERTIES = {
  bands: [
    { id: 'hline_0', name: 'UpperLimit' },
    { id: 'hline_1', name: 'LowerLimit' }
  ],
  filledAreas: [
    {
      id: 'fill_0',
      objAId: 'hline_0',
      objBId: 'hline_1',
      type: 'hline_hline',
      title: 'Hlines Background'
    }
  ]
}

function prepareTradingViewIndicatorConfig ({
  indicator,
  index,
  PineJS,
  IndicatorConstructor,
  strategyStartTimestamp
}) {
  const [, args, colors, name] = indicator
  const inputs = _reduce(
    IndicatorConstructor.args,
    (acc, { label }, index) => {
      acc[_toLower(label)] = args[index]
      return acc
    },
    {}
  )
  const { 'candle key': source = 'close' } = inputs

  const instance = new IndicatorConstructor(args)
  const {
    position,
    type,
    format = null,
    lines = null
  } = IndicatorConstructor.ui
  const isPriceStudy = position === 'overlay'
  const useCandles = instance.getDataType() === 'candle'
  const isRSIIndicator = type === 'rsi'
  const isSinglePlot = (type === 'line' || isRSIIndicator) && !lines

  const defaultStyles = {}
  const plots = []
  const styles = []
  if (isSinglePlot) {
    defaultStyles.plot_0 = {
      ...PLOT_DEFAULT_STYLE,
      color: colors[0]
    }
    plots.push({
      id: 'plot_0',
      type: 'line'
    })
    styles.plot_0 = {
      title: IndicatorConstructor.humanLabel,
      histogramBase: 0
    }
  } else {
    _forEach(lines, (l, index) => {
      const id = `plot_${index}`

      defaultStyles[id] = {
        ...PLOT_DEFAULT_STYLE,
        color: colors[index]
      }
      plots.push({
        id,
        type: 'line'
      })
      styles[id] = {
        title: _capitalize(l),
        histogramBase: 0
      }
    })
  }

  return {
    name,
    metainfo: {
      id: `${name}@tv-basicstudies-${index}`,
      name,
      _metainfoVersion: 0,
      description: name,
      shortDescription: instance.getName(),
      is_hidden_study: false,
      is_price_study: isPriceStudy,
      isCustomIndicator: true,
      defaults: {
        styles: defaultStyles,
        inputs,
        ...(isRSIIndicator ? RSI_DEFAULT_PROPERTIES : {})
      },
      plots,
      styles,
      inputs: [],
      format: _isObject(format) ? format : { type: 'inherit' },
      ...(isRSIIndicator ? RSI_META_PROPERTIES : {})
    },
    constructor: function constructor () {
      this.lastUpdatedTime = null
      this.memoizedIndicatorValues = {}
      this.isFirstCandleReached = false

      this.prepareLinesPosition = function (v) {
        if (!_isObject(v) || !lines) {
          return [v || NaN]
        }

        const linesPosition = _map(lines, (l) => v[l])
        return linesPosition
      }

      this.getPriceFromContext = function () {
        if (useCandles) {
          const price = {
            high: PineJS.Std.high(this._context),
            low: PineJS.Std.low(this._context),
            open: PineJS.Std.open(this._context),
            close: PineJS.Std.close(this._context),
            volume: PineJS.Std.volume(this._context)
          }

          if (_some(price, (p) => _isNaN(p))) {
            return NaN
          }

          return price
        } else {
          const studyFn = PineJS.Std[source]
          if (!_isFunction(studyFn)) {
            return NaN
          }

          const price = studyFn(this._context)
          if (_isNaN(price)) {
            return NaN
          }

          return price
        }
      }

      this.main = function (ctx, inputCallback) {
        this._context = ctx
        this._input = inputCallback
        const currentTime = PineJS.Std.time(this._context)

        // Start calculation from the first candle, skip another candles
        if (currentTime < strategyStartTimestamp) {
          return
        }
        if (!this.isFirstCandleReached) {
          if (currentTime !== strategyStartTimestamp) {
            return
          }
          this.isFirstCandleReached = true
        }

        const price = this.getPriceFromContext()

        if (_isNaN(price)) {
          return this.prepareLinesPosition(NaN)
        }

        if (this.lastUpdatedTime && this.lastUpdatedTime === currentTime) {
          const v = instance.update(price)
          this.memoizedIndicatorValues[currentTime] = v
          return this.prepareLinesPosition(v)
        }

        const memoizedValue = this.memoizedIndicatorValues[currentTime]

        if (!_isUndefined(memoizedValue)) {
          return this.prepareLinesPosition(memoizedValue)
        }

        const v = instance.add(price)
        this.lastUpdatedTime = currentTime
        this.memoizedIndicatorValues[currentTime] = v
        return this.prepareLinesPosition(v)
      }
    }
  }
}

module.exports = prepareTradingViewIndicatorConfig
