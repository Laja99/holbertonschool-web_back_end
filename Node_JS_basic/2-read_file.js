const fs = require('fs');

/**
 * Reads a student CSV database file synchronously and logs the parsed results.
 * @param {string} path - The path to the CSV database file.
 */
function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n');
    
    // Filter out empty lines and header
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
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
