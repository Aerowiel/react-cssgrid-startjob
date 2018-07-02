var mongoose = require('mongoose');
    express = require('express');
    bcrypt = require('bcrypt');
    cloudinary = require('cloudinary');
    connector = require('./../connectDB');


const io = require('socket.io')();

io.on('connection', (client) => {
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
  client.on('register', (User) =>{
    var user = {name: User.name, username: User.username, dateOfBirth : User.dateOfBirth, email : User.email, password: User.password}
    modelUser.create(user, function(err, userCreated){
      if(err){
        throw err;
      }
      else{
        if(userCreated != null){
          client.emit("responseRegister", userCreated);
        }
        else{
          client.emit("responseRegister", null);
        }
      }
    });
  });
  client.on('addInfoToProfil', (userMail, newInfos)=>{
    switch(newInfos){
      case newInfos.emploiNow:
      var lastJob;
      var newListLastJob = [];
      modelUser.findOne({email : userMail}, function(err, response){
        if(err){
          throw err;
        }
        else{
          lastJob = response.emploiNow;
          newListLastJob.push(response.listLastEmploy);
          newListLastJob.push(lastJob);
          modelUser.updateOne({email : userMail}, $set[{emploiNow : newInfos.emploiNow}, {listLastEmploy : newListLastJob}], function(err, response){
            if(err){
              throw err;
            }
            else{
              if(response){
                client.emit("reponseAddInfo", true);
              }
            }
          });
        }
      });
      
      break;
      case newInfos.picture:
      modelUser.updateOne({email : userMail}, $set[{picture : newInfos.picture}], function(err, response){
        if(err){
          throw err;
        }
        else{
          if(response){
            client.emit("reponseAddInfo", true);
          }
        }
      });
      break;
      case newInfos.formation:
      modelUser.updateOne({email : userMail}, $set[{emploiNow : newInfos.formation}], function(err, response){
        if(err){
          throw err;
        }
        else{
          if(response){
            client.emit("reponseAddInfo", true);
          }
        }
      });
      break;
      case newInfos.listLastEmploy:
      modelUser.updateOne({email : userMail}, $set[{emploiNow : newInfos.listLastEmploy}], function(err, response){
        if(err){
          throw err;
        }
        else{
          if(response){
            client.emit("reponseAddInfo", true);
          }
        }
      });
      break;
      case newInfos.listCompetence:
      modelUser.updateOne({email : userMail}, $set[{emploiNow : newInfos.emploiNow}], function(err, response){
        if(err){
          throw err;
        }
        else{
          if(response){
            client.emit("reponseAddInfo", true);
          }
        }
      });
      break;
      case newInfos.listInterest:
      modelUser.updateOne({email : userMail}, $set[{emploiNow : newInfos.emploiNow}], function(err, response){
        if(err){
          throw err;
        }
        else{
          if(response){
            client.emit("reponseAddInfo", true);
          }
        }
      });
      break;
      case newInfos.password:
      modelUser.updateOne({email : userMail}, $set[{emploiNow : newInfos.emploiNow}], function(err, response){
        if(err){
          throw err;
        }
        else{
          if(response){
            client.emit("reponseAddInfo", true);
          }
        }
      });
      break;
    }
  });
});