import { NotImplementedException } from '../notImplementedException.js'

export class TableComponent {
  render(data) {
    throw new NotImplementedException(this.render.name)
  }
}
