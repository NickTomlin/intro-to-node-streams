var shoe = require('shoe');
var http = require('http');
var uuid = require('uuid');
var through = require('through');
var fs = require('fs');
var ecstatic = require('ecstatic')(__dirname + '/public');
var PORT = 8080;

var connections = {};
var server = http.createServer(ecstatic);

// unfortunately this won't work because shoe
// streams don't have an 'unpipe' method
var writer = through(function (buff) {
  // we should turn object mode on initially
  // and then stringify when we pass through
  this.queue(buff.toString());
});

server.listen(PORT, function () {
  console.log('Server Started at', PORT);
});

socket = shoe(function (stream) {
  var id = uuid.v1();
  connections[id] = stream;
  console.log('New connection. Total:', Object.keys(connections).length);
  writer.write('Someone new has connected');

  // I think this is going to cause a memory leak
  // since it's going to hold on to a ref to the stream
  // oh well, I think it reads nicer for now. YOLO
  writer.pipe(stream);

  stream.on('data', function (data) {
    var data = JSON.parse(data);
    var message = data.name + ': ' + data.message;
    writer.write(message);
  });

  stream.on('close', function () {
    console.log(id, ' disconnected');
    delete connections[id];
  });
});

socket.install(server, '/chat');
