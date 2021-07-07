const router = require('express').Router()
const Classes = require('../models/classes')

router.post('/', (req, res) => {
    const newClass = new Classes(req.body)
    newClass.save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json(err))
})

router.get('/', (req, res) => {
    Classes.find().sort({name: 1})
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err.message))
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Classes.findOne({ _id: id})
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err.message))
})

module.exports = router