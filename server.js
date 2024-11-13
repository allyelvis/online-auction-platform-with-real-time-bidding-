const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let currentBid = {
  auctionId: 1,
  highestBid: 0,
  highestBidder: null,
};

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.emit('currentBid', currentBid);  // Send initial bid data
  
  // Listen for new bids
  socket.on('newBid', (bidData) => {
    if (bidData.amount > currentBid.highestBid) {
      currentBid.highestBid = bidData.amount;
      currentBid.highestBidder = bidData.userId;
      io.emit('currentBid', currentBid); // Broadcast updated bid to all clients
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => console.log('Server is running on port 4000'));
