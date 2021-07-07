const router = require('express').Router()
const Students = require('../models/students')

router.get('/:id', (req, res) => {
    const id = req.params.id
    Students.find({ classId: id}).sort({name: 1})
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err.message))
})

module.exports = router