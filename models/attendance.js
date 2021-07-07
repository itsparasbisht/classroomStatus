const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
    classId: String,
    students: [],
    subject: String,
    date: String
})

const attendance = mongoose.model('attendance', attendanceSchema)
module.exports = attendance