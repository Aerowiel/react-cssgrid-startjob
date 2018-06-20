import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link,
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

console.log(Dashboard)
class App extends Component {
  render() {
    return (
      <div className="wrapper">
          <TopBar/>
          <Menu/>
          <div className="mainView">
            <Switch>
                  <Route path="/" component={Dashboard} />
                  <Route path="/userProfile" component={UserProfile} />
                  <Route path="/visiteOnYourProfile" component={VisiteOnYourProfile} />
                  <Route path ="/stanBy" component={StandBy} />
                  <Route path="/interestedByYou" component={InterestedByYou} />
            </Switch>
          </div>
          <FootBar/>
      </div>
    );
  }
}

export default hot(module)(App);
