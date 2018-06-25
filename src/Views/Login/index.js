import React, { Component } from 'react';
import {
  Link,
  Route,
  Redirect
} from 'react-router-dom';
import TopBar from '../TopBar';
import { tryLogin } from '../../socketClient/login';
import localStorage from 'localStorage';
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
        tryLogin(User,(err, returnBool) => 
            this.setStorageUser(returnBool)
        );      
    }
    setStorageUser(returnBool){
        
        localStorage.setItem("userConnect",returnBool);
        console.log(localStorage.getItem("userConnect")); 
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
                <Link to={localStorage.getItem("userConnect") == true ? "/dashboard" : "/"}><input type="submit" value="Se Connecter" onClick={this.submitConnect.bind(this)}></input></Link>
            </div>
        </div>
    );
  }
}

export default Login;