var io = require('socket.io')();
io.on('connection', function(client){
    client.on('event', function(data){
        console.log(data);
    });
    client.on('disconnect', function(){
    });
    io.emit('main_log',"crapper")
});
io.listen(8666);
