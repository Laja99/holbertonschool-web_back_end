const fs = require('fs');

/**
 * Reads a student CSV database file asynchronously and returns a Promise.
 * @param {string} path - The path to the CSV database file.
 * @returns {Promise<void>}
 */
function countStudents(path) {
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

      console.log(`Number of students: ${students.length}`);

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

      for (const [field, names] of Object.entries(fields)) {
        console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
      }
      resolve();
    });
  });
}

module.exports = countStudents;
