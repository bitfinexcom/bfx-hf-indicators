## Bitfinex Indicator Library for Node.JS

[![Build Status](https://travis-ci.org/bitfinexcom/bfx-hf-indicators.svg?branch=master)](https://travis-ci.org/bitfinexcom/bfx-hf-indicators)

This repo contains a collection of trading indicators implemented to support incremental updates, both from trade and candle data (depending on the indicator).

### Features
* Average True Range
* Normalised Average True Range
* Acceleration
* Accumulation/Distribution
* Accumulative Swing Index
* Arnoud Legoux Moving Average
* Aroon
* Average Directional Index
* Awesome Oscillator
* Balance of Power
* Bollinger Bands
* Chaikin Money Flow
* Chaikin Oscillator
* Chande Momentum Oscillator
* Coppock Curve
* Detrended Price Oscillator
* Donchian Channels
* Ease of Movement
* Envelope
* Exponential Moving Average
* EMA Volume
* Know Sure Thing
* MACD
* Mass Index
* Momentum
* Net Volume
* On Balance Volume
* Price Channel
* Price Oscillator
* Price Volume Trend
* RSI
* Rate of Change
* Relative Vigor Index
* Relative Volatility Index
* Simple Moving Average
* Standard Deviation
* Stochastic
* Stochastic RSI
* TRIX
* True Strength Index
* VWAP
* Volume Oscillator
* Volume Weighted Moving Average
* Weighted Moving Average
* Williams %R

### Installation

```bash
npm i --save bfx-hf-indicators
```

### Quickstart & Example
```js
const { RSI } = require('bfx-hf-indicators')

const rsi = new RSI([14])

rsi.add(14000)
rsi.add(14010)
rsi.add(14025)
rsi.add(14035)
// ...
// 8 more data points
// ...
rsi.add(13998)
rsi.add(13952)

const v = rsi.v() // query current RSI(14) value
```

### Docs

[See `docs/usage.md`](/docs/usage.md) for an overview of the system, and the [`examples/`](/examples) folder for executable examples.

### Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
