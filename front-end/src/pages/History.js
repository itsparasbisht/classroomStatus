import React, {useState, useEffect} from 'react'
import Topbar from '../components/Topbar'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

function History() {
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
        <div>
            <Topbar />

            <div className="update__classes">
                {   classes.length > 0 ?
                    classes?.map(item => (
                        <Link to={`/history/${item._id}`}>
                            <div className="update__classes-box">
                                <h2>{item.name}</h2>
                            </div>
                        </Link>
                    )) :
                    <h2>no record present.</h2>
                }
            </div>
        </div>
    )
}

export default History
