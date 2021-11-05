'use strict'

const { Time } = require('../../../domain/times')

module.exports = (user_id, project_id, started_at, ended_at, { timeRepository }) => {
  const time = new Time(null, user_id, project_id, started_at, ended_at)
  return timeRepository.persist(time)
}
