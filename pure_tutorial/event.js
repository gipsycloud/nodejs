var event = require('events')
var myEmitter = new event.EventEmitter();
myEmitter.on("starw", function () { 
  console.log('I am start working');
  
 })

 myEmitter.emit('starw')
let i = 0;
 setInterval(function () {
  i++;
  if ((i%2) == 0)
    myEmitter.emit('starw')
  else
   console.log('wait ... ' + i);
  }, 2000)

  // event with
  var event = require('events')
var myEmitter = new event.EventEmitter();
myEmitter.on("starw", function (val) { 
  console.log(`I am start working ${val}`);
  
 })

 myEmitter.emit('starw', 'Hello world')
let i = 0;
 setInterval(function () {
  i++;
  if ((i%2) == 0)
    myEmitter.emit('starw')
  else
   console.log('wait ... ' + i);
  }, 2000)