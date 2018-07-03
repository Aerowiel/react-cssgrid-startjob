socketClient.on('setSessionInformations', () => {
  console.log('setSessionInformations called() clientside');
});

function getSession(){
  console.log('getSession() called')
  socketClient.on('checkIfUserExists',() => {

    console.log("session user id = " + sessionStorage.getItem('socketidStartjob'));
    socketClient.emit('answerCheckIfClientExists', sessionStorage.getItem('socketidStartjob'));

  });
}

function updateSession(){
  console.log('updateSession() called')
  socketClient.on('updateSessionInformations',(userInformations) => {
    console.log('updateSessionInformations cb called')
    sessionStorage.setItem('idStartjob', userInformations.id);
    sessionStorage.setItem('socketidStartjob', userInformations.socketid);
    sessionStorage.setItem('emailStartjob', userInformations.email);

  });
}

export {getSession};

export {updateSession};
