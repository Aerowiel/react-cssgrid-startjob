

class SocketManager {

    constructor() {

    }

    connect(clientSocket) {
        console.log('[SocketManager] connect() function called')
        console.log('[SocketManager] a client connected, client\'s socket id = ' + clientSocket.id)

        clientSocket.on('getAllCards', (interval) => this.getAllCards(interval, clientSocket));

        clientSocket.on('getMessages', (user) => this.getMessages(user, clientSocket));

        clientSocket.on('getNotification', (userMail) => this.getNotification(userMail, clientSocket));

        clientSocket.on('deleteThisNotification', (userMail, notificationToDelete) => this.deleteThisNotification(userMail, notificationToDelete, clientSocket));

        clientSocket.on('tryLogin', (user) => this.tryLogin(user, clientSocket));

        clientSocket.on('register', (user) => this.register(user, clientSocket));

        clientSocket.on('addInfoToProfil', (userMail, newInfos) => this.addInfosToProfil(userMail, newInfos, clientSocket));

        clientSocket.on('getVisits', (email) => this.getVisits(email, clientSocket));
    }

    getAllCards(interval, client) {
        console.log('[SocketManager] getAllCards function called')
        SchemaManager.modelUser.find({}, function (err, allCards) {
            if (err) {
                throw err;
            }
            else {
                if (allCards == null) {
                    client.emit('responseGetAllCards', null);
                }
                else {
                    client.emit('responseGetAllCards', allCards);
                }
            }
        });
    }

    getMessages(user, client) {
        SchemaManager.modelMessage.find({ username: user }, function (err, responseListConv) {
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
    }

    getNotification(userMail, client) {
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
    }

    deleteThisNotification(userMail, notificationToDelete, client) {
        SchemaManager.modelNotification.findOne({ userMail: userMail }, function (err, responseNotification) {
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
    }

    tryLogin(user, client) {
        var userToFind = {email : user.email};
        SchemaManager.modelUser.findOne(userToFind, function(err, connectedUser){
            if(err){
                    throw err;
            }
            else{
                if(connectedUser != null){
                    if(connectedUser.password == user.password){
                        console.log('[SocketManager] function tryLogin()');
                        UserManager.createUser(connectedUser._id, client.id, connectedUser.name, connectedUser.username, connectedUser.email, []);

                        client.emit('responseTryLogin', connectedUser);
                    }
                    else{
                        client.emit('responseTryLogin', null);
                    }
                }
                else{
                    client.emit('responseTryLogin', null);
                }
            }
        });
    }

    register(user, client) {
        console.log("register server side", user)
        var user = { name: user.name, username: user.username, dateOfBirth: user.dateOfBirth, email: user.email, password: user.password, emploiNow: null,picture:null, formation: null, listLastEmploy: null, description: null, listCompetence: null, listInterest: null  }
        SchemaManager.modelUser.findOne({mail : user.email}, function(err, response){
            if(err){
                throw err;
            }
            else{
                if(response == null){
                    SchemaManager.modelUser.create(user, function (err, userCreated) {
                        if (err) {
                            throw err;
                        }
                        else {
                            console.log("userCreated", userCreated);
                            if (userCreated != null) {
                                var userVisists = { id: userCreated._id, userMail: userCreated.email, listUserVisit: [], listVisitedByUser: []};
                                SchemaManager.modelVisits.create(userVisists, function(err, userVisitCreated){
                                    if(err){
                                        throw err;
                                    }
                                    else{
                                        console.log(userVisitCreated);
                                        var userNotification = {id: userCreated._id, userMail: userCreated.email, listNotification: []};
                                        SchemaManager.modelNotification.create(userNotification, function(err, userNotificationCreated){
                                            if(err){
                                                throw err;
                                            }
                                            console.log(userNotificationCreated);
                                            var userMessage = {id: userCreated._id, userMail: userCreated.email, userInTalk: null, conversation: []};
                                            SchemaManager.modelMessage.create(userMessage, function(err, userMessageCreated){
                                                if(err){
                                                    throw err;
                                                }
                                                console.log(userMessageCreated);
                                                client.emit("responseRegister", userCreated);
                                            });
                                        });
                                    }
                                });
                            }
                            else {
                                client.emit("responseRegister", null);
                            }
                        }
                    });
                }
            }
        });
    }

    addInfosToProfil(userMail, newInfos, client) {
        switch (newInfos) {
            case newInfos.emploiNow:
                var lastJob;
                var newListLastJob = [];
                SchemaManager.modelUser.findOne({ email: userMail }, function (err, response) {
                    if (err) {
                        throw err;
                    }
                    else {
                        lastJob = response.emploiNow;
                        newListLastJob.push(response.listLastEmploy);
                        newListLastJob.push(lastJob);
                        SchemaManager.modelUser.updateOne({ email: userMail }, $set[{ emploiNow: newInfos.emploiNow }, { listLastEmploy: newListLastJob }], function (err, response) {
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
                SchemaManager.modelUser.findOne({ email: userMail }, function (err, response) {
                    if (err) {
                        throw err;
                    }
                    else {
                        cloudinary.v2.uploader.upload(newInfos.picture,{ public_id : response.public_id},
                            function(error, result) {
                                if(error){
                                    console.log(error);
                                }
                                signature = result.signature;
                                SchemaManager.modelUser.updateOne({ _id: response._id }, { $set: { picture: result.secure_url }},function(err, response){
                                    if(err){
                                        throw err;
                                    }
                                    else{
                                        client.emit("responseAddInfosToProfil", response)
                                    }
                            });
                        });
                    }
                });
                
                break;
            case newInfos.formation:
                SchemaManager.modelUser.updateOne({ email: userMail }, $set[{ emploiNow: newInfos.formation }], function (err, response) {
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
                SchemaManager.modelUser.updateOne({ email: userMail }, $set[{ emploiNow: newInfos.listLastEmploy }], function (err, response) {
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
                SchemaManager.modelUser.updateOne({ email: userMail }, $set[{ emploiNow: newInfos.emploiNow }], function (err, response) {
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
                SchemaManager.modelUser.updateOne({ email: userMail }, $set[{ emploiNow: newInfos.emploiNow }], function (err, response) {
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
                SchemaManager.modelUser.updateOne({ email: userMail }, $set[{ emploiNow: newInfos.emploiNow }], function (err, response) {
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
    }

    getVisits(email, client) {
        SchemaManager.modelVisits.findOne({ email: email }, function (err, response) {
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
    }




    // utils

    addNotificationToThisUser(userTargeted, newNotification) {
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

    checkIfAlreadyKnown(userMail, userChecked) {
        SchemaManager.modelVisits.findOne({ email: userMail }, function (err, response) {
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

   

}

const instance = new SocketManager();
module.exports = instance;

const SchemaManager = require('../SchemaManager');

const UserManager = require('../UserManager');