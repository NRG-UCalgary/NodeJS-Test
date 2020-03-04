var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = 8000


app.get('/',function(req, res){
    res.sendFile(__dirname+'/index.html')
});

io.on('connection',function(socket){
    console.log('User connected');
    socket.on('name',function(name){
        var name_ = name.name;
        var lastname_ = name.lastname;
        console.log('Your name is: '+name_+' '+lastname_);

    });
});

http.listen(port, function(){
    console.log('Listening on port '+port);
});
