const { evaluateRegex } = require('./util.js')

// O objetivo do Fluent API é executar tarefas
// como um pipeline, step by step
// e no fim, chama o build. Muito similar ao padrão Builder
// a diferença é que aqui é sobre processos, o Builder é sobre
// construção de objetos
class TextProcessorFluentApi {
  // propriedade privada
  #content
  constructor(content) {
    this.#content = content
  }

  extractPeopleData() {
    // ?<= fala que vai extrair os dados que virão depois deste grupo
    // [contratante|contratada] ou um ou outro, (e tem a flag no fim da expressão para pegar maiúsculo ou minúsculo)
    // :\s{1} vai procurar o caractere literal dos dois pontos seguido de um espaço
    // tudo acima fica dentro de um parênteses para falar "vamos pegar daí pra frente"
    // (?!\s) negative look around, vai ignorar os contratantes do fim do documento (que tem só o espaço a frente deles)
    // .*\n para qualquer qualquer coisa até o primeiro \n
    // .*? non greety, esse '?' faz com que ele pare na primeira recorrência, assim ele evita ficar em loop
    // $ informar que a pesquisa acaba no fim da linha
    // g -> global
    // m -> multiline
    // i -> insensitive

    const mathPerson = evaluateRegex(
      /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gim,
    )

    // faz o match para encontrar a string inteira que contém os dados que precisamos
    const onlyPerson = this.#content.match(mathPerson)
    console.log('onlyPerson', onlyPerson)
    this.#content = onlyPerson
    return this
  }

  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/)
    this.#content = this.#content.map((line) => line.split(splitRegex))
    return this
  }

  removeEmptyCharacters() {
    const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g)
    this.#content = this.#content.map((line) =>
      line.map((item) => item.replace(trimSpaces, '')),
    )
    return this
  }

  build() {
    return this.#content
  }
}

module.exports = TextProcessorFluentApi
