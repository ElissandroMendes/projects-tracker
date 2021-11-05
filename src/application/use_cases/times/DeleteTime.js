'use strict'

module.exports = (timeId, { timeRepository }) => {
  return timeRepository.remove(timeId)
}
