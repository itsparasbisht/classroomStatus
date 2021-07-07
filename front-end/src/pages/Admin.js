import React, {useState} from 'react'
import Topbar from '../components/Topbar'
import Set from '../components/Set'
import './admin.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      borderRadius: 10,
      boxShadow: theme.shadows[5],
      padding: '40px',
      width: 350,
      height: 150,
    },
  }));

function Admin() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [className, setClassName] = useState("")

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = (e) => {
        e.preventDefault()
        if(className.length > 0){
            const cName = className.toUpperCase()
            axios.post('/classes', {
                    name: cName
                })
                .then(() => {
                    window.alert('class added')
                    setClassName("")
                    handleClose()
                })
                .catch(err => {
                    window.alert("error, class already added")
                    handleClose()
                })
        }
        else{
            window.alert('provide class name')
        }

    }

    return (
        <div className="admin">
            <Topbar />

            <div className="admin__options">
                <button onClick={handleOpen} style={{backgroundColor: "transparent", border: "none"}}>
                    <Set img={"/illustration/illustration_4.svg"} title={"add class"} />
                </button>

                <Link to="/admin/update">
                    <Set img={"/illustration/illustration_5.svg"} title={"update class"} />
                </Link>

                <Link to="/admin/live">
                    <Set img={"/illustration/illustration_6.svg"} title={"add live class"} />
                </Link>
            </div>

            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <form className="admin__form" autoComplete="off">
                            <input
                                onChange={e => setClassName(e.target.value)}
                                type="text"
                                name="class-name"
                                placeholder="new class name"
                                autoFocus
                            />
                            <button onClick={handleAdd} >add</button>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default Admin
