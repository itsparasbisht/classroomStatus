import './sets.css'
import '../pages/admin.css'
import Set from './Set'
import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { useStateValue } from '../state/StateProvider';
import {Link} from 'react-router-dom'

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

function Sets() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState('')

    const[{isAdmin, live}, dispatch] = useStateValue()

    const history = useHistory();

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if(code.length > 0){
            axios.post('/admin-verify/', {
                code
            })
            .then(res => {
                if(res.data === 'ok'){
                    dispatch({type: 'admin'})
                    setCode('')
                    history.push('/admin')
                }
                else{
                    setCode('')
                    window.alert('invalid admin code')
                }
            })
            .catch(() => history.replace('/error'))
        }
        else{
            window.alert('enter admin code')
            setCode('')
        }
    }

    return (
        <div className="sets">
            <button onClick={handleOpen}>
                <Set img={"/illustration/illustration_1.svg"} title={"admin here"} />
            </button>

            <Link to='/all-students'>
                <Set img={"/illustration/illustration_2.svg"} title={"all students"} />
            </Link>
            
            <Link className="live__box" to='/display-live'>
                <Set img={"/illustration/illustration_3.svg"} title={"live classes"} />
                {
                    live ? <div className="live__status" title="classes available"></div> : null
                }
            </Link>

            <Link to="/history">
                    <Set img={"/illustration/illustration_8.svg"} title={"history list"} />
            </Link>

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
                                onChange={e => setCode(e.target.value)}
                                type="password"
                                name="admin-code"
                                placeholder="enter admin code..."
                                value={code}
                                autoFocus
                            />
                            <button onClick={handleSubmit} >submit</button>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default Sets
