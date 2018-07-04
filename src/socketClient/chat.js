function getAllMessages(userInTalk,callback){
    socketClient.on('responseGetAllMessages', messages => callback(null, messages));
    socketClient.emit('getAllMessages', sessionStorage.getItem("emailStartjob"),userInTalk);
  }

function sendMessageByChat(message,userInTalk,callback){
  socketClient.on('responseSendMessageByChat', response => callback(null, response));
  socketClient.emit('sendMessageByChat', message,sessionStorage.getItem("emailStartjob"),userInTalk)
}  
  export { getAllMessages, sendMessageByChat};