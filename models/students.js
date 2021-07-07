const mongoose = require('mongoose')

const studentsSchema = new mongoose.Schema({
    classId: {
        type: String
    },
    className: {
        type: String
    },
    rollNo: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
    },
    phoneNo: {
        type: Number
    },
    email: {
        type: String
    }
})

const students = mongoose.model('Students', studentsSchema)
module.exports = students