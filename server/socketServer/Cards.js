var mongoose = require('mongoose');
    express = require('express');
    bcrypt = require('bcrypt');
    cloudinary = require('cloudinary');
    connector = require('./../connectDB');


const io = require('socket.io')();

io.on('connection', (client) => {

    console.log("cards.js");
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