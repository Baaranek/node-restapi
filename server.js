const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

// import Routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

//adding as a middleware routes
app.use('/api', testimonialsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', concertsRoutes);
app.use(helmet());


app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

mongoose.connect(`mongodb+srv://${process.env.login}:${process.env.password}@cluster0.exsez.mongodb.net/NewWaveDB?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected');
});

db.on('error', err => console.log('Error ', err))

const io = socket(server);

io.on('connection', (socket) => {
  console.log('connected');
});

module.exports = server;