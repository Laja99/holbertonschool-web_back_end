const express = require('express');

/**
 * Small Express HTTP server handling root endpoint.
 */
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.listen(1245);

module.exports = app;
