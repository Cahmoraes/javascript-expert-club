const { evaluateRegex } = require('./util')

class Person {
  constructor([
    nome,
    nacionalidade,
    estadoCivil,
    documento,
    rua,
    numero,
    bairro,
    estado,
  ]) {
    // ^-> começo da string
    // + -> um ou mais ocorrências
    // (\w{1}) -> pega só a primeira letra e deixa em um grupo
    // (a-zA-Z) encontra letras maiúsculas ou minúsculas, adicionamos o +
    // para ele pegar todas até o caractere especial
    // g -> todas as ocorrências que encontrar

    const firstLetterExp = evaluateRegex(/(^\w{1})([a-zA-Z]+$)/g)
    const formatFirstLetter = (prop) => {
      return prop.replace(
        firstLetterExp,
        (fullMatch, group1, group2, index) => {
          return `${group1.toUpperCase()}${group2.toLowerCase()}`
        },
      )
    }

    this.nome = nome
    this.nacionalidade = formatFirstLetter(nacionalidade)
    this.estadoCivil = formatFirstLetter(estadoCivil)
    // tudo o que não for dígito é removido
    // \g serve para remover todas as ocorrências que encontrar
    this.documento = documento.replace(evaluateRegex(/\D/g), '')
    // começa a procurar do " a " e pega tudo que tem a frente
    // (?<= faz com que ignore tudo que estiver antes desse match)
    // conhecido como positive lookBehind
    this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/)).join()
    this.numero = numero
    // começa a buscar depois do espaço, pega qualquer letra ou dígito até o fim da linha (poderia ser o .* também)
    this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/)).join()
    // remove o ponto literal (.) do fim da frase
    this.estado = estado.replace(evaluateRegex(/\.$/), '')
  }
}

module.exports = Person
