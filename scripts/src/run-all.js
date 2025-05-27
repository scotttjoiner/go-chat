const concurrently = require('concurrently');

concurrently([
  { command: 'make -C chat-service run', name: 'chat-service' },
  { command: 'npx wait-on tcp:8080 && make -C chat-ai run', name: 'chat-ai' },
  { command: 'npx wait-on tcp:8080 && make -C chat-gateway run', name: 'chat-gateway' },
  { command: 'make -C chat-client run', name: 'chat-client' }
], {
  prefix: 'name',
  killOthers: ['failure', 'success'],
  restartTries: 0,
}).result.then(
  () => console.log('All processes exited.'),
  () => process.exit(1)
);