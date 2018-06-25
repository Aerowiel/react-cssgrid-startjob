var mongoose = require('mongoose');
    express = require('express');
    bcrypt = require('bcrypt');
    cloudinary = require('cloudinary');
    connector = require('./../connectDB');


const io = require('socket.io')();
var schemaUser = new mongoose.Schema({ username: 'string', name: 'string' , email: 'string', password:'string',emploiNow:'string',picture:'string'},{ collection : 'Users' });
    var modelUser = mongoose.model('User', schemaUser);

io.on('connection', (client) => {
  client.on('getAllCards', (interval)=>{
    console.log("getallcards", interval);
    
    modelUser.find({}, function(err, allCards){
      if(err){
              throw err;
      }
      else{
          if(allCards == null){
            client.emit('responseGetAllCards', null);

          }
          else{
              console.log(allCards);
              client.emit('responseGetAllCards', allCards);
          }
      }
    });
  });
  client.on('tryLogin', (User)=>{
    console.log("trylogin okokokokokkokok")
    var userToFind = {email : User.email};
    modelUser.findOne(userToFind, function(err, userConnected){
      if(err){
              throw err;
      }
      else{
        console.log(userConnected);
        if(userConnected != null){
          if(userConnected.password == User.password){
            console.log("true response", userConnected)
            client.emit('responseTryLogin', true);
          }
          else{
            console.log("false response", userConnected)
            client.emit('responseTryLogin', false);
          }
        }
        else{
          client.emit('responseTryLogin', false);
        }
      }
    });
  });
});



const port = 8080;
io.listen(port);
console.log('listening on port ', port);