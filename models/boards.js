const mongoose = require('mongoose')
const Schema = mongoose.Schema

const boardSchema = new Schema({
    title: String,
    tags: [],
    image: String,
    content: String,
    googleId: String,
}, {
    timestamps: true,
})

module.exports = mongoose.model('Boards', boardSchema)