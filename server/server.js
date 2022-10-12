const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());

var fs = require('fs');
const formidable = require('formidable');
//app.use(express.static(path.join(__dirname , '../dist/imageupload/')));
app.use('./images',express.static(path.join(__dirname , './images')));
require('./upload.js')(app,formidable,fs,path);

// code for sockets.io
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    }
});

const sockets = require('./sockets.js');
sockets.connect(io, PORT);
const url = 'mongodb://127.0.0.1:27017/' //'mongodb:localhost:27017/';
// connect to mongo database
MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
    if (err) {return console.log(err)}
        //require('./listen.js')
        const dbName = 'assessment';
        const db = client.db(dbName);
        console.log();

        require('./app/add.js')(db,app);
        require('./app/remove.js')(db,app);
        require('./app/update.js')(db,app);
        require('./app/getuser.js')(db, app, ObjectID);
        require('./app/login.js')(db, app);
        require('./sockets.js')(db,app);
        const server = require('./listen.js');
        server.listen(http, PORT);

});


