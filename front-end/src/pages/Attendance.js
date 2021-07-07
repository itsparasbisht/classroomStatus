import React, {useState, useEffect} from 'react'
import Topbar from '../components/Topbar'
import TextField from '@material-ui/core/TextField';
import './attendance.css'
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

function Attendance() {
    const [subject, setSubject] = useState("")
    const [students, setStudents] = useState([])
    const [present, setPresent] = useState([])

    const history = useHistory()
    const location = useLocation()
    const classId = location.pathname.split('/')[3]

    const formatDate = () => {
        const date = new Date()
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const num = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()
        const formatted = num +"-"+month+"-"+year
        return formatted
        
    }

    useEffect(() => {
        axios.get(`/all-students/${classId}`)
        .then(result =>{
            setStudents(result.data)
        })
        .catch(() => {
            history.replace('/error')
        })
    }, [])

    const handleChange = (e) => {
        if(present.includes(e.target.value)){
            const filterArray = present.filter(name => name !== e.target.value)
            setPresent(filterArray)
        }
        else{
            setPresent(present => [...present, e.target.value])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(subject){
            const date = formatDate()
            if(window.confirm("sure to submit")){
                axios.post('/attendance', {
                    classId,
                    students: present,
                    subject: subject.toUpperCase(),
                    date
                })
                .then(() => history.replace('/'))
                .catch(() => history.replace('/error'))
                
            }
        }
        else{
            window.alert('provide subject name')
        }
    }

    return (
        <div className="attendance">
            <Topbar />

            <form autoComplete="off">
                <TextField
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    id="outlined-basic"
                    label="subject name"
                    variant="outlined"
                    size="small"
                />
                
            </form>

            <div className="attendance__list">
                { 
                    students?.map(record => {
                        const rollNo = record.rollNo+''
                        const rollSplit = rollNo.split('')
                        const roll = rollSplit.slice(-2).join('')
                        return (
                            <div>
                                <p>{record.name} <small><b style={{color: "#ff003c"}}>({roll})</b></small></p>
                                <Checkbox
                                    color="primary"
                                    onChange={handleChange}
                                    value={record.name +" ("+roll+")"}
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </div>
                        )
                    })
                }
            </div>

            <Button
                style={{color: "white", backgroundColor: '#ff003c', border: "none", display: "block", margin: 20+"px auto"}}
                type="submit"
                variant="outlined"
                color="primary"
                onClick={handleSubmit}
            >
                submit
            </Button>
        </div>
    )
}

export default Attendance
