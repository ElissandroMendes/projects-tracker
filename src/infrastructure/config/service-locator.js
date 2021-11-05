'use strict'

const constants = require('./constants')
const environment = require('./environment')
const JwtAccessTokenManager = require('../security/JwtAccessTokenManager')
const UserSerializer = require('../../interfaces/serializers/UserSerializer')
const ProjectSerializer = require('../../interfaces/serializers/ProjectSerializer')
const TimeSerializer = require('../../interfaces/serializers/TimeSerializer')

function buildBeans() {
  const beans = {
    accessTokenManager: new JwtAccessTokenManager(),
    userSerializer: new UserSerializer(),
    projectSerializer: new ProjectSerializer(),
    timeSerializer: new TimeSerializer()
  }

  if (environment.database.dialect === constants.SUPPORTED_DATABASE.IN_MEMORY) {
    const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory')
    beans.userRepository = new UserRepositoryInMemory()

  } else if (environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO) {
    const UserRepositoryMongo = require('../repositories/UserRepositoryMongo')
    const ProjectRepositoryMongo = require('../repositories/ProjectRepositoryMongo')
    const TimeRepositoryMongo = require('../repositories/TimeRepositoryMongo')

    beans.userRepository = new UserRepositoryMongo()
    beans.projectRepository = new ProjectRepositoryMongo()
    beans.timeRepository = new TimeRepositoryMongo()

  } else if (environment.database.dialect === constants.SUPPORTED_DATABASE.POSTGRES) {
    throw new Error('Add PostgreSQL support')

  } else {
    const UserRepositorySQLite = require('../repositories/UserRepositorySQLite')
    beans.userRepository = new UserRepositorySQLite()

  }

  return beans
}

module.exports = buildBeans()
