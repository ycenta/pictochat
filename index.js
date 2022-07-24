var express = require('express');
var app = express();
var server   = require('http').Server(app);
var io       = require('socket.io')(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  // console.log('a user connected');

  socket.on('create', function(room) {
    socket.join(room);
    console.log(room);
  });


  socket.on('disconnect', () => {       
    // console.log('user disconnected');
  });

  socket.on('chat message', (msg, username) => {
    //console.log("username :"+username);
    if(!username){
      username= "anonymous";
    }
    // io.to(2).emit('chat message', username + ": "+ msg);
  });

  socket.on('username', (username) => {
    console.log("new username set : "+username)
  });
  
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});