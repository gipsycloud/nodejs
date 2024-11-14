let http  = require('http');
let start = (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  if (req.method == 'GET') {
    res.end('Hello, World!, Get request');
  } else {
    res.end('Hello, World!, Post request');
  }
}
let server  = http.createServer(start);