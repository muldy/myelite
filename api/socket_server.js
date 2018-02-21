exports.startServer = function(server) {

  var io = require('socket.io')(server);
  io.on('connection', function(client) {
    console.log("Client connected");

    client.on('event', function(data) {
      console.log("Client sent event: '" + data + "'")
    });

    client.on('disconnect', function() {
      console.log("Client disconnected")
    });



  });
  server.listen(3000);
  return io
}
