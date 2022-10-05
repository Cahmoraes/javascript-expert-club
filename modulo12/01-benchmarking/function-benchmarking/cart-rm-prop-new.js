import { Product } from '../src/entities/product.js'

export default class Cart {
  constructor({ products }) {
    this.products = this.removedUndefinedProps(products)
  }

  removedUndefinedProps(products) {
    const result = []

    for (const product of products) {
      const keys = Reflect.ownKeys(product)

      if (!keys.length) continue

      result.push(JSON.parse(JSON.stringify(new Product(product))))
    }

    return result
  }
}
