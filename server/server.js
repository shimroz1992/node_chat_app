const path  = require('path');
const express  = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) =>{
  console.log('New User connected');
  
  socket.on('createMessage', function(msg){
    console.log('new message created', msg);
    io.emit('newMessage', {
    	from: msg.from,
    	text: msg.text,
    	createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', ()=>{
    console.log('disconnected form client.'); 	
  })

  socket.emit('newEmail', {
  	from: 'test@yopmail.com',
  	text: 'hey how are you',
  	createdAt: 123
  });
})

app.use(express.static(publicPath));

server.listen(port, ()=>{
  console.log(`server is on ${port}`);
})