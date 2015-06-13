var express = require('express');
var	app = express();
var server = require('http').Server(app);
var	io = require('socketio')(server);
var	path =require('path');
var	redis = require('redis').createClient();

	app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.sendFile('index.html');
});


server.listen(8080, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log(host, port);
});

redis.subscribe('contest-comment', 'user-notification', 'feed-update');

io.on('connection', function(socket) {
	console.log('Client connnected!');
	redis.on('message', function(channel, message) {
		mes = JSON.parse(message);
		if (mes.cid) {
			console.log(mes);
			socket.emit('contest-comment/' + mes.cid, mes);
		};
		if (mes.pid) {
			socket.emit('participation-comment/' + mes.pid, mes);
		};
		if (mes.user_id) {
			console.log(mes.user_id);
			socket.emit('user-notification/' + mes.user_id, mes);
		};
		if (mes.comment_count) {
			socket.emit('feed-update', mes);
		}
	});
});


