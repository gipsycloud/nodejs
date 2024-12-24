# Node Js

This applicaton created for using searching word using [NodeJs](https://nodejs.org), [Express](https://expressjs.com), [Mongodb](https://www.mongodb.com), [Mysql](https://www.mysql.com) Databases.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install foobar.

```bash
npm init
npm install <package>
```

## Usage

```nodejs
const express = require('express');
const mongoose = require('mongoose');
const coronaRoute = require('./routes/virus');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const ProgressBar = require('progress');
const PORT = process.env.PORT || 3000;

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
```

## Contributing

MogoDB is licensed under the MIT
All the modern applications require big data, fast features development, flexible development.

- Scalability
- Performance
- High Availability
- Easily deploy, operate and scale the databases across the leaading cloud platforms like Microsoft, Azure, AWS and etc.  
- Big Data

MERN Stack is a javascript Stack that is used for buillding modern single-page applications and comprises of 4 technologies namely: MongoDB, Express, React and Node.js.

MongoDB: is a cross-platform document-oriented database program.
Expressjs or simply Express is a web application framework for Node.js
React is a javascript framework for building user interfaces.
Node.js is a open-source, cross-platform javascript library run-time environment that executes JavaScript code outside of a browser.


MongoDB was needed to address both challenges.



## License

[MIT](https://choosealicense.com/licenses/mit/)

## Readme

[readme.md](https://www.makeareadme.com/)