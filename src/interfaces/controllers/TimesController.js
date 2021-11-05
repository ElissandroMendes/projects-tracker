'use strict'

const Boom = require('@hapi/boom')
const ListTimes = require('../../application/use_cases/times/ListTimes')
const CreateTime = require('../../application/use_cases/times/CreateTime')
const GetTime = require('../../application/use_cases/times/GetTime')
const GetTimeByProjectId = require('../../application/use_cases/times/GetTimeByProjectId')
const UpdateTime = require('../../application/use_cases/times/UpdateTime')
const DeleteTime = require('../../application/use_cases/times/DeleteTime')

module.exports = {

  async createTime(request) {
    const serviceLocator = request.server.app.serviceLocator
    const { user_id, project_id, started_at, ended_at } = request.payload
    const time = await CreateTime(user_id, project_id, started_at, ended_at, serviceLocator)
    return serviceLocator.timeSerializer.serialize(time)
  },

  async findTimes(request) {
    const serviceLocator = request.server.app.serviceLocator
    const times = await ListTimes(serviceLocator)
    return times.map(serviceLocator.timeSerializer.serialize)
  },

  async getTimeByProjectID(request) {
    const serviceLocator = request.server.app.serviceLocator
    const projectId = request.params.project_id
    try {
      const result = await GetTimeByProjectId(projectId, serviceLocator)
      if (!result.time.length) {
        return Boom.notFound()
      }
      return serviceLocator.timeSerializer.serialize(result)
    } catch (error) {
      return Boom.badData(error.message)
    }
  },

  async updateTime(request) {
    const serviceLocator = request.server.app.serviceLocator
    const timeId = request.params.id
    const { user_id, project_id, started_at, ended_at } = request.payload

    try {
      const projectEntity = await GetTime(timeId, serviceLocator)
      if (!projectEntity.id) {
        return Boom.notFound()
      }

      const timeChanged = await UpdateTime(timeId, user_id, project_id, started_at, ended_at, serviceLocator)
      return serviceLocator.timeSerializer.serialize(timeChanged)
    } catch (error) {
      return Boom.badData(error.message)
    }
  },

  async deleteTime(request, h) {
    const serviceLocator = request.server.app.serviceLocator
    const timeId = request.params.id
    await DeleteTime(timeId, serviceLocator)
    return h.response().code(204)
  }

}
