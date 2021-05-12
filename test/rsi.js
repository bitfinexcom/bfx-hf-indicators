/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { RSI } = require('../index.js')

describe('RSI', () => {
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
})
