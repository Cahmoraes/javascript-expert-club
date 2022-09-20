import { TableComponent } from '../../shared/base/tableComponent.js'

export class TableBrowserComponent extends TableComponent {
  render(data) {
    const template = this.prepareData(data)
    document.body.insertAdjacentHTML('afterbegin', template)
  }

  prepareData(data) {
    const [firstItem] = data
    const tHeaders = Object.keys(firstItem).map(
      (text) => /*html*/ `<th scope="col">${text}</th>`,
    )

    const joinLists = (list) => list.join('')

    const tBodyValues = data
      .map((item) => Object.values(item))
      .map((item) => item.map((value) => /*html*/ `<td>${value}</td>`))
      .map((tds) => /*html*/ `<tr>${joinLists(tds)}</tr>`)

    const template = /*html*/ `
        <table class="table">
        <thead>
          <tr>${joinLists(tHeaders)}</tr>
        </thead>
        <tbody>
          ${joinLists(tBodyValues)}      
        </tbody>
      </table>
    `

    return template
  }
}
