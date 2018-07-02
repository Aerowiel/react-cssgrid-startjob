function tryLogin(User, callback){
    console.log(callback);
    socketClient.on('responseTryLogin',returnUser => callback(null, returnUser));
    socketClient.emit('tryLogin', User);
}

export { tryLogin };