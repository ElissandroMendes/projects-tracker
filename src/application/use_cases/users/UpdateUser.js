'use strict'

module.exports = (id, name, email, login, password, { userRepository }) => {
    return userRepository.merge(id, name, email, login, password)
}
