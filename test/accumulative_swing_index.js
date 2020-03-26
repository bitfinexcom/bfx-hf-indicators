/* eslint-env mocha */
'use strict'

const assert = require('assert')
const ASI = require('../lib/accumulative_swing_index')

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

describe('Accumulative Swing Index', () => {
  it('is calculated properly', () => {
    const asi = new ASI([6400])
    candles.forEach(c => asi.add(c))
    assert.strictEqual(asi.v().toFixed(13), '-0.1190821779318')
  })
})
