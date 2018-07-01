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
      case newInfos.formation:
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
      case newInfos.listLastEmploy:
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
      case newInofs.password:
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


  function checkIfAlreadyKnow(userMail, userChecked){
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



const port = 8080;
io.listen(port);
console.log('listening on port ', port);