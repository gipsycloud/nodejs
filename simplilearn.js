const express = require('express');
const app = express();
const ProgressBar = require('progress');
const port = 3000; // You can change this port if needed

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', require('./routes/api/users'));

const bar = new ProgressBar(':bar :rate/bps :percent :etas', { total: 10 });
const timer = setInterval(() => {
  bar.tick();
  if (bar.complete) {
    clearInterval(timer);
  }
}, 100);


app.listen(port, () => {

  console.log(`listening on port ${new Date()}`);
}

);