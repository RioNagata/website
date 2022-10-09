const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

const PORT = 3000;
const sockets = require('./socket.js');

app.use(cors());
app.use(bodyParser.json());
const url = 'mongodb://127.0.0.1:27017/' //'mongodb:localhost:27017/';
MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
    if (err) {return console.log(err)}
        //require('./listen.js')
        const dbName = 'assessment';
        const db = client.db(dbName);
        console.log();

        require('./app/add.js')(db,app);
        require('./app/remove.js')(db,app);
        require('./app/update.js')(db,app);
        require('./app/getuser.js')(db, app, ObjectID)
        require('./app/login.js')(db, app);
        const PORT = 3000;
        const server = require('./listen.js');
        server.listen(http, PORT);

});

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    }
});

sockets.connect(io, PORT);