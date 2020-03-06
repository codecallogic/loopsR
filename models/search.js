const mongoose = require('mongoose')
const Schema = mongoose.Schema

const searchSchema = new Schema({
    query: String,
    id: String,
},{
    timestamps: true
})

module.exports = mongoose.model('Search', searchSchema)