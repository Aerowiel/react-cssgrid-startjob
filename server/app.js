var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var logger = require('morgan');

var dispatcher = require('./socketServer/Dispatcher')
var requireDir = require('require-dir');
/*var socketUser = require('./socketServer/User');
var socketCards = require('./socketServer/Cards');
var socketMessage = require('./socketServer/Message');
var socketNotifications = require('./socketServer/Notifications');
var socketVisits = require('./socketServer/Visits');*/



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;
