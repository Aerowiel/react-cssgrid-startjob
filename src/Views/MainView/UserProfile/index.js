import React, { Component } from 'react';
import {addInfosToProfil} from '../../../socketClient/UserInfos';
class UserProfile extends Component {
  constructor(){
    super();
    this.state = {

    }
  }
  setNewInfos(newInfos){
    addInfosToProfil(newInfos,(err, responseInfo) => 
      console.log("infoModified")
    );
  }
  render() {
    return (
      <div className="wrapperUserProfil">
        <img src=""/>
        <div className="userTextField userName">
        </div>
        <div className="userTextField userLastName">
        </div>
        <div className="userTextField userEmail">
        </div>
        <div className="userTextField userDateOfBirth">
        </div>
        <div className="userTextField password">
        </div>
        <input className="submit" value="Enregistrer vos modifications"/>
      </div>
    );
  }
}

export default UserProfile;
