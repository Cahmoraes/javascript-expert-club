import { writeFile, readFile } from 'fs/promises'

export const save = async (data) => {
  // não tem __filename, __dirname
  const url = new URL('./../database.json', import.meta.url)
  const currentData = JSON.parse(await readFile(url, 'utf8'))
  currentData.push(data)

  await writeFile(url, JSON.stringify(currentData))
}
