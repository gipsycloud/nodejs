const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");

});
app.post('/', (req, res) => {
  // console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "dec3c640e3be6be078f1c61520be5cbf";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      res.write(`<p>The weather in ${query} is ${description}</p>`);
      res.write(`<p>Temperature: ${weatherData.main.temp}°C, Humidity: ${weatherData.main.humidity}%</p>`)
      res.write(`<img src=${imageUrl}></img>`);
      res.send();
    });
  });
});

app.listen(3000);