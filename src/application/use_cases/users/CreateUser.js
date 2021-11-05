'use strict'

const { User } = require('../../../domain/users')

module.exports = (name, email, login, password, { userRepository }) => {
  const user = new User(null, name, email, login, password)
  return userRepository.persist(user)
}
