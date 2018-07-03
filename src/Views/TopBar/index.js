import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';

import {userLogStatus} from '../../App';



class TopBar extends Component {
  constructor(){
    super();
  }
  disconnectUser(){
    userLogStatus.isLogOut();
  }
  render() {
    return (
    <div className="topBar"> 
        <div className="wrapperTopBar">
            <a className="title">
              StartJob
              <img className="ynovIcon" src="/src/images/ynov-informatique.png"/>
            </a>
            <div className="topListButton">
                <div className="wrapperTopListButton">
                  <Link to="/userProfile"><button><img src="/src/images/user.png"/></button></Link>
                  <button onClick={this.disconnectUser.bind(this)}><img src="/src/images/logout.png"/></button>                    
                </div>
            </div>
        </div>
    </div>
    );
  }
}
export default TopBar;