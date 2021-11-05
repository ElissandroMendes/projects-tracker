'use strict'

const UsersController = require('../controllers/UsersController')

module.exports = {
  name: 'users',
  version: '1.0.0',
  register: async (server, prefix) => {
    server.route([
      {
        method: 'GET',
        path: '/users',
        handler: UsersController.findUsers,
        options: {
          auth: 'oauth-jwt',
          description: 'List all users',
          tags: ['api']
        }
      },
      {
        method: 'POST',
        path: '/users',
        handler: UsersController.createUser,
        options: {
          auth: 'oauth-jwt',
          description: 'Create a user',
          tags: ['api']
        }
      },
      {
        method: 'GET',
        path: '/users/{id}',
        handler: UsersController.getUser,
        options: {
          auth: 'oauth-jwt',
          description: 'Get a user by its {id}',
          tags: ['api']
        }
      },
      {
        method: 'PUT',
        path: '/users/{id}',
        handler: UsersController.updateUser,
        options: {
          auth: 'oauth-jwt',
          description: 'Update a user by its {id}',
          tags: ['api']
        }
      }
    ])
  }
}
