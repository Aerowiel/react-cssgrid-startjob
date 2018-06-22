import React, { Component } from 'react';

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
            <div key={i} className="wrapperCardInterest customInterest0" onClick={disableOtherCardOnClick.bind(this)}>
                <img src={element.src}></img>
                <a>{element.name}</a>  
            </div>
          );
          case 2:
          return(
            <div key={i} className="wrapperCardInterest customInterest1">
                <img src={element.src}></img>
                <a>{element.name}</a>  
            </div>
          );
          case 3: 
          return(
            <div key={i} className="wrapperCardInterest customInterest2">
                <img src={element.src}></img>
                <a>{element.name}</a>  
            </div>
          );
        }
    });
    function disableOtherCardOnClick(e){
     e.target.parentNode.classList.add('OneCard');
     e.target.classList.add('cardSelected');
      // e.target.parentNode.style.gridTemplateRows
      console.log(e.target.key);
        // this.state.listnterest
    }
    
    return (
      <div className="wrapperGridInterest">
          {documentInterest}
      </div>
    );
  }
}

export default InterestedByYou;
