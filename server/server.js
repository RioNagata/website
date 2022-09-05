var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());

//var request = require('request');


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '../dist/week4tut/'));
console.log(__dirname);

var http = require("http").Server(app);
/*var server = http.listen(3000, function(){
    console.log("server listening on port: 3000");
});*/

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    }
});
//const io = require('socket.io')(http);

const sockets = require('./sockets.js');
const server = require('./listen.js');

const PORT = 3000;
sockets.connect(io, PORT);
server.listen(http, PORT);

app.post('/login', require('./postLogin.js'));
app.post('/loginAfter', require('./postLoginafter.js'));