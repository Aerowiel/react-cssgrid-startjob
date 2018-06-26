import React, { Component } from 'react';

class Register extends Component{
    constructor(){
        super();
        this.state ={
            userMail: '',
            userPassword: '',
            confirmPassword: ''
        }
    }
    signIn(){
        <Link to="/dashboard"/>
    }
    setUserMail(e) {
        this.setState({userMail : e.target.value});
    }
    setUserPassword(e){
        this.setState({userPassword : e.target.value});
    }
    setConfirmPassword(e){
        this.setState({confirmPassword : e.target.value})
    }
    render(){
        return(
            <div className="wrapperRegister">
                <input className="inputLogin userMail" placeholder="Email" onChange={this.setUserMail.bind(this)}/>
                <a className="errorMessage">Erreur</a>
                <input className="inputLogin userPassword" placeholder="Mot de Passe" onChange={this.setUserPassword.bind(this)}/>
                <a className="errorMessage">Erreur</a>
                <input className="inputLogin userPassword" placeholder="Vérification Mot de Passe" onChange={this.setUserPassword.bind(this)}/>
                <a className="errorMessage">Erreur</a>
                <input type="submit" onClick={this.signIn.bind(this)} value="S'incriscre"/>
            </div>
        );
    }
}
export default Register;