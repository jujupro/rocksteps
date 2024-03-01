const { spawn } = require('child_process');

// Spawn the react-scripts start command with the openssl-legacy-provider flag
const child = spawn(
  'node',
  ['--openssl-legacy-provider', 'node_modules/react-scripts/scripts/start.js'],
  {
    stdio: 'inherit',
    shell: true,
  }
);

child.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
});
