const http = require('http');

/**
 * Small HTTP server responding with plain text for any endpoint.
 */
const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello Holberton School!');
});

app.listen(1245);

module.exports = app;
