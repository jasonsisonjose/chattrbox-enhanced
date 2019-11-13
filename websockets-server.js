var WebSocket = require('ws');

var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];


console.log('websockets server started');

ws.on('connection', function(socket) {
  console.log('client connection established');
  var topic = "Topic: Chatting about WebSockets";
  socket.send(topic);
  messages.forEach(function(msg) {
    socket.send(msg);
  });

  socket.on('message', function(data) {
    console.log('message received: ' + data);
    var newTopic = "";
    if (data.includes("/topic") == true) {
      newTopic = "Topic has changed to '" + data.slice(7) + " '";
      console.log(newTopic);
    } else {
      messages.push(data);
    }
    ws.clients.forEach(function(clientSocket) {
      if (newTopic != "") {
        clientSocket.send(newTopic);
      } else {
        clientSocket.send(data);
      }
    });
  });
});
