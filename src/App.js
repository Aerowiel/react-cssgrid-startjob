import React, { Component } from 'react';
import {
  Switch,
  Route,
  Router,
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

import {history} from './history';

import localStorage from 'localStorage';
import Register from './Views/Register';


export const userLogStatus= {

  isLog(){

  },
  isLogOut(){
    sessionStorage.clear();
    history.push("/");
  }

}

const PrivateRoute = ({comp, ...rest }) =>
  sessionStorage.getItem('idStartjob') !== null
          ? <Route component={comp} {...rest}/>
          : <Redirect to="/register"/>

class App extends Component {
  constructor(){
    super();
    this.state = {
      redirectToReferrer: false
      };
  }

  render() {
    console.log('ID = ' + sessionStorage.getItem('id'))
    return (
      <Router history={history}>
        <Switch>
          <Route render={() =>(
            sessionStorage.getItem('idStartjob') !== null ?(
              <div className="wrapper">
                <TopBar/>
                <Menu/>
                <div className="mainView">
                    <PrivateRoute path="/interestedByYou" comp={InterestedByYou}/>
                    <PrivateRoute path="/userProfile" comp={UserProfile}/>
                    <PrivateRoute path="/visiteOnYourProfile" comp={VisiteOnYourProfile}/>
                    <PrivateRoute path="/standBy" comp={StandBy}/>
                    <PrivateRoute path="/createOffer" comp={CreateOffer}/>
                    <PrivateRoute exact path="/" comp={Dashboard}/>
                </div>
                <FootBar/>
              </div>
            ) :(
              <Login/>
            )
          )}/>
        </Switch>
      </Router>
    );
  }
}

export default hot(module)(App);
