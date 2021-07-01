const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //used to remove the white spaces on the string
        unique: 1
    },
    password: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    token: String,
    tokenExp: Number
})

module.exports = mongoose.model('User', userSchema)