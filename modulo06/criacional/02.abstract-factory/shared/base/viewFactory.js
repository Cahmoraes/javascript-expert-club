import { NotImplementedException } from '../notImplementedException.js'

export class ViewFactory {
  createTable() {
    throw new NotImplementedException(this.createTable.name)
  }
}
