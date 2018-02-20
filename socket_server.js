var io = require('socket.io')();

const namespace="/test"

var test = io.of(namespace);

test.on('connection', function(client){
  console.log("Client connected!")
  client.on('event', function(data){});
  client.on('disconnect', function(){
    console.log("Client disconnected!")
  });
});
io.listen(3000);
