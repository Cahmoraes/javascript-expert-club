const assert = require('assert')

// usado na maioria das vezes para Listas de itens únicos
const arr1 = ['0', '1', '2']
const arr2 = ['2', '0', '3']
const arr3 = arr1.concat(arr2)
// console.log('arr3', arr3.sort())
assert.deepEqual(arr3.sort(), ['0', '0', '1', '2', '2', '3'])

const set = new Set()
arr1.forEach((item) => set.add(item))
arr2.forEach((item) => set.add(item))

// console.log('set', set)
assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3'])
// rest/spread
assert.deepStrictEqual([...new Set([...arr1, ...arr2])], ['0', '1', '2', '3'])

// console.log('set.keys', set.keys())
// console.log('set.values', set.values()) // só existe por conta do Map

// no Array, para saber se um item existe
// [].indexOf('1') !== -1 ou [0].includes
assert.ok(set.has('3'))

// mesma teoria do Map, mas você sempre trabalha com a lista toda
// não tem get, então você precisa saber se o item está ou não no array
// na documentação tem exemplos sobre como fazer uma interação, saber o que tem em uma lista ou não

// temos nos dois arrays
const users01 = new Set(['caique', 'thomas', 'igor'])

const users02 = new Set(['isabella', 'caique', 'laura'])

const intersection = new Set([...users01].filter((user) => users02.has(user)))

assert.deepEqual(Array.from(intersection), ['caique'])

const difference = new Set([...users01].filter((user) => !users02.has(user)))

assert.deepStrictEqual([...difference], ['thomas', 'igor'])

// weakSet
// mesma ideia do WeakMap
// não é enumerável (iterável)
// só trabalha com chaves de referência
// só tem métodos simples

const user = { id: 123 }
const user2 = { id: 321 }
const weakSet = new WeakSet([user])
weakSet.add(user)
weakSet.add(user2)
weakSet.has(user)
