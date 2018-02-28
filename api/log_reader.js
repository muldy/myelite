exports.readLog = function (mainWin, dbEvents, dbMissions, dbCommunityGoal) {

var lineByLine = require('n-readlines');
var parser = require('./main_parser')
var liner = new lineByLine('event_logs/event2.log');

var line;
var lineNumber = 0;
while (line = liner.next()) {
    line = JSON.parse(line.toString())
    parser.parseEvent({data:line}, dbEvents, dbMissions, dbCommunityGoal);

    mainWin.webContents.send('journal',{data: line});
    lineNumber++;
}

console.log('end of line reached');
}