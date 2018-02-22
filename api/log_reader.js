exports.readLog = function(io, dbEvents, dbMissions, dbCommunityGoal) {

  var parser = require('./main_parser')

  var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('event_logs/event2.log');

  lr.on('error', function(err) {
    // 'err' contains error object
  });

  lr.on('line', function(line) {
    // pause emitting of lines...
    lr.pause();

    parser.parseEvent(line);

    io.emit('event', eventJSon);
    // ...do your asynchronous line processing..
    setTimeout(function() {

      // ...and continue emitting lines.
      lr.resume();
    }, 50);
  });

  lr.on('end', function() {
    // All lines are read, file is closed now.
  });
  return lr;
}
