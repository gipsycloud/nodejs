const express = require('express');
const ProgressBar = require('progress');
const port = 3000; // You can change this port if needed
const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root", // WRONG USER
  password: "password",
  database: "simplilearn"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

con.on('error', function (err) {
  console.log("[mysql error]", err);
});

const app = express();

app.get('/', function (req, res) {
  res.send('Welcome');
});

app.get('/createdb', (req, res) => {
  /*Create a database named "mydb":*/
  con.query("CREATE DATABASE simplilearn", function (err, result) {
    if (err) throw err;
    console.log("Database created");
    res.send('Database created');
  });
});

//create table
app.get('/table', (req, res) => {
  con.query("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), designation VARCHAR(255))", function (err, result) {
    if (err) throw err;
    console.log("Table created");
    res.send('Table created');
  });
});

// Insert a new user
app.get('/userone', (req, res) => {
  con.query("INSERT INTO users (name, designation) VALUES ('John Doe', 'Software Engineer')", function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.send('1 record inserted');
  });
});
// select a user
app.get('/getuser', (req, res) => {
  con.query("SELECT * FROM users", function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

// update a userupdateuser
app.get('/updateuser/:id', (req, res) => {
  let newName = 'Updated name';
  let sql = `UPDATE users SET name = '${newName}' WHERE id = ${req.params.id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(`1 record updated`);
    res.send('1 record updated');
  });
});

// delete a user
app.get('/deleteuser/:id', (req, res) => {
  let sql = `DELETE FROM users WHERE id = ${req.params.id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(`1 record deleted`);
    res.send('1 record deleted');
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