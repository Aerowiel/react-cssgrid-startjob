var mongoose = require('mongoose');
    express = require('express');
    bcrypt = require('bcrypt');
    cloudinary = require('cloudinary');
    connector = require('./../connectDB');


const io = require('socket.io')();
var schemaUser = new mongoose.Schema({ username: 'string', name: 'string' , email: 'string', password:'string',emploiNow:'string',picture:'string', formation:'string', listLastEmploy:'array', description:'string', listCompetence:'array', listInterest: 'array'},{ collection : 'Users' });
var modelUser = mongoose.model('User', schemaUser);

io.on('connection', (client) => {
    client.on('getAllCards', (interval)=>{    
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
});