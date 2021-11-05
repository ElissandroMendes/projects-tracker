'use strict'

module.exports = (projectId, { projectRepository }) => {
  return projectRepository.get(projectId)
}
