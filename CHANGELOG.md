# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.0.5](https://github.com/bitfinexcom/bfx-hf-indicators/compare/v2.0.3...v2.0.5) (2021-01-07)


### Bug Fixes

* bump deps to fix babel build in consumer projects, polish docs ([81af49d](https://github.com/bitfinexcom/bfx-hf-indicators/commit/81af49d58eaa43ae481c85440a014351946a9d6b))
* remove manifest from eslint check, parse fails ([0418ec1](https://github.com/bitfinexcom/bfx-hf-indicators/commit/0418ec1d9e063cbd20b34c0b1a4e7e0dd707a770))

# 2.0.4
- meta: update dependencies + eslint config, switch to nyc for coverage

# 2.0.3
- manifest: bump babel

# 2.0.2
- docs: create/update

# 2.0.1
- manifest: bump deps
- meta: add github issue/pr templates
- meta: standardize travis config
- meta: convert tests to mocha
- meta: add example

# 2.0.0
- major version bump due to changes in 1.0.6

# 1.0.6
- feature: Wilders Moving Average
- MACD refactor: update value key names for react-stockcharts compatibility
- RSI refactor: switch to WildersMA internally
- ALMA feature: expose candle key in args
- EMA feature: expose candle key in args
- refactor: use BigN in a few more places
- refactor: rename candle model key 'vol' to 'volume'
- fix: missing imports

# 1.0.5
- refactor: copy all metadata (arguments, etc) to indicator instances
- NATR fix: only add ATR values when seeded

# 1.0.4
- feature: save UI definition on indicator instances
- feature: Normalized Average True Range

# 1.0.3
- MACD fix: missing import
- ASI fix: paranthesis typo
- ASI feature: add test
- RVI fix: internal
- PPO fix: reset signal EMA in PPO reset() method
- fix: add missing test end() call in ASI test

# 1.0.2
- WeightedMovingAverage fix: export on package
- BalanceOfPower fix: prevent divide by zero
- RelativeVigorIndex fix: RVGI class name typo
- refactor: return values from all indicator add/update methods
- feature: add serialize/unserialize methods to all indicators
- fix: provide default argument values for all indicators
- meta: add LICENSE

# 1.0.1
- EMAVolume fix: set seedPeriod from arg
- EMAVolume fix: add reset() method
- manifest: rm babel dep
- meta: rm package-lock.json

# 1.0.0
- initial version [0.0.1 was tagged early in initial development]
