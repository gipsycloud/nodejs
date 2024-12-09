const express = require('express');
const app = express();
const port = 3000; // You can change this port if needed

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', require('./routes/api/users'));

// // app.get('/', (req, res) => {
// //   res.send('Hello, World!');
// // });

app.listen(port, () => {
  console.log('server listening on port hello world!');

});