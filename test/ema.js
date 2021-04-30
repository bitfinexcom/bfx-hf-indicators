/* eslint-env mocha */
'use strict'

const assert = require('assert')
const EMA = require('../lib/ema')

const emaPeriod = [10]
const candles = [{
  open: 6373,
  high: 6375.9,
  low: 6369.2,
  close: 6374.5
}, {
  open: 6408.8,
  high: 6408.9,
  low: 6366,
  close: 6372.9
}]

describe('Exponential Moving Average(EMA)', () => {
  it('sets the seed period properly', () => {
    const ema = new EMA(emaPeriod)
    assert.deepStrictEqual(ema._seedPeriod, 10)
  })

  it('sets the weighted multiplier properly', () => {
    const ema = new EMA(emaPeriod)
    assert.deepStrictEqual(ema._a, 0.18181818181818182)
  })

  it('calculates ema based on close price properly', () => {
    const ema = new EMA(emaPeriod)
    candles.forEach(c => ema.add(c.close))
    assert.deepStrictEqual(ema.v(), 6374.209090909091)
  })

  it('calculates ema based on open price properly', () => {
    const ema = new EMA(emaPeriod)
    candles.forEach(c => ema.add(c.open))
    assert.deepStrictEqual(ema.v(), 6379.509090909091)
  })

  it('calculates ema based on high price properly', () => {
    const ema = new EMA(emaPeriod)
    candles.forEach(c => ema.add(c.high))
    assert.deepStrictEqual(ema.v(), 6381.9)
  })

  it('calculates ema based on low price properly', () => {
    const ema = new EMA(emaPeriod)
    candles.forEach(c => ema.add(c.low))
    assert.deepStrictEqual(ema.v(), 6368.618181818182)
  })

  it('does not use the multiplier for calculating ema for first candle', () => {
    const ema = new EMA(emaPeriod)
    ema.add(candles[0].close)
    assert.deepStrictEqual(ema.v(), candles[0].close)
  })
})
