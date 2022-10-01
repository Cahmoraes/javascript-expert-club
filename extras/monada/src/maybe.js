class Maybe {
  #value
  constructor(value) {
    this.#value = value
  }

  static of(value) {
    return new Maybe(value)
  }

  valueOf() {
    return this.#value
  }

  map(fn) {
    if (this.#isEmpty()) return Maybe.of(null)
    return Maybe.of(fn(this.#value))
  }

  chain(fn) {
    return this.map(fn).#join()
  }

  getOrElse(defaultValue = '') {
    return this.#isEmpty() ? defaultValue : this.#value
  }

  #join() {
    return this.#value
  }

  #isEmpty() {
    return this.#value === null || this.#value === undefined
  }
}

Promise.resolve(Maybe.of(null))
  .then((valueM) => valueM.chain((v) => Maybe.of(v)))
  .then((value) => {
    console.log(value)
    return value
  })
  .then((valueM) => valueM.chain((v) => Maybe.of(v)))
  .then((valueM) => valueM.getOrElse(0))
  .then(console.log)

// const maybe = Maybe.of(3)
// const maybe2 = maybe.chain((number) => Maybe.of(number * 2))
// const maybe3 = maybe2.map(number => number * 2)
// const value = maybe3.getOrElse(0)
// console.log(value)

// Promise.resolve(Maybe.of(2))
//   .then((valueM) => valueM.map((value) => value * 2))
//   .then((valueM) => valueM.map((value) => value + 1))
//   .then((valueM) => valueM.chain((value) => Maybe.of(value + 6)))
//   .then((valueM) => valueM.getOrElse(0))
//   .then(console.log)
