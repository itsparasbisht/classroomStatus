import React, {useEffect, useState} from 'react'
import Topbar from '../components/Topbar'
import axios from 'axios'
import './update.css'
import {Link, useHistory} from 'react-router-dom'

function Update() {
    const [classes, setClasses] = useState([])
    const history = useHistory()

    useEffect(() => {
        axios.get('/classes')
        .then(result => {
            setClasses(result.data)
        })
        .catch(() => history.replace('/error'))
    }, [])

    const handleDelete = (e) => {
        const btn = document.getElementById('delete__img')
        const classId = btn.dataset.id

        if(window.confirm("Note: all data related to this class will be removed")){
            axios.delete(`/delete/${classId}`)
            .then(() => {
                history.replace('/')
                window.alert('Record has been Deleted')
            })
            .catch(() => history.replace('/error'))
        }
    }

    return (
        <div className="update">
            <Topbar />
            <div className="update__classes">
                {   classes.length > 0 ?
                    classes?.map(item => (
                        <div className="update__classes-box">
                            <Link to={`/admin/update/${item._id}`}>
                                <h2>{item.name}</h2>
                            </Link>
                            <img id="delete__img" data-id={item._id} onClick={handleDelete} className="update__classes-delete" src="/icons/trash-can.png" alt="delete the classs" title="delete this class" />
                        </div>
                    )) :
                    <h2>...</h2>
                }
            </div>
        </div>
    )
}

export default Update
