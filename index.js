var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
});

io.on('connection', function(socket){
    io.emit('chat message', '你好哇。。');  // 默认推送
    //socket连接时触发
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);  // 推送到客户端
    });
    //socket失去连接【包括关闭浏览器，主动断开，掉线等任何断开连接的情况】
    socket.on('disconnect', function (data) {
        console.log("client disconnect");
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
