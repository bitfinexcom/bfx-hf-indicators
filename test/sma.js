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
  { open: 6382.1, high: 6418.9, low: 6377, close: 6390 }
]

describe('Simple Moving Average(SMA)', () => {
  it('sets the period properly', () => {
    const sma = new SMA(smaPeriod)
    assert.deepStrictEqual(sma._p, 5)
  })

  it('returns null when no values are added yet', () => {
    const sma = new SMA(smaPeriod)
    assert.deepStrictEqual(sma.v(), null)
  })

  it('calculates sma based on close price properly', () => {
    const sma = new SMA(smaPeriod)
    candles.forEach(c => sma.add(c.close))
    assert.deepStrictEqual(sma.v(), 6381)
  })

  it('checks if the indicator is seeded', () => {
    const sma = new SMA(smaPeriod)
    assert.ok(!sma.isSeeded(), 'should not have seeded the indicator')
    sma.add(100)
    assert.ok(sma.isSeeded(), 'should have seeded the indicator')
    sma.reset()
    assert.ok(!sma.isSeeded(), 'should have cleared the seeded values in indicator after reset')
  })

  it('empties the buffer on reset', () => {
    const sma = new SMA(smaPeriod)
    sma.add(candles[0].close)
    sma.reset()
    assert.deepStrictEqual(sma.bl(), 0)
  })

  it('calculates sma based on the updated value', () => {
    const sma = new SMA(smaPeriod)
    candles.forEach(c => sma.add(c.open))
    assert.deepStrictEqual(sma.v(), 6408.2)
    sma.update(6601.4)
    assert.deepStrictEqual(sma.v(), 6452.06)
  })

  // Handles float isssues
  it('handles float issues properly', () => {
    const sma = new SMA(smaPeriod)
    candles.forEach(c => sma.add(c.open))
    sma.update(6600.4)
    assert.deepStrictEqual(sma.v(), 6451.86)
  })

  it('returns sma as null if the given time period is less than the provided candles', () => {
    const sma = new SMA([candles.length + 1])
    candles.forEach(c => sma.add(c.open))
    assert.deepStrictEqual(sma.v(), null)
  })

  it('calculates sma properly when number of candles provided are same as the time period', () => {
    const sma = new SMA([candles.length])
    candles.forEach(c => sma.add(c.high))
    assert.deepStrictEqual(sma.v(), 6412.3)
  })

  it('updates the buffer and returns null if the given time period is less than the provided candles', () => {
    const sma = new SMA([2])
    const candlePriceOpen = 6600
    const updatedCandlePrice = 6601
    sma.add(candlePriceOpen)
    assert.deepStrictEqual(sma._buffer, [candlePriceOpen])
    sma.update(updatedCandlePrice)
    assert.deepStrictEqual(sma._buffer, [updatedCandlePrice])
    assert.deepStrictEqual(sma.v(), null)
  })
})
