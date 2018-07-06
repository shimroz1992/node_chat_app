const path  = require('path');
const express  = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000

const {generateMessage} = require('./utils/message');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) =>{
  console.log('New User connected');
  socket.emit('newMessage',{
  	from: 'Admin',
  	text: 'Welcome to chat room',
  	createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined chat room'));

  socket.on('createMessage', function(msg){
    console.log('new message created', msg);
    socket.emit('newMessage', generateMessage(msg.from, msg.text));
    // socket.broadcast.emit('newMessage', {
    // 	from: msg.from,
    // 	text: msg.text,
    // 	createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', ()=>{
    console.log('disconnected form client.'); 	
  })

  socket.emit('newEmail', generateMessage('test@yopmail.com', 'hey how are you'));
})

app.use(express.static(publicPath));

server.listen(port, ()=>{
  console.log(`server is on ${port}`);
})