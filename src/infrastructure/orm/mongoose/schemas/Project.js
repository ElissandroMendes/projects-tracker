const mongoose = require('../mongoose')

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    users: [String]
})

module.exports = mongoose.model('Project', projectSchema)
