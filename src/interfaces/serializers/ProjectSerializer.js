'use strict'

const _serializeSingleProject = (project) => {
  return {
    "project": {
      id: project.id,
      'title': project.title,
      'description': project.description,
      'user_id': project.users
    }
  }
}

module.exports = class {
  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null')
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleProject)
    }
    return _serializeSingleProject(data)
  }
}
