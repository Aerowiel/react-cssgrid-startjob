import React,{Component} from 'react';

class Box extends Component{

    constructor(){
        super();

    }
    render(){
        return(
            <div className="containerCardInterest">
                <div key={this.props.i} className={"wrapperCardInterest "+this.props.customColor}>
                    <img src={this.props.src}></img>
                    <a>{this.props.name}</a>  
                </div>
            </div>
        );
    }
}

export default Box;