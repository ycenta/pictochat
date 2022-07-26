var express = require('express');
var app = express();
var server   = require('http').Server(app);
var io       = require('socket.io')(server);
var users = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// app.use(express.static('public'));
app.use('/public', express.static('public'));


io.on('connection', (socket) => {
  // console.log('a user connected');

  socket.on('create', function(room) {
    socket.join(room);
    // users[socket.id] = room;
    socket.room = room;
    console.log(room);
  });


  socket.on('disconnect', () => {       
    // console.log('user disconnected');
    //Vider l'array users['socket.id] en se deconnectant 
  });

  socket.on('chat message', (msg, username) => {
    if(!username){
      username= "anonymous";
    }
    //users[socket.id]
    io.to(socket.room).emit('chat message', username + ": "+ msg); //Envoyer le message dans sa room
  });

  socket.on('username', (username) => {
    console.log("new username set : "+username)
  });
  
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
