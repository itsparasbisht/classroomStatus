import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Topbar from '../components/Topbar'
import './lists.css'
import Button from '@material-ui/core/Button';

function Lists() {
    const [lists, setLists] = useState([])

    const history = useHistory()
    const location = useLocation()
    const classId = location.pathname.split('/')[2]
    const date = location.pathname.split('/')[3]

    useEffect(() => {
        axios.get(`/attendance/${classId}/${date}`)
        .then(res => setLists(res.data))
        .catch(err => history.replace('/error'))
    }, [])

    const handleClick = () => {
        window.print()
    }

    return (
        <div className="lists">
            <Topbar />
            { 
                lists.length > 0 ? 

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
            <div className="lists__display" id="lists__display">
                <h1>{date}</h1>

                <div className="lists__item">
                    {
                        lists?.map(list => (
                            <div className="lists__item-column">
                                <h2>{list.subject}</h2>
                                <ul>
                                    {list.students.map(person => (
                                        <li>{person}</li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Lists
