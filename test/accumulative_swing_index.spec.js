'use strict'

const test = require('tape')
const ASI = require('../lib/accumulative_swing_index')

const candles = [
  {
    'open': 6373, 
    'high': 6375.9,
    'low': 6369.2,
    'close': 6374.5,
  },
  {
    'open': 6408.8,
    'high': 6408.9,
    'low': 6366,
    'close': 6372.9,
  }
]

test('ASI is calculated properly', (t) => {
  const asi = new ASI([6400])

  asi.add(candles[0])
  asi.add(candles[1])
  t.equal(asi.v().toFixed(13), '-0.1190821779318')
  t.end()
})