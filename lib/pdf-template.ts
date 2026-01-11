export type RiskStatus = "green" | "yellow" | "red"

export interface Tool1Payload {
  taskName?: string
  taskTypeLabel?: string
  repetitivenessLabel?: string
  documentationLabel?: string
  score?: number
}

export interface Tool2Payload {
  safetyScore?: number
  status?: RiskStatus
  backupsLabel?: string
  errorDetectionLabel?: string
  errorConsequenceLabel?: string
  capacityLabel?: string
}

export interface Tool3Payload {
  hoursPerWeek?: number
  numEmployees?: number
  hourlyRate?: number
  sixMonthTotal?: number
  breakEvenMonth?: number
  monthlyBudgetUsed?: number
  implementationProfileLabel?: string
}

export interface PdfPayload {
  tool1Data?: Tool1Payload | null
  tool2Data?: Tool2Payload | null
  tool3Data?: Tool3Payload | null
}

const fontFace = `
@font-face {
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  src: url('https://cdn.jsdelivr.net/npm/@fontsource/rubik@5.0.18/files/rubik-hebrew-400-normal.woff2') format('woff2');
}
@font-face {
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 500;
  src: url('https://cdn.jsdelivr.net/npm/@fontsource/rubik@5.0.18/files/rubik-hebrew-500-normal.woff2') format('woff2');
}
@font-face {
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 700;
  src: url('https://cdn.jsdelivr.net/npm/@fontsource/rubik@5.0.18/files/rubik-hebrew-700-normal.woff2') format('woff2');
}
`

const baseStyles = `
:root {
  --blue-900: #1E3A8A;
  --blue-800: #1E40AF;
  --blue-600: #2563EB;
  --blue-50: #EFF6FF;
  --slate-500: #64748B;
  --slate-400: #94A3B8;
  --green-bg: #DCFCE7;
  --green-text: #166534;
  --yellow-bg: #FEF3C7;
  --yellow-text: #92400E;
  --red-bg: #FEE2E2;
  --red-text: #991B1B;
}
* { box-sizing: border-box; }
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Rubik', Arial, sans-serif;
  direction: rtl;
  unicode-bidi: bidi-override;
  background: #ffffff;
  color: #0f172a;
}
body {
  padding: 32px;
}
.header {
  margin-bottom: 24px;
}
.h1 {
  font-size: 28px;
  font-weight: 700;
  color: var(--blue-900);
  margin: 0 0 6px 0;
}
.subtle {
  font-size: 14px;
  color: var(--slate-500);
  margin: 0 0 18px 0;
}
.section {
  margin-top: 26px;
  padding-top: 8px;
}
.section-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--blue-800);
  border-bottom: 2px solid var(--blue-600);
  padding-bottom: 8px;
  margin: 0 0 14px 0;
}
.card {
  background: var(--blue-50);
  border: 1px solid #DBEAFE;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 12px;
}
.metric-label {
  font-size: 11px;
  color: var(--blue-800);
  margin: 0 0 8px 0;
}
.metric-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--blue-900);
  margin: 0;
}
.status {
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  margin: 0 0 12px 0;
}
.status.green { background: var(--green-bg); color: var(--green-text); }
.status.yellow { background: var(--yellow-bg); color: var(--yellow-text); }
.status.red { background: var(--red-bg); color: var(--red-text); }
.list-item {
  font-size: 12px;
  margin: 0 0 8px 0;
  line-height: 1.6;
}
.list-item strong { font-weight: 700; }
.footer {
  margin-top: 28px;
  text-align: center;
  font-size: 10px;
  color: var(--slate-400);
}
hr { border: none; border-top: 1px solid #E2E8F0; margin: 18px 0; }
`

const escapeHtml = (value?: string | number | null) => {
  if (value === undefined || value === null) return ''
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const formatCurrency = (value?: number | null) => {
  if (value === undefined || value === null || Number.isNaN(value)) return '0'
  return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 }).format(value)
}

const statusText = (status?: RiskStatus) => {
  switch (status) {
    case 'green':
      return '✓ סיכון נמוך - מוכן להטמעה'
    case 'red':
      return '⚠ סיכון גבוה - נדרשת בדיקה נוספת'
    default:
      return '⚡ סיכון בינוני - המלצות לשיפור'
  }
}

export function buildPdfHtml(payload: PdfPayload) {
  const currentDate = new Date().toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const tool1 = payload.tool1Data || {}
  const tool2 = payload.tool2Data || {}
  const tool3 = payload.tool3Data || {}

  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    ${fontFace}
    ${baseStyles}
  </style>
</head>
<body>
  <div class="header">
    <h1 class="h1">דוח מוכנות בינה מלאכותית</h1>
    <p class="subtle">${escapeHtml(currentDate)} | ${escapeHtml(tool1.taskName || 'משימה')}</p>
  </div>

  <div class="section">
    <h2 class="section-title">סיכום ביצועים</h2>
    <div class="card">
      <p class="metric-label">ציון התאמה למשימה</p>
      <p class="metric-value">${escapeHtml(tool1.score ?? 0)}%</p>
    </div>
    <div class="card">
      <p class="metric-label">ציון בטיחות</p>
      <p class="metric-value">${escapeHtml(tool2.safetyScore ?? 0)}%</p>
    </div>
    <p class="status ${escapeHtml(tool2.status || 'yellow')}">${statusText(tool2.status)}</p>
  </div>

  <div class="section">
    <h2 class="section-title">כלי 1: ניתוח התאמה</h2>
    <p class="list-item">• שם המשימה: <strong>${escapeHtml(tool1.taskName || 'לא צוין')}</strong></p>
    <p class="list-item">• סוג משימה: ${escapeHtml(tool1.taskTypeLabel || 'לא צוין')}</p>
    <p class="list-item">• רמת חזרתיות: ${escapeHtml(tool1.repetitivenessLabel || 'לא צוין')}</p>
    <p class="list-item">• תיעוד: ${escapeHtml(tool1.documentationLabel || 'לא צוין')}</p>
  </div>

  <div class="section">
    <h2 class="section-title">כלי 2: בדיקת בטיחות</h2>
    <p class="list-item">• גיבויים: ${escapeHtml(tool2.backupsLabel || 'לא צוין')}</p>
    <p class="list-item">• זיהוי שגיאות: ${escapeHtml(tool2.errorDetectionLabel || 'לא צוין')}</p>
    <p class="list-item">• השלכות שגיאה: ${escapeHtml(tool2.errorConsequenceLabel || 'לא צוין')}</p>
    ${tool2.capacityLabel ? `<p class="list-item">• יכולת הטמעה: ${escapeHtml(tool2.capacityLabel)}</p>` : ''}
  </div>

  <div class="section">
    <h2 class="section-title">חישוב ROI והמלצות</h2>
    <p class="list-item">• שעות שבועיות: ${escapeHtml(tool3.hoursPerWeek ?? 0)}</p>
    <p class="list-item">• מספר עובדים: ${escapeHtml(tool3.numEmployees ?? 0)}</p>
    <p class="list-item">• עלות שעתית: ${formatCurrency(tool3.hourlyRate ?? 0)}</p>
    <div class="card">
      <p class="metric-label">חסכון ב-6 חודשים</p>
      <p class="metric-value">${formatCurrency(tool3.sixMonthTotal ?? 0)}</p>
    </div>
    <p class="list-item">• החזר השקעה בחודש: ${escapeHtml(tool3.breakEvenMonth ?? 'לא חושב')}</p>
    <p class="list-item">• תקציב חודשי מומלץ: ${formatCurrency(tool3.monthlyBudgetUsed ?? 0)}</p>
    <p class="list-item">• פרופיל הטמעה: ${escapeHtml(tool3.implementationProfileLabel || 'לא צוין')}</p>
  </div>

  <hr />
  <div class="section">
    <h2 class="section-title">צעדים הבאים</h2>
    <p class="list-item">1. קבעו פגישת ייעוץ חינם</p>
    <p class="list-item">2. הצטרפו לקהילת WhatsApp</p>
    <p class="list-item">3. התחילו עם פיילוט קטן</p>
  </div>

  <div class="footer">BizgoAI Israel | דוח זה נוצר אוטומטית</div>
</body>
</html>`
}
