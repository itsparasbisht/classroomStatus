const router = require('express').Router()
const Students = require('../models/students')

router.post('/', (req, res) => {
    const newStudent = new Students(req.body)
    newStudent.save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json(err))
})

module.exports = router