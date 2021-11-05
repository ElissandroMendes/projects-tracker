'use strict'

const TimesController = require('../controllers/TimesController')

module.exports = {
  name: 'times',
  version: '1.0.0',
  register: async (server, prefix) => {
    server.route([
      {
        method: 'GET',
        path: '/times',
        handler: TimesController.findTimes,
        options: {
          auth: 'oauth-jwt',
          description: 'List all times',
          tags: ['api']
        }
      },
      {
        method: 'POST',
        path: '/times',
        handler: TimesController.createTime,
        options: {
          auth: 'oauth-jwt',
          description: 'Create a time',
          tags: ['api']
        }
      },
      {
        method: 'GET',
        path: '/times/{project_id}',
        handler: TimesController.getTimeByProjectID,
        options: {
          auth: 'oauth-jwt',
          description: 'Get times from its {project_id}',
          tags: ['api']
        }
      },
      {
        method: 'PUT',
        path: '/times/{id}',
        handler: TimesController.updateTime,
        options: {
          auth: 'oauth-jwt',
          description: 'Update a time by its {id}',
          tags: ['api']
        }
      }
    ])
  }
}
