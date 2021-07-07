import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Topbar from '../components/Topbar'
import './records.css'
import axios from 'axios'
import Button from '@material-ui/core/Button';

function Records() {
    const location = useLocation()
    const classId = location.pathname.split('/')[2]

    const history = useHistory()

    const [records, setRecords] = useState([])

    useEffect(() => {
        axios.get(`/all-students/${classId}`)
        .then(result =>{
            setRecords(result.data)
        })
        .catch(() => {
            history.replace('/error')
        })
    }, [])

    const handleClick = () => {
        window.print()
    }

    return (
        <div className="records">
            <Topbar />
            { 
                records.length > 0 ? 

                <Button
                    style={{color: "white", backgroundColor: '#ff003c', border: "none"}}
                    variant="outlined"
                    color="primary"
                    onClick={handleClick}
                    size="small"
                    className="print__btn"
                >
                    Print
                </Button> : null
            }

            <div id="records__print" className="records__table">
                <table>
                    <thead>
                        <th>Roll No</th>
                        <th>Name</th>
                        <th>Phone No</th>
                        <th>Email</th>
                    </thead>
                    <tbody>
                        {
                            records.length > 0 ?
                            records.map(record => (
                            <tr>
                                <td>{record.rollNo}</td>
                                <td><b style={{textTransform: "lowercase"}}>{record.name}</b></td>
                                <td>{record.phoneNo}</td>
                                <td><b>{record.email}</b></td>
                            </tr>
                            )) :
                            <h2 style={{textAlign: "center", marginTop: "20px", fontSize: "17px"}}>no records added</h2>
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default Records
