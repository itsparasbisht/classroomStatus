const router = require('express').Router()
const Attendance = require('../models/attendance')
const Classes = require('../models/classes')
const Live = require('../models/live')
const Students = require('../models/students')

const mongoose = require('mongoose')

router.delete('/:classId', (req, res) => {
    classId = req.params.classId
    const id = mongoose.Types.ObjectId(classId);

    Attendance.deleteMany({classId})
    .then(() => Live.deleteMany({classId})
    .then(() => Students.deleteMany({classId})
    .then(() => Classes.deleteMany({_id: classId})
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err))
    )))
    

})

module.exports = router