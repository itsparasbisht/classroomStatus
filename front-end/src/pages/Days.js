import React, {useState, useEffect} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Topbar from '../components/Topbar'
import axios from 'axios'
import './days.css'

function Days() {
    const [days, setDays] = useState([])
    const history = useHistory()
    const location = useLocation()
    console.log(location)
    const path = location.pathname
    console.log(path)
    const classId = location.pathname.split('/')[2]

    useEffect(() => {
        axios.get(`/attendance/${classId}`)
        .then(res => {
            setDays(res.data)
        })
        .catch(err => history.replace('/'))
    }, [])

    return (
        <div className="days">
            <Topbar />

            <div className="days__ctr">
                {
                    days.length > 0 ?
                    days?.map(date => (
                        <Link to={`${path}/${date}`}>
                            <div className="days__ctr-item">{date}</div>
                        </Link>
                    )) :
                    <h1>nothing in history list :(</h1>
                }
            </div>
        </div>
    )
}

export default Days
