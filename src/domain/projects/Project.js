'use strict'

module.exports = class {
  constructor(id = null, title, description, users) {
    this.id = id
    this.title = title
    this.description = description
    this.users = users
  }
}
