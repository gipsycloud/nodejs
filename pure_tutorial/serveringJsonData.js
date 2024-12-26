// let fs = require('fs');
// let data = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
// fs.writeFileSync("test.txt","data");

let http = require('http');
let server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  // res.end('Hello, World!\n');
  let Obj = {
    name: 'Hello, World',
    age: 13,
    family: {
      father: 'John Doe',
      mother: 'Jane Doe',
      children: ['Sam', 'Emma', 'Olivia']
    }
  };
  res.end(JSON.stringify(Obj));
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/' + server.address);
}); 