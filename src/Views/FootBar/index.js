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
                    <div className="buttonConv"><button id="imageConv"><img src="/src/images/user.png"/></button><i>conv1</i></div>
                    <div className="buttonConv"><button id="imageConv"><img src="/src/images/user.png"/></button><i>conv2</i></div>
                    <div className="buttonConv"><button id="imageConv"><img src="/src/images/user.png"/></button><i>conv3</i></div>
                    <div className="buttonConv"><button id="imageConv"><img src="/src/images/user.png"/></button><i>conv4</i></div>
                    <div className="buttonConv"><button id="imageConv"><img src="/src/images/user.png"/></button><i>conv5</i></div>
                    <div className="buttonConv"><button id="imageConv"><img src="/src/images/user.png"/></button><i>conv6</i></div>
                    <div className="buttonConv"><button id="imageConv"><img src="/src/images/user.png"/></button><i>conv7</i></div>
                    <div className="buttonConv"><button id="imageConv"><img src="/src/images/user.png"/></button><i>conv8</i></div>
                </div>

            </div>
        </div>
    </div>
    );
  }
}
export default FootBar;