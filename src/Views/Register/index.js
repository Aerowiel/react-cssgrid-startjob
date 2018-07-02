import React, { Component } from 'react';
import { register } from '../../socketClient/Register'

import {userLogStatus} from '../../App';

class Register extends Component{
    constructor(){
        super();
        this.state ={
            userName : '',
            userLastName:'',
            userMail: '',
            userPassword: '',
            confirmPassword: '',
            dateOfBirth:''
        }
        this.username = React.createRef();
        this.userLastName = React.createRef();
        this.userMail = React.createRef()
    }
    signIn(){

        var userForRegistering ={ name: this.state.userLastName, username: this.state.userName, dateOfBirth: this.state.dateOfBirth, email: this.state.userMail, password: this.state.userPassword };
        register(userForRegistering,(err, responseRegister)=>{
            if(responseRegister != null){
                userLogStatus.isLog();
            }
        })
    }
    setUserMail(e) {
        this.setState({userMail : e.target.value});
    }
    setUserPassword(e){
        this.setState({userPassword : e.target.value});
    }
    setConfirmPassword(e){
        this.setState({confirmPassword : e.target.value});
    }
    setUserDateBirth(e){
        this.setState({dateOfBirth : e.target.value});
    }
    setUsername(e){
        this.setState({userName: e.target.value});
    }
    setUserLastname(e){
        this.setState({userLastName: e.target.value});
    }
    render(){
        return(
            <div className="wrapperRegister">
                <input className="inputUsername userMail" ref={this.username} placeholder="Username" onChange={this.setUsername.bind(this)}/>
                <a className="errorMessage">Erreur</a>
                <input className="inputLastName userMail" ref={this.userLastName} placeholder="Last Name" onChange={this.setUserLastname.bind(this)}/>
                <a className="errorMessage">Erreur</a>
                <input className="inputLogin userMail" ref={this.userMail} placeholder="Email" onChange={this.setUserMail.bind(this)}/>
                <a className="errorMessage">Erreur</a>
                <input className="inputLogin userPassword" ref={this.userPassword} placeholder="Mot de Passe" onChange={this.setUserPassword.bind(this)}/>
                <a className="errorMessage">Erreur</a>
                <input className="inputLogin userPassword confirmPassword" ref={this.userConfirmPassword} placeholder="Vérification Mot de Passe" onChange={this.setUserPassword.bind(this)}/>
                <a className="errorMessage">Erreur</a>
                <input type="date" placeholder="Votre Age" ref={this.userDateBirth} onChange={this.setUserDateBirth.bind(this)}/>

                <input type="submit" onClick={this.signIn.bind(this)} value="S'incriscre"/>
            </div>
        );
    }
}
export default Register;