global.mongoose = require('mongoose');
global.express = require('express');
global.bcrypt = require('bcrypt');
global.cloudinary = require('cloudinary');
global.connector = require('./../connectDB');

global.io = require('socket.io')();
var SocketManager = require('../utils/SocketManager');
var SchemaManager = require('../utils/SchemaManager');

// Schemas


io.on('connection', (client) => {

    console.log("connection dispatcher.js");
    SocketManager.connect(client);

});

io.listen(8081);