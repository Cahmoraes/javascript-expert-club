import { expect, describe, test } from '@jest/globals'
import { FluentSQLBuilder } from '../src/fluentSQL.js'

const database = [
  {
    id: 0,
    name: 'caique',
    category: 'developer',
  },
  {
    id: 1,
    name: 'thomas',
    category: 'developer',
  },
  {
    id: 2,
    name: 'igor',
    category: 'manager',
  },
]

describe('Test Suite for FluentSQL Builder', () => {
  test('#for should return a FluentSQLBuilder instance', () => {
    const result = FluentSQLBuilder.for(database)
    const expected = new FluentSQLBuilder(database)

    expect(result).toStrictEqual(expected)
    expect(result).toBeInstanceOf(FluentSQLBuilder)
  })

  test('#build should return the empty object instance', () => {
    const result = FluentSQLBuilder.for(database).build()
    const expected = database
    expect(result).toStrictEqual(expected)
  })

  test('#limit given a collection it should limit results', () => {
    const result = FluentSQLBuilder.for(database).limit(1).build()
    const expected = [database[0]]

    expect(result).toStrictEqual(expected)
  })

  test('#where given a collection it should filter data', () => {
    const result = FluentSQLBuilder.for(database)
      .where({
        category: /^dev/,
      })
      .build()

    const expected = database.filter(
      ({ category }) => category.slice(0, 3) === 'dev',
    )

    expect(result).toStrictEqual(expected)
  })

  test('#select given a collection it should return only specific fields', () => {
    const result = FluentSQLBuilder.for(database)
      .select(['name', 'category'])
      .build()

    const expected = database.map(({ category, name }) => ({
      name,
      category,
    }))

    expect(result).toStrictEqual(expected)
  })

  test('#orderBy given a collection it should order results by field', () => {
    const result = FluentSQLBuilder.for(database).orderBy('name').build()

    const expected = [
      {
        id: 0,
        name: 'caique',
        category: 'developer',
      },
      {
        id: 2,
        name: 'igor',
        category: 'manager',
      },
      {
        id: 1,
        name: 'thomas',
        category: 'developer',
      },
    ]

    expect(result).toStrictEqual(expected)
  })

  test('pipeline', () => {
    const result = FluentSQLBuilder.for(database)
      .where({ category: 'developer' })
      .where({ name: /c/ })
      .select(['name', 'id'])
      .orderBy('name')
      .build()

    const expected = [{ id: 0, name: 'caique' }]

    expect(result).toStrictEqual(expected)
  })
})
