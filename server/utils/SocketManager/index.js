

class SocketManager {

    constructor() {
        //Random populate DB

    }
    connect(clientSocket) {

        console.log('[SocketManager] connect() function called')
        console.log('[SocketManager] a client connected, client\'s socket id = ' + clientSocket.id)

        this.checkIfUserExists(clientSocket);

        clientSocket.on('answerCheckIfClientExists', (clientsocketid) => this.answerCheckIfClientExists(clientsocketid, clientSocket))

        clientSocket.on('componentDidMount', () => console.log('componentDidMount()'))

        clientSocket.on('getAllCards', (interval) => this.getAllCards(interval, clientSocket));

        clientSocket.on('getMessages', (user) => this.getMessages(user, clientSocket));

        clientSocket.on('getNotification', (userMail) => this.getNotification(userMail, clientSocket));

        clientSocket.on('deleteThisNotification', (userMail, notificationToDelete) => this.deleteThisNotification(userMail, notificationToDelete, clientSocket));

        clientSocket.on('tryLogin', (user) => this.tryLogin(user, clientSocket));

        clientSocket.on('register', (user) => this.register(user, clientSocket));

        clientSocket.on('addInfoToProfil', (userMail, newInfos) => this.addInfosToProfil(userMail, newInfos, clientSocket));

        clientSocket.on('getVisits', (email) => this.getVisits(email, clientSocket));

        clientSocket.on('getFriend', (email) => this.getFriends(email, clientSocket));

        clientSocket.on('onMessage', (obj) => ChatManager.onMessage(obj.message, clientSocket.id, UserManager.getUserByEmail(obj.receiver).socketid ) );

        clientSocket.on('getAllOffers', () => this.getAllOffers(clientSocket));

        clientSocket.on('getAllMessages', (user, userInTalk) => this.getAllMessages(user,userInTalk,clientSocket));
        
        clientSocket.on('sendMessageByChat', (message,user,userInTalk) => this.sendMessageChat(message,user,userInTalk, clientSocket))
        //DECOMMENT THIS LINE FOR POPUALTE YOUR MONGODB
        // this.populateDB();
      }

    answerCheckIfClientExists(clientsocketid, client){
      if(clientsocketid !== null){
        UserManager.updateUserSocketID(UserManager.getUserBySocketID(clientsocketid), client.id);
      }
    }

    checkIfUserExists(client){
      console.log("[SocketManager] checkIfUserExists() function called");
      console.log('to : ' + client.id)
      io.sockets.to(client.id).emit('checkIfUserExists');
    }
    getAllMessages(user, userInTalk, client){
        SchemaManager.modelMessage.findOne({ userName: user}, function (err, responseListConv) {
            if (err) {
                throw err;
            }
            else {
                responseListConv.conversations.forEach(function(element, index){
                    element.forEach(function(item, i){
                        if(item.userInTalk == userInTalk){
                            if (item.conversation.length > 0) {
                                client.emit("responseGetAllMessages", item.conversation);
                            }
                        }
                    });
                   
                    
                });
            }
        });
    }

    sendMessageChat(message, user, userInTalk, client){
        console.log("sennnd message", message, user, userInTalk);
        SchemaManager.modelMessage.findOne({userName: user}, function (err, responseListConv) {
            if(err){
                throw err;
            }
            else{
                console.log("RESPONNNnnNNNNNNNNNNSSSSSSS",responseListConv);
               if(!responseListConv.conversations.length > 0){
                   console.log("no conversation");
                   var newConv = { userInTalk : userInTalk, conversation :[{name: user}, {date : Date.now()}, {message: message}]};
                    SchemaManager.modelMessage.updateOne({userName: user},{$set:{conversations : newConv}}, function(err, response){
                        if(err){
                            throw err;
                        }
                        else{
                            console.log(response);
                        }
                    })
                }
                else{
                    console.log("conversation exists");
                    responseListConv.conversations.forEach(function(element, index){
                        if(element.userInTalk == userInTalk){
                            console.log()
                            var NewMessage= { userInTalk : userInTalk, conversation :[{name: user}, {date : Date.now()}, {message: message}]};
                            element.conversation.push(NewMessage);
                            SchemaManager.modelMessage.updateOne({ userName: user}, {$set:{conversations : responseListConv.conversations}}, function(err, response){
                                if(err){
                                    throw err;
                                }
                                else{
                                    client.emit("responseSendMessageByChat", response);
                                }
                            }); 

                        }
                    });
                }

            }
        });
    }

    populateDB(){
    
        var listCompetence =["C", "C#","C++","AngularJS","Angular 2", "Angular 4", "Angular 5", "ReactJS", "Python", "git", "docker", "java", "j2ee", "kotlin","swift", "cordova", "html", "css", "js", "VueJs", "Ajax", "Jquery", "php"]
        var listEmploiNow= ["Developpeur Mobile", "Designer", "Chef de Projet", "Developper Web", "Consultant Technique", "DataScientist"];
        var listFormation = ["HEC", "EPITECH", "YNOV", "Bac Pro Cuisine", "BTP"];
        var listLastJob = ["Pere Noel", "Kebabier", "Epouvantail", "Astronaute", "Bourreau", "Président de la République"];
        var listInterest =["sport", "gaming", "tchilling", "Holidays"];
        var listDescription=["J'adore la biere", "Je suis passionée par les bonzais","Mon secret est que ce n'est pas moi sur cette carte", "C'est ma 300e candidature pour un stage","Spoil GOT: Tyrion fini par grandir"];
        // Random Creating User
        for(var i=0; i <194; i++){
            console.log("super")
            var nameRandom = randomName.last()
            var firstName = randomName.first()
            var populateComp = [];
            for(var x=0; x <4; x++){
                 var item = listCompetence[Math.floor(Math.random()*listCompetence.length)];
                 populateComp.push(item)
            }

            var picture = "/src/images/randomPic/fakePic"+i+".jpg"
            var user = { name: nameRandom, username: firstName,dateOfBirth: "", email: nameRandom+"."+firstName+"@gmail.com", password: nameRandom, emploiNow: listEmploiNow[Math.floor(Math.random()*listEmploiNow.length)],picture:picture, formation: listFormation[Math.floor(Math.random()*listFormation.length)], listLastEmploy: listLastJob[Math.floor(Math.random()*listLastJob.length)], description: listDescription[Math.floor(Math.random()*listDescription.length)], listCompetence: populateComp, listInterest: listInterest[Math.floor(Math.random()*listInterest.length)]  }

            SchemaManager.modelUser.create(user, function(err, response){
                if(err){
                    throw err;
                }
                else{
                    console.log(response);
                }
            });
        }
    }
    getAllOffers(client){
        console.log("getAlloffer called")
        SchemaManager.modelOffers.find({}, function(err, response){
            if(err){
                throw err; 
            }
            else{
                console.log(response);
                if(response != null){
                    client.emit("responseGetAllOffer", response);
                }
            }
        });
    }

    getFriends(email, client){
        console.log("getFriend", email);
        SchemaManager.modelUser.findOne({ email: email }, function (err, responseUser) {
            if (err) {
                throw err;
            }
            else {
                console.log(responseUser);
                if (responseUser != null) {
                    client.emit("responseGetFriend", responseUser);
                }
                else {
                    client.emit("responseGetFriend", null);
                }
            }
        });
    }

    getAllCards(interval, client) {
        console.log('[SocketManager] getAllCards() function called')
        SchemaManager.modelUser.find({}, function (err, allCards) {
            if (err) {
                throw err;
            }
            else {
                var arrayAllResponse = [];
                allCards.forEach(function(element, index){
                    if(index <10){
                        var item = allCards[Math.floor(Math.random()*allCards.length)];
                        arrayAllResponse.push(item);
                    }
                });
                client.emit('responseGetAllCards', arrayAllResponse);
            }
        });
    }


    getNotification(userMail, client) {
      console.log('[SocketManager] getNotification() function called')
        var listNewNotification = [];
        SchemaManager.modelNotification.findOne({ userMail: userMail }, function (err, responseNotifications) {
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
        console.log('[SocketManager] deleteThisNotification() function called')
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
        console.log('[SocketManager] tryLogin() function called')
        var userToFind = {email : user.email};
        SchemaManager.modelUser.findOne(userToFind, function(err, connectedUser){
            if(err){
                    throw err;
            }
            else{
                if(connectedUser != null){
                    if(connectedUser.password == user.password){
                        console.log('[SocketManager] function tryLogin() success');
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
        console.log('[SocketManager] register() function called')
        console.log("register server side", user)
        var user = { name: user.name, username: user.username, dateOfBirth: user.dateOfBirth, email: user.email, password: user.password, emploiNow: "test",picture:"/src/images/user.png", formation: "formation", listLastEmploy: ["emploi1", "emploi2"], description: "description", listCompetence: ["C","C++"], listInterest: ["Pere Noel", "Drake"], friendList:["superUser@startJob.com"]  }
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
                                            var userMessage = {id: userCreated._id, userName: userCreated.email,conversations: []};
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

        // this.populateDB();
    }

    addInfosToProfil(userMail, newInfos, client) {
        console.log('[SocketManager] addInfoToProfil() function called')
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
        console.log('[SocketManager] getVisits() function called')
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
        console.log('[SocketManager] addNotificationToThisUser() function called')
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
        console.log('[SocketManager] checkIfAlreadyKnown() function called')
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

const ChatManager = require('../ChatManager');
