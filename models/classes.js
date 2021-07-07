const mongoose = require('mongoose')

const classesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

const classes = mongoose.model('Classes', classesSchema)
module.exports = classes