'use strict'

const _serializeSingleTime = (time) => {
  return {
    "time": {
      id: time.id,
      'user_id': time.user_id,
      'project_id': time.project_id,
      'started_at': time.started_at,
      'ended_at': time.ended_at
    }
  }
}

module.exports = class {
  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null')
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleTime)
    }
    return _serializeSingleTime(data)
  }
}
