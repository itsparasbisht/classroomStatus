import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Topbar from '../components/Topbar'
import {Link, useHistory} from 'react-router-dom'

function Live() {
    const [classes, setClasses] = useState([])
    const history = useHistory()

    useEffect(() => {
        axios.get('/classes')
        .then(res => {
            setClasses(res.data)
        })
        .catch(() => history.replace('/error'))
    }, [])

    return (
        <div className="allStudents">
            <Topbar />

            <div className="update__classes">
                {   
                    classes.length > 0 ?
                    classes?.map(item => (
                        <Link to={`/live/${item._id}`}>
                            <div className="update__classes-box">
                                <h2>{item.name}</h2>
                            </div>
                        </Link>
                    )) :
                    <h2>...</h2>
                }
            </div>
        </div>
    )
}

export default Live
