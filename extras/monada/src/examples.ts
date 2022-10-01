type CallbackM<T> = (value: T) => any
type CallbackChainM<T> = (value: T) => Maybe<any>

export class Maybe<T> {
  constructor(private value: T) {}

  public static of<T>(value: T): Maybe<T> {
    return new Maybe<T>(value)
  }

  public map(callbackMap: CallbackM<T>): Maybe<T> {
    if (this.isEmpty()) return Maybe.of(null) as Maybe<T>
    return Maybe.of(callbackMap(this.value))
  }

  public chain(callbackChain: CallbackChainM<T>): Maybe<T> {
    console.log(this)
    const result = this.map(callbackChain).join() as Maybe<T>
    return result
  }

  public getOrElse<K>(defaultValue: K): T | K {
    return this.isEmpty() ? defaultValue : this.value
  }

  private join(): T {
    console.log(this.value)
    return this.value
  }

  private isEmpty(): boolean {
    return this.value === null || this.value === undefined
  }
}

const trace = (log: number) => (value: any) => {
  console.log(log, value)
  return value
}

Promise.resolve(Maybe.of(null))
  .then((valueM) => valueM.chain((v) => Maybe.of(v)))
  .then((valueM) => valueM.chain((v) => Maybe.of(v)))
  .then((valueM) => valueM.getOrElse(0))
  .then(console.log)

// Promise.resolve(Maybe.of(2))
//   .then((valueM) => valueM.chain(() => Maybe.of(6)))
//   .then((valueM) => {
//     console.log(valueM)
//     const m = valueM.chain((value) => Maybe.of(value + 6))
//     console.log(m)
//     return m
//   })
//   .then((valueM) => valueM.getOrElse(0))
//   .then(console.log)
