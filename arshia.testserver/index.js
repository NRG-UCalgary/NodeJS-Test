var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var cookieParser = require('cookie-parser')
var session = require('express-session')
var port = 8000
var nameList = {}
var sess;
var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

app.use(express.static(__dirname + '/public'));

function genuuid(){
    return Math.floor(Math.random() * 10000) + 1;
}

app.use(cookieParser())
app.use(session({
  secret: 'nrg@lab',
  name: 'nrgId',
  cookie: {
      httpOnly: true,
      expires: expiryDate
    }

}));

app.get('/',function(req, res){
    
    res.sendFile(__dirname+'/index.html')
    if(req.session.views){
        req.session.views += 1;
        
    }
    else{
        req.session.vews = 1
    }
    console.log(req.session.cookie);
    sess = req.session.cookie;
        
    
});

io.on('connection',function(socket){
    console.log('User connected');
    socket.on('name',function(name){
        var name_ = name.name;
        var lastname_ = name.lastname;
        console.log('Your name is: '+name_+' '+lastname_);
        console.log(nameList[sess]);
        if(!nameList[sess])
            nameList[sess] = name
        else
            socket.emit('nameCookie',nameList[req.session.cookie]);
    });
        

    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
});


http.listen(port, function(){
    console.log('Listening on port '+port);
});
