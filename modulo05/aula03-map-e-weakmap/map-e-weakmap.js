const assert = require('assert')
const myMap = new Map()

// podem ter qualquer coisa como chave
myMap
  .set(1, 'one')
  .set('Caique', { text: 'two' })
  .set(true, () => 'hello')

// usando um construtor
const myMapWithConstructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1'],
])

// console.log('myMap', myMap)
// console.log('myMap.get(1)', myMap.get(1))

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Caique'), { text: 'two' })
assert.deepStrictEqual(myMap.get(true)(), 'hello')

// Em Objects as chave só podem ser string ou symbols (number é coergido para string)

const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'CaiqueMoraes' })

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'CaiqueMoraes' })

// utilitários
// - No Object seria o Object.keys({ a:1 }).length
assert.deepStrictEqual(myMap.size, 4)

// para verificar se m item existe no objeto
// item.key - se não existe = undefined
// if() = coerção implícita para boolean e retorna false
// O jeito certo em Object é ({name: 'Caique' }).hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks))

// para remover um item do objeto
// delete item.id
// imperformático para o Javascript
assert.ok(myMap.delete(onlyReferenceWorks))

// Não dá para iterar em Objects diretamente
// tem que transformar com o Object.entries
assert.deepStrictEqual(
  JSON.stringify([...myMap]),
  '[[1,"one"],["Caique",{"text":"two"}],[true,null]]',
)

for (const [key, value] of myMap) {
  console.log({ key, value })
}

// Object é inseguro, pois dependendo do nome da chave, pode substituir o comportamento padrão

// ({ }).toString() => '[object Object]
// ({toString: () => 'Hey'}).toString === 'Hey

// qualquer chave pode colidir, com as propriedades herdadas do objeto, como constructor, toString, valueOf e etc.

const actor = {
  name: 'Xuxa da Silva',
  toString: 'Queen: Xuxa da Silva',
}

// não tem restrição de nome de chave
myMap.set(actor)
assert.ok(myMap.has(actor))

assert.throws(() => myMap.get(actor).toString, TypeError)

// Não dá para limpar um Obj sem reassiná-lo
myMap.clear()
assert.deepEqual([...myMap.keys()], [])

// --- WeakMap
// Pode ser coletado após perder as referências
// usado em casos bem específicos

// tem a maioria dos benefícios do Map
// Mas: não é iterável
// Só chaves de referência e que você já conheça
// mais leve e prevê leak de memória, porque depois que as instâncias  saem da memória, tudo é limpo

const weakMap = new WeakMap()
const hero = { name: 'Flash' }
// weakMap.set(hero)
// weakMap.get(hero)
// weakMap.delete()
// weakMap.has(hero)
