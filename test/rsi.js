/* eslint-env mocha */
'use strict'

const assert = require('assert')
const BigN = require('bignumber.js')
const { RSI } = require('../index.js')

const prices = [
  81, 24, 75, 21, 34, 25, 72, 92, 99, 2, 86, 80, 76,
  8, 87, 75, 32, 65, 41, 9, 13, 26, 56, 28, 65, 58,
  17, 90, 87, 86, 99, 3, 70, 1, 27, 9, 92, 68, 9
]

describe('RSI', () => {
  it('returns undefined for empty sequence', () => {
    const rsi = new RSI([2])

    assert.strictEqual(rsi.v(), undefined)
  })

  /// https://github.com/bitfinexcom/bfx-hf-indicators/issues/63
  it('shouldn\'t return undefined', () => {
    const rsi = new RSI([8])
    rsi.add(14000)
    rsi.add(14010)
    rsi.add(14025)
    rsi.add(14035)
    rsi.add(14500)
    rsi.add(14100)
    rsi.add(14125)
    rsi.add(14335)
    rsi.add(14600)
    rsi.add(14710)

    assert.notStrictEqual(rsi.v(), undefined)
  })

  it('calculates ascending sequence', () => {
    const rsi = new RSI([2])
    rsi.add(0)
    rsi.add(1)
    rsi.add(2)

    assert(rsi.v() > 99 && rsi.v() <= 100)
  })

  it('calculates descending sequence', () => {
    const rsi = new RSI([2])
    rsi.add(2)
    rsi.add(1)
    rsi.add(0)

    assert.strictEqual(rsi.v(), 0)
  })

  it('updates latest element', () => {
    const rsi = new RSI([2])
    rsi.add(2)
    rsi.add(1)
    rsi.add(1)
    rsi.update(2)

    assert.strictEqual(rsi.v(), new BigN(2).div(3).multipliedBy(100).toNumber())
  })

  it('calculates with period 12', () => {
    const rsi = new RSI([12])
    prices.forEach(price => rsi.add(price))

    assert.strictEqual(rsi.v(), 45.42827710929203)
  })
})
