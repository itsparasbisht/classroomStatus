import './topbar.css'
import {Link} from 'react-router-dom'

function Topbar() {
    return (
        <div className="topbar">
            <div className="topbar__head">
                <Link to="/">
                    <img src="/logo/logo_one.jpg" alt="classroom status logo" />
                </Link>
            </div>

            <h1>Department of Computer Applications</h1>
        </div>
    )
}

export default Topbar
