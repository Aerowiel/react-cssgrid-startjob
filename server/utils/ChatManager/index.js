class ChatManager {

  construct(){

  }

  onMessage(message, sender, receiver){
    console.log("received message : '" + message + "' from socketid : '" + sender + "' aiming '" + receiver + "'");
    this.sendMessage(message, sender, receiver);
  }

  sendMessage(message, sender, receiver){
    console.log("sent message : '" + message + "' from socketid : '" + sender + "' to '" + receiver + "'");
    io.sockets.to(receiver).emit('receivedMessage', {message : message, senderEmail : UserManager.getUserBySocketID(sender).email})
  }

}

const instance = new ChatManager();
module.exports = instance;

const UserManager = require('../UserManager');
