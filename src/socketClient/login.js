function tryLogin(user, callback){
    console.log(callback);
    socketClient.on('responseTryLogin',returnUser => callback(null, returnUser));
    socketClient.on('setSessionInformations', (userInformations) => {
      console.log('setSessionInformations called() clientside');
      sessionStorage.setItem('idStartjob', userInformations.id);
      sessionStorage.setItem('socketidStartjob', userInformations.socketid);
      sessionStorage.setItem('emailStartjob', userInformations.email);

      console.log('User informations : ');
      console.log('ID = ' + sessionStorage.getItem('idStartjob'));
      console.log('SOCKETID = ' + sessionStorage.getItem('socketidStartjob'));
      console.log('EMAIL = ' + sessionStorage.getItem('emailStartjob'));
    });
    socketClient.emit('tryLogin', user);
}

export { tryLogin };
