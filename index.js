// const express = require('express');
// const app = express();
// const port = 3000; // You can change this port if needed

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// app.get('/about', (req, res) => {
//     res.send('about');
// });


// app.get('/api', (req, res) => {
//     res.send('api');
// });

// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
// });

const { writeFile } = require('fs');
let http  = require('http');
let url = require('url');
let routes = {
  "GET": {
    "/": (req, res) => {
      res.writeHead(200, { "Content-Type": "application'", "Accept": "text/html"});
      res.end("<h1>Get Method = / route </h1>");
    },
    "/about": (req, res) => {
      res.writeHead(200, { "Content-Type": "application'", "Accept": "text/html"});
      res.end("<h1>Get Method = /about route </h1>");
     },
    
  },
  "POST": {
    "/": (req, res) => {
      res.writeHead(200, { "Content-Type": "application'", "Accept": "text/html"});
      res.end("<h1>Post Method = / route </h1>");
    },
    "/contact": (req, res) => {
      res.writeHead(200, { "Content-Type": "application'", "Accept": "text/html"});
      res.end("<h1>Post Method = /contact route </h1>");
    },
  }
}
let start = (req, res) => {
  // routes[req.method]();
  // let url = req.url;
  // routes[reqMethod][url]();
  // console.log(req.url + ' method', reqMethod);
  let reqMethod = req.method;
  let url_params = url.parse(req.url, true);
  routes[reqMethod][url_params.pathname](req, res);
  // console.log(url_params.pathname);
  
  // res.writeHead(200, {'Content-Type': 'text/plain'});
  // if (req.method == 'GET') {
  //   res.end('Hello, World!, Get request');
  // } else {
  //   res.end('Hello, World!, Post request');
  // }
}
let server  = http.createServer(start);
server.listen(3000, () => {
    console.log("running server");
    
});