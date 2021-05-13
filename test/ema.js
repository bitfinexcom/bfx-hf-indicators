/* eslint-env mocha */
'use strict'

const assert = require('assert')
const EMA = require('../lib/ema')

const emaPeriod = [3]
const candles = [
  { open: 6373, high: 6375.9, low: 6369.2, close: 6374.5 },
  { open: 6374.5, high: 6408.9, low: 6366, close: 6372.9 },
  { open: 6372.9, high: 6373.9, low: 6360.1, close: 6370.9 },
  { open: 6370.9, high: 6400, low: 6345, close: 6400 }
]

describe('Exponential Moving Average(EMA)', () => {
  it('sets the seed period properly', () => {
    const ema = new EMA(emaPeriod)
    assert.deepStrictEqual(ema._seedPeriod, 3)
  })

  it('sets the weighted multiplier properly', () => {
    const ema = new EMA(emaPeriod)
    assert.deepStrictEqual(ema._a, 0.5)
  })

  it('calculates ema properly when emaPeriod is 1', () => {
    const ema = new EMA([1])
    candles.forEach(c => ema.add(c.close))
    assert.deepStrictEqual(ema.v(), 6400)
    assert.deepStrictEqual(ema._buffer, [])
    assert.deepStrictEqual(ema._values, candles.map(c => c.close))
  })

  it('updates ema value properly when emaPeriod is 1', () => {
    const ema = new EMA([1])
    candles.forEach(c => ema.add(c.close))
    assert.deepStrictEqual(ema.v(), 6400)
    ema.update(6500)
    assert.deepStrictEqual(ema.v(), 6500)
  })

  it('calculates ema based on close price properly', () => {
    const ema = new EMA(emaPeriod)
    candles.forEach(c => ema.add(c.close))
    assert.deepStrictEqual(ema.v().toFixed(3), '6386.383')
  })

  it('checks if the indicator is seeded', () => {
    const ema = new EMA(emaPeriod)
    assert.ok(!ema.isSeeded(), 'should not have seeded the indicator')
    ema.add(100)
    assert.ok(ema.isSeeded(), 'should have seeded the indicator')
    ema.reset()
    assert.ok(!ema.isSeeded(), 'should have cleared the seeded values in indicator after reset')
  })

  it('empties the buffer and ema values on reset', () => {
    const ema = new EMA(emaPeriod)
    candles.forEach(c => ema.add(c.close))
    assert.deepStrictEqual(ema.v().toFixed(3), '6386.383')
    assert.deepStrictEqual(ema.bl(), 3)
    assert.deepStrictEqual(ema.l(), 2)
    ema.reset()
    assert.deepStrictEqual(ema.bl(), 0)
    assert.deepStrictEqual(ema.l(), 0)
  })

  it('returns ema as null if the given time period is less than the provided candles', () => {
    const ema = new EMA([candles.length + 1])
    candles.forEach(c => ema.add(c.open))
    assert.deepStrictEqual(ema.v(), null)
  })

  it('calculates ema properly when number of candles provided are same as the ema period', () => {
    const ema = new EMA([candles.length])
    candles.forEach(c => ema.add(c.high))
    assert.deepStrictEqual(ema.v(), 6389.675)
  })

  it('calculates ema properly based on the updated value', () => {
    const ema = new EMA(emaPeriod)
    candles.forEach(c => ema.add(c.high))
    assert.deepStrictEqual(ema.v().toFixed(3), '6393.117')
    ema.update(6450)
    assert.deepStrictEqual(ema.v().toFixed(3), '6418.117')
  })

  it('updates the buffer and returns null if the given time period is less than the provided candles', () => {
    const ema = new EMA([2])
    const candlePriceOpen = 6600
    const updatedCandlePrice = 6601
    ema.add(candlePriceOpen)
    assert.deepStrictEqual(ema._buffer, [candlePriceOpen])
    ema.update(updatedCandlePrice)
    assert.deepStrictEqual(ema._buffer, [updatedCandlePrice])
    assert.deepStrictEqual(ema.v(), null)
  })

  it('updates the ema value properly when number of candles provided are same as the ema period', () => {
    const ema = new EMA([candles.length])
    candles.forEach(c => ema.add(c.high))
    ema.update(6420)
    assert.deepStrictEqual(ema.v(), 6394.675)
  })
})
