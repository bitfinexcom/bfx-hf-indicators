/* eslint-env mocha */
'use strict'

const assert = require('assert')
const Indicator = require('../lib/indicator')

const downtrendValues = [54852.38, 54793.4808, 54750.8376]
const uptrendValues = [54360.8860, 54375.9976, 54445.9981]
const indicatorValues = [1, 2, 3, 4, 5]

const args = {
  id: 'indicator',
  name: 'Base Indicator'
}

describe('Base Indicator', () => {
  it('adds the values properly', () => {
    const base = new Indicator(args)
    indicatorValues.forEach(v => base.add(v))
    assert.deepStrictEqual(base._values, indicatorValues, 'did not add the values properly')
  })

  it('updates the values properly', () => {
    const base = new Indicator(args)
    const updateValue = 6
    indicatorValues.forEach(v => base.add(v))
    base.update(updateValue)
    assert.deepStrictEqual(base.v(), updateValue, 'did not update the value properly')
  })

  it('#update function adds the value if no value exists', () => {
    const base = new Indicator(args)
    const updateValue = 6
    base.update(updateValue)
    assert.deepStrictEqual(base.v(), updateValue, 'did not add the value')
  })

  it('returns latest value properly', () => {
    const base = new Indicator(args)
    indicatorValues.forEach(v => base.add(v))
    assert.deepStrictEqual(base.v(), 5, 'did not return the latest value properly')
  })

  it('returns previous value properly', () => {
    const base = new Indicator(args)
    indicatorValues.forEach(v => base.add(v))
    assert.deepStrictEqual(base.prev(), 4, 'did not return the previous value properly')
  })

  it('returns previous value properly when args is pass', () => {
    const base = new Indicator(args)
    indicatorValues.forEach(v => base.add(v))
    assert.deepStrictEqual(base.prev(2), 3, 'did not return the previous value properly')
  })

  it('checks cross properly for downtrend', () => {
    const base = new Indicator(args)
    downtrendValues.forEach(v => base.add(v))
    const targetValue = 54762.5151
    assert.ok(base.crossed(targetValue), 'should have crossed the target value')
  })

  it('checks cross properly for uptrend', () => {
    const base = new Indicator(args)
    uptrendValues.forEach(v => base.add(v))
    const targetValue = 54443.5581
    assert.ok(base.crossed(targetValue), 'should have crossed the target value')
  })
})
