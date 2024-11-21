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

let http  = require('http');
let routes = {
  "GET": {
    "/": () => console.log("Method GEt and path /"),
    "/about": () => console.log("Method GET and path /about"),
    
  },
  "POST": {
    "/": () => console.log("Method Post and path /"),
    "/contact": () => console.log("Method Post and path /contact"),
  }
}
let start = (req, res) => {
  // routes[req.method]();
  let reqMethod = req.method;
  let url = req.url;
  routes[reqMethod][url]();
  console.log(req.url + ' method', reqMethod);
  
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