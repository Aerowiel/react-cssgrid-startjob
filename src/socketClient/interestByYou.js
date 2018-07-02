
function getRandomInterest(User, callback){
    console.log(callback);
    socketClient.on('responseTryLogin',returnBool => callback(null, returnBool));
    socketClient.emit('tryLogin', User);
}

export { getRandomInterest };