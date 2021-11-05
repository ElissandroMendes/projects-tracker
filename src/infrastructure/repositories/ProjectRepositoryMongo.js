'use strict'

const { Project, ProjectRepository } = require('../../domain/projects')

const MongooseProject = require('../orm/mongoose/schemas/Project')

module.exports = class extends ProjectRepository {
  async persist(projectEntity) {
    const { title, description, users } = projectEntity
    const mongooseProject = new MongooseProject({ title, description, users })
    await mongooseProject.save()
    return new Project(mongooseProject.id, mongooseProject.title, mongooseProject.description, mongooseProject.users)
  }

  async merge(id, title, description, users) {
    const mongooseProject = await MongooseProject.findByIdAndUpdate(id, { title, description, users }, { new: true })
    return new Project(mongooseProject.id, mongooseProject.title, mongooseProject.description, mongooseProject.users)
  }

  async remove(projectId) {
    return await MongooseProject.findOneAndDelete(projectId)
  }

  async get(projectId) {
    const mongooseProject = await MongooseProject.findById(projectId)
    const { id, title, description, users } = mongooseProject || {}
    return new Project(id, title, description, users)
  }

  async find() {
    const mongooseProjects = await MongooseProject.find()
    return mongooseProjects.map((mongooseProject) => {
      return new Project(mongooseProject.id, mongooseProject.title, mongooseProject.description, mongooseProject.users)
    })
  }
}
