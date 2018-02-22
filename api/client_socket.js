exports.startServer = function(webSock,dbEvents, dbMissions, dbCommunityGoal) {
    
    var socket = require('socket.io-client')('http://localhost:8666/test');
    var parser = require('./main_parser')

    socket.on('connect', function(){
        console.log("CLient socket connected!")
    });
    socket.on('main_log', function(data){
        parser.parseEvent(data,dbEvents, dbMissions, dbCommunityGoal);        
        webSock.emit('event', data);
        //console.log(data)
    });
    socket.on('disconnect', function(){
        console.log("CLient socket disconnected!")
    });

    
return socket;
}