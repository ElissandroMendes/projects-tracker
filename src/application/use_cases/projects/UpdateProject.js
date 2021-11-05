'use strict'

module.exports = (projectId, title, description, users, { projectRepository }) => {
  return projectRepository.merge(projectId, title, description, users)
}
