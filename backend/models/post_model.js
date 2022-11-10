const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    message:{
        type: String,
        required: true
    },
    sender:{
        type: String,
        required: true
    },
    _id:{
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Post', postSchema)