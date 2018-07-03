function getFriends(callback){
    console.log(sessionStorage.getItem("emailStartjob"))
    socketClient.on('responseGetFriend',returnFriend => callback(null, returnFriend.friendList));
    socketClient.emit('getFriend', sessionStorage.getItem("emailStartjob"));
}

export { getFriends }; 