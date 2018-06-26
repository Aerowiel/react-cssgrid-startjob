import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import { hot } from 'react-hot-loader';


import Menu from "./Views/Menu"

import UserProfile from "./Views/MainView/UserProfile"
import VisiteOnYourProfile from "./Views/MainView/VisiteOnYourProfile"


import './scss/App.scss';
import './scss/main.scss';
import StandBy from './Views/MainView/StandBy';
import InterestedByYou from './Views/MainView/InterestedByYou';

import Dashboard from './Views/MainView/Dashboard';
import TopBar from './Views/TopBar';
import FootBar from './Views/FootBar';
import CreateOffer from './Views/MainView/CreateOffer';
import Login from './Views/Login';

import localStorage from 'localStorage';
import Register from './Views/Register';

const PrivateRoute = ({ authed ,comp, ...rest }) => 
      authed
          ? <Route component={comp} {...rest}/>
          : <Login />
          
class App extends Component {
  constructor(){
    super();
    this.state = {
      redirectToReferrer: false
    };
  }
  
  render() {
    return (
      <div className="wrapper">
        <TopBar/>
        <Menu/>
        <div className="mainView">
          <Switch>
              <PrivateRoute authed={true} path="/dashboard" comp={Dashboard}/>
              <PrivateRoute authed={true} path="/interestedByYou" comp={InterestedByYou}/>
              <PrivateRoute authed={true} path="/Register" comp={Register}/>
              <PrivateRoute authed={true} path="/UserProfile" comp={UserProfile}/>
              <PrivateRoute authed={true} path="/VisiteOnYourProfile" comp={VisiteOnYourProfile}/>
              <PrivateRoute authed={true} path="/StandBy" comp={StandBy}/>
              <PrivateRoute authed={true} path="/CreateOffer" comp={CreateOffer}/>
              <PrivateRoute authed={true} path="/login" comp={Login}/>
              <PrivateRoute authed={true} exact path="/" comp={Dashboard}/>
           </Switch>
        </div>
        <FootBar/>
    </div>
    );
  }
}



export default hot(module)(App);
