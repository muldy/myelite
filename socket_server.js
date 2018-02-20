var io = require('socket.io')();
io.on('connection', function(client){
  console.log("Client connected");

  client.on('event', function(data){
    console.log("Client sent event: '"+data+"'")
  });

  client.on('disconnect', function(){
    console.log("Client disconnected")
  });



});
io.listen(3000);

var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('event_logs/event1.log');

lr.on('error', function (err) {
	// 'err' contains error object
});

lr.on('line', function (line) {
	// pause emitting of lines...
	lr.pause();

console.log(line);
io.emit('event',line);
	// ...do your asynchronous line processing..
	setTimeout(function () {

		// ...and continue emitting lines.
		lr.resume();
	}, 10000);
});

lr.on('end', function () {
	// All lines are read, file is closed now.
});
