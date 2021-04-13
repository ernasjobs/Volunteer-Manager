import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import  Home  from './components/Home';
import   AccessForbidden  from './components/AccessForbidden';
import Users from './components/User/Users/Users';
import Login from './components/User/Login/Login';
import SignUp from './components/User/SignUp/SignUp';
import Logout from './components/User/Logout';
import ResetPasword from './components/User/ResetPassword/ResetPassword';
import VerifyUser from './components/User/VerifyUser/VerifyUser';
import ActivateAccount from './components/User/Activate/ActivateAccount';
import Delete from './components/User/Delete/Delete';
import DeleteEvent from './components/Event/Delete/DeleteEvent';
import Update from './components/User/Update/Update';
import Events from './components/Event/Events/Events';
import CreateEvent from './components/Event/Create/CreateEvent';
import UpdateEvent from './components/Event/Update/UpdateEvent';
import ViewEvent from './components/Event/View/ViewEvent';
import VolunteerEvents from './components/VolunteerEvent/Events/VolunteerEvents';
import CreateVolunteerEvent from './components/VolunteerEvent/Create/CreateVolunteerEvent';
import DeleteVolunteerEvent from './components/VolunteerEvent/Delete/DeleteVolunteerEvent';
import ViewEventDetails from './components/VolunteerEvent/View/ViewEventDetails';
import DisableUser from './components/User/Disable/DisableUser';
import CompleteUser from './components/User/Complete/CompleteUserInfo';
import CompleteEvent from './components/VolunteerEvent/Complete/CompleteEvent';
import CancelEvent from './components/VolunteerEvent/Cancel/CancelEvent';
import CreateVolunteerCertification from './components/VolunteerCertification/Create/CreateVolunteerCertification';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;
  constructor(props){
    super(props);
    this.state = {
      loggedInStatus: localStorage.getItem("user"),
      id: localStorage.getItem("id"),
      user:{}
    }
    this.updateLoggedInStatus = this.updateLoggedInStatus.bind(this);
    this.updateLoggedOutStatus = this.updateLoggedOutStatus.bind(this);
    this.updateLoggedInId = this.updateLoggedInId.bind(this);
    this.updateLoggedOutId = this.updateLoggedOutId.bind(this);
  } 
 
  updateLoggedInStatus= result => {
    this.setState({loggedInStatus : result});
  }
  updateLoggedOutStatus= result => {
    this.setState({loggedInStatus : result});
  }
  updateLoggedInId= result => {
    this.setState({id : result});
  }
  updateLoggedOutId = result => {
    this.setState({id : result});
  }
  render () {
    return (
      <Layout  loggedInStatus = {this.state.loggedInStatus}>
        <Route exact path={'/'} 
        render = {props => (
          <Home {...props}  loggedInStatus = {this.state.loggedInStatus} />
        )}
        />
        <Route path={'/volunteers'} 
        render = {props => (
          <Users {...props}  loggedInStatus = {this.state.loggedInStatus} />
        )}
        />
        <Route path={'/login'} 
        render = {(props) => (
          <Login {...props} updateLoggedInStatus= {this.updateLoggedInStatus} loggedInStatus = {this.state.loggedInStatus} updateLoggedInId = {this.updateLoggedInId} id = {this.state.id} />
        )}
        />
        <Route path={'/logout'} 
        render = {(props) => (
          <Logout {...props} updateLoggedOutStatus= {this.updateLoggedOutStatus}   loggedInStatus = {this.state.loggedInStatus} updateLoggedOutId = {this.updateLoggedOutId} id = {this.state.id} />
        )}
        />
         <Route path='/access-forbidden' component={AccessForbidden} />
        <Route path='/register' component={SignUp} />
        <Route path='/verifyuser' component={VerifyUser} />
        <Route path='/activate-account/:token' component={ActivateAccount} />
        <Route path='/resetpassword/:id' component={ResetPasword} />
        <Route path='/updateuser/:id' component={Update} />
        <Route path='/complete-user-info/:id' component={CompleteUser} />
        <Route path='/lockuser/:id' component={DisableUser} />
        <Route path='/update-event/:id' component={UpdateEvent} />
        <Route path='/deleteuser/:id' component={Delete} />
        <Route path='/view-event/:id' component={ViewEvent} />
        <Route path='/cancel-event/:id' component={CancelEvent} />
        <Route path='/complete-event/:id' component={CompleteEvent} />
        <Route path='/view-event-details/:id' component={ViewEventDetails} />
        <Route path='/join-event/:id' component={CreateVolunteerEvent} />
        <Route path= '/attach-certification/:id' component= {CreateVolunteerCertification} />
        <Route path='/leave-event/:id' component={DeleteVolunteerEvent} />
        <Route path='/delete-event/:id' component={DeleteEvent} />
        <Route path={'/events'} 
        render = {props => (
          <Events {...props}  loggedInStatus = {this.state.loggedInStatus} />
        )}
        />
        <Route path={'/display-events'} 
        render = {props => (
          <VolunteerEvents {...props}  loggedInStatus = {this.state.loggedInStatus} />
        )}
        />
        <Route path='/create-event' component={CreateEvent} />
      </Layout>
    );
  }
}
