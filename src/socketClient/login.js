import openSocket from 'socket.io-client';

function tryLogin(User, callback){
    console.log(callback);
    socketClient.on('responseTryLogin',returnBool => callback(null, returnBool));
    socketClient.emit('tryLogin', User);
}

export { tryLogin };