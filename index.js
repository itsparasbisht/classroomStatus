const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

require('dotenv').config()
const PORT = process.env.PORT || 5500
const MONGO_URL = process.env.MONGO_URL
const ADMIN_CODE = process.env.ADMIN_CODE

const app = express()

app.use(express.json())

const classesRoute = require('./routes/classesRoute')
const studentsRoute = require('./routes/studentsRoute')
const recordsRoute = require('./routes/recordsRoute')
const updateRoute = require('./routes/updateRoute')
const liveRoute = require('./routes/liveRoute')
const attendanceRoute = require('./routes/attendanceRoute')
const deleteRoute = require('./routes/deleteRoute')

// database connection
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
})
.then(res => console.log(`connected to database`))
.catch(err => console.log(err.message))

// routes
// app.use('/api/classes', classesRoute)
// app.use('/api/classes/add', studentsRoute)
// app.use('/api/all-students', recordsRoute)
// app.use('/api/update-record', updateRoute)
// app.use('/api/live-classes', liveRoute)
// app.use('/api/attendance', attendanceRoute)
// app.use('/api/delete', deleteRoute)

app.use('/classes', classesRoute)
app.use('/classes/add', studentsRoute)
app.use('/all-students', recordsRoute)
app.use('/update-record', updateRoute)
app.use('/live-classes', liveRoute)
app.use('/attendance', attendanceRoute)
app.use('/delete', deleteRoute)

app.post('/api/admin-verify', (req, res) => {
    if(req.body.code === ADMIN_CODE){
        res.status(200).send('ok')
    }
    else{
        res.status(200).send('err')
    }
})


if(process.env.NODE_ENV === 'production'){
    app.use(express.static("front-end/build"))
}


// listening to port
app.listen(PORT, () => {
    console.log("listening at port:",PORT)
})