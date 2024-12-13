const express = require('express');
const ProgressBar = require('progress');
const port = 3000; // You can change this port if needed
const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root", // WRONG USER
  password: "password"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

con.on('error', function (err) {
  console.log("[mysql error]", err);
});

const app = express();
app.get('/createdb', (req, res) => {
  /*Create a database named "mydb":*/
  con.query("CREATE DATABASE simplilearn", function (err, result) {
    if (err) throw err;
    console.log("Database created");
    res.send('Database created');
  });
});

const bar = new ProgressBar(':bar :rate/bps :percent :etas', { total: 10 });
const timer = setInterval(() => {
  bar.tick();
  if (bar.complete) {
    clearInterval(timer);
  }
}, 100);

app.listen(port, () => {
  console.log(`Mysql Connection - ${port} ${new Date()}`);
}
);