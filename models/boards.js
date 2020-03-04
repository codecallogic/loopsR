const mongoose = require('mongoose')
const Schema = mongoose.Schema

const boardSchema = new Schema({
    title: String,
    tags: [],
    content: String,
}, {
    timestamps: true,
})

module.exports = mongoose.model('Boards', boardSchema)