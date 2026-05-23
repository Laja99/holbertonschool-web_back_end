/**
 * Interacts with the user via standard input/output (STDIN/STDOUT).
 */
process.stdout.write('Welcome to Holberton School, what is your name?\n');

// Listen for user input from standard input
process.stdin.on('data', (data) => {
  const name = data.toString().trim();
  process.stdout.write(`Your name is: ${name}\n`);
  
  // Stop listening to standard input so the process can exit naturally
  process.stdin.end();
});

// Once standard input closes or the system signals exit, print final message
process.on('exit', () => {
  process.stdout.write('This important software is now closing\n');
});
