const router = require('express').Router()
const Live = require('../models/live')

router.post('/', (req, res) => {
    const newLive = new Live(req.body)
    newLive.save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json(err))
})

router.get('/all', (req, res) => {
    Live.find({
        endTime: { $gt: new Date()},
    }).sort({updatedAt: -1})
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json(err))
})

module.exports = router