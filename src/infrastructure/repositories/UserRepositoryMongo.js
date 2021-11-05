'use strict'
const { User, UserRepository } = require('../../domain/users')
const MongooseUser = require('../orm/mongoose/schemas/User')

const { generateHashPassword, passwordMatched } = require('../security/PasswordUtils')
module.exports = class extends UserRepository {
  _getUserAttributes(mongooseUser) {
    const { id, name, email, login, password } = mongooseUser || {}
    return { id, name, email, login, password }
  }

  async checkPassword(user, password) {
    const validPassword = user && passwordMatched(password, user.password)
    return validPassword
  }

  async persist(userEntity) {
    const { name, email, login, password } = userEntity

    const isUnique = !(await MongooseUser.findOne({ login }))
    if (!isUnique) {
      throw new Error("Login already exists.")
    }

    const hashPassword = await generateHashPassword(password)
    const mongooseUser = new MongooseUser({ name, email, login, password: hashPassword })
    await mongooseUser.save()
    return new User(mongooseUser.id, mongooseUser.name, mongooseUser.email, mongooseUser.login, mongooseUser.password)
  }

  async merge(id, name, email, login, password) {
    const mongooseUser = await MongooseUser.findByIdAndUpdate(id, { name, email, login, password }, { new: true })
    return new User(mongooseUser.id, mongooseUser.name, mongooseUser.email, mongooseUser.login, mongooseUser.password)
  }

  async remove(userId) {
    return MongooseUser.findOneAndDelete(userId)
  }

  async get(userId) {
    const mongooseUser = await MongooseUser.findById(userId)
    const attributes = this._getUserAttributes(mongooseUser)
    return new User(attributes.id, attributes.name, attributes.email, attributes.login, attributes.password)
  }

  async getByLogin(login) {
    const mongooseUser = await MongooseUser.find({ 'login': login })
    const attributes = this._getUserAttributes(mongooseUser[0])
    return new User(attributes.id, attributes.name, attributes.email, attributes.login, attributes.password)
  }

  async find() {
    const mongooseUsers = await MongooseUser.find()
    return mongooseUsers.map((mongooseUser) => {
      return new User(mongooseUser.id, mongooseUser.name, mongooseUser.email, mongooseUser.login, mongooseUser.password)
    })
  }
}
