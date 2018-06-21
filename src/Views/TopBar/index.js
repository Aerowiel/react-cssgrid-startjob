import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';

class TopBar extends Component {
  render() {
    return (
    <div className="topBar"> 
        <div className="wrapperTopBar">
            <a className="title">Bienvenue sur StartJob</a>
            <div className="topListButton">
                <div className="wrapperTopListButton">
                    <div className="containerWrapperTopList">
                        <div> Super</div>
                        <div> Super2</div>
                        <div><Link to="/userProfile"><i className="fas fa-user-tie"></i></Link></div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    );
  }
}
export default TopBar;