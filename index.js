const express = require('express');
const app = express();
const port = 3000; // You can change this port if needed

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/about', (req, res) => {
    res.send('about');
});


app.get('/api', (req, res) => {
    res.send('api');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
