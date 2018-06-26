import React, { Component } from 'react';

class Card extends Component {

    constructor(){
        super();

        this.state = {

        };

    }
    render(){
        function destroyCard(e){
            e.target.parentNode.parentNode.remove();
        }
        return(
            <div key= {this.props.i} className={"wrapperCard "+ this.props.customColor}>
                  <div className="cardHeader customHeader">
                      <img className="cardImage" src={this.props.src}>
                      </img>
                        <div className="cardNames">
                          <a>{this.props.username}</a>
                          <a>{this.props.name}</a>
                        </div>
                        <div className="cardEmploy">
                          <a>{this.props.emploiNow}</a>
                        </div>
                  </div>
                  <div className="cardContent">
                    <button onClick={destroyCard.bind(this)}> Next
                      </button>
                  </div>
            </div>
        );
    }
}

export default Card;