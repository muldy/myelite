
$(document).ready(function() {
  console.log("ready!");
  var socket = io.connect('http://localhost:' + "3000");
  socket.emit('event', "hello!");
  socket.on('event',function(data)
  {
    console.log("Server sent event: '"+JSON.stringify(data)+"'")
  });
  socket.on('disconnect', function(){
    console.log("Server disconnected")
  });
});
