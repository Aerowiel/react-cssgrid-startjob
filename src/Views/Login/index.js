import React, { Component } from 'react';
import {
  Link,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import { tryLogin } from '../../socketClient/login';

import { register } from '../../socketClient/Register'

import {userLogStatus} from '../../App';

import {history} from './../../history';
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginStatus: 'false',
            userMail: '',
            userPassword: '',
            selectedMode: true,
            userName : '',
            userLastName:'',
            userMailRegister: '',
            userPasswordRegister: '',
            confirmPassword: '',
            dateOfBirth:''
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
            this.validateFormatEmail(e.target.value);
            this.setState({userMail : e.target.value});
    }

    validateFormatEmail(email){
        var re = /\S+@\S+\.\S+/;
        var boolTest = re.test(email);
        if(!boolTest){
            document.querySelector('.errorMail').style.display = "block"
        }
        else{
            document.querySelector('.errorMail').style.display = "none"

        }
    }

    validateFormatPassword(password){
        var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        var boolTest = re.test(password);
        if(!boolTest){
            document.querySelector('.errorPassword').style.display = "block"
        }
        else{
            document.querySelector('.errorPassword').style.display = "none"

        }
    }

    setUserPassword(e){
        this.validateFormatPassword(e.target.value)
        this.setState({userPassword : e.target.value});
    }
    setSelectLoginChoice(e){
       document.querySelector('.selectedLogin').classList.remove('selectedLogin');
       e.target.classList.add('selectedLogin');
       this.setState({
           selectedMode: !this.state.selectedMode
       })
       console.log(e.target.value);
       if(e.target.value=="Login"){
            document.querySelector('.selectedModeLogin').style.display="grid";
            document.querySelector('.selectedModeRegister').style.display="none";

       }
       else{
            document.querySelector('.selectedModeLogin').style.display="none";
            document.querySelector('.selectedModeRegister').style.display="grid";

       }
    }
    setUserMailRegister(e) {
        this.setState({userMail : e.target.value});
    }
    setUserPasswordRegister(e){
        this.setState({userPassword : e.target.value});
    }
    setConfirmPasswordRegister(e){
        this.setState({confirmPassword : e.target.value});
    }
    setUserDateBirthRegister(e){
        this.setState({dateOfBirth : e.target.value});
    }
    setUsernameRegister(e){
        this.setState({userName: e.target.value});
    }
    setUserLastnameRegister(e){
        this.setState({userLastName: e.target.value});
    }

    register(){

        var userForRegistering ={ name: this.state.userLastName, username: this.state.userName, dateOfBirth: this.state.dateOfBirth, email: this.state.userMail, password: this.state.userPassword };
        register(userForRegistering,(err, responseRegister)=>{
            if(responseRegister != null){
                userLogStatus.isLog();
            }
        })
    }

  render() {
      
    return (
        <div className="loginContainer">
            <div className="loginTitle">StartJob</div>
            <div className="loginContent">
                <div className="wrapperButtonLogin">
                    <button onClick={this.setSelectLoginChoice.bind(this)} value="Login" className="selectedLogin selectedMode">Login</button>
                    <button onClick={this.setSelectLoginChoice.bind(this)} className="selectedMode">Register</button>
                </div>
                <div className="selectedModeLogin">
                    <input className="inputLogin userMail" placeholder="Email" onChange={this.setUserMail.bind(this)}/>
                    <a className="errorMessage errorMail">Erreur</a>
                    <input className="inputLogin userPassword" placeholder="Mot de Passe" onChange={this.setUserPassword.bind(this)}/>
                    <a className="errorMessage errorPassword">Erreur</a>
                    <input className="submitLogin" type="submit" value="Se Connecter" onClick={this.submitConnect.bind(this)}></input>
                </div>
                <div className="selectedModeRegister">
                    <input className="inputLogin inputUsername" ref={this.username} placeholder="Username" onChange={this.setUsernameRegister.bind(this)}/>
                        <a className="errorMessage errorInputUserName">Erreur</a>
                    <input className="inputLogin inputLastName" ref={this.userLastName} placeholder="Last Name" onChange={this.setUserLastnameRegister.bind(this)}/>
                        <a className="errorMessage errorInputLastName">Erreur</a>
                    <input className="inputLogin inputEmail" ref={this.userMail} placeholder="Email" onChange={this.setUserMailRegister.bind(this)}/>
                        <a className="errorMessage errorInputEmail">Erreur</a>
                    <input className="inputLogin inputPassword" ref={this.userPassword} placeholder="Mot de Passe" onChange={this.setUserPasswordRegister.bind(this)}/>
                        <a className="errorMessage errorInputPassword">Erreur</a>
                    <input className="inputLogin inputConfirmPassword confirmPassword" ref={this.userConfirmPassword} placeholder="Vérification Mot de Passe" onChange={this.setUserPasswordRegister.bind(this)}/>
                        <a className="errorMessage errorInputConfirmPassword">Erreur</a>
                    <input type="submit" className="submitRegister" onClick={this.register.bind(this)} value="S'incriscre"/>
                </div>
            </div>
        </div>
        
    );
  }
}

export default Login;
