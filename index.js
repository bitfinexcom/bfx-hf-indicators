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
const Aroon = require('./lib/aroon')
const AccumDist = require('./lib/accumulation_distribution')
const ASI = require('./lib/accumulative_swing_index')
const ALMA = require('./lib/alma')
const AO = require('./lib/awesome_oscillator')
const ADX = require('./lib/average_directional_index')
const BOP = require('./lib/balance_of_power')
const PPO = require('./lib/price_oscillator')
const RVI = require('./lib/relative_vigor_index')

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
  ATR,
  Aroon,
  AccumDist,
  ASI,
  ALMA,
  AO,
  ADX,
  BOP,
  PPO,
  RVI
}
