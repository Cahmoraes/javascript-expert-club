export default class Util {
  // caique => [0] => c
  // first => c, rest => aique
  static #transform({ string: [first, ...rest], upperCase = true }) {
    if (!first) return ''

    const firstLetter = upperCase ? first.toUpperCase() : first.toLowerCase()
    return [firstLetter, ...rest].join('')
  }

  static upperCaseFirstLetter(string) {
    return Util.#transform({ string })
  }

  static lowerCaseFirstLetter(string) {
    return Util.#transform({ string, upperCase: false })
  }
}
