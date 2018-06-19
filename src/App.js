import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import { hot } from 'react-hot-loader';

import Contact from './Contact';
import Home from './Home';
import Counter from './Counter';

import './App.scss';
import './main.scss';
import './test.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Maison</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/counter">Counter</Link></li>
          </ul>
          <hr />

          <Route exact path="/" component={Home} />
          <Route path="/contact" component={Contact} />
          <Route path="/counter" component={Counter} />
        </div>
      </Router>
    );
  }
}

export default hot(module)(App);
