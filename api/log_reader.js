exports.readLog = function (mainWin, dbEvents, dbMissions, dbCommunityGoal) {
    var parser = require('./main_parser')

    const fs = require('fs');
    var LineByLineReader = require('line-by-line')

    var lineNumber = 0;
    const testFolder = './event_logs/';

    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            console.log("Reading from log: " + testFolder + file)
            lr = new LineByLineReader(testFolder + file);

            lr.on('error', function (err) {
                // 'err' contains error object
            });

            lr.on('line', function (line) {
                // pause emitting of lines...
                lr.pause();

                console.log(line)
                try{

                    line = JSON.parse(line)
                    parser.parseEvent({data:line}, dbEvents, dbMissions, dbCommunityGoal);

                    mainWin.webContents.send('journal', {
                        data: line
                    });
                    // ...do your asynchronous line processing..
                } catch (error)
                {
                    console.log(error)
                }
                setTimeout(function () {

                    // ...and continue emitting lines.
                    lr.resume();
                }, 1000);
            });

            lr.on('end', function () {
                // All lines are read, file is closed now.
            });

            console.log("Finished all logs")
        });
    })

    console.log('end of line reached');
}