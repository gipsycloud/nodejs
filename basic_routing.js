let http = require('http');
let fs = require('fs');
let server = http.createServer((req, res) => { 
  console.log(res);
  if(req.url === '/' || req.url === '/home' || req.url === '/index'){
    let myReadStr = fs.createReadStream('index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    myReadStr.pipe(res);
    } else if(req.url === '/about'){
      let myReadStr = fs.createReadStream('about.html');
      res.writeHead(200, {'Content-Type': 'text/html'});
      myReadStr.pipe(res);
    } else if(req.url === '/contact'){
      let myReadStr = fs.createReadStream('contact.html');
      res.writeHead(200, {'Content-Type': 'text/html'});
      myReadStr.pipe(res);
    } else if (req.url === '/api/fb') {
      var obj = {
        name: 'John Doe',
        age: 30,
        email: 'john.doe@example.com'
      }
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(JSON.stringify(obj));
    } else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404 Not Found');
    }
  
});

server.listen(3000, function(){
  console.log("Server is running listening on");
  
});