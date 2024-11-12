const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('joinAuction', (auctionId) => {
    socket.join(auctionId);
  });

  socket.on('bid', (data) => {
    io.to(data.auctionId).emit('newBid', data.bid);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});
