var mongoose = require('mongoose');
    express = require('express');
    bcrypt = require('bcrypt');
    cloudinary = require('cloudinary');
    connector = require('./../connectDB');


const io = require('socket.io')();


io.on('connection', (client) => {
    var schmeaNotification = new mongoose.Schema({userMail: 'string', listNotification : [{type:'string'},{date:'string'},{statusView:'boolean'},{message:'string'}]},{ collection : 'notificationSystem' });
  var modelNotification = mongoose.model('notificationSystem', schmeaNotification);

  client.on('getNotification', (userMail)=>{
    var listNewNotification =[];
    modelNotification.findOne({userMail : userMail}, function(err, responseNotifications){
      if(err){
        throw err;
      }
      else{
        if(responseNotifications){
          responseNotifications.map(function(item){
            if(!item.statusView){
              listNewNotification.push(item);s
            }
          });
          client.emit("responseNotifications", listNewNotification);
        }
        else{
          client.emit("responseNotifications", null);
        }
      }
    });
    
  });

  client.on('deleteThisNotification', (userMail,notificationToDelete)=>{
    modelNotification.findOne({userMail: userMail}, function(err, responseNotification){
      if(err){
        throw err;
      }
      else{
        responseNotification.listNotification.map(function(item, index){
          if(item == notificationToDelete){
            responseNotification.listNotification.slice(index);
          }
        });

        client.emit("responseDeleteThisNotification", responseNotification.listNotification)
      }
    });
  });

  function addNotificationToThisUser(userTargeted, newNotification){
    modelNotification.findOne({userMail : userTargeted}, function(err, response){
      if(err){
        throw err;
      }
      else{
        var listNotificationToUpdate = [];
        listNotificationToUpdate.push(response.listNotification);
        listNotificationToUpdate.push(newNotification);
        modelNotification.updateOne({userMail : userTargeted}, $set[{listNotification : listNotificationToUpdate}], function(err, result){
          if(err){
            throw err;
          }
          else{
            console.log(result);
          }
        })
      }
    });
  }
});
  
