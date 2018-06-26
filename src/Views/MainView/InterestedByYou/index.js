import React, { Component } from 'react';
import Box from '../../../Component/Box';

var listnterest =[{name:"a",src:"/src/images/user.png"},{name:"b",src:"/src/images/user.png"},{name:"c",src:"/src/images/user.png"},{name:"d",src:"/src/images/user.png"},{name:"e",src:"/src/images/user.png"},{name:"f",src:"/src/images/user.png"},{name:"g",src:"/src/images/user.png"},{name:"h",src:"/src/images/user.png"},{name:"i",src:"/src/images/user.png"},{name:"j",src:"/src/images/user.png"},{name:"k",src:"/src/images/user.png"},{name:"l",src:"/src/images/user.png"},{name:"m",src:"/src/images/user.png"},{name:"n",src:"/src/images/user.png"},{name:"o",src:"/src/images/user.png"}]

class InterestedByYou extends Component {

  constructor(){
    super();

    this.state = {
      listnterest
    }
  }
 
  render() {

    var count = 0;
    var documentInterest = listnterest.map(function(element, i){
      console.log(i)
        if (count == 3){
          count = 0
        }
        count+=1;
        console.log(element);  
        switch (count){
          case 1:
          return(
            <Box key={i} src={element.src} name={element.name} customColor="customInterest0"/>
          );
          case 2:
          return(
            <Box key={i} src={element.src} name={element.name} customColor="customInterest1"/>
          );
          case 3: 
          return(
            <Box key={i} src={element.src} name={element.name} customColor="customInterest2"/>
          );
        }
    });
    return (
      <div className="wrapperGridInterest">
          {documentInterest}
      </div>
    );
  }
}

export default InterestedByYou;
