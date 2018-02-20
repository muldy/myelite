exports.startServer = function() {
  var io = require('socket.io')();
  io.on('connection', function(client) {
    console.log("Client connected");

    client.on('event', function(data) {
      console.log("Client sent event: '" + data + "'")
    });

    client.on('disconnect', function() {
      console.log("Client disconnected")
    });



  });
  io.listen(3000);
  return io
}
