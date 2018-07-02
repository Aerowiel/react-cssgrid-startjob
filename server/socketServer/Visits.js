var mongoose = require('mongoose');
    express = require('express');
    bcrypt = require('bcrypt');
    cloudinary = require('cloudinary');
    connector = require('./../connectDB');


const io = require('socket.io')();


io.on('connection', (client) => {
    var schemaUserVisits = new mongoose.Schema({userName: 'string', listUserVisit : [{name: 'string'}, {date :'date'}], listVisitedByUser: [{name: 'string'}, {date: 'date'}]},{ collection : 'userVisits' });
    var modelVisits = mongoose.model('userVisits', schemaUserVisits);
    client.on('getVisits', (Email)=>{
        modelVisits.findOne({email: Email}, function(err, response){
        if(err){
            throw err;
        }
        else{
            if(response != null){
            client.emit("visitsResponse", response);
            }
            else{
            client.emit("visitsResponse", null);
            }
        }
        })
    });  

  function checkIfAlreadyKnown(userMail, userChecked){
    modelVisits.findOne({email: userMail}, function(err, response){
        if(err){
          throw err;
        }
        else{
          var boolUserAlreadyKnow;
          response.listVisitedByUser.map(function(item, index){
            if(item.name == userChecked){
              boolUserAlreadyKnow == true
            }
          });
          if(boolUserAlreadyKnow == true){
              return true;
          }
          else{
            return false;
          }
        }     
    });
  }


});
