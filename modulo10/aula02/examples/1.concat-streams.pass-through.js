import { Writable, PassThrough } from 'stream'
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

function merge(streams) {
  return streams.reduce((prev, current, index, items) => {
    // impede que a stream feche sozinha
    current.pipe(prev, { end: false })
    // como colocamos end: false, vamos manipular manualmente quando o nosso current terminar
    // Quando ele terminar, vamos verificar se todos no pipeline se encerraram
    // ele vai então forçar a cadeia do anterior a se fechar
    current.on('end', () => items.every((s) => s.ended) && prev.end())
    return prev
  }, new PassThrough())
}

merge(results).pipe(output)

// results[0].pipe(output)
// results[1].pipe(output)
