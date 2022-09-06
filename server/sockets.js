//const { socket } = require("socket.io");

module.exports = {
    connect: function(io,PORT){
        var rooms = ["room 1", "room 2", "room 3", "room 4"];
        var socketRoom = [];
        var socketRoomnum = [];
        var inroomSocketarray = false;
        var hasroomnum = false;
        const chat = io.of('/chat');

            chat.on('connection', (socket) => {
                socket.on('message', (message) => {
                    /*
                    for (i = 0; i < socketRoom.length; i++){
                        if (socketRoom[i][0] = socket.id){
                            chat.to(socketRoom[i][1]).emit('message', message);
                            console.log('message: ' + message);
                        }
                    }*/
                    chat.emit('message', message);
                });

                socket.on('newroom', (newroom) => {
                    if (rooms.indexOf(newroom) == -1){
                        console.log(newroom + 'created');
                        rooms.push(newroom);
                        chat.emit('roomlist', JSON.stringify(rooms));
                    }
                });

                socket.on('roomlist', () => {
                    chat.emit('roomlist', JSON.stringify(rooms));
                });
                
                socket.on('numusers', (room) => {
                    var usercount = 0;
                    for (i = 0; i < socketRoomnum.length; i++){
                        if(socketRoomnum[i][0] == room){
                            usercount = socketRoomnum[i][1].length;
                        }
                    }
                    return chat.in(room).emit('numusers', usercount);
                });

                socket.on('joinroom', (room) => {
                    if(rooms.includes(room)){
                        socket.join(room, () =>{
                            for (i = 0; i < socketRoom.length; i++){
                                if(socketRoom[i][0] == socket.id){
                                    socketRoom[i][1] = room;
                                    inroomSocketarray = true;
                                }
                            }
                            if(inroomSocketarray == true){
                                socketRoom.push([socket.id, room]);
                                for (let j = 0; j < socketRoomnum.length; j++){
                                    if (socketRoomnum[j][0] == room){
                                        socketRoomnum[j][1] = socketRoomnum[j][1] + 1;
                                        hasroomnum = true;
                                    }
                                }
                                if (hasroomnum == true){
                                    socketRoomnum.push([room, 1]);
                                }
                                chat.in(room).emit("notice", "A new user has joined");
                            }
                        });
                       return chat.in(room).emit('joined', room);
                    }
                });
                
                socket.on('leaveRoom', (room) => {
                    for (let i = 0; i<socketRoom.length; i++){
                        if (socketRoom[i][0] == socket.id){
                            socketRoom.splice(i,1);
                            socket.leave(room);
                            chat.to(room).send("notice", "a user has left");
                        }
                    }
                    for (let j = 0; j<socketRoomnum.length; j++){
                        if (socketRoomnum[j][0] == room){
                            socketRoomnum[j][1] == socketRoomnum[j][2] - 1;
                            if(socketRoomnum[j][1] == 0){
                                socketRoomnum.splice(j,1);
                            }
                        }
                    }
                });
                
                socket.on('disconect', ()=>{
                    chat.emit("disconnect");
                    for (let i = 0; i < socketRoom.length; i++){
                        if (socketRoom[i][0] == socket.id){
                            socketRoom.splice(i,1);
                        }
                    }
                    for (let j = 0; socketRoomnum.length; j++){
                        if (socketRoomnum[j][0] == socket.room){
                            socketRoomnum[j][1] = socketRoomnum[j][1] -1;
                        }
                    }
                    console.log("client disconnected");
                });
            });
        /*
        io.on('connection', (socket) => {
            console.log('user connection on port ' + PORT + ' : ' 
            + socket.id);

            socket.on('message', (message) =>{
                io.emit('message', message);
            })
        });
        */
    }
}