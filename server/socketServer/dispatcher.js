global.mongoose = require('mongoose');
global.express = require('express');
global.bcrypt = require('bcrypt');
global.cloudinary = require('cloudinary');
global.connector = require('./../connectDB');

global.io = require('socket.io')();
var SocketManager = require('../utils/SocketManager');
var SchemaManager = require('../utils/SchemaManager');

// Schemas

var schemaMessage = new mongoose.Schema({ userName: 'string', userInTalk: 'string', conversation: [{ name: 'string' }, { date: 'string' }, { statusView: 'boolean' }, { message: 'string' }] }, { collection: 'userMessage' });
var modelMessage = mongoose.model('userMessage', schemaMessage);

var schemaUserVisits = new mongoose.Schema({ userName: 'string', listUserVisit: [{ name: 'string' }, { date: 'date' }], listVisitedByUser: [{ name: 'string' }, { date: 'date' }] }, { collection: 'userVisits' });
var modelVisits = mongoose.model('userVisits', schemaUserVisits);

var schemaNotification = new mongoose.Schema({ userMail: 'string', listNotification: '' }, { collection: 'notificationSystem' });
var modelNotification = mongoose.model('notificationSystem', schemaNotification);


io.on('connection', (client) => {

    console.log("connection dispatcher.js");
    SocketManager.connect(client);

    // Cards.js
    

    // Message.js

    client.on('getMessages', (User) => {
        modelMessage.find({ username: User }, function (err, responseListConv) {
            if (err) {
                throw err;
            }
            else {
                if (responseListConv != null) {
                    client.emit("responseMessages", responseListConv);
                }
                else {
                    client.emit("responseMessages", null);
                }
            }
        });
    });

    // Notifications.js

    client.on('getNotification', (userMail) => {
        var listNewNotification = [];
        modelNotification.findOne({ userMail: userMail }, function (err, responseNotifications) {
            if (err) {
                throw err;
            }
            else {
                if (responseNotifications) {
                    responseNotifications.map(function (item) {
                        if (!item.statusView) {
                            listNewNotification.push(item); s
                        }
                    });
                    client.emit("responseNotifications", listNewNotification);
                }
                else {
                    client.emit("responseNotifications", null);
                }
            }
        });

    });

    client.on('deleteThisNotification', (userMail, notificationToDelete) => {
        modelNotification.findOne({ userMail: userMail }, function (err, responseNotification) {
            if (err) {
                throw err;
            }
            else {
                responseNotification.listNotification.map(function (item, index) {
                    if (item == notificationToDelete) {
                        responseNotification.listNotification.slice(index);
                    }
                });

                client.emit("responseDeleteThisNotification", responseNotification.listNotification)
            }
        });
    });

    function addNotificationToThisUser(userTargeted, newNotification) {
        modelNotification.findOne({ userMail: userTargeted }, function (err, response) {
            if (err) {
                throw err;
            }
            else {
                var listNotificationToUpdate = [];
                listNotificationToUpdate.push(response.listNotification);
                listNotificationToUpdate.push(newNotification);
                modelNotification.updateOne({ userMail: userTargeted }, $set[{ listNotification: listNotificationToUpdate }], function (err, result) {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log(result);
                    }
                })
            }
        });
    }
    // User.js

    client.on('tryLogin', (User) => {
        console.log("trylogin okokokokokkokok")
        var userToFind = { email: User.email };
        modelUser.findOne(userToFind, function (err, userConnected) {
            if (err) {
                throw err;
            }
            else {
                console.log(userConnected);
                if (userConnected != null) {
                    if (userConnected.password == User.password) {
                        console.log("true response", userConnected)
                        client.emit('responseTryLogin', true);
                    }
                    else {
                        console.log("false response", userConnected)
                        client.emit('responseTryLogin', false);
                    }
                }
                else {
                    client.emit('responseTryLogin', false);
                }
            }
        });
    });
    client.on('register', (User) => {
        var user = { name: User.name, username: User.username, dateOfBirth: User.dateOfBirth, email: User.email, password: User.password }
        modelUser.create(user, function (err, userCreated) {
            if (err) {
                throw err;
            }
            else {
                if (userCreated != null) {
                    client.emit("responseRegister", userCreated);
                }
                else {
                    client.emit("responseRegister", null);
                }
            }
        });
    });
    client.on('addInfoToProfil', (userMail, newInfos) => {
        switch (newInfos) {
            case newInfos.emploiNow:
                var lastJob;
                var newListLastJob = [];
                modelUser.findOne({ email: userMail }, function (err, response) {
                    if (err) {
                        throw err;
                    }
                    else {
                        lastJob = response.emploiNow;
                        newListLastJob.push(response.listLastEmploy);
                        newListLastJob.push(lastJob);
                        modelUser.updateOne({ email: userMail }, $set[{ emploiNow: newInfos.emploiNow }, { listLastEmploy: newListLastJob }], function (err, response) {
                            if (err) {
                                throw err;
                            }
                            else {
                                if (response) {
                                    client.emit("reponseAddInfo", true);
                                }
                            }
                        });
                    }
                });

                break;
            case newInfos.picture:
                modelUser.updateOne({ email: userMail }, $set[{ picture: newInfos.picture }], function (err, response) {
                    if (err) {
                        throw err;
                    }
                    else {
                        if (response) {
                            client.emit("reponseAddInfo", true);
                        }
                    }
                });
                break;
            case newInfos.formation:
                modelUser.updateOne({ email: userMail }, $set[{ emploiNow: newInfos.formation }], function (err, response) {
                    if (err) {
                        throw err;
                    }
                    else {
                        if (response) {
                            client.emit("reponseAddInfo", true);
                        }
                    }
                });
                break;
            case newInfos.listLastEmploy:
                modelUser.updateOne({ email: userMail }, $set[{ emploiNow: newInfos.listLastEmploy }], function (err, response) {
                    if (err) {
                        throw err;
                    }
                    else {
                        if (response) {
                            client.emit("reponseAddInfo", true);
                        }
                    }
                });
                break;
            case newInfos.listCompetence:
                modelUser.updateOne({ email: userMail }, $set[{ emploiNow: newInfos.emploiNow }], function (err, response) {
                    if (err) {
                        throw err;
                    }
                    else {
                        if (response) {
                            client.emit("reponseAddInfo", true);
                        }
                    }
                });
                break;
            case newInfos.listInterest:
                modelUser.updateOne({ email: userMail }, $set[{ emploiNow: newInfos.emploiNow }], function (err, response) {
                    if (err) {
                        throw err;
                    }
                    else {
                        if (response) {
                            client.emit("reponseAddInfo", true);
                        }
                    }
                });
                break;
            case newInfos.password:
                modelUser.updateOne({ email: userMail }, $set[{ emploiNow: newInfos.emploiNow }], function (err, response) {
                    if (err) {
                        throw err;
                    }
                    else {
                        if (response) {
                            client.emit("reponseAddInfo", true);
                        }
                    }
                });
                break;
        }
    });

    // Visists.js

    client.on('getVisits', (Email) => {
        modelVisits.findOne({ email: Email }, function (err, response) {
            if (err) {
                throw err;
            }
            else {
                if (response != null) {
                    client.emit("visitsResponse", response);
                }
                else {
                    client.emit("visitsResponse", null);
                }
            }
        })
    });

    function checkIfAlreadyKnown(userMail, userChecked) {
        modelVisits.findOne({ email: userMail }, function (err, response) {
            if (err) {
                throw err;
            }
            else {
                var boolUserAlreadyKnow;
                response.listVisitedByUser.map(function (item, index) {
                    if (item.name == userChecked) {
                        boolUserAlreadyKnow == true
                    }
                });
                if (boolUserAlreadyKnow == true) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
    }
});

io.listen(8081);