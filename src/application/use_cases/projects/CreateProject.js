'use strict'

const { Project } = require('../../../domain/projects')

module.exports = (title, description, users, { projectRepository }) => {
  const project = new Project(null, title, description, users)
  return projectRepository.persist(project)
}
