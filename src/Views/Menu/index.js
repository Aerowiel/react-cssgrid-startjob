import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
    <div className="sideBar">  
        <div className="wrapperSideBar">
            <div><img className="buttonSideBar" src="/src/images/house.svg"></img><Link to="/"><p>Home</p></Link></div>
            <div><img className="buttonSideBar" src="/src/images/correct.svg"></img><Link to="/interestedByYou"><p>interestedByYou</p></Link></div>
            <div><img className="buttonSideBar" src="/src/images/eye.svg"></img><Link to="/visiteOnYourProdivile"><p>VisiteOnYourProfile</p></Link></div>
            <div><img className="buttonSideBar" src="/src/images/time-left.svg"></img><Link to="/standBy"><p>StandBy</p></Link></div>
        </div>
    </div>
    );
  }
}
export default Menu;