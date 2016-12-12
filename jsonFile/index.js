//requiring express.js
var app = require('express')();
//setting up http server via express
var http = require('http').Server(app);
//adding socket.io service
var io = require('socket.io')(http);
//assign port to variable
var Port = process.env.PORT || 3000;

//basic get function
app.get('/', function(request, response){
    response.sendFile(__dirname + '/index.html');
});

//socket.io implementation
io.on('connection', function(socket){
    console.log('User logged');
    //this logs a message
    socket.on('chat message', function(msg){ 
        console.log('message: ' + msg);
        //this sends our message to the client page
        io.emit('chat message', msg);
    });
    
    //this logs when user leaves
    socket.on('disconnect', function(){
        console.log('User signed off');
    });
});

//fire up the server
http.listen(Port, function(){
    console.log('All good to go on localhost:' + Port + ', sire');
});

