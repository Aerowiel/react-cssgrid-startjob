global.mongoose = require('mongoose');
global.express = require('express');
global.bcrypt = require('bcrypt');
global.cloudinary = require('cloudinary');
global.connector = require('./../connectDB');
global.randomName = require('random-name');
global.io = require('socket.io')();
var SocketManager = require('../utils/SocketManager');
var SchemaManager = require('../utils/SchemaManager');
global.fs = require('fs');

// Schemas

cloudinary.config({ 
    cloud_name: 'night', 
    api_key: '434578959727647', 
    api_secret: 'V2Qq5--bpWM2oAMmTlOYRnnE5Jo' 
});

io.on('connection', (client) => {

    console.log("connection dispatcher.js");
    SocketManager.connect(client);
});

io.listen(8081);