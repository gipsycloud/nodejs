const express = require('express');

const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {
  // console.log(req.body.num1, req.body.num2);
  const num1 = req.body.num1;
  const num2 = req.body.num2;
  const result = Number(num1) + Number(num2);
  res.send("" + result);
});
app.listen(3000, () => {
  console.log('Server running on port 3000');
});