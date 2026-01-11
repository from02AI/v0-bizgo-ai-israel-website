Playwright & CI testing

Commands

Install Playwright and browsers:
```bash
npm install -D @playwright/test
npx playwright install --with-deps
```

Run E2E locally (build/start handled by Playwright webServer unless a dev server is running):
```bash
npx playwright test --config=playwright.config.cjs
```

Run unit tests:
```bash
npm run test:unit
```

CI notes
- CI builds and runs Jest and Playwright. Playwright artifacts (html report, screenshots, videos, traces saved to `test-results`) are uploaded as workflow artifacts.

What we added
- Playwright tests for Tool1/Tool2 (simulator.spec.js), Tool3 (tool3.spec.js), and email capture (email.spec.js).
- Playwright config collects screenshots/videos on failure and traces on first retry.
- GitHub Actions workflow uploads reports and artifacts for debugging failures.
