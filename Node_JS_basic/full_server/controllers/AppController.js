/**
 * Main App Controller class.
 */
class AppController {
  /**
   * Returns a basic greeting string for the homepage route.
   */
  static getHomepage(request, response) {
    return response.status(200).send('Hello Holberton School!');
  }
}

export default AppController;
