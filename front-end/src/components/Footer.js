import './footer.css'

function Footer() {
    return (
        <div className="footer">
            <div className="footer__details">
                <label>Email:
                <a id="email" href="mailto:department.cs@gmail.com">registrar@kunainital.ac.in</a></label>
                <label>Call:
                <a id="call" href="tel:05962232809">05962 232 809</a></label>
            </div>
        </div>
    )
}

export default Footer
