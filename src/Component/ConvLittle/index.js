import React, {Component} from 'react';

class ConvLittle extends Component{
    render(){
        return(
            <div key={this.props.key} className="buttonConv"><button id="imageConv"><img src={this.props.src}/></button><i></i></div>
        );
    }
}
export default ConvLittle;