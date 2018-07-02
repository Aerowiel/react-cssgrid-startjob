function getVisits(User, callback){
    console.log(callback);
    socketClient.on('responseGetVisits',returnVisits => callback(null, returnVisits));
    socketClient.emit('getVisits', User);
}

export { getVisits }; 