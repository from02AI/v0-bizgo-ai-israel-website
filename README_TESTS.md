Running unit tests (Jest)

This project includes unit tests for the simulator calculations under `test/unit` and a Node-based calculation test `test/simulator-tests.js`.

To run the existing Node tests (no installs required):

```bash
npm test
```

To run Jest unit tests you must install dev dependencies first:

```bash
npm install --save-dev jest
# or
pnpm add -D jest
```

Then run:

```bash
npm run test:unit
```

Notes:
- Jest will run the files matching `test/unit/**/*.test.js` configured in `jest.config.cjs`.
- If you want TypeScript-aware tests later, consider adding `ts-jest` and configuring Jest accordingly.
