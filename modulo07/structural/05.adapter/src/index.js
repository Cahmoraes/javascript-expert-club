import { RickAndMortyUSAAdapter } from './business/adapters/rickAndMortyUSAAdapter.js'
import { RickAndMortyBRLAdapter } from './business/adapters/rickAndMortyBRLAdapter.js'

const data = [RickAndMortyUSAAdapter, RickAndMortyBRLAdapter].map(
  (integration) => integration.getCharacters(),
)

const all = await Promise.allSettled(data)

const success = all
  .filter(({ status }) => status === 'fulfilled')
  .map(({ value }) => value)
  .reduce((prev, next) => prev.concat(next), [])

const errors = all.filter(({ status }) => status === 'rejected')

console.table(success)
console.table(errors)
