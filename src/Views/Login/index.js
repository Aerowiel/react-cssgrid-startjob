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

import {history} from './../../history';
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginStatus: 'false',
            userMail: '',
            userPassword: ''
        };
    }
    submitConnect(){
        console.log("")
      // this.props.history.push("/")
      const { history } = this.props; 
      console.log(history);
        var User = {email : this.state.userMail, password: this.state.userPassword}
        tryLogin(User,(err, returnUser) =>
            this.setStorageUser(returnUser)
        );
    }
    setStorageUser(returnUser){
        if(returnUser){
            console.log("returnOK")
            userLogStatus.isLog();
            history.push("/");
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
                <input type="submit" value="Se Connecter" onClick={this.submitConnect.bind(this)}></input>
            </div>
        </div>
    );
  }
}

export default Login;
