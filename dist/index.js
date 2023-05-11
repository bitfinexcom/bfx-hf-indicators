'use strict';

var Indicator = require('./lib/indicator');
var SMA = require('./lib/sma');
var EMA = require('./lib/ema');
var WildersMA = require('./lib/wilders_ma');
var MACD = require('./lib/macd');
var RSI = require('./lib/rsi');
var ROC = require('./lib/roc');
var ATR = require('./lib/atr');
var Momentum = require('./lib/momentum');
var Acceleration = require('./lib/acceleration');
var StdDeviation = require('./lib/stddev');
var BollingerBands = require('./lib/bbands');
var Aroon = require('./lib/aroon');
var AccumDist = require('./lib/accumulation_distribution');
var ASI = require('./lib/accumulative_swing_index');
var ALMA = require('./lib/alma');
var AO = require('./lib/awesome_oscillator');
var ADX = require('./lib/average_directional_index');
var BOP = require('./lib/balance_of_power');
var PPO = require('./lib/price_oscillator');
var RVGI = require('./lib/relative_vigor_index');
var RVI = require('./lib/relative_volatility_index');
var Stochastic = require('./lib/stochastic');
var VO = require('./lib/volume_oscillator');
var OBV = require('./lib/on_balance_volume');
var PVT = require('./lib/price_volume_trend');
var MassIndex = require('./lib/mass_index');
var CMF = require('./lib/chaikin_money_flow');
var DPO = require('./lib/detrended_price_oscillator');
var PC = require('./lib/price_channel');
var NetVolume = require('./lib/net_volume');
var KST = require('./lib/know_sure_thing');
var TSI = require('./lib/true_strength_index');
var WR = require('./lib/williams_r');
var Envelope = require('./lib/envelope');
var EOM = require('./lib/ease_of_movement');
var ChandeMO = require('./lib/chande_momentum_oscillator');
var ChaikinOsc = require('./lib/chaikin_oscillator');
var CoppockCurve = require('./lib/coppock_curve');
var VWMA = require('./lib/vwma');
var WMA = require('./lib/wma');
var VWAP = require('./lib/vwap');
var DC = require('./lib/donchian_channels');
var StochRSI = require('./lib/stochastic_rsi');
var TRIX = require('./lib/trix');
var EMAVolume = require('./lib/ema_vol');
var NATR = require('./lib/normalised_atr');
module.exports = {
  Indicator: Indicator,
  SMA: SMA,
  EMA: EMA,
  WildersMA: WildersMA,
  MACD: MACD,
  RSI: RSI,
  Momentum: Momentum,
  ROC: ROC,
  Acceleration: Acceleration,
  StdDeviation: StdDeviation,
  BollingerBands: BollingerBands,
  ATR: ATR,
  NATR: NATR,
  Aroon: Aroon,
  AccumDist: AccumDist,
  ASI: ASI,
  ALMA: ALMA,
  AO: AO,
  ADX: ADX,
  BOP: BOP,
  PPO: PPO,
  RVGI: RVGI,
  RVI: RVI,
  Stochastic: Stochastic,
  VO: VO,
  OBV: OBV,
  PVT: PVT,
  MassIndex: MassIndex,
  CMF: CMF,
  DPO: DPO,
  PC: PC,
  NetVolume: NetVolume,
  KST: KST,
  TSI: TSI,
  WR: WR,
  Envelope: Envelope,
  EOM: EOM,
  ChandeMO: ChandeMO,
  ChaikinOsc: ChaikinOsc,
  CoppockCurve: CoppockCurve,
  VWMA: VWMA,
  VWAP: VWAP,
  WMA: WMA,
  DC: DC,
  StochRSI: StochRSI,
  TRIX: TRIX,
  EMAVolume: EMAVolume
};