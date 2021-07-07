import React, {useState, useEffect} from 'react'
import Topbar from '../components/Topbar'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './addLive.css'
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));

function AddLive() {
    const history = useHistory()
    const location = useLocation()
    const classId = location.pathname.split('/')[2]

    const classes = useStyles()
    const [className, setClassName] = useState('')
    const [time, setTime] = useState('')
    const [subject, setSubject] = useState('')
    const [teacher, setTeacher] = useState('')
    const [topic, setTopic] = useState('')

    useEffect(() => {
        axios.get(`/classes/${classId}`).
        then(res => setClassName(res.data.name))
    }, [])

    const handleChange = (e) => {
        setTime(e.target.value);
    };

    const handleClick = (e) => {
        e.preventDefault()

        if(subject && topic && teacher && time){

            const endTime = new Date()
            endTime.setMinutes(endTime.getMinutes() + time)
            
            axios.post('/live-classes', {
                className,
                classId,
                subject: subject.toUpperCase(),
                topic: topic.toLowerCase(),
                teacher: teacher.toUpperCase(),
                endTime
            })
            .then(() => {
                window.alert('update added')
                history.replace('/admin')
            })
            .catch(() => history.replace('/error'))
        }
        else{
            window.alert("provide all field values")
        }
    }

    return (
        <div className="addLive">
            <Topbar />

            <form className={classes.root} noValidate autoComplete="off">

                <h2>fill in the class details</h2>

                <TextField autoFocus id="outlined-basic" size="small" label="subject name" variant="outlined" value={subject} onChange={e => setSubject(e.target.value)} />

                <TextField id="outlined-basic" size="small" label="teacher" variant="outlined" value={teacher} onChange={e => setTeacher(e.target.value)} />

                <TextField id="outlined-basic" size="small" label="today's topic" multiline="true" rows="2" variant="outlined" value={topic} onChange={e => setTopic(e.target.value)} />

                <FormControl size="small" variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">class duration</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={time}
                    onChange={handleChange}
                    label="class duration"
                    >
                    <MenuItem value={40}>40 minutes</MenuItem>
                    <MenuItem value={50}>50 minutes</MenuItem>
                    <MenuItem value={60}>60 minutes</MenuItem>
                    <MenuItem value={90}>90 minutes</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    style={{color: "white", backgroundColor: '#ff003c', border: "none"}}
                    type="submit"
                    variant="outlined"
                    color="primary"
                    onClick={handleClick}
                >
                    submit
                </Button>
                
            </form>
        </div>
    )
}

export default AddLive
