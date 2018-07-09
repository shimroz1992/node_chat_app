var socket = io();

socket.on('connect', function () {
  console.log('Connected to server.');
})

socket.on('disconnect', function () {
  console.log('Disconnected to server.');
})


socket.on('newMessage', function(msg){
  var li = $('<li></li>');
  li.text(`${msg.from} : ${msg.text}`);
  $('#messages').append(li);
  console.log('new message received', msg);
})

// socket.emit('createMessage', {from: 'andrew', text: 'hi'}, function(res){
//   console.log(res);
// })


$('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function(){
    console.log('callback received on index.js');
  });

})