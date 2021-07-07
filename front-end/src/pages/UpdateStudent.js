import React, {useState} from 'react'
import Topbar from '../components/Topbar'
import TextField from '@material-ui/core/TextField';
import './updateStudent.css'
import Button from '@material-ui/core/Button';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios'

function UpdateStudent() {
    const history = useHistory()
    const location = useLocation()
    const classId = location.pathname.split('/')[3]

    const [name, setName] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [email, setEmail] = useState("")
    const [rollNo, setRollNo] = useState(null)
    const [display, setDisplay] = useState(true)

    const handleClick = (e) => {
        e.preventDefault()
        if(rollNo){
            axios.get(`/update-record/${rollNo}`)
            .then(res => {
                console.log(res)
                setName(res.data.name)
                setPhoneNo(res.data.phoneNo)
                setEmail(res.data.email)
                setDisplay(false)
            })
            .catch(err => {
                window.alert("invalid Roll Number")
            })
        }
        else{
            window.alert("provide roll number")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(name && phoneNo && email){
            axios.put(`/update-record/${rollNo}`, {
                name: name.toUpperCase(),
                email: email.toLowerCase(),
                phoneNo
            })
            .then(() => {
                window.alert("RECORD UPDATED")
                history.replace(`/admin/update/${classId}`)
            })
            .catch(err => {
                window.alert("something went wrong!")
                history.replace(`/admin/update/${classId}`)
            })
        }
        else{
            window.alert("provide the field values")
        }
    }

    return (
        <div className="updateStudent">
            <Topbar />
            { display ? 
                <form className="updateStudent__form" noValidate autoComplete="off">
                    <TextField
                        id="outlined-basic"
                        label="Roll No"
                        variant="outlined"
                        size="small"
                        value={rollNo}
                        onChange={e => setRollNo(e.target.value)}
                    />
                    <Button
                        style={{color: "white", backgroundColor: '#ff003c', border: "none"}}
                        type="submit"
                        variant="outlined"
                        color="primary"
                        onClick={handleClick}
                    >
                        submit
                    </Button>
                </form> : null
            }

            { display ? null :
                <form className="add__form update__form" autoComplete="off">
                    <h3>
                        <span>Update Record</span>
                        <small>Roll No - <b style={{fontWeight: "600"}}>{rollNo}</b></small>
                    </h3>       
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
                        update
                    </Button>
                </form>
            }
        </div>
    )
}

export default UpdateStudent
