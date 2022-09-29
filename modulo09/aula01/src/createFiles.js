import fs from 'fs'
import fsPromises from 'fs/promises'
import templates from './templates/index.js'
import Util from './util.js'

const defaultDependencies = (layer, componentName) => {
  const dependencies = {
    repository: [],
    service: [`${componentName}Repository`],
    factory: [`${componentName}Repository`, `${componentName}Service`],
  }

  return dependencies[layer].map(Util.lowerCaseFirstLetter)
}

async function executeWrites(pendingFilesToWrite) {
  return Promise.all(
    pendingFilesToWrite.map(({ fileName, textFile }) =>
      fsPromises.writeFile(fileName, textFile),
    ),
  )
}

export async function createFiles({
  mainPath,
  defaultMainFolder,
  layers,
  componentName,
}) {
  const keys = Object.keys(templates)
  const pendingFilesToWrite = []

  for (const layer of layers) {
    const chosenTemplate = keys.find((key) => key.includes(layer))
    /*
      keys = [
        factoryTemplate,
        serviceTemplate,
        repositoryTemplate,
      ]
    */
    if (!chosenTemplate) {
      return { error: 'the chosen layer doesnt have a template' }
    }

    const template = templates[chosenTemplate]
    // só o exemplo debaixo /Users/Document/jsexpert/codegen/src/factory
    const targetFolder = `${mainPath}/${defaultMainFolder}/layer`
    const dependencies = defaultDependencies(layer, componentName)

    const { fileName: className, template: textFile } = template(
      componentName,
      ...dependencies,
    )

    // só o exemplo debaixo /Users/Document/jsexpert/codegen/src/factory
    const fileName = `${targetFolder}/${Util.lowerCaseFirstLetter(
      className,
    )}.js`

    pendingFilesToWrite.push({ fileName, textFile })
  }

  await executeWrites(pendingFilesToWrite)

  return { success: true }
}
