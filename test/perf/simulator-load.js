import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 100 },
    { duration: '2m', target: 100 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.005'],
  },
};

const BASE = __ENV.TARGET_URL || 'http://localhost:3000';

export default function () {
  // Simulate visiting the home page and opening the simulator
  let res = http.get(`${BASE}/simulator`);
  check(res, {
    'home ok': (r) => r.status === 200,
  });

  // Simulate starting Tool1 (opportunity) flow
  res = http.post(`${BASE}/api/simulate/tool1`, JSON.stringify({ answers: [3, 4, 2] }), {
    headers: { 'Content-Type': 'application/json' },
  });
  check(res, { 'tool1 response 2xx': (r) => r.status >= 200 && r.status < 300 });

  // Simulate Tool3 ROI calculation
  res = http.post(`${BASE}/api/simulate/tool3`, JSON.stringify({ hoursPerWeek: 5, durationMonths: 3 }), {
    headers: { 'Content-Type': 'application/json' },
  });
  check(res, { 'tool3 response 2xx': (r) => r.status >= 200 && r.status < 300 });

  sleep(Math.random() * 3);
}
