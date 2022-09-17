import database from './../database.json' assert { type: 'json' }
import Person from './person.js'
import TerminalController from './terminalController.js'
import { save } from './repository.js'
const DEFAULT_LANG = 'pt-BR'
// const DEFAULT_LANG = 'en'
// const DEFAULT_LANG = 'es'
const STOP_TERMINAL = ':q'

// 2 Bike,Avião,Navio 200000 2000-01-01 2002-02-01

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop() {
  try {
    const answer = await terminalController.question()
    console.log(answer)

    if (answer === STOP_TERMINAL) {
      terminalController.closeTerminal()
      console.log('process finished')
      return
    }

    const person = Person.generateInstanceFromString(answer)
    terminalController.updateTable(person.formatted(DEFAULT_LANG))
    await save(person)
    return mainLoop()
  } catch (error) {
    console.error('Deus RUIM**', error)
    return mainLoop()
  }
}

await mainLoop()
