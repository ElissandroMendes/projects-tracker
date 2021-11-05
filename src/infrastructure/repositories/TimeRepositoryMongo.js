'use strict'

const { Time, TimeRepository } = require('../../domain/times')
const MongooseTime = require('../orm/mongoose/schemas/Time')
module.exports = class extends TimeRepository {
  _getTimeAttributes(mongooseTime) {
    const { id, user_id, project_id, started_at, ended_at } = mongooseTime || {}
    return { id, user_id, project_id, started_at, ended_at }
  }

  async persist(userEntity) {
    const { user_id, project_id, started_at, ended_at } = userEntity
    const mongooseTime = new MongooseTime({ user_id, project_id, started_at, ended_at })
    await mongooseTime.save()
    return new Time(mongooseTime.id, mongooseTime.user_id, mongooseTime.project_id, mongooseTime.started_at, mongooseTime.ended_at)
  }

  async merge(id, user_id, project_id, started_at, ended_at) {
    const mongooseTime = await MongooseTime.findByIdAndUpdate(id, { user_id, project_id, started_at, ended_at }, { new: true })
    return new Time(mongooseTime.id, mongooseTime.user_id, mongooseTime.project_id, mongooseTime.started_at, mongooseTime.ended_at)
  }

  async remove(id) {
    return MongooseTime.findOneAndDelete(id)
  }

  async get(id) {
    const mongooseTime = await MongooseTime.findById(id)
    const attributes = this._getTimeAttributes(mongooseTime)
    return new Time(attributes.id, attributes.user_id, attributes.project_id, attributes.started_at, attributes.ended_at)
  }

  async getByProjectId(project_id) {
    const mongooseTimes = await MongooseTime.find({ project_id })
    const result = { "time": [] }
    result.time = mongooseTimes.map((time) => {
      const attributes = this._getTimeAttributes(time)
      return new Time(attributes.id, attributes.user_id, attributes.project_id, attributes.started_at, attributes.ended_at)
    })
    return result
  }

  async find() {
    const mongooseTimes = await MongooseTime.find()
    return mongooseTimes.map((mongooseTime) => {
      return new Time(mongooseTime.id, mongooseTime.user_id, mongooseTime.project_id, mongooseTime.started_at, mongooseTime.ended_at)
    })
  }
}
