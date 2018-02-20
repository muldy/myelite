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



var LineByLineReader = require('line-by-line'),
      lr = new LineByLineReader('event_logs/event1.log');

  lr.on('error', function (err) {
  	// 'err' contains error object
  });

  lr.on('line', function (line) {
  	// pause emitting of lines...
  	lr.pause();

  	// ...do your asynchronous line processing..
    console.log(line);
  	setTimeout(function () {

  		// ...and continue emitting lines.
  		lr.resume();
  	}, 1000);
  });

  lr.on('end', function () {
  	// All lines are read, file is closed now.
  });
