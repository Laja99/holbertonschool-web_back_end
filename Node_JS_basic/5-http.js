const http = require('http');
const fs = require('fs');

const databaseFile = process.argv[2];

/**
 * Asynchronous student processing helper for HTTP routing.
 */
function getStudentsData(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      const lines = data.split('\n');
      const students = lines
        .map((line) => line.trim())
        .filter((line) => line !== '' && !line.startsWith('firstname'));

      let output = `Number of students: ${students.length}\n`;
      const fields = {};

      students.forEach((student) => {
        const row = student.split(',');
        const firstName = row[0];
        const field = row[3];

        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstName);
      });

      const entries = Object.entries(fields);
      entries.forEach(([field, names], index) => {
        output += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
        if (index < entries.length - 1) {
          output += '\n';
        }
      });
      resolve(output);
    });
  });
}

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');
    getStudentsData(databaseFile)
      .then((data) => {
        res.end(data);
      })
      .catch((error) => {
        res.end(error.message);
      });
  } else {
    res.end('Hello Holberton School!');
  }
});

app.listen(1245);

module.exports = app;
