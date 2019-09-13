'use strict'

process.env.DEBUG = '*'

const debug = require('debug')('bfx:hf:indicators:examples:ema')
const { EMA } = require('../')

const ema = new EMA([2])

// Add a few closing prices
ema.add(14000)
ema.add(14010)
ema.add(14025)
ema.add(14035)
ema.add(13998)
ema.add(13952)

debug('ema(2) value: %f', ema.v())
