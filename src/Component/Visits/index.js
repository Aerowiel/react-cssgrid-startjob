import React, {Component} from 'react';

class Visits extends Component{
    render(){
        return(
            <div key={this.props.i} className="parentVisitContainer">
                <a>{this.props.date}</a>
                <div className="visitContainer">
                    <img src=""></img>
                    <a className="visitEnterprise">{this.props.enterprise}</a>
                    <a className="visitLocalisation">{this.props.localisation}</a>
                    <a className="visitCollaborateur">{this.props.collaborateur}</a>
                </div>
          </div>
        );
    }

}
 export default Visits;