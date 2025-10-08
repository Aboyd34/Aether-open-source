// debug-agent.js
const { exec } = require('child_process');

function runTests() {
  exec('npm test', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running tests: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Test stderr output:
${stderr}`);
    }
    console.log('Test stdout output:
', stdout);

    analyzeTestOutput(stdout);
  });
}

function analyzeTestOutput(output) {
  // Simple example: look for "fail" keyword in test output
  const failedTests = output.match(/fail/gi);
  if (failedTests && failedTests.length > 0) {
    console.log(`Detected ${failedTests.length} failed tests.`);
    // Add more sophisticated parsing or AI integration here later...
  } else {
    console.log('All tests passed!');
  }
}

runTests();