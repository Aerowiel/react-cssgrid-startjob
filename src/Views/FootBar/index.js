import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import ConvLittle from '../../Component/ConvLittle';

class FootBar extends Component {
    constructor(){
        super();
        this.state = {
            listOpenConv : [{src:"/src/images/user.png"},{src:"/src/images/user.png"}]
        }
    }

  render() {
    var documentConvLittle = this.state.listOpenConv.map(function(element, index){
        return(
            <ConvLittle key={index} src={element.src}/>
        );
    });
    return (
    <div className="footBar"> 
        <div className="wrapperTopBar">
            <a className="conversation">Vos conversations</a>
            <div className="footListButton">
                <div className="wrapperfootListButton">
                    {documentConvLittle}
                </div>

            </div>
        </div>
    </div>
    );
  }
}
export default FootBar;