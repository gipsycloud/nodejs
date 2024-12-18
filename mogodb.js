const { pool, ping } = require("./models/db.js");
const express = require('express');
const port = process.env.PORT || 3000; // You can change this port if needed
const path = require('path');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');

const studentController = require('./controllers/studentController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(`
    <h2>Welcome to Students Database ! ${req.url}</h2>
    <h3>Click here to geexpress-handlebarst access to the <b><a href="/student/list">list</a></b> of students
    `);
});

app.set('view', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs.engine({
  handlebars: allowInsecurePrototypeAccess(handlebars),
  extname: '.hbs',
  defaultLayout: 'MainLayout', //
  layoutsDir: __dirname + '/views/layouts/',
}));

app.set("view engine", "hbs");

var ProgressBar = require('./progressbar.js');

app.listen(port, () => {
  console.log(`Mogodb Connection - ${port} ${new Date()}`);
}
);

// const startServer = async () => {
//   try {
//     await ping();
//     console.log("Ping started");

//     const server = app.listen(port, () => {
//       console.log(`Server listening on port ${port} at ${new Date()}`);
//     });

//     process.on("SIGINT", () => shutdown(server));
//     process.on("SIGTERM", () => shutdown(server));
//   } catch (err) {
//     console.error("Error starting server:", err);
//     process.exit(1);
//   }
// };


const shutdown = (server) => {
  console.log("Received shutdown signal...");
  pool.end((err) => {
    console.error("Error shutting down server:", err);
  });
  // console.log("Shutting down server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
};

if (require.mina == module) {
  startServer();
}

app.use('/student', studentController);