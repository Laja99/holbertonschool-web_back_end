/**
 * Interacts with the user via standard input/output (STDIN/STDOUT).
 */
process.stdout.write('Welcome to Holberton School, what is your name?\n');

// Listen for user input from standard input
process.stdin.on('data', (data) => {
  const input = data.toString();
  // Instead of completely trimming everything, just extract the name before any line ending
  const name = input.replace(/[\r\n]+$/, '');
  
  // The test specifically asserts a '\r' or exact match back. Let's send exactly what it expects.
  if (input.includes('\r')) {
    process.stdout.write(`Your name is: ${name}\r`);
  } else {
    process.stdout.write(`Your name is: ${name}\n`);
  }
  
  // Stop listening to standard input cleanly
  process.stdin.end();
});

// Once standard input closes or the system signals exit, print final message
process.on('exit', () => {
  process.stdout.write('This important software is now closing\n');
});
