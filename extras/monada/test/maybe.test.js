import { describe, it, jest, expect } from '@jest/globals'
import { Maybe } from '../src/maybe.js'

describe('Maybe suite test', () => {
  it('should return an maybe instance', () => {
    const maybe = new Maybe(1)
    expect(maybe).toBeInstanceOf(Maybe)
  })

  it('#isNothing should return true when value is null or undefined', () => {
    const maybe_1 = new Maybe(null)
    expect(maybe_1.isNothing()).toBeTruthy()

    const maybe_2 = new Maybe()
    expect(maybe_2.isNothing()).toBeTruthy()

    const maybe_3 = new Maybe(0)
    expect(maybe_3.isNothing()).toBeFalsy()

    const maybe_4 = new Maybe('')
    expect(maybe_4.isNothing()).toBeFalsy()

    const maybe_5 = new Maybe(1)
    expect(maybe_5.isNothing()).toBeFalsy()
  })

  it('#map should return a new Monada when map is called', () => {
    const maybe_1 = new Maybe(1)

    const callback = jest.fn().mockReturnValue((number) => number + 2)

    expect(maybe_1.map(callback)).toBeInstanceOf(Maybe)
    expect(callback).toBeCalledTimes(1)
  })
})
