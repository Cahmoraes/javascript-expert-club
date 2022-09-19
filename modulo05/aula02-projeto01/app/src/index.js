'use strict'
const { readFile } = require('fs/promises')
const { join } = require('path')
const pdf = require('pdf-parse')

;(async () => {
  const dataBuffer = await readFile(
    join(__dirname, './../../../docs/contrato.pdf'),
  )
  const dada = await pdf(dataBuffer)
  console.log('dada', dada.text)
})()
