import Benchmark from 'benchmark'
import CartIdOld from './cart-id-old.js'
import CartIdNew from './cart-id-new.js'
import CartRmPropNew from './cart-rm-prop-new.js'
import CartRmPropOld from './cart-rm-prop-old.js'

const suit = new Benchmark.Suite()

// suit
//   .add('Cart#cartIdUUID', function () {
//     new CartIdOld()
//   })
//   .add('Cart#cartIdCrypto', function () {
//     new CartIdNew()
//   })
//   .on('cycle', (event) => console.log(String(event.target)))
//   .on('complete', function () {
//     console.log(`Fastest is ${this.filter('fastest').map('name')}`)
//   })
//   .run()

const data = {
  products: [
    { id: 'ae', n: undefined, abc: undefined, a: null, b: 123 },
    { id: 'ae', n: undefined, abc: undefined, a: null, b: 123 },
  ],
}

suit
  .add('Cart#rmEmptyPropsMapReduce', function () {
    new CartRmPropNew(data)
  })
  .add('Cart#rmEmptyPropsFor', function () {
    new CartRmPropOld(data)
  })
  .on('cycle', (event) => console.log(String(event.target)))
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`)
  })
  .run()
