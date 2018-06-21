import React, { Component } from 'react';

class VisiteOnYourProfile extends Component {
  render() {

    const listVisit = [{date:"20/06/2018 16:38", enterprise:"Sogeti", collaborateur:20000, imgsrc:"", localisation:"Blagnac", localisationFull: "3 rue des fleurs 31000 Blagnac"},{date:"20/06/2018 16:39", enterprise:"Akka", collaborateur: 2000, imgsrc:"", localisation:"Toulouse", localisationFull:"3 rue des fleurs 31000 Blagnac"},{date:"20/06/2018 16:40", enterprise: "Iot", collaborateur: 200, imgsrc:"", localisation:"Labege", localisationFull:"3 rue des fleurs 31000 Blagnac"}]
    
    const documentVisit = listVisit.map(function(element, i){
      return(
        <div key={i} className="parentVisitContainer">
          <a>{element.date}</a>
          <div className="visitContainer">
            <img src=""></img>
            <a className="visitEnterprise">{element.enterprise}</a>
            <a className="visitLocalisation">{element.localisation}</a>
            <a className="visitCollaborateur">{element.collaborateur}</a>
          </div>
        </div>
      );
    });
    
    return (
      <div>
        {documentVisit}
      </div>
    );
  }
}

export default VisiteOnYourProfile;
