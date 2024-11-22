const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const coronaRoute = require('./routes/virus');
const app = express();

mongoose.connect('mongodb+srv://lesson:lesson123@lesson.mudrs.mongodb.net/?retryWrites=true&w=majority&appName=lesson')
  .then(() => console.log('Connected!'))
  .catch((err) => {
    console.log(err);
  });

// app.get('/', (req, res) => {
//   // res.send('Hello, World!');
//   res.json({country: 'USA'});
// });

// middleware
// app.use('/', (req, res, next) => {
//   console.log('/ middleware');
//   next();  // async function
  
// });

// mongoose.connect("mongodb+srv://lesson:lesson123@lesson.mudrs.mongodb.net/?retryWrites=true&w=majority&appName=lesson", 
//   () => console.log("DB connected.")
  
// );

app.use('/api/coronas', coronaRoute);
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
