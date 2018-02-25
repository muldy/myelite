const {ipcMain} = require('electron')
exports.startServer = function(mainWin,dbEvents, dbMissions, dbCommunityGoal) {
    
    var socket = require('socket.io-client')('http://localhost:8666/test');
    var parser = require('./main_parser')

    socket.on('connect', function(){
        console.log("CLient socket connected!")
    });
    socket.on('event', function(data){
        parser.parseEvent(data,dbEvents, dbMissions, dbCommunityGoal);        

        console.log(data)
        mainWin.webContents.send('event' , data);
    });
    socket.on('disconnect', function(){
        console.log("CLient socket disconnected!")
    });

    
return socket;
}