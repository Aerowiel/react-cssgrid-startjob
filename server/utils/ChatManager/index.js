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
 
    this.storeMessage(message, UserManager.getUserBySocketID(sender).id, UserManager.getUserBySocketID(receiver).id)
  }
 
  storeMessage(message, senderid, receiverid){
 
    var self = this;
 
    SchemaManager.modelChatLog.findOne({users: [mongoose.Types.ObjectId(senderid), mongoose.Types.ObjectId(receiverid)]}, function (err, responseListConv) {
        if(err){
            throw err;
        }
        else{
           if(responseListConv !== null){
               console.log("conv");
               var conv = responseListConv.conversations[0];
               console.log(conv);
               conv.push({sender : senderid, date : Date.now(), message: message})
               console.log(conv);
               console.log([mongoose.Types.ObjectId(responseListConv.users[0]), mongoose.Types.ObjectId(responseListConv.users[1])])
               SchemaManager.modelMessage.updateOne({ users: [mongoose.Types.ObjectId(responseListConv.users[0]), mongoose.Types.ObjectId(responseListConv.users[1])] }, {$set:{conversations : conv}}, function(err, response){
               if(err){
                   throw err;
               }
               else{
                 console.log(response);
               }
               });
            }
            else{
              SchemaManager.modelChatLog.findOne({users: [mongoose.Types.ObjectId(receiverid), mongoose.Types.ObjectId(senderid)]}, function (err, responseListConv) {
                  if(err){
                      throw err;
                  }
                  else{
                     if(responseListConv !== null){
                         console.log("conv");
                         var conv = responseListConv.conversations[0];
                         console.log(conv);
                         conv.push({sender : senderid, date : Date.now(), message: message})
                         console.log(conv);
                         SchemaManager.modelMessage.updateOne({ users: responseListConv.users }, {$set:{conversations : conv}}, function(err, response){
                         if(err){
                             throw err;
                         }
                         else{
                           console.log(response);
                         }
                         });
                      }
                      else{
                          console.log("no conv");
 
                          self.createConversation(message, senderid, receiverid);
                      }
                  }
              });
            }
        }
    });
  }
 
  createConversation(message, senderid, receiverid){
 
    SchemaManager.modelChatLog.create({users : [senderid, receiverid], conversations : {sender : senderid, date : Date.now(), message: message}}, function(err, response){
       if(err){
           throw err;
       }
       else{
           console.log(response);
       }
     })
 
  }
 
}
 
const instance = new ChatManager();
module.exports = instance;
 
const UserManager = require('../UserManager');
 
const SchemaManager = require('../SchemaManager');