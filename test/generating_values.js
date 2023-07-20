/* eslint-env mocha */
'use strict'

const _forEach = require('lodash/forEach')
const _map = require('lodash/map')
const _isEmpty = require('lodash/isEmpty')
const _some = require('lodash/some')
const _every = require('lodash/every')
const _isFinite = require('lodash/isFinite')
const _isObject = require('lodash/isObject')
const assert = require('assert')
const Indicators = require('../index')
const candles = require('./candles')

const getDefaultArgs = (I) => {
  const { args = [] } = I

  if (_isEmpty(args)) {
    return []
  }
  return _map(args, (arg) => arg?.default)
}

describe('Check the generating values of each indicator', () => {
  _forEach(Indicators, (I) => {
    if (I === Indicators.Indicator) {
      return
    }
    it(`${I.humanLabel} indicator`, () => {
      const args = getDefaultArgs(I)
      const instance = new I(args)

      const {
        ui: { type, lines }
      } = I

      const useCandle = instance.getDataType() === 'candle'
      const isSinglePlot = type === 'rsi' || type === 'line'
      let hasValidValues = false

      _some(candles, (candle) => {
        const result = instance.add(useCandle ? candle : candle.close)
        if (isSinglePlot) {
          hasValidValues = !!(result && _isFinite(result))
          return hasValidValues
        } else {
          if (!_isObject(result) || !_isObject(lines)) {
            return false
          }
          hasValidValues = _every(lines, (l) => !!(result[l] && _isFinite(result[l])))

          return hasValidValues
        }
      })
      assert.strictEqual(hasValidValues, true)
    })
  })
})
