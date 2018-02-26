exports.readLog = function (mainWin, dbEvents, dbMissions, dbCommunityGoal) {

  var parser = require('./main_parser')

  var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('event_logs/event2.log');

  lr.on('error', function (err) {
    // 'err' contains error object
  });

  lr.on('line', function (line) {
    // pause emitting of lines...
    lr.pause();

    line = JSON.parse(line)
    parser.parseEvent(line, dbEvents, dbMissions, dbCommunityGoal);

    mainWin.webContents.send('journal',{data: line});
    // ...do your asynchronous line processing..
    setTimeout(function () {

      // ...and continue emitting lines.
      lr.resume();
    }, 5000);
  });

  lr.on('end', function () {
    // All lines are read, file is closed now.
  });
  return lr;
}