var app = require('http').createServer(handler);
	io = require('socketio')(app);
	fs = require('fs');
	redis = require('redis').createClient();

app.listen(8080);

function handler (req, res) {
	fs.readFile('app/index.html', function(err, data) {
		if (err) {
			res.writeHead(500);
			return res.ennd('Error loading index.html');
		}

		res.writeHead(200);
		res.end(data);
	} );
}

redis.subscribe('contest-comment', 'user-notification');

io.on('connection', function(socket) {
	console.log('Client connnected!');
	redis.on('message', function(channel, message) {
		mes = JSON.parse(message);
		if (mes.cid) {
			console.log(mes);
			socket.emit('contest-comment/' + mes.cid, mes);
		};
		if (mes.user_id) {
			console.log(mes.user_id);
			socket.emit('user-notification/' + mes.user_id, mes);
		};
	});
});


