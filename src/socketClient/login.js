import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8080');

function tryLogin(User, callback){
    console.log(callback);
    socket.on('responseTryLogin',returnBool => callback(null, returnBool));
    socket.emit('tryLogin', User);
}

export{ tryLogin, socket};