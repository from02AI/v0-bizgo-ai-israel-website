Fault injection & contract test templates

This folder contains example templates for running contract and fault-injection tests
against downstream services used by the simulator. The examples use `nock` (Node HTTP
mocking) as a simple on-host harness. For production-grade fault injection consider
Toxiproxy or running tests against a staging environment with proxies.

How to use:
- Install dev deps: `npm install --save-dev nock mocha`
- Run example: `node example-fault-injection.js` or integrate into your test runner.
