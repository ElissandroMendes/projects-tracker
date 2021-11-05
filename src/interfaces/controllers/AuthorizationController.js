'use strict'

const Boom = require('@hapi/boom')
const GetAccessToken = require('../../application/use_cases/users/GetAccessToken')
const VerifyAccessToken = require('../../application/use_cases/users/VerifyAccessToken')

module.exports = {

  async getAccessToken(request) {
    const serviceLocator = request.server.app.serviceLocator

    const login = request.payload.login
    const password = request.payload.password

    try {
      const accessToken = await GetAccessToken(login, password, serviceLocator)

      return { "token": accessToken, "user": {} }

    } catch (err) {
      return Boom.unauthorized('Bad credentials')
    }
  },

  verifyAccessToken(request, h) {
    const serviceLocator = request.server.app.serviceLocator

    const accessToken = request.headers.authorization
    if (!accessToken) {
      throw Boom.badRequest('Missing or wrong Authorization request header', 'oauth')
    }

    try {
      const { uid } = VerifyAccessToken(accessToken, serviceLocator)
      return h.authenticated({
        credentials: { uid },
        artifacts: { accessToken: accessToken }
      })
    } catch (err) {
      return Boom.unauthorized('Bad credentials')
    }
  }
}
