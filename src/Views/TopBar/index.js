import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import { subscribeToTimer} from '../../socketClient/test';



class TopBar extends Component {
  constructor(){
    super();
    this.state = {
      timestamp: 'no timestamp yet'
    };
    subscribeToTimer((err, timestamp) => this.setState({ 
      timestamp 
    }));
    

  }
  render() {
    return (
    <div className="topBar"> 
        <div className="wrapperTopBar">
            <a className="title">StartJob
            <img className="ynovIcon" src="/src/images/ynov-informatique.png"/></a>
            <a className="timer">{this.state.timestamp}</a>
            <div className="topListButton">
                <div className="wrapperTopListButton">
                        <button><img src="/src/images/user.png"/></button>
                        <button><Link to="/userProfile"></Link><img src="/src/images/logout.png"/></button>                    
                </div>
            </div>
        </div>
    </div>
    );
  }
}
export default TopBar;