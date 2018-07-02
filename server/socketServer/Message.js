var mongoose = require('mongoose');
    express = require('express');
    bcrypt = require('bcrypt');
    cloudinary = require('cloudinary');
    connector = require('./../connectDB');


const io = require('socket.io')();

io.on('connection', (client) => {
 
  
    var schemaMessage = new mongoose.Schema({userName: 'string', userInTalk: 'string', conversation : [{name:'string'},{date:'string'},{statusView:'boolean'},{message:'string'}]},{ collection : 'userMessage' });
    var modelMessage = mongoose.model('userMessage', schemaMessage);
  
    client.on('getMessages', (User)=>{
      modelMessage.find({username: User}, function(err, responseListConv){
        if(err){
          throw err;
        }
        else{
          if(responseListConv != null){
            client.emit("responseMessages", responseListConv);
          }
          else{
            client.emit("responseMessages", null);
          }        
        }
      });
    });
});