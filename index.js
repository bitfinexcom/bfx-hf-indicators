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
const CoppockCurve = require('./lib/coppock_curve')
const VWMA = require('./lib/vwma')
const WMA = require('./lib/wma')
const VWAP = require('./lib/vwap')
const DC = require('./lib/donchian_channels')
const StochRSI = require('./lib/stochastic_rsi')
const TRIX = require('./lib/trix')
const EMAVolume = require('./lib/ema_vol')
const NATR = require('./lib/normalised_atr')

/**
 * This module contains a collection of trading indicators implemented to
 * support incremental updates, both from trade and candle data (depending on
 * the indicator).
 *
 * ### Features
 * * {@link module:bfx-hf-indicators.ATR|Average True Range}
 * * {@link module:bfx-hf-indicators.NATR|Normalised Average True Range}
 * * {@link module:bfx-hf-indicators.Acceleration|Acceleration}
 * * {@link module:bfx-hf-indicators.AccumulationDistribution|Accumulation/Distribution}
 * * {@link module:bfx-hf-indicators.AccumulativeSwingIndex|Accumulative Swing Index}
 * * {@link module:bxf-hf-indicators.ALMA|Arnoud Legoux Moving Average}
 * * {@link module:bxf-hf-indicators.Aroon|Aroon}
 * * {@link module:bxf-hf-indicators.ADX|Average Directional Index}
 * * {@link module:bxf-hf-indicators.AO|Awesome Oscillator}
 * * {@link module:bxf-hf-indicators.BOP|Balance of Power}
 * * {@link module:bxf-hf-indicators.BollingerBands|Bollinger Bands}
 * * {@link module:bxf-hf-indicators.CMF|Chaikin Money Flow}
 * * {@link module:bxf-hf-indicators.ChaikinOsc|Chaikin Oscillator}
 * * {@link module:bxf-hf-indicators.ChandeMO|Chande Momentum Oscillator}
 * * {@link module:bxf-hf-indicators.CoppockCurve|Coppock Curve}
 * * {@link module:bxf-hf-indicators.DPO|Detrended Price Oscillator}
 * * {@link module:bxf-hf-indicators.DC|Donchian Channels}
 * * {@link module:bxf-hf-indicators.EOM|Ease of Movement}
 * * {@link module:bxf-hf-indicators.Envelope|Envelope}
 * * {@link module:bxf-hf-indicators.EMA|Exponential Moving Average}
 * * {@link module:bxf-hf-indicators.EMAVolume|Exponential Moving Average of Volume}
 * * {@link module:bxf-hf-indicators.KST|Know Sure Thing}
 * * {@link module:bxf-hf-indicators.MACD|MACD}
 * * {@link module:bxf-hf-indicators.MassIndex|Mass Index}
 * * {@link module:bxf-hf-indicators.Momentum|Momentum}
 * * {@link module:bxf-hf-indicators.NetVolume|Net Volume}
 * * {@link module:bxf-hf-indicators.OBV|On Balance Volume}
 * * {@link module:bxf-hf-indicators.PC|Price Channel}
 * * {@link module:bxf-hf-indicators.PPO|Price Oscillator}
 * * {@link module:bxf-hf-indicators.PVT|Price Volume Trend}
 * * {@link module:bxf-hf-indicators.RSI|RSI}
 * * {@link module:bxf-hf-indicators.ROC|Rate of Change}
 * * {@link module:bxf-hf-indicators.RVGI|Relative Vigor Index}
 * * {@link module:bxf-hf-indicators.RVI|Relative Volatility Index}
 * * {@link module:bxf-hf-indicators.SMA|Smoothed Moving Average}
 * * {@link module:bxf-hf-indicators.StdDeviation|Standard Deviation}
 * * {@link module:bxf-hf-indicators.Stochastic|Stochastic}
 * * {@link module:bxf-hf-indicators.StochasticRSI|Stochastic RSI}
 * * {@link module:bxf-hf-indicators.TRIX|TRIX}
 * * {@link module:bxf-hf-indicators.TSI|True Strength Index}
 * * {@link module:bxf-hf-indicators.VWAP|Volume Weighted Average Price}
 * * {@link module:bxf-hf-indicators.VO|Volume Oscillator}
 * * {@link module:bxf-hf-indicators.VWMA|Volume Weighted Moving Average}
 * * {@link module:bxf-hf-indicators.WMA|Weighted Moving Average}
 * * {@link module:bxf-hf-indicators.WilliamsR|Williams %R}
 *
 * ### Installation
 *
 * ```bash
 * npm i --save bfx-hf-indicators
 * ```
 *
 * ### Quickstart & Example
 * ```js
 * const { RSI } = require('bfx-hf-indicators')
 *
 * const rsi = new RSI([14])
 *
 * rsi.add(14000)
 * rsi.add(14010)
 * rsi.add(14025)
 * rsi.add(14035)
 * // ...
 * // 8 more data points
 * // ...
 * rsi.add(13998)
 * rsi.add(13952)
 *
 * const v = rsi.v() // query current RSI(14) value
 * ```
 *
 * @license Apache-2.0
 * @module bfx-hf-indicators
 */

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
  CoppockCurve,
  VWMA,
  VWAP,
  WMA,
  DC,
  StochRSI,
  TRIX,
  EMAVolume
}
