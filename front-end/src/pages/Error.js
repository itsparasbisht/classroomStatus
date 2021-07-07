import React from 'react'
import { Link } from 'react-router-dom'
import './error.css'
import Button from '@material-ui/core/Button';

function Error() {
    return (
        <div className="errorPage">
            <img src="/illustration/illustration_7.svg" alt="error loading page" />
            <h2>
                check your <b>INTERNET CONNECTION</b>, or the server might be down at the moment
            </h2>
            <Link to='/'>
                <Button
                    style={{color: "#ff003c", border: "1px solid #ff003c", fontWeight: "400"}}
                    type="submit"
                    variant="outlined"
                    color="primary"
                    size="small"
                >
                    Home Page
                </Button>
            </Link>
        </div>
    )
}

export default Error
