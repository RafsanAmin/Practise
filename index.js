const express = require('express');
const socket = require('socket.io');
const ejs = require('ejs');
const app = express();
const PORT = process.env.PORT || 80;
const server = app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});

const io = socket(server);

app.set('view engine', 'ejs');

app.get('/:name', (req, res) => {
  let x = req.params.name;
  let y = [
    { a: 'Hello', b: 'Hi' },
    { a: 'op', b: 'ho' },
    { a: 'lop', b: 'sep' },
  ];
  res.render('index', { x, y });
});

const chat = io.of('/chat');

chat.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('msg', (soc, room) => {
    socket.to(room).emit('msg-c', soc);
  });
  socket.on('join', (room, cb) => {
    socket.join(room);
    cb(room);
  });
});
