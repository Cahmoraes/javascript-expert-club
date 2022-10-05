import { v4 as uuid } from 'uuid'
import { Product } from './product.js'

export class Cart {
  constructor({ at, products }) {
    this.id = uuid()
    this.at = at
    this.products = this.removedUndefinedProps(products)
    this.total = this.getCartPrice()
  }

  removedUndefinedProps(products) {
    const productsEntities = products
      .filter((product) => !!Reflect.ownKeys(product).length)
      .map((product) => new Product(product))

    return JSON.parse(JSON.stringify(productsEntities))
  }

  getCartPrice() {
    return this.products
      .map((product) => product.price)
      .reduce((prev, next) => prev + next, 0)
  }
}
