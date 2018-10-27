'use strict'

const _isFinite = require('lodash/isFinite')
const Indicator = require('./indicator')
const WMA = require('./wma')
const ROC = require('./roc')

class CoppockCurve extends Indicator {
  constructor (args = []) {
    const [ wmaLength, longROCLength, shortROCLength ] = args

    super({
      args,
      id: CoppockCurve.id,
      name: `Coppock Curve(${wmaLength}, ${longROCLength}, ${shortROCLength})`,
      seedPeriod: Math.max(longROCLength + wmaLength, shortROCLength + wmaLength)
    })

    this._wma = new WMA([wmaLength])
    this._shortROC = new ROC([shortROCLength])
    this._longROC = new ROC([longROCLength])
  }

  static unserialize (args = []) {
    return new CoppockCurve(args)
  }

  reset () {
    super.reset()

    if (this._wma) this._wma.reset()
    if (this._shortROC) this._shortROC.reset()
    if (this._longROC) this._longROC.reset()
  }

  update (v) {
    this._shortROC.update(v)
    this._longROC.update(v)

    const short = this._shortROC.v()
    const long = this._longROC.v()

    if (!_isFinite(short) || !_isFinite(long)) {
      return
    }

    this._wma.update(short + long)
    return super.update(this._wma.v())
  }

  add (v) {
    this._shortROC.add(v)
    this._longROC.add(v)

    const short = this._shortROC.v()
    const long = this._longROC.v()

    if (!_isFinite(short) || !_isFinite(long)) {
      return
    }

    this._wma.add(short + long)
    return super.add(this._wma.v())
  }
}

CoppockCurve.id = 'coppockcurve'
CoppockCurve.label = 'CoppockCurve'
CoppockCurve.humanLabel = 'Coppock Curve'
CoppockCurve.ui = {
  position: 'external',
  type: 'line'
}

CoppockCurve.args = [{
  label: 'WMA Length',
  default: 10,
}, {
  label: 'Long RoC Length',
  default: 14,
}, {
  label: 'Short RoC Length',
  default: 11,
}]

module.exports = CoppockCurve
