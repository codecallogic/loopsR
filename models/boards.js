const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentsSchema = new Schema({
    user: String,
    username: String,
    comment: String,
}, {
    timestamps: true,
})

const boardSchema = new Schema({
    title: String,
    tags: [],
    image: String,
    content: String,
    googleId: String,
    createdby: String,
    comments: [commentsSchema]
}, {
    timestamps: true,
})

module.exports = mongoose.model('Boards', boardSchema)