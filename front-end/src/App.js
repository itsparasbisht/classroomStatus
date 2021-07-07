import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './app.css';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Update from './pages/Update';
import { useStateValue } from './state/StateProvider';
import Alters from './components/Alters';
import AddForm from './components/AddForm';
import AllStudents from './pages/AllStudents';
import Records from './pages/Records';
import UpdateStudent from './pages/UpdateStudent';
import Remove from './pages/Remove';
import Error from './pages/Error';
import Live from './pages/Live';
import AddLive from './pages/AddLive';
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import DisplayLive from './pages/DisplayLive';
import Attendance from './pages/Attendance';
import History from './pages/History';
import Days from './pages/Days';
import Lists from './pages/Lists';

function App() {
  const [{isAdmin}, dispatch] = useStateValue()
  const [liveClasses, setLiveClasses] = useState([])

  useEffect(() => {
    const allClasses = async () => {
      try{
        const response = await axios.get('/live-classes/all')
        setLiveClasses(response.data)
      }
      catch(err){
        console.log(err.message)
      }
    }

    allClasses()
  }, [])

  useEffect(() => {
    if(liveClasses.length > 0){
      const any = liveClasses.some(item => {
        const endT = new Date(item.endTime)
        return  endT > new Date()
      })
      console.log(any)
      if(any){
        dispatch({type: 'addLive'})
      }
    }
  }, [liveClasses])

  return (
    <div className="app">
      <Router>
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/error">
            <Error />
          </Route>

          <Route exact path="/admin">
            {
              isAdmin ? <Admin /> : <Home />
            }
          </Route>

          <Route exact path="/admin/update">
            {
              isAdmin ? <Update /> : <Home />
            }
          </Route>

          <Route exact path="/history">
            <History />
          </Route>

          <Route exact path="/admin/update/:classId">
            {
              isAdmin ? <Alters /> : <Home />
            }
          </Route>

          <Route exact path='/admin/update/:classId/add'>
            <AddForm />
          </Route>

          <Route exact path='/admin/update/:classId/update'>
            <UpdateStudent />
          </Route>

          <Route exact path='/admin/update/:classId/remove'>
            <Remove />
          </Route>

          <Route exact path='/admin/update/:classId/attendance'>
            <Attendance />
          </Route>

          <Route exact path='/all-students'>
            <AllStudents />
          </Route>

          <Route exact path='/all-students/:classId'>
            <Records />
          </Route>

          <Route exact path='/admin/live'>
            <Live />
          </Route>

          <Route exact path='/live/:classId'>
            <AddLive />
          </Route>

          <Route exact path='/display-live'>
            <DisplayLive />
          </Route>

          <Route exact path="/history/:classId">
            <Days />
          </Route>

          <Route exact path="/history/:classId/:date">
            <Lists />
          </Route>

          <Route path="">
            <Error />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
