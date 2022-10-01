type CallbackM<T> = (maybeValue: T) => any
type CallbackChainM<T> = (maybeValue: T) => Maybe<any>

export class Maybe<T> {
  private value: T

  constructor(value: T) {
    this.value = value
  }

  static of<T>(value: T): Maybe<T> {
    return new Maybe<T>(value)
  }

  public map(callback: CallbackM<T>): Maybe<T> {
    if (this.isEmpty()) return Maybe.of(null) as Maybe<T>
    return Maybe.of(callback(this.value))
  }

  public chain(callback: CallbackChainM<T>): Maybe<T> {
    return this.map(callback).join() as Maybe<T>
  }

  public getOrElse<K>(defaultValue: K): T | K {
    return this.isEmpty() ? defaultValue : this.value
  }

  private join(): T {
    return this.value
  }

  private isEmpty(): boolean {
    return this.value === null || this.value === undefined
  }
}

Promise.resolve(Maybe.of(2))
  .then((valueM) => valueM.map((value) => value * 2))
  .then((valueM) => valueM.map((value) => value + 1))
  .then((valueM) => valueM.chain((value) => Maybe.of(value + 6)))
  .then((valueM) => valueM.getOrElse(0))
  .then(console.log)

const brothers = [
  { name: 'caique', age: 28 },
  { name: 'thomas', age: 20 },
  { name: 'isabella', age: 22 },
  { name: 'igor', age: 17 },
]

Promise.resolve(Maybe.of(brothers))
  .then((brothersM) =>
    brothersM.map((brothers) =>
      brothers.reduce((total, brother) => brother.age + total, 0),
    ),
  )
  .then((totalM) => totalM.getOrElse(0))
  .then(console.log)
