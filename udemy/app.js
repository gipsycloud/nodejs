const express = require('express');
const app = express();
const mongoose = require('mongoose');
const todoRouter = require('../routes/todo.js');
const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://lesson:lesson123@lesson.mudrs.mongodb.net/?retryWrites=true&w=majority&appName=lesson', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    console.log('Connected to MongoDB'))
  .catch((err) => console.error(err, "Error connecting to MongoDB"));

// body parser
app.use(express.json());
app.use('/todos', todoRouter);

var ProgressBar = require('../progressbar.js');

app.listen(port, () => {
  console.log('Server started on port 3000');
});