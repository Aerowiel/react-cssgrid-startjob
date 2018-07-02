function register(User, callback){
    console.log("REgister Service", User);
    socketClient.on('responseRegister',returnUser => callback(null, returnUser));
    socketClient.emit('register', User);
}

export { register };