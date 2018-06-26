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
                <Route path="/dashboard" component={Dashboard} render={ ()=>( localStorage.getItem("currentUser") == true ? (<Redirect to="/dashboard"/>) : (<Redirect to="/"/>) )}/>
                <Route exact={true} path="/" component={Login} />
                <Route path="/register" component={Register}/>
                <Route path="/userProfile" component={UserProfile} />
                <Route path="/visiteOnYourProfile" component={VisiteOnYourProfile} />
                <Route path ="/standBy" component={StandBy} />
                <Route path="/interestedByYou" component={InterestedByYou} />
                <Route path="/createOffer" component={CreateOffer}/>
          </Switch>
        </div>
        <FootBar/>
    </div>
    );
  }
}



export default hot(module)(App);
