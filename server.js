// server.js
const express = require('express')
const { createServer } = require('http')
const { join } = require("node:path")
const { Server } = require('socket.io')

const app = express();
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: true,
})

app.get("/chat", (req, res) => {
  res.sendFile(join(__dirname, "index.html"))
})

server.listen(3000, () => {
  console.log('listening on *:3000')
  console.log('http://localhost:3000/chat')
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (data) => {
    const msg = `${data.nickname}: ${data.messages}`
    io.emit('chat message', msg)
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});