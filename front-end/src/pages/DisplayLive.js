import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import Topbar from '../components/Topbar'
import './displayLive.css'

function DisplayLive() {
    const [classes, setClasses] = useState([])
    const history = useHistory()

    useEffect(() => {
        axios.get('/live-classes/all')
        .then(res => setClasses(res.data))
        .catch(() => history.replace('/error'))
    }, [])

    return (
        <div className="displayLive">
            <Topbar />
            <div className="displayLive__box">
                {   classes.length > 0 ?
                    classes.map(item => (
                        <div className="displayLive__box-item">
                            <h1>{item.className}</h1>
                            <h2><small>Subject</small> <br />{item.subject}</h2>
                            <h2 className="displayLive__box-itemTopic"><small>Topic</small> <br />{item.topic}</h2>
                            <h2><small>Teacher</small> <br />{item.teacher}</h2>
                        </div>
                    )) : 
                    <h1>no active classes.</h1>
                }
            </div>
        </div>
    )
}

export default DisplayLive
