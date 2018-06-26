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

const PrivateRoute = ({ authed, Component, ...rest }) => (Component) 
  // <Route {...rest} render={(props) =>
  //     authed
  //         ? <Component {...props}/>
  //         : <Login {...props} />
  // } />)
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
              <PrivateRoute authed={true} path="/dashboard" component={Dashboard}/>
              <PrivateRoute authed={true} path="/interestedByYou" component={InterestedByYou}/>
              <PrivateRoute authed={true} path="/Register" component={Register}/>
              <PrivateRoute authed={true} path="/UserProfile" component={UserProfile}/>
              <PrivateRoute authed={true} path="/VisiteOnYourProfile" component={VisiteOnYourProfile}/>
              <PrivateRoute authed={true} path="/StandBy" component={StandBy}/>
              <PrivateRoute authed={true} path="/CreateOffer" component={CreateOffer}/>
              <PrivateRoute authed={true} path="/login" component={Login}/>
              <PrivateRoute authed={true} exact path="/" component={Dashboard}/>
           </Switch>
        </div>
        <FootBar/>
    </div>
    );
  }
}



export default hot(module)(App);
