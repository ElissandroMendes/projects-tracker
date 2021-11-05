'use strict'

const Boom = require('@hapi/boom')
const ListUsers = require('../../application/use_cases/users/ListUsers')
const CreateUser = require('../../application/use_cases/users/CreateUser')
const GetUser = require('../../application/use_cases/users/GetUser')
const UpdateUser = require('../../application/use_cases/users/UpdateUser')
const DeleteUser = require('../../application/use_cases/users/DeleteUser')

module.exports = {

  async createUser(request) {
    const serviceLocator = request.server.app.serviceLocator
    const { name, email, login, password } = request.payload
    try {
      const user = await CreateUser(name, email, login, password, serviceLocator)
      return serviceLocator.userSerializer.serialize(user)
    } catch (error) {
      return Boom.badData(error.message)
    }
  },

  async findUsers(request) {
    const serviceLocator = request.server.app.serviceLocator
    const users = await ListUsers(serviceLocator)
    return users.map(serviceLocator.userSerializer.serialize)
  },

  async getUser(request) {
    const serviceLocator = request.server.app.serviceLocator
    const userId = request.params.id

    try {
      const user = await GetUser(userId, serviceLocator)
      if (!user.id) {
        return Boom.notFound()
      }

      return serviceLocator.userSerializer.serialize(user)
    } catch (error) {
      return Boom.badData(error.message)
    }
  },

  async updateUser(request) {
    const serviceLocator = request.server.app.serviceLocator

    const userId = request.params.id
    const { name, email, login, password } = request.payload

    try {
      const userEntity = await GetUser(userId, serviceLocator)
      if (!userEntity.id) {
        return Boom.notFound()
      }

      const userChanged = await UpdateUser(userEntity.id, name, email, login, password, serviceLocator)
      return serviceLocator.userSerializer.serialize(userChanged)
    } catch (error) {
      return Boom.badData(error.message)
    }
  },

  async deleteUser(request, h) {
    const serviceLocator = request.server.app.serviceLocator
    const userId = request.params.id
    await DeleteUser(userId, serviceLocator)
    return h.response().code(204)
  }

}
