import React, {useState} from 'react'
import Topbar from '../components/Topbar'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import './remove.css'
import { useHistory, useLocation } from 'react-router-dom';

function Remove() {
    const history = useHistory()
    const location = useLocation()
    const classId = location.pathname.split('/')[3]

    const [rollNo, setRollNo] = useState()
    const [name, setName] = useState("")
    const [display, setDisplay] = useState(true)

    const handleClick = (e) => {
        e.preventDefault()
        if(rollNo){
            axios.get(`/update-record/${rollNo}`)
            .then(res => {
                console.log(res)
                setName(res.data.name)
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
        axios.delete(`/update-record/${rollNo}`)
        .then(() => {
            window.alert("RECORD DELETED")
            history.replace(`/admin/update/${classId}`)
        })
        .catch(err => {
            window.alert("something went wrong!")
            history.replace(`/admin/update/${classId}`)
        })
    }

    return (
        <div className="remove">
            <Topbar />

            {
                display ?
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

            {
                display ? null :
                <div className='remove__details'>
                    <h2>Are you sure to remove <b>{name}</b>({rollNo}) from record</h2>
                    <Button
                        style={{color: "white", backgroundColor: '#ff003c', border: "none"}}
                        type="submit"
                        variant="outlined"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        remove
                    </Button>
                </div>
            }
        </div>
    )
}

export default Remove
