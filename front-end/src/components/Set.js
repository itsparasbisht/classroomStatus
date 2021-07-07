import './set.css'

function Set({img, title}) {
    return (
        <div className="set">
            <img src={img} alt="" />
            <h3>{title}</h3>
        </div>
    )
}

export default Set
