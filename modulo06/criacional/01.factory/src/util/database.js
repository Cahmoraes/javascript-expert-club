class Database {
  constructor({ connectionString }) {
    this.connectionString = connectionString
  }

  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async connect() {
    await this.sleep(100)
    return this
  }

  async find(query) {
    this.sleep(100)
    return [{ name: 'CaiqueMoraes' }]
  }
}

module.exports = Database
