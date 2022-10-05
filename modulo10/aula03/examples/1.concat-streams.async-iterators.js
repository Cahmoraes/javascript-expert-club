import { pipeline } from 'stream/pipeline'
import { Writable } from 'stream'
import axios from 'axios'
const API_1 = 'http://localhost:3000'
const API_2 = 'http://localhost:4000'

const requests = await Promise.all([
  axios({
    method: 'get',
    url: API_1,
    responseType: 'stream',
  }),
  axios({
    method: 'get',
    url: API_2,
    responseType: 'stream',
  }),
])

const results = requests.map(({ data }) => data)

const output = new Writable({
  write(chunk, encoding, callback) {
    const data = chunk.toString().replace(/\n/, '')

    // ?=- -> Ele faz procurar a partir do hífen, e olhar para trás
    // :"(?<name>.*) -> procura pelo conteúdo dentro das aspas após os ':' e extrai somente o name
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name
    console.log(`[${name.toLowerCase()}] ${data}`)
    callback()
  },
})

async function* merge(streams) {
  for (const readable of streams) {
    // faz trabalhar com objectMode
    readable.setEncoding('utf8')
    for await (const chunk of readable) {
      yield chunk
    }
  }
}

merge(results).pipe(output)

// results[0].pipe(output)
// results[1].pipe(output)
