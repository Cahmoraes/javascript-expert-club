import { NotImplementedException } from '../../util/exceptions.js'

export class BaseBusiness {
  _validateRequiredFields(data) {
    throw new NotImplementedException(this._validateRequiredFields.name)
  }

  _create(data) {
    throw new NotImplementedException(this._create.name)
  }
  /*
    Padrão do Martin Fowler
    o propósito do padrão é garantir um fluxo de método, definindo uma sequência a ser executada

    esse create é a implementação efetiva do Template Method 
  */
  create(data) {
    // validar campos
    const isValid = this._validateRequiredFields(data)
    if (!isValid) {
      throw new Error('Invalid data!')
    }
    // salvar no banco
    return this._create(data)
  }
}
