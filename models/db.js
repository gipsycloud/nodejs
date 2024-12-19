const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/lesson';

mongoose.connect(url)
  .then(() => console.log('Connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

mongoose.connection.on('connected', () => console.log('Connect'));
mongoose.connection.on('error', (err) => console.error('Error connecting:', err));
mongoose.connection.on('disconnected', () => console.log('Disconnect'));

require('./student.model');
