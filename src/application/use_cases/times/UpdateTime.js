'use strict'

module.exports = (timeId, user_id, project_id, started_at, ended_at, { timeRepository }) => {
  return timeRepository.merge(timeId, user_id, project_id, started_at, ended_at)
}
