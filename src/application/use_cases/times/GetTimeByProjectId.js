'use strict'

module.exports = (projectId, { timeRepository }) => {
  return timeRepository.getByProjectId(projectId)
}
