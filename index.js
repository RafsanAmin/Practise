const express = require('express');
const http = require('http');
const socket = require('socket.io');
const app = express();
app.use('/public', express.static(`${__dirname}/public`));
app.get('/', (req, res) => {
  res.send('Hello World!');
});
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socket(server);

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('msg', (soc, room) => {
    socket.to(room).emit('msg-c', soc);
  });
  socket.on('join', (room, cb) => {
    socket.join(room);
    cb(room);
  });
});
server.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});
