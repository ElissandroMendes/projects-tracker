'use strict'

module.exports = async (login, password, { userRepository, accessTokenManager }) => {
  const user = await userRepository.getByLogin(login)
  const isValidPassword = await userRepository.checkPassword(user, password)
  if (!isValidPassword) {
    throw new Error('Bad credentials')
  }

  return accessTokenManager.generate({ uid: user.id })
}
