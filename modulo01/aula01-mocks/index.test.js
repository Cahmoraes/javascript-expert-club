const { join } = require('path')
const { rejects, deepStrictEqual } = require('assert')
const { error } = require('./src/constraints')
const File = require('./src/file')

const joinFilepath = (filePath) => join(__dirname, filePath)

;(async () => {
  {
    const filePath = joinFilepath('./mocks/emptyFile-invalid.csv')
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }

  {
    const filePath = joinFilepath('./mocks/fourItems-invalid.csv')
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }

  {
    const filePath = joinFilepath('./mocks/threeItems-valid.csv')
    const result = await File.csvToJson(filePath)
    const expected = [
      {
        name: 'Caique Moraes',
        id: 123,
        profession: 'Software Developer JS',
        birthDay: 1994,
      },
      {
        name: 'Thomas Moraes',
        id: 321,
        profession: 'Software Developer PHP',
        birthDay: 2002,
      },
      {
        name: 'Igor Moraes',
        id: 231,
        profession: 'Actor',
        birthDay: 2006,
      },
    ]

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }
})()
