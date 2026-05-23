import { readDatabase } from '../utils';

/**
 * Controller class to manage student fields and listings.
 */
class StudentsController {
  /**
   * Fetches and presents a formatted list of all students sorted alphabetically by field.
   */
  static getAllStudents(request, response) {
    const databaseFile = process.argv[2];

    readDatabase(databaseFile)
      .then((fields) => {
        let output = 'This is the list of our students';
        // Sort fields case-insensitively
        const sortedFields = Object.keys(fields).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

        sortedFields.forEach((field) => {
          output += `\nNumber of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
        });

        return response.status(200).send(output);
      })
      .catch(() => response.status(500).send('Cannot load the database'));
  }

  /**
   * Fetches and presents a list of students filtering dynamically by major parameter.
   */
  static getAllStudentsByMajor(request, response) {
    const databaseFile = process.argv[2];
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      return response.status(500).send('Major parameter must be CS or SWE');
    }

    return readDatabase(databaseFile)
      .then((fields) => {
        const studentsList = fields[major] || [];
        return response.status(200).send(`List: ${studentsList.join(', ')}`);
      })
      .catch(() => response.status(500).send('Cannot load the database'));
  }
}

export default StudentsController;
