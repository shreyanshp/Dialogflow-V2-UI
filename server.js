"use strict";

const express = require("express"),
    bodyParse = require("body-parser"),
    server = express(),
    config = require('./config'),
    apiRoutes = require('./API/Routes/Routes'),
    morgan = require('morgan'),
    path = require('path');

// Sends static files  from the public path directory
server.use(express.static(path.join(__dirname, '/public')))

// Use morgan to log request in dev mode
server.use(morgan('dev'))

// Set Server Config
server.use(bodyParse.urlencoded({
    extended: true
}));
server.use(bodyParse.json());

server.use(function (request, response, next) {
    // Website you wish to allow to connect
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + config.Environment.Port);

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

// Configure Routes
server.use('/api', apiRoutes);

// Server index.html page when request to the root is made
server.get('/', function (request, response, next) {
    response.sendfile('./Public/index.html');
});

// Start Server
server.listen(config.Environment.Port, function () {
    console.log("Server is up and listening on port " + config.Environment.Port);
});