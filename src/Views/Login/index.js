import React, { Component } from 'react';
import {
  Link,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import TopBar from '../TopBar';
import { tryLogin } from '../../socketClient/login';
import localStorage from 'localStorage';

import {userLogStatus} from '../../App';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            loginStatus: 'false',
            userMail: '',
            userPassword: ''
        };             
    }
    submitConnect(){
        var User = {email : this.state.userMail, password: this.state.userPassword}
        tryLogin(User,(err, returnUser) => 
            this.setStorageUser(returnUser)
        );      
    }
    setStorageUser(returnUser){
        if(returnUser){
            console.log(returnUser)
            userLogStatus.isLog();
        }
        else{
            userLogStatus.isLogOut();
        }
    }
    setUserMail(e) {
            this.setState({userMail : e.target.value});
    }
    setUserPassword(e){
        this.setState({userPassword : e.target.value});
    }
    
  render() {
    return (
        <div className="loginContainer">
            <div className="loginContent">
                <input className="inputLogin userMail" placeholder="Email" onChange={this.setUserMail.bind(this)}/>
                <input className="inputLogin userPassword" placeholder="Mot de Passe" onChange={this.setUserPassword.bind(this)}/>
                <a className="errorMessage">Erreur</a>
                <Link to="/"><input type="submit" value="Se Connecter" onClick={this.submitConnect.bind(this)}></input></Link>
            </div>
        </div>
    );
  }
}

export default Login;