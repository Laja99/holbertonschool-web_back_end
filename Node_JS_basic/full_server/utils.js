import fs from 'fs';

/**
 * Asynchronously reads the student CSV database and maps first names to fields.
 * @param {string} path - Path to the database file.
 * @returns {Promise<object>} Map of fields to arrays of student first names.
 */
export function readDatabase(path) {
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

      resolve(fields);
    });
  });
}

export default readDatabase;
