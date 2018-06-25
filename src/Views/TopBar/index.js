import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';



class TopBar extends Component {
  constructor(){
    super();
  }
  render() {
    return (
    <div className="topBar"> 
        <div className="wrapperTopBar">
            <a className="title">StartJob
            <img className="ynovIcon" src="/src/images/ynov-informatique.png"/></a>
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