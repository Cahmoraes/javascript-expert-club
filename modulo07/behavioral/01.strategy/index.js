import ContentStrategy from './src/base/contextStrategy.js'
import MongoDBStrategy from './src/strategies/mongoDBStrategy.js'
import PostgresStrategy from './src/strategies/postgresStrategy.js'

const postgresConnectionString =
  'postgres://cahmoraes:senha0001@localhost:5432/heroes'

const postgresContext = new ContentStrategy(
  new PostgresStrategy(postgresConnectionString),
)

await postgresContext.connect()

const mongoDBConnectionString =
  'mongodb://cahmoraes:senha0001@localhost:27017/heroes'

const mongoDBContext = new ContentStrategy(
  new MongoDBStrategy(mongoDBConnectionString),
)

await mongoDBContext.connect()

const data = [
  {
    name: 'caiquemoraes',
    type: 'transaction',
  },
  {
    name: 'thomasmoraes',
    type: 'activityLog',
  },
]

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongoDBContext,
}

for (const { name, type } of data) {
  const context = contextTypes[type]
  await context.create({ name: name + Date.now() })

  console.log(type, context.dbStrategy.constructor.name)
  console.log(await context.read())
}
