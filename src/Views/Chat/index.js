import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';

class Chat extends Component {
  render() {
    return (
        <div className="chatContainer">
            <div className="chatHeader">
                <img src=""/>
                <i FirstName LastName />
                <i Status />
            </div>
            <div className="chatContent">
                <div className="messageGet"><i Message Get /></div>
                <div className="messagePost"><i Message Send /></div>
            </div>
            <div className="chatFooter">
                <input type="text" name="messageSended" placeholder="Votre Message" className="messageToSend"/>
                <button className="sendItem" src="/src/images/send.png"/>
            </div>
        </div>
    );
  }
}

export default Chat;