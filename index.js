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
const RVGI = require('./lib/relative_vigor_index')
const RVI = require('./lib/relative_volatility_index')
const Stochastic = require('./lib/stochastic')
const VO = require('./lib/volume_oscillator')
const OBV = require('./lib/on_balance_volume')
const PVT = require('./lib/price_volume_trend')
const MassIndex = require('./lib/mass_index')
const CMF = require('./lib/chaikin_money_flow')
const DPO = require('./lib/detrended_price_oscillator')
const PC = require('./lib/price_channel')
const NetVolume = require('./lib/net_volume')
const KST = require('./lib/know_sure_thing')
const TSI = require('./lib/true_strength_index')
const WR = require('./lib/williams_r')
const Envelope = require('./lib/envelope')
const EOM = require('./lib/ease_of_movement')
const ChandeMO = require('./lib/chande_momentum_oscillator')
const ChaikinOsc = require('./lib/chaikin_oscillator')

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
  RVGI,
  RVI,
  Stochastic,
  VO,
  OBV,
  PVT,
  MassIndex,
  CMF,
  DPO,
  PC,
  NetVolume,
  KST,
  TSI,
  WR,
  Envelope,
  EOM,
  ChandeMO,
  ChaikinOsc,
}
