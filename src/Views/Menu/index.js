import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';

class Menu extends Component {
  render() {
    const listButton = [{name:"Home",src: "/src/images/house.svg", to:"/"},
      {name:"Interested", src:"/src/images/correct.svg", to:"/interestedByYou"}, 
      {name:"Visits", src: "/src/images/eye.svg", to: "/visiteOnYourProfile"}, 
      {name:"Stand By", src:"/src/images/time-left.svg", to:"/standBy"},
      {name:"Create Offer", src:"/src/images/hand.png", to:"/createOffer"}];

    const documentListButton = listButton.map(function(element, i){
      console.log(element.to)
      return(
        <Link key={i} to={element.to}><div tabIndex="-1" className="buttonSlider"><img className="imgSideBar" src={element.src}></img><p>{element.name}</p></div></Link>
      );
      
    });
   
    return (
    <div className="sideBar">  
        <div className="wrapperSideBar">
           {documentListButton}
        </div>
    </div>
    );
  }
}
export default Menu;