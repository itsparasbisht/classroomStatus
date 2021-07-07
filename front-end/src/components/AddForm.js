import React, {useState, useEffect} from 'react'
import Topbar from './Topbar'
import './addForm.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios'

function AddForm() {
    const [rollNo, setRollNo] = useState(null)
    const [name, setName] = useState("")
    const [phoneNo, setPhoneNo] = useState(null)
    const [email, setEmail] = useState("")
    const [className, setClassName] = useState("")

    const history = useHistory()

    const location = useLocation()
    const classId = location.pathname.split('/')[3]

    useEffect(() => {
        axios.get(`/classes/${classId}`).
        then(res => setClassName(res.data.name))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        if(rollNo && name && phoneNo && email && className){
            axios.post('/classes/add', {
                classId,
                className,
                rollNo,
                name: name.toUpperCase(),
                phoneNo,
                email: email.toLowerCase()
            })
            .then(res => history.replace(`/admin/update/${classId}`))
            .catch(err => window.alert('roll no. already added'))
        }
        else{
            window.alert("fill out all fields")
        }
    }

    return (
        <div className="add">
            <Topbar />
            
            <form className="add__form" autoComplete="off">
                <h3>
                    <span>Add Record</span>
                    <small>provide valid field values</small>
                </h3>
                
                <TextField
                    value={rollNo}
                    onChange={e => setRollNo(e.target.value)}
                    autoFocus
                    id="outlined-basic"
                    label="Roll No"
                    variant="outlined"
                    size="small"
                />
                <TextField
                    value={name}
                    onChange={e => setName(e.target.value)}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    size="small"
                />
                <TextField
                    value={phoneNo}
                    onChange={e => setPhoneNo(e.target.value)}
                    id="outlined-basic"
                    label="Phone No"
                    variant="outlined"
                    size="small"
                />
                <TextField
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    size="small" />
                
                <Button
                    style={{color: "white", backgroundColor: '#ff003c', border: "none"}}
                    type="submit"
                    variant="outlined"
                    color="primary"
                    onClick={handleSubmit}
                >
                    submit
                </Button>
            </form>
        </div>
    )
}

export default AddForm
