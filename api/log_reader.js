exports.readLog = function(io) {

  var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('event_logs/event0.log');

  lr.on('error', function(err) {
    // 'err' contains error object
  });

  lr.on('line', function(line) {
    // pause emitting of lines...
    lr.pause();

    console.log(line);
    io.emit('event', line);
    // ...do your asynchronous line processing..
    setTimeout(function() {

      // ...and continue emitting lines.
      lr.resume();
    }, 9999);
  });

  lr.on('end', function() {
    // All lines are read, file is closed now.
  });
  return lr;
}
