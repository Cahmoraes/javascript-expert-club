export class Maybe {
  #value
  constructor(value) {
    this.#value = value
  }

  static of(value) {
    return new Maybe(value)
  }

  isNothing() {
    return this.#value === null || this.#value === undefined
  }

  map(callback) {
    if (this.isNothing()) return Maybe.of(null)
    return Maybe.of(callback(this.#value))
  }

  join() {
    return this.#value
  }
}

const maybe = new Maybe(1)
const result = maybe.map((number) => number + 1).map((number) => number * 2)
console.log(result.join())
