'use strict'

const _serializeSingleUser = (user) => {
  return {
    "user": {
      id: user.id,
      'name': user.name,
      'email': user.email,
      'login': user.login,
      'password': user.password
    }
  }
}

module.exports = class {
  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null')
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleUser)
    }
    return _serializeSingleUser(data)
  }
}
