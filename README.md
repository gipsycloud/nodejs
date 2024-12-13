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

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)