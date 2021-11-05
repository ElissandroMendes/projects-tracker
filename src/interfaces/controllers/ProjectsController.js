'use strict'

const Boom = require('@hapi/boom')
const ListProjects = require('../../application/use_cases/projects/ListProjects')
const CreateProject = require('../../application/use_cases/projects/CreateProject')
const GetProject = require('../../application/use_cases/projects/GetProject')
const UpdateProject = require('../../application/use_cases/projects/UpdateProject')
const DeleteProject = require('../../application/use_cases/projects/DeleteProject')

module.exports = {

  async createProject(request) {
    const serviceLocator = request.server.app.serviceLocator
    const { title, description, user_id } = request.payload
    const project = await CreateProject(title, description, user_id, serviceLocator)
    return serviceLocator.projectSerializer.serialize(project)
  },

  async findProjects(request) {
    const serviceLocator = request.server.app.serviceLocator
    const projects = await ListProjects(serviceLocator)
    return projects.map(serviceLocator.projectSerializer.serialize)
  },

  async getProject(request) {
    const serviceLocator = request.server.app.serviceLocator
    const projectId = request.params.id
    try {
      const project = await GetProject(projectId, serviceLocator)
      if (!project.id) {
        return Boom.notFound()
      }
      return serviceLocator.projectSerializer.serialize(project)
    } catch (error) {
      return Boom.badData(error.message)
    }
  },

  async updateProject(request) {
    const serviceLocator = request.server.app.serviceLocator
    const projectId = request.params.id
    const { title, description, user_id } = request.payload

    try {
      const projectEntity = await GetProject(projectId, serviceLocator)
      if (!projectEntity.id) {
        return Boom.notFound()
      }

      const projectChanged = await UpdateProject(projectId, title, description, user_id, serviceLocator)
      return serviceLocator.projectSerializer.serialize(projectChanged)
    } catch (error) {
      return Boom.badData(error.message)
    }
  },

  async deleteProject(request, h) {
    const serviceLocator = request.server.app.serviceLocator
    const projectId = request.params.id
    await DeleteProject(projectId, serviceLocator)
    return h.response().code(204)
  }

}
