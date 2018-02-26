const {
    ipcMain
} = require('electron')

/* get active mission data  */
exports.bindBackend = function () {
    var process = require('./data_process')
    ipcMain.on('get_data', (event, arg) => {
        console.log(arg) // prints "ping"
        dbMissions.find({}).sort({
            DestinationSystem: 1,
            DestinationStation: 1
        }).exec(function (err, docs) {
            event.sender.send('data', {
                type: "active_missions",
                missions: docs,
                missionCount: docs.length,
                missionTargetSystems:process.getMissionGist(docs)
            })
        })
    })
}