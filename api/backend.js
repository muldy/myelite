const {
    ipcMain
} = require('electron')

/* get active mission data  */
exports.bindBackend = function (mainDb) {
    var process = require('./data_process')
    ipcMain.on('get_data', (event, arg) => {
        console.log("Get data: ", arg)
        if (arg == "active_missions") {
            mainDb.dbMissions.find({}).sort({
                DestinationSystem: 1,
                DestinationStation: 1
            }).exec(function (err, docs) {

                var gistMissions = process.getMissionGist(docs)
                //gistMissions=Object.keys(gistMissions).map(x=>gistMissions[x])

                event.sender.send('data', {
                    type: "active_missions",
                    missions: docs,
                    missionCount: docs.length,
                    missionTargetSystems: gistMissions
                })
            })
        }
        else if (arg == "community_goals") {
            mainDb.dbCommunityGoal.find({}).sort({
                Expiry:1
            }).exec(function (err, docs) {

                event.sender.send('data', {
                    type: "community_goals",
                    goals: docs,
                })
            })
        }
        else if (arg == "ranks") {
            mainDb.dbRanks.find({}).sort({
                timestamp:1
            }).exec(function (err, docs) {

                event.sender.send('data', {
                    type: "ranks",
                    ranks: docs,
                })
            })
        }
        else if (arg == "load") {
            mainDb.dbLoads.find({}).sort({
                timestamp:1
            }).exec(function (err, docs) {

                event.sender.send('data', {
                    type: "ranks",
                    loads: docs,
                })
            })
        }
        else if (arg == "progress") {
            mainDb.dbLoads.find({}).sort({
                timestamp:1
            }).exec(function (err, docs) {

                event.sender.send('data', {
                    type: "ranks",
                    progress: docs,
                })
            })
        }
    })
}