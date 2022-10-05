import { Cart } from './entities/cart.js'
import database from '../database.js'

const cart = new Cart(database)
console.log(cart)
