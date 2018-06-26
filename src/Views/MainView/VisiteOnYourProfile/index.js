import React, { Component } from 'react';
import Visits from '../../../Component/Visits';

class VisiteOnYourProfile extends Component {
  render() {

    const listVisit = [{date:"20/06/2018 16:38", enterprise:"Sogeti", collaborateur:20000, imgsrc:"", localisation:"Blagnac", localisationFull: "3 rue des fleurs 31000 Blagnac"},{date:"20/06/2018 16:39", enterprise:"Akka", collaborateur: 2000, imgsrc:"", localisation:"Toulouse", localisationFull:"3 rue des fleurs 31000 Blagnac"},{date:"20/06/2018 16:40", enterprise: "Iot", collaborateur: 200, imgsrc:"", localisation:"Labege", localisationFull:"3 rue des fleurs 31000 Blagnac"}]
    
    const documentVisit = listVisit.map(function(element, i){
      return(
        <Visits key= {i} date={element.date} enterprise={element.enterprise} collaborateur={element.collaborateur} localisation={element.localisation}/>
      );
    });
    
    return (
      <div className="wrapperVisits">
        {documentVisit}
      </div>
    );
  }
}

export default VisiteOnYourProfile;
