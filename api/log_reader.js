exports.readLog = function (mainWin, mainDb, path) {
    var parser = require('./main_parser')

    const fs = require('fs');
    var LineByLineReader = require('line-by-line')

    var lineNumber = 0;

    console.log("Reading from log: " + path)
    lr = new LineByLineReader(path);

    lr.on('error', function (err) {
        // 'err' contains error object
    });

    lr.on('line', function (line) {
        // pause emitting of lines...
        lr.pause();

        console.log(line)
        try {

            line = JSON.parse(line)
            parser.parseEvent({
                data: line
            }, mainDb);
            mainWin.webContents.send('journal', {
                data: line
            });
            // ...do your asynchronous line processing..
        } catch (error) {
            console.log(error)
        }
        setTimeout(function () {

            // ...and continue emitting lines.
            lr.resume();
        }, 5000);
    });

    lr.on('end', function () {
        // All lines are read, file is closed now.
    });

    console.log("Finished all logs")


    console.log('end of line reached');
}