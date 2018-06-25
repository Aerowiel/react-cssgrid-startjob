var mongoose = require('mongoose');
    express = require('express');
    connector = require('./../utils/collectionDriver');
    bcrypt = require('bcrypt');
    cloudinary = require('cloudinary');


const io = require('socket.io')();
var schemaUser = new mongoose.Schema({ username: 'string', name: 'string' , email: 'string', password:'string',emploiNow:'string',picture:'string'},{ collection : 'Users' });
    var modelUser = mongoose.model('User', schemaUser);

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });
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
});;



const port = 8080;
io.listen(port);
console.log('listening on port ', port);