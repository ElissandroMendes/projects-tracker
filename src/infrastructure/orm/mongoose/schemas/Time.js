const mongoose = require('../mongoose')

const timeSchema = new mongoose.Schema({
  user_id: String,
  project_id: String,
  started_at: Date,
  ended_at: Date
})

module.exports = mongoose.model('Time', timeSchema)
