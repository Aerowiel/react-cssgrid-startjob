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
                    <button> Super</button>
                    <button> Super2</button>
                    <button><i className="fas fa-user-tie"></i></button>
                </div>
            </div>
        </div>
    </div>
    );
  }
}
export default TopBar;