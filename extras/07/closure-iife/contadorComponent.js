const BTN_REINICIAR = 'btnReiniciar'
const ID_CONTADOR = 'contador'
const VALOR_CONTADOR = 100
const PERIODO_INTERVALO = 10

class ContadorComponent {
  constructor() {
    this.inicializar()
  }

  prepararContadorProxy() {
    const handler = {
      set: (target, propertyKey, newValue) => {
        console.log({ target, propertyKey, newValue })
        target[propertyKey] = newValue
        return true
      },
    }

    const contador = new Proxy(
      {
        valor: VALOR_CONTADOR,
        efetuarParada: () => {},
      },
      handler,
    )

    return contador
  }

  atualizarTexto =
    ({ elementoContador, contador }) =>
    () => {
      const identificadorTexto = '$$contador'
      const textoPadrao = /*html*/ `Començando em <strong>${identificadorTexto}</strong> segundos...`

      elementoContador.innerHTML = textoPadrao.replace(
        identificadorTexto,
        contador.valor--,
      )
    }

  inicializar() {
    console.log('inicializou!')
    const elementoContador = document.getElementById(ID_CONTADOR)

    const contador = this.prepararContadorProxy()
    // contador.valor = 100
    // contador.valor = 90
    // contador.valor = 80
    const argumentos = {
      elementoContador,
      contador,
    }

    const fn = this.atualizarTexto(argumentos)
    // setInterval(fn, PERIODO_INTERVALO)
  }
}
