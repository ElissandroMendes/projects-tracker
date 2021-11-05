'use strict'

module.exports = class {
  constructor (id = null, name, email, login, password) {
    this.id = id
    this.name = name
    this.email = email
    this.login = login
    this.password = password
  }
}
