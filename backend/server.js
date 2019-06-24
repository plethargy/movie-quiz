"use strict";
const http = require('http');

const app = require('./app');

const port = 5000 || process.env.PORT;

const server = http.createServer(app);

server.listen(port);

const mongoose = require('mongoose');



const dbURL = 'mongodb+srv://sugar:sugar123@cluster0-wki2e.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(dbURL, { useNewUrlParser: true});

mongoose.connection.on('connected', function(){
    console.log(`Mongoose default connection is open`);
});

mongoose.connection.on('error', function(err){
    console.log(`Mongoose default connection has occured ${err} error`);
});

mongoose.connection.on('disconnected', function(){
    console.log(("Mongoose default connection is disconnected"));
});

process.on('SIGTERM', function(){
    mongoose.connection.close(function(){
        console.log(("Mongoose default connection is disconnected due to application termination"));
        process.exit(0)
    });
});

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log(("Mongoose default connection is disconnected due to application termination"));
        process.exit(0)
    });
});
