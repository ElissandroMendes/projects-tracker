'use strict'

const ProjectsController = require('../controllers/ProjectsController')

module.exports = {
  name: 'projects',
  version: '1.0.0',
  register: async (server) => {
    server.route([
      {
        method: 'GET',
        path: '/projects',
        handler: ProjectsController.findProjects,
        options: {
          auth: 'oauth-jwt',
          description: 'List all projects',
          tags: ['api']
        }
      },
      {
        method: 'POST',
        path: '/projects',
        handler: ProjectsController.createProject,
        options: {
          auth: 'oauth-jwt',
          description: 'Create a project',
          tags: ['api']
        }
      },
      {
        method: 'GET',
        path: '/projects/{id}',
        handler: ProjectsController.getProject,
        options: {
          auth: 'oauth-jwt',
          description: 'Get a project by its {id}',
          tags: ['api']
        }
      },
      {
        method: 'PUT',
        path: '/projects/{id}',
        handler: ProjectsController.updateProject,
        options: {
          auth: 'oauth-jwt',
          description: 'Update a project by its {id}',
          tags: ['api']
        }
      }
    ])
  }
}
