import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import ConvLittle from '../../Component/ConvLittle';
import ConvBox from '../../Component/convBox/index';
class FootBar extends Component {
    constructor(){
        super();
        this.state = {
            listOpenConv : [{src:"/src/images/user.png"},{src:"/src/images/user.png"}],
            selectedConvo: false
        }
    }
    selectConv(index,e) {
        e.preventDefault();
        console.log("something")
        this.setState({
            selectedConv: true,
            sleectedconvindex: index
        })
    }
    closeConvoBox(e) {
        e.preventDefault();
        this.setState({
            selectedConv: false,
        })
    }
    render() {
    const size = 200 + this.state.sleectedconvindex*50
    return (
    <div className="footBar"> 
        {this.state.selectedConv && 
            <ConvBox
                closeConvoBox={this.closeConvoBox.bind(this)}
                id={this.state.sleectedconvindex}
                style={{
                    left: size
                }}
            />
        }
        <div className="wrapperTopBar">
            <a className="conversation">Vos conversations</a>
            <div className="footListButton">
                <div className="wrapperfootListButton">
                    {this.state.listOpenConv.map((element, index) => {
                        return(
                            <div key={index}
                                onClick={this.selectConv.bind(this,index)}
                            >
                                <ConvLittle
                                    ey={index} 
                                    src={element.src}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
    );
  }
}
export default FootBar;