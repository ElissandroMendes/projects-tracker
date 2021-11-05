'use strict'

module.exports = (timeId, { timeRepository }) => {
  return timeRepository.get(timeId)
}
