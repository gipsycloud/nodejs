const express = require('express');
const PORT = process.env.PORT || 3000;
const coronaRoute = require('./routes/virus');
const app = express();

// app.get('/', (req, res) => {
//   // res.send('Hello, World!');
//   res.json({country: 'USA'});
// });

// middleware
app.use('/', (req, res, next) => {
  console.log('/ middleware');
  next();  // async function
  
});

app.use('/api/coronas', coronaRoute);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
