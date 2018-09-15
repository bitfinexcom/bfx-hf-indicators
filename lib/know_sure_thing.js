'use strict'

const _max = require('lodash/max')

const Indicator = require('./indicator')
const ROC = require('./roc')
const SMA = require('./sma')

class KST extends Indicator {
  constructor (args = []) {
    const [rocA, rocB, rocC, rocD, smaA, smaB, smaC, smaD, smaSignal] = args

    super({
      args,
      id: KST.id,
      name: `KST (${[
        rocA, rocB, rocC, rocD, smaA, smaB, smaC, smaD, smaSignal,
      ].join(',')})`,
      seedPeriod: _max([
        rocA + smaA,
        rocB + smaB,
        rocC + smaC,
        rocD + smaD,
        smaSignal,
      ]),
    })

    this._rocA = new ROC([rocA])
    this._rocB = new ROC([rocB])
    this._rocC = new ROC([rocC])
    this._rocD = new ROC([rocD])

    this._smaA = new SMA([smaA])
    this._smaB = new SMA([smaB])
    this._smaC = new SMA([smaC])
    this._smaD = new SMA([smaD])

    this._smaSignal = new SMA([smaSignal])
  }

  reset () {
    super.reset()

    if (this._rocA) this._rocA.reset()
    if (this._rocB) this._rocB.reset()
    if (this._rocC) this._rocC.reset()
    if (this._rocD) this._rocD.reset()

    if (this._smaA) this._smaA.reset()
    if (this._smaB) this._smaB.reset()
    if (this._smaC) this._smaC.reset()
    if (this._smaD) this._smaD.reset()

    if (this._smaSignal) this._smaSignal.reset()
  }

  update (v) {
    this._rocA.update(v)
    this._rocB.update(v)
    this._rocC.update(v)
    this._rocD.update(v)

    if (this._rocA.ready()) this._smaA.update(this._rocA.v())
    if (this._rocB.ready()) this._smaB.update(this._rocB.v())
    if (this._rocC.ready()) this._smaC.update(this._rocC.v())
    if (this._rocD.ready()) this._smaD.update(this._rocD.v())

    if (
      !this._smaA.ready() ||
      !this._smaB.ready() ||
      !this._smaC.ready() ||
      !this._smaD.ready()
    ) {
      return
    }

    const kst = this._smaA.v() + (this._smaB.v() * 2) + (this._smaC.v() * 3) + (this._smaD.v() * 4)
    this._smaSignal.update(kst)

    super.update({
      v: kst,
      signal: this._smaSignal.v(),
    })
  }

  add (v) {
    this._rocA.add(v)
    this._rocB.add(v)
    this._rocC.add(v)
    this._rocD.add(v)

    if (this._rocA.ready()) this._smaA.add(this._rocA.v())
    if (this._rocB.ready()) this._smaB.add(this._rocB.v())
    if (this._rocC.ready()) this._smaC.add(this._rocC.v())
    if (this._rocD.ready()) this._smaD.add(this._rocD.v())

    if (
      !this._smaA.ready() ||
      !this._smaB.ready() ||
      !this._smaC.ready() ||
      !this._smaD.ready()
    ) {
      return
    }

    const kst = this._smaA.v() + (this._smaB.v() * 2) + (this._smaC.v() * 3) + (this._smaD.v() * 4)
    this._smaSignal.add(kst)

    super.add({
      v: kst,
      signal: this._smaSignal.v(),
    })
  }
}

KST.id = 'kst'
KST.label = 'KST'
KST.humanLabel = 'Know Sure Thing'
KST.ui = {
  position: 'external',
  type: 'lines',
  lines: ['v', 'signal'],
}

KST.args = [{
  label: 'ROC A Period',
  default: 10,
}, {
  label: 'ROC B Period',
  default: 15,
}, {
  label: 'ROC C Period',
  default: 20,
}, {
  label: 'ROC D Period',
  default: 30,
}, {
  label: 'SMA A Period',
  default: 10,
}, {
  label: 'SMA B Period',
  default: 10,
}, {
  label: 'SMA C Period',
  default: 10,
}, {
  label: 'SMA D Period',
  default: 15,
}, {
  label: 'SMA Signal Period',
  default: 9,
}]

module.exports = KST
