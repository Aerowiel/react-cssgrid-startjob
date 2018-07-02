

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

        clientSocket.on('getVisits', (email) => this.getVisits(email, clientSocket) );
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
                    console.log(allCards);
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
        var user = { name: User.name, username: User.username, dateOfBirth: User.dateOfBirth, email: User.email, password: User.password }
        SchemaManager.modelUser.create(user, function (err, userCreated) {
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
    }

    register(user, client) {
        var user = { name: User.name, username: User.username, dateOfBirth: User.dateOfBirth, email: User.email, password: User.password }
        SchemaManager.modelUser.create(user, function (err, userCreated) {
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
                SchemaManager.modelUser.updateOne({ email: userMail }, $set[{ picture: newInfos.picture }], function (err, response) {
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
        SchemaManager.modelVisits.findOne({ email: Email }, function (err, response) {
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