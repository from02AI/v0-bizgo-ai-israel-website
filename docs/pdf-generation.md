# Hebrew PDF Generation (Puppeteer)

- Endpoint: `POST /api/generate-pdf`
- Input: `{ tool1Data, tool2Data, tool3Data }` from the simulator context (partial data is allowed).
- Output: PDF with RTL Hebrew text, Rubik font embedded via CDN, and A4 layout.
- Notes:
  - Uses `puppeteer` on the Node runtime (`runtime = "nodejs"`).
  - CSS enforces `direction: rtl; unicode-bidi: bidi-override;` and loads Rubik Hebrew weights (400/500/700).
  - Headless Chrome is launched with `--no-sandbox` flags.
  - If deploying to environments without bundled Chromium, configure `PUPPETEER_EXECUTABLE_PATH` accordingly.
