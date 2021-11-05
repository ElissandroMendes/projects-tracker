'use strict'

module.exports = (projectId, { projectRepository }) => {
  return projectRepository.remove(projectId)
}
