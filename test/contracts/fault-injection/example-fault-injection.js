// Example fault-injection test using nock to simulate downstream failures.
// This is a template — install dev deps: `npm i --save-dev nock axios`

const nock = require('nock');
const axios = require('axios');

async function run() {
  // Simulate the downstream service used by the simulator at /api/third-party
  const third = nock('https://third-party.example')
    // Normal response
    .get('/ok').reply(200, { ok: true })
    // Then a slow/timeout response
    .get('/slow').delay(2000).reply(504, 'Gateway Timeout')
    // Then an error response
    .get('/error').reply(500, 'Internal Error');

  try {
    console.log('Requesting normal endpoint...');
    let r = await axios.get('https://third-party.example/ok');
    console.log('OK status', r.status);

    console.log('Requesting slow endpoint (should be handled by retry/circuit)...');
    await axios.get('https://third-party.example/slow', { timeout: 1000 });
  } catch (err) {
    console.log('Caught expected slow/error:', err.message);
  }

  try {
    console.log('Requesting error endpoint...');
    await axios.get('https://third-party.example/error');
  } catch (err) {
    console.log('Caught expected 500:', err.response && err.response.status);
  }

  console.log('Fault-injection template completed. Integrate assertions as needed.');
}

run();
