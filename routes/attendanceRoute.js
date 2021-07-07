const router = require('express').Router()
const Attendance = require('../models/attendance')

router.post('/', (req, res) => {
    const newAttend = new Attendance(req.body)
    newAttend.save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json(err))
})

router.get('/:classId', (req, res) => {
    const classId = req.params.classId
    Attendance.find({classId}).distinct('date')
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err))
})

router.get('/:classId/:date', (req, res) => {
    const classId = req.params.classId
    const date = req.params.date
    Attendance.find({classId, date})
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err))
})

module.exports = router