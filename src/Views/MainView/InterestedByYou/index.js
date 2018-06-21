import React, { Component } from 'react';

class InterestedByYou extends Component {
  render() {

    var listnterest =[{name:"a",src:"/src/images/user.png"},{name:"b",src:"/src/images/user.png"},{name:"c",src:"/src/images/user.png"},{name:"d",src:"/src/images/user.png"},{name:"e",src:"/src/images/user.png"},{name:"f",src:"/src/images/user.png"},{name:"g",src:"/src/images/user.png"},{name:"h",src:"/src/images/user.png"},{name:"i",src:"/src/images/user.png"},{name:"j",src:"/src/images/user.png"},{name:"k",src:"/src/images/user.png"},{name:"l",src:"/src/images/user.png"},{name:"m",src:"/src/images/user.png"},{name:"n",src:"/src/images/user.png"},{name:"o",src:"/src/images/user.png"}]
    var count;
    var documentInterest = listnterest.map(function(element, i){
        if (count == 3){
          count = 0
        }
        switch (count){
          case 0:
          return(
            <div key={i} className="wrapperCardInterest customInterest0">
                <img src={element.src}></img>
                <a>{element.name}</a>  
            </div>
          );
          case 1:
          return(
            <div key={i} className="wrapperCardInterest customInterest1">
                <img src={element.src}></img>
                <a>{element.name}</a>  
            </div>
          );
          case 2: 
          return(
            <div key={i} className="wrapperCardInterest customInterest2">
                <img src={element.src}></img>
                <a>{element.name}</a>  
            </div>
          );
        }
        count +=1;
    });
    return (
      <div className="wrapperGridInterest">
          {documentInterest}
      </div>
    );
  }
}

export default InterestedByYou;
