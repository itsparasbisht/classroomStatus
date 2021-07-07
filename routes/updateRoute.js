const router = require('express').Router()
const Students = require('../models/students')

router.get('/:rollNo', (req, res) => {
    const rollNo = req.params.rollNo
    Students.findOne({ rollNo: rollNo})
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err.message))
})

router.put('/:rollNo', (req, res) => {
    const rollNo = req.params.rollNo
    Students.findOneAndUpdate({rollNo: rollNo},
        {
            name: req.body.name,
            email: req.body.email,
            phoneNo: req.body.phoneNo
        }, {new: true})
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json(err.message))
})

router.delete('/:rollNo', (req, res) => {
    const rollNo = req.params.rollNo
    Students.deleteOne({rollNo: rollNo})
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err.message))
})

module.exports = router