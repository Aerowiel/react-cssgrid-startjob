socketClient.on('setSessionInformations', () => {
  console.log('setSessionInformations called() clientside');
});

function getSession(){
  console.log('getSession() called')
  socketClient.on('checkIfUserExists',() => console.log('checkIfUserExists()'))
}

export {getSession};
