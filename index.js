'use strict'

const Indicator = require('./lib/indicator')
const SMA = require('./lib/sma')
const EMA = require('./lib/ema')
const MACD = require('./lib/macd')
const RSI = require('./lib/rsi')
const ROC = require('./lib/roc')
const ATR = require('./lib/atr')
const Momentum = require('./lib/momentum')
const Acceleration = require('./lib/acceleration')
const StdDeviation = require('./lib/stddev')
const BollingerBands = require('./lib/bbands')

module.exports = {
  Indicator,
  SMA,
  EMA,
  MACD,
  RSI,
  Momentum,
  ROC,
  Acceleration,
  StdDeviation,
  BollingerBands,
  ATR
}
