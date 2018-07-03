import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import ListFriend from '../../Component/ListFriend';

class Friend extends Component {
    constructor(){
        super();
        this.state = {
        }
    }
    render() {
        return (
            <div className="wrapperListFriend">
                <ListFriend/>
            </div>
        );
    }
}
export default Friend;