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

redis.subscribe('user-notification');

io.on('connection', function(socket) {
	redis.on('message', function(channel, message) {
		socket.emit('user-notification/' + message.user_id, JSON.parse(message));
	});
});


