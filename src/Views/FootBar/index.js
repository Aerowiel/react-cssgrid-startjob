import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';

class FootBar extends Component {
  render() {
    return (
    <div className="footBar"> 
        <div className="wrapperTopBar">
            <a className="conversation">Vos conversations</a>
            <div className="footListButton">
                <div className="wrapperfootListButton">
                    <div className="buttonConv"><button id="imageConv"><img src="/src/images/user.png"/></button><i></i></div>
                    <div className="buttonConv"><button id="imageConv"><img src="/src/images/user.png"/></button><i></i></div>
                    <div className="buttonConv"><button id="imageConv"><img src="/src/images/user.png"/></button><i></i></div>
                    <div className="buttonConv"><button id="imageConv"><img src="/src/images/user.png"/></button><i></i></div>
                    <div className="buttonConv"><button id="imageConv"><img src="/src/images/user.png"/></button><i></i></div>
                    <div className="buttonConv"><button id="imageConv"><img src="/src/images/user.png"/></button><i></i></div>
                    <div className="buttonConv"><button id="imageConv"><img src="/src/images/user.png"/></button><i></i></div>
                    <div className="buttonConv"><button id="imageConv"><img src="/src/images/user.png"/></button><i></i></div>
                
                </div>

            </div>
        </div>
    </div>
    );
  }
}
export default FootBar;