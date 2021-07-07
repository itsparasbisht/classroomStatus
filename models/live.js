const mongoose = require('mongoose')

const liveSchema = new mongoose.Schema({
    classId: {
        type: String
    },
    className: {
        type: String
    },
    subject: {
        type: String
    },
    topic: {
        type: String
    },
    teacher: {
        type: String
    },
    endTime:{
        type: Date
    }
}, {timestamps: true})

const live = mongoose.model('LiveClass', liveSchema)
module.exports = live