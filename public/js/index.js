var socket = io();

socket.on('connect', function () {
  console.log('Connected to server.');

  socket.emit('createMessage', {
    from: 'test@yopmail.com',
    text: 'message'
  })
})

socket.on('disconnect', function () {
  console.log('Disconnected to server.');
})


socket.on('newMessage', function(msg){
  console.log('new message received', msg);
})