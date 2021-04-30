/* eslint-env mocha */
'use strict'

const assert = require('assert')
const SMA = require('../lib/sma')

const smaPeriod = [5]
const candles = [
  { open: 6373, high: 6375.9, low: 6369.2, close: 6374.5 },
  { open: 6408.8, high: 6408.9, low: 6366, close: 6372.9 },
  { open: 6390.1, high: 6400, low: 6376, close: 6380 },
  { open: 6380, high: 6380, low: 6380, close: 6380 },
  { open: 6480, high: 6490.1, low: 6375, close: 6382.1 },
  { open: 6382.1, high: 6418.9, low: 6377, close: 6390 },
]

describe('Simple Moving Average(SMA)', () => {
  it('sets the period properly', () => {
    const sma = new SMA(smaPeriod)
    assert.deepStrictEqual(sma._p, 5)
  })

  it('calculates sma based on close price properly', () => {
    const sma = new SMA(smaPeriod)
    candles.forEach(c => sma.add(c.close))
    assert.deepStrictEqual(sma.v(), 6381)
  })

  it('empties the buffer on reset', () => {
    const sma = new SMA(smaPeriod)
    sma.add(candles[0].close)
    sma.reset()
    assert.deepStrictEqual(sma._buffer.length, 0)
  })

  it('calculates sma based on the updated value', () => {
    const sma = new SMA(smaPeriod)
    candles.forEach(c => sma.add(c.open))
    assert.deepStrictEqual(sma.v(), 6408.2)
    sma.update(6601.4)
    assert.deepStrictEqual(sma.v(), 6452.06)
  })

  //Handles float isssues
  it('handles float issues properly', () => {
    const sma = new SMA(smaPeriod)
    candles.forEach(c => sma.add(c.open))
    sma.update(6600.4)
    assert.deepStrictEqual(sma.v(), 6451.86)
  })
})
