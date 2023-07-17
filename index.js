'use strict'

const Indicator = require('./lib/indicator')
const SMA = require('./lib/sma')
const EMA = require('./lib/ema')
const WildersMA = require('./lib/wilders_ma')
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
const ADX = require('./lib/average_directional_index')
const BOP = require('./lib/balance_of_power')
const RVGI = require('./lib/relative_vigor_index')
const RVI = require('./lib/relative_volatility_index')
const Stochastic = require('./lib/stochastic')
const VO = require('./lib/volume_oscillator')
const OBV = require('./lib/on_balance_volume')
const PVT = require('./lib/price_volume_trend')
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
const CoppockCurve = require('./lib/coppock_curve')
const VWMA = require('./lib/vwma')
const WMA = require('./lib/wma')
const VWAP = require('./lib/vwap')
const DC = require('./lib/donchian_channels')
const StochRSI = require('./lib/stochastic_rsi')
const EMAVolume = require('./lib/ema_vol')
const NATR = require('./lib/normalised_atr')

module.exports = {
  Indicator,
  SMA,
  EMA,
  WildersMA,
  MACD,
  RSI,
  Momentum,
  ROC,
  Acceleration,
  StdDeviation,
  BollingerBands,
  ATR,
  NATR,
  Aroon,
  AccumDist,
  ASI,
  ALMA,
  ADX,
  BOP,
  RVGI,
  RVI,
  Stochastic,
  VO,
  OBV,
  PVT,
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
  CoppockCurve,
  VWMA,
  VWAP,
  WMA,
  DC,
  StochRSI,
  EMAVolume
}
