const express = require('express');
const fs = require('fs');

const app = express();
const databaseFile = process.argv[2];

/**
 * Reusable helper to process data for the Express response.
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

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  getStudentsData(databaseFile)
    .then((data) => {
      res.send(`This is the list of our students\n${data}`);
    })
    .catch((error) => {
      res.send(`This is the list of our students\n${error.message}`);
    });
});

app.listen(1245);

module.exports = app;
