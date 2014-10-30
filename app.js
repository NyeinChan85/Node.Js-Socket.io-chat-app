var express = require('express');
	app   	= express(),
	http	= require('http');
	server 	= http.createServer(app);
	io 		= require('socket.io').listen(server);


app.get('/', function(request, response){
	response.sendfile(__dirname + '/public/index.html');
});  
app.use(express.static(__dirname + '/public'));


io.sockets.on('connection', function(client){
	client.on('join', function(name){
		client.nickname = name;
	});

	client.on('client messages', function(data){
		var nickname = client.nickname;
		io.sockets.emit('server messages', nickname + " : " + data);
	});
} );

server.listen(8000);