import React from 'react'
import Topbar from './Topbar'
import Set from './Set'
import {Link, useLocation} from 'react-router-dom'

function Alters() {
    const loc = useLocation()

    return (
        <div className="alters">
            <Topbar />
            <div className="alters__item">
                <Link to={`${loc.pathname}/add`}>
                    <Set img={"/update/illus_1.svg"} title={"add student"} />
                </Link>
                
                <Link to={`${loc.pathname}/update`}>
                    <Set img={"/update/illus_2.svg"} title={"update student"} />
                </Link>
                
                <Link to={`${loc.pathname}/remove`}>
                    <Set img={"/update/illus_3.svg"} title={"remove student"} />
                </Link>

                <Link to={`${loc.pathname}/attendance`}>
                    <Set img={"/update/illus_4.svg"} title={"take attendance"} />
                </Link>
            </div>
        </div>
    )
}

export default Alters
