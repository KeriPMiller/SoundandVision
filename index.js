'use strict'

const express = require('express');
const path  = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const socketIo = require('socket.io');

const app = express();

// server
const server = app.listen(3000, () => console.log('listening on port 3000!'))
app.use((err, req, res, next) =>
res.sendStatus(err.status|| 500).send(err.message || 'Internal server error')
);

// socket io server
const io = socketIo(server);

io.on('connection', socket => {
  console.log(`New Connection from ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`${socket.id} has disconnected`);
  });

  socket.on('stranger', strangerVoice);

  function strangerVoice(data) {
    socket.broadcast.emit('stranger', data);
    // socket.emit('stranger', data);
  }
});

// morgan logging middleware
app.use(morgan('dev'));

// body-parser middleware
app.use(bodyParser.json()); // parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // parse URL requests

// serve public folder
app.use(express.static(path.join(__dirname, 'public')));

// send index.html
app.use('*', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);
