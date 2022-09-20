import { OrderBusiness } from './business/orderBusiness.js'
import { Order } from './entities/order.js'

const order = new Order({
  customerId: 'CahMoraes',
  amount: 200.0,
  products: [{ description: 'Ferrari' }],
})

const orderBusiness = new OrderBusiness()
console.info('orderCreated', orderBusiness.create(order))
