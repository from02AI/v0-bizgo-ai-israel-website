export type RiskStatus = "green" | "yellow" | "red"

export interface Tool1Payload {
  taskName?: string
  taskTypeLabel?: string
  repetitivenessLabel?: string
  documentationLabel?: string
  score?: number
  fitLabel?: string
}

export interface Tool2Payload {
  safetyScore?: number
  status?: RiskStatus
  safetyLabel?: string
  backupsLabel?: string
  errorDetectionLabel?: string
  errorConsequenceLabel?: string
  capacityLabel?: string
  weightedRisk?: number
}

export interface Tool3Payload {
  hoursPerWeek?: number
  numEmployees?: number
  hourlyRate?: number
  sixMonthTotal?: number
  breakEvenMonth?: number
  monthlyBudgetUsed?: number
  implementationProfileLabel?: string
  learningHours?: number
  technicalComfortLabel?: string
  recommendedTier?: string
  budgetMin?: number
  budgetMax?: number
  riskAdjusted?: boolean
  monthlyBreakdown?: Array<{
    month: number
    laborSaved: number
    learningCost: number
    maintenanceCost: number
    toolCost: number
    netSavings: number
    cumulativeSavings: number
  }>
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
  --blue-900: #0b2e7b;
  --blue-800: #1E40AF;
  --blue-600: #2563EB;
  --blue-100: #DBEAFE;
  --blue-50: #EFF6FF;
  --slate-700: #334155;
  --slate-600: #475569;
  --slate-500: #64748B;
  --slate-400: #94A3B8;
  --slate-200: #E2E8F0;
  --green-bg: #DCFCE7;
  --green-text: #166534;
  --yellow-bg: #FEF3C7;
  --yellow-text: #92400E;
  --red-bg: #FEE2E2;
  --red-text: #991B1B;
}

* { 
  box-sizing: border-box; 
  margin: 0;
  padding: 0;
}

html, body {
  font-family: 'Rubik', Arial, sans-serif;
  direction: rtl;
  unicode-bidi: bidi-override;
  background: #ffffff;
  color: #1e293b;
  font-size: 14px;
  line-height: 1.6;
}

body {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
  /* extra bottom padding to avoid footer overlapping content */
  padding-bottom: 120px;
}

/* Header */

.header {
  position: relative;
  margin-bottom: 18px;
  padding-top: 14px;
  padding-bottom: 12px;
  border-bottom: 3px solid var(--blue-600);
  text-align: center;
}

/* Plain-text logo positioned far top-left */
.logo-plain {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 18px;
  font-weight: 900;
  color: var(--blue-900);
  line-height: 1;
}

/* Small date at the far top-right */
.date-plain {
  position: absolute;
  right: 0;
  top: 2px;
  font-size: 10px;
  color: var(--slate-600);
}

.h1 {
  font-size: 22px;
  font-weight: 800;
  color: var(--blue-900);
  margin: 6px 0 4px;
}

.subtitle {
  font-size: 13px;
  color: var(--slate-500);
}

/* Summary Cards */
.summary-section {
  margin-bottom: 12px;
}

.section-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--blue-900);
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 2px solid var(--blue-100);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.metric-card {
  background: linear-gradient(135deg, var(--blue-50) 0%, #ffffff 100%);
  border: 2px solid var(--blue-100);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}

.metric-value {
  font-size: 36px;
  font-weight: 700;
  color: var(--blue-900);
  line-height: 1;
  margin-bottom: 8px;
}

.metric-label {
  font-size: 13px;
  color: var(--slate-600);
  font-weight: 600;
}

.status-badge {
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 12px;
  white-space: nowrap;
}

.status-badge.green { background: var(--green-bg); color: var(--green-text); }
.status-badge.yellow { background: var(--yellow-bg); color: var(--yellow-text); }
.status-badge.red { background: var(--red-bg); color: var(--red-text); }

/* Detail Sections */
.detail-section {
  background: #f8fafc;
  border: 1px solid var(--slate-200);
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
}

.detail-section h3 {
  font-size: 14px;
  font-weight: 700;
  color: var(--blue-900);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.detail-item {
  font-size: 10px;
  color: var(--slate-700);
  padding: 3px 0;
}

.detail-item strong {
  color: var(--blue-900);
  font-weight: 600;
}

/* ROI Table */
.table-container {
  margin: 22px 0;
  overflow-x: auto;
}

.roi-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 10px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.roi-table thead {
  background: var(--blue-900);
  color: white;
}

.roi-table th {
  padding: 8px 6px;
  text-align: center;
  font-weight: 600;
  font-size: 11px;
}

.roi-table td {
  padding: 6px 5px;
  text-align: center;
  border-bottom: 1px solid var(--slate-200);
}

.roi-table tbody tr:hover {
  background: var(--blue-50);
}

.roi-table tbody tr:last-child td {
  border-bottom: none;
  font-weight: 600;
}

.positive { color: #059669; font-weight: 700; }
.negative { color: #dc2626; font-weight: 600; }

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 100%);
  border: 2px solid #3B82F6;
  border-radius: 8px;
  padding: 14px 16px;
  margin: 24px 0; /* increased gap from table on page 2 */
}

/* Footer */
.footer {
  position: fixed;
  /* move slightly closer to the page bottom */
  bottom: 6px;
  left: 0;
  right: 0;
  padding: 8px 0 10px 0;
  /* remove the top divider line so it doesn't cut cards */
  border-top: none;
  text-align: center;
  font-size: 10px;
  color: var(--slate-600);
  background: rgba(255,255,255,0.0);
}

/* ROI Chart */
.chart-container {
  margin: 12px 0;
  background: #F8FAFC;
  border-radius: 8px;
  padding: 12px;
  page-break-inside: avoid;
}

.chart-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--blue-900);
  margin-bottom: 10px;
  text-align: center;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  height: 140px;
  gap: 4px;
  margin-bottom: 6px;
  padding: 0 8px;
  border-bottom: 2px solid #CBD5E1;
}

.chart-bar {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.bar-value {
  font-size: 8px;
  font-weight: 700;
  color: var(--slate-700);
  margin-bottom: 3px;
  white-space: nowrap;
}

.bar-fill {
  width: 100%;
  border-radius: 3px 3px 0 0;
  min-height: 8px;
}

.bar-label {
  font-size: 8px;
  color: var(--slate-600);
  margin-top: 3px;
  font-weight: 600;
}

.breakeven-mark {
  font-size: 7px;
  font-weight: 700;
  color: #059669;
  background: #ECFDF5;
  padding: 1px 3px;
  border-radius: 3px;
  margin-top: 2px;
}

.chart-summary {
  font-size: 10px;
  color: var(--slate-600);
  text-align: center;
  margin-top: 6px;
  font-weight: 600;
}

/* Methodology Box */
.methodology-box {
  background: #F9FAFB;
  border: 1px solid var(--slate-200);
  border-radius: 8px;
  padding: 14px;
  margin-top: 18px;
}

.methodology-box h4 {
  font-size: 12px;
  font-weight: 700;
  color: var(--blue-900);
  margin-bottom: 8px;
}

.methodology-box p {
  font-size: 10px;
  color: var(--slate-600);
  line-height: 1.6;
  margin: 0;
}

/* Page break for printing */
.page-break {
  page-break-before: always;
  margin-top: 32px;
}

/* Utility */
.divider {
  border: none;
  border-top: 1px solid var(--slate-200);
  margin: 20px 0;
}
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

// Return plain status text (no emoji) to avoid font/emoji fallback issues in PDF rendering
const statusText = (status?: RiskStatus) => {
  switch (status) {
    case 'green':
      return '╫í╫Ö╫¢╫ò╫ƒ ╫á╫₧╫ò╫Ü ΓÇö ╫₧╫ò╫¢╫ƒ ╫£╫ö╫ÿ╫₧╫ó╫ö'
    case 'red':
      return '╫í╫Ö╫¢╫ò╫ƒ ╫Æ╫æ╫ò╫ö ΓÇö ╫á╫ô╫¿╫⌐╫¬ ╫æ╫ô╫Ö╫º╫ö ╫₧╫ó╫₧╫Ö╫º╫ö'
    default:
      return '╫í╫Ö╫¢╫ò╫ƒ ╫æ╫Ö╫á╫ò╫á╫Ö ΓÇö ╫á╫ô╫¿╫⌐╫¬ ╫ö╫Ö╫ó╫¿╫¢╫ò╫¬'
  }
}

// Return emoji circles for score icons (renders reliably in PDFs)
const getScoreIcon = (score?: number) => {
  if (score === undefined || score === null) {
    return '<svg width="16" height="16" viewBox="0 0 16 16" style="display: inline-block; vertical-align: middle;"><circle cx="8" cy="8" r="7" fill="#E5E7EB" stroke="#9CA3AF" stroke-width="1"/></svg>'
  }
  if (score >= 8) {
    return '<svg width="16" height="16" viewBox="0 0 16 16" style="display: inline-block; vertical-align: middle;"><circle cx="8" cy="8" r="7" fill="#10B981"/></svg>'
  }
  if (score >= 6) {
    return '<svg width="16" height="16" viewBox="0 0 16 16" style="display: inline-block; vertical-align: middle;"><circle cx="8" cy="8" r="7" fill="#F59E0B"/></svg>'
  }
  if (score >= 4) {
    return '<svg width="16" height="16" viewBox="0 0 16 16" style="display: inline-block; vertical-align: middle;"><circle cx="8" cy="8" r="7" fill="#F97316"/></svg>'
  }
  return '<svg width="16" height="16" viewBox="0 0 16 16" style="display: inline-block; vertical-align: middle;"><circle cx="8" cy="8" r="7" fill="#EF4444"/></svg>'
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

  // show mission only if provided by user; otherwise leave empty
  const taskDisplayName = tool1.taskName ? escapeHtml(tool1.taskName) : ''
  const tool1Score = tool1.score ?? 0
  const tool2Score = tool2.safetyScore ?? 0
  const sixMonthSavings = formatCurrency(tool3.sixMonthTotal ?? 0)
  const fitScorePercent = Math.round((tool1Score ?? 0) * 10)
  const safetyScorePercent = Math.round((tool2Score ?? 0) * 10)
  
  // Build 6-month breakdown table HTML
  let tableRowsHtml = ''
  if (tool3.monthlyBreakdown && tool3.monthlyBreakdown.length > 0) {
    tableRowsHtml = tool3.monthlyBreakdown.map(row => {
      const totalCosts = row.learningCost + row.maintenanceCost + row.toolCost
      const netClass = row.netSavings >= 0 ? 'positive' : 'negative'
      const cumulativeClass = row.cumulativeSavings >= 0 ? 'positive' : 'negative'
      
      return `
        <tr>
          <td>${escapeHtml(row.month)}</td>
          <td class="positive">${formatCurrency(row.laborSaved)}</td>
          <td class="negative">-${formatCurrency(totalCosts)}</td>
          <td class="${netClass}">${row.netSavings >= 0 ? '+' : ''}${formatCurrency(row.netSavings)}</td>
          <td class="${cumulativeClass}">${row.cumulativeSavings >= 0 ? '+' : ''}${formatCurrency(row.cumulativeSavings)}</td>
        </tr>
      `
    }).join('')
  } else {
    tableRowsHtml = '<tr><td colspan="5">╫£╫É ╫û╫₧╫Ö╫ƒ</td></tr>'
  }

  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>╫ô╫ò╫ù ╫₧╫ò╫¢╫á╫ò╫¬ AI - ${taskDisplayName}</title>
  <style>
    ${fontFace}
    ${baseStyles}
  </style>
</head>
<body style="padding-bottom: 68px;">
  <!-- Header -->
  <div class="header">
    <!-- Plain text logo top-left -->
    <div class="logo-plain">BizgoAI</div>
    <!-- Date top-right -->
    <div class="date-plain">${escapeHtml(currentDate)}</div>
    <!-- Centered Headline (primary) -->
    <h1 class="h1">╫ö╫ó╫¿╫¢╫¬ ╫₧╫ò╫¢╫á╫ò╫¬ ╫£-AI: ╫í╫Ö╫¢╫ò╫¥ ╫í╫Ö╫₧╫ò╫£╫ÿ╫ò╫¿ (2 ╫ó╫₧╫ò╫ô╫Ö╫¥)</h1>
    <!-- Subtitle below headline -->
    <div style="text-align:center; font-size:12px; color:var(--slate-600); margin-top:6px; margin-bottom:8px;">
      ╫æ╫₧╫í╫₧╫Ü ╫û╫ö ╫₧╫ò╫ñ╫Ö╫ó╫Ö╫¥ ╫ö╫á╫¬╫ò╫á╫Ö╫¥ ╫⌐╫ö╫û╫á╫¬ ╫æ-3 ╫ö╫¢╫£╫Ö╫¥ ╫ò╫ö╫ö╫ó╫¿╫¢╫ò╫¬ ╫⌐╫æ╫ò╫ª╫ó╫ò ╫æ╫ó╫û╫¿╫¬╫¥.
    </div>
    <!-- Mission Title (H2) - show once under headline; reserve space if empty -->
    ${taskDisplayName ? `<h2 style="text-align: center; font-size:16px; font-weight:700; color:var(--slate-700); margin-bottom: 12px;">╫ö╫₧╫⌐╫Ö╫₧╫ö: ${taskDisplayName}</h2>` : ''}
  </div>

  <!-- Summary Section -->
  <div class="summary-section">
    <!-- status badge removed per request -->
    
    <!-- RTL-Correct Card Order: Tool1 (right) ΓåÆ Tool2 (middle) ΓåÆ Tool3 (left) -->
    <div class="summary-grid">
      <div class="metric-card">
        <div class="metric-value">${getScoreIcon(tool1Score)} ${escapeHtml(tool1Score)}<span style="font-size: 20px; color: #94A3B8;">/10</span></div>
        <div class="metric-label">╫ö╫ó╫¿╫¢╫¬ ╫ö╫¬╫É╫₧╫ö</div>
        <div style="font-size: 9px; color: #64748B; margin-top: 4px;">╫ó╫ô ╫¢╫₧╫ö ╫ö╫₧╫⌐╫Ö╫₧╫ö ╫₧╫¬╫É╫Ö╫₧╫ö ╫£-AI</div>
      </div>
      
      <div class="metric-card">
        <div class="metric-value">${getScoreIcon(tool2Score)} ${escapeHtml(tool2Score)}<span style="font-size: 20px; color: #94A3B8;">/10</span></div>
        <div class="metric-label">╫ö╫ó╫¿╫¢╫¬ ╫æ╫ÿ╫Ö╫ù╫ò╫¬</div>
        <div style="font-size: 9px; color: #64748B; margin-top: 4px;">╫¿╫₧╫¬ ╫ö╫í╫Ö╫¢╫ò╫ƒ ╫æ╫Ö╫Ö╫⌐╫ò╫¥</div>
      </div>
      
      <div class="metric-card">
        <div class="metric-value" style="font-size: 28px;">${sixMonthSavings}</div>
        <div class="metric-label">╫ö╫ó╫¿╫¢╫¬ ╫ù╫í╫¢╫ò╫ƒ ╫£-6 ╫ù╫ò╫ô╫⌐╫Ö╫¥</div>
        <div style="font-size: 9px; color: #64748B; margin-top: 4px;">╫É╫ù╫¿╫Ö ╫á╫Ö╫¢╫ò╫Ö ╫¢╫£ ╫ö╫ó╫£╫ò╫Ö╫ò╫¬</div>
      </div>
    </div>
    <div style="height:8px"></div>
  </div>

  <!-- Tool 1: Opportunity Assessment -->
  <div class="detail-section">
    <h3 style="display: flex; align-items: center; justify-content: space-between;">
      <span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="display: inline-block; vertical-align: middle; margin-left: 4px;"><circle cx="12" cy="12" r="10" fill="#3B82F6"/><circle cx="12" cy="12" r="6" fill="#DBEAFE"/><circle cx="12" cy="12" r="3" fill="#1E40AF"/></svg> ╫¢╫£╫Ö 1: ╫á╫Ö╫¬╫ò╫ù ╫ö╫¬╫É╫₧╫ö ╫£╫₧╫⌐╫Ö╫₧╫ö</span>
      <span style="font-size: 12px; font-weight: 800; color: ${tool1Score >= 7 ? '#10B981' : tool1Score >= 4 ? '#F59E0B' : '#EF4444'}; background: ${tool1Score >= 7 ? '#ECFDF5' : tool1Score >= 4 ? '#FFFBEB' : '#FEE2E2'}; padding: 2px 6px; border-radius: 4px; white-space: nowrap;">${escapeHtml(tool1Score)}/10 ΓÇö ${escapeHtml(tool1.fitLabel || '')}</span>
    </h3>
      <div class="detail-grid">
        <div class="detail-item">
          <strong>╫í╫ò╫Æ ╫ö╫₧╫⌐╫Ö╫₧╫ö:</strong> ${escapeHtml(tool1.taskTypeLabel || '╫£╫É ╫ª╫ò╫Ö╫ƒ')}
        </div>
        <div class="detail-item">
          <strong>╫¿╫₧╫¬ ╫ù╫û╫¿╫¬╫Ö╫ò╫¬:</strong> ${escapeHtml(tool1.repetitivenessLabel || '╫£╫É ╫ª╫ò╫Ö╫ƒ')}
        </div>
        <div class="detail-item">
          <strong>╫¬╫Ö╫ó╫ò╫ô ╫ò╫ô╫ò╫Æ╫₧╫É╫ò╫¬:</strong> ${escapeHtml(tool1.documentationLabel || '╫£╫É ╫ª╫ò╫Ö╫ƒ')}
        </div>
      </div>

      <div style="margin-top:10px; font-size:11px; color:var(--slate-700);">
        ╫ö╫ö╫ó╫¿╫¢╫ö ╫₧╫ò╫¿╫¢╫æ╫¬ ╫₧╓╛3 ╫₧╫¿╫¢╫Ö╫æ╫Ö╫¥ ╫ó╫Ö╫º╫¿╫Ö╫Ö╫¥. ╫£╫¢╫£ ╫₧╫¿╫¢╫Ö╫æ ╫ö╫ò╫º╫ª╫ö ╫₧╫⌐╫º╫£ ╫£╫ñ╫Ö ╫ù╫⌐╫Ö╫æ╫ò╫¬ ╫Ö╫ù╫í╫Ö╫¬.
        <br>╫í╫ò╫Æ ╫ö╫₧╫⌐╫Ö╫₧╫ö ΓÇö ╫₧╫⌐╫Ö╫₧╫ò╫¬ ╫⌐╫Æ╫¿╫¬╫Ö╫ò╫¬ ╫ò╫₧╫ò╫æ╫á╫ò╫¬ ╫₧╫¬╫É╫Ö╫₧╫ò╫¬ ╫Ö╫ò╫¬╫¿ ╫£╫É╫ò╫ÿ╫ò╫₧╫ª╫Ö╫ö.
        <br>╫ù╫û╫¿╫¬╫Ö╫ò╫¬ ΓÇö ╫¬╫ö╫£╫Ö╫¢╫Ö╫¥ ╫ó╫º╫æ╫Ö╫Ö╫¥ ╫ò╫ù╫ò╫û╫¿╫Ö╫¥ ╫₧╫É╫ñ╫⌐╫¿╫Ö╫¥ ╫£-AI ╫£╫£╫₧╫ò╫ô ╫ÿ╫ò╫æ ╫Ö╫ò╫¬╫¿.
        <br>╫¬╫Ö╫ó╫ò╫ô ╫ò╫ô╫ò╫Æ╫₧╫É╫ò╫¬ ΓÇö ╫₧╫É╫Æ╫¿ ╫Æ╫ô╫ò╫£ ╫⌐╫£ ╫ô╫ò╫Æ╫₧╫É╫ò╫¬ ╫₧╫⌐╫ñ╫¿ ╫É╫¬ ╫É╫Ö╫¢╫ò╫¬ ╫ö╫É╫Ö╫₧╫ò╫ƒ.
      </div>
  </div>

  <!-- Tool 2: Safety Assessment -->
  <div class="detail-section">
    <h3 style="display: flex; align-items: center; justify-content: space-between;">
      <span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="display: inline-block; vertical-align: middle; margin-left: 4px;"><path d="M12 2L4 6V12C4 16.5 7 20.5 12 22C17 20.5 20 16.5 20 12V6L12 2Z" fill="#10B981" stroke="#059669" stroke-width="1"/></svg> ╫¢╫£╫Ö 2: ╫æ╫ô╫Ö╫º╫¬ ╫æ╫ÿ╫Ö╫ù╫ò╫¬ ╫ò╫í╫Ö╫¢╫ò╫á╫Ö╫¥</span>
      <span style="font-size: 12px; font-weight: 800; color: ${tool2Score >= 7 ? '#10B981' : tool2Score >= 4 ? '#F59E0B' : '#EF4444'}; background: ${tool2Score >= 7 ? '#ECFDF5' : tool2Score >= 4 ? '#FFFBEB' : '#FEE2E2'}; padding: 2px 6px; border-radius: 4px; white-space: nowrap;">${escapeHtml(tool2Score)}/10 ΓÇö ${escapeHtml(tool2.safetyLabel || '')}</span>
    </h3>
    <div class="detail-grid">
      <div class="detail-item">
        <strong>╫₧╫ª╫æ ╫Æ╫Ö╫æ╫ò╫Ö╫Ö╫¥:</strong> ${escapeHtml(tool2.backupsLabel || '╫£╫É ╫ª╫ò╫Ö╫ƒ')}
      </div>
      <div class="detail-item">
        <strong>╫û╫Ö╫ö╫ò╫Ö ╫⌐╫Æ╫Ö╫É╫ò╫¬:</strong> ${escapeHtml(tool2.errorDetectionLabel || '╫£╫É ╫ª╫ò╫Ö╫ƒ')}
      </div>
      <div class="detail-item">
        <strong>╫ö╫⌐╫£╫¢╫ò╫¬ ╫⌐╫Æ╫Ö╫É╫ö:</strong> ${escapeHtml(tool2.errorConsequenceLabel || '╫£╫É ╫ª╫ò╫Ö╫ƒ')}
      </div>
      <div class="detail-item">
        <strong>╫Ö╫¢╫ò╫£╫¬ ╫ö╫ÿ╫₧╫ó╫ö:</strong> ${escapeHtml(tool2.capacityLabel || '╫£╫É ╫ª╫ò╫Ö╫ƒ')}
      </div>
    </div>

    <div style="margin-top:10px; font-size:11px; color:var(--slate-700);">
      ╫ö╫ö╫ó╫¿╫¢╫ö ╫₧╫ò╫¿╫¢╫æ╫¬ ╫₧╫₧╫í╫ñ╫¿ ╫₧╫¿╫¢╫Ö╫æ╫Ö ╫í╫Ö╫¢╫ò╫ƒ ╫⌐╫¢╫£ ╫É╫ù╫ô ╫₧╫ö╫¥ ╫₧╫⌐╫ñ╫Ö╫ó ╫ó╫£ ╫ö╫Ö╫¢╫ò╫£╫¬ ╫£╫ö╫ÿ╫₧╫Ö╫ó ╫É╫¬ ╫ö╫¢╫£╫Ö ╫æ╫æ╫ÿ╫ù╫ö.
      <br>╫¬╫⌐╫¬╫Ö╫¬ ╫ò╫Æ╫Ö╫æ╫ò╫Ö╫Ö╫¥ - ╫ù╫ò╫í╫ƒ ╫₧╫ó╫¿╫¢╫¬╫Ö ╫₧╫º╫ÿ╫Ö╫ƒ ╫É╫¬ ╫ö╫í╫Ö╫¢╫ò╫ƒ ╫£╫É╫ò╫æ╫ô╫ƒ ╫É╫ò ╫£╫⌐╫Ö╫æ╫ò╫⌐╫Ö╫¥.
      <br>╫⌐╫Æ╫Ö╫É╫ò╫¬ - ╫ÿ╫ó╫ò╫Ö╫ò╫¬ ╫⌐╫º╫⌐╫ö ╫£╫Æ╫£╫ò╫¬ ╫É╫ò ╫⌐╫Æ╫ò╫¿╫₧╫ò╫¬ ╫£╫á╫û╫º ╫₧╫⌐╫₧╫ó╫ò╫¬╫Ö ╫₧╫ó╫£╫ò╫¬ ╫É╫¬ ╫ö╫í╫Ö╫¢╫ò╫ƒ.
      <br>╫á╫¬╫ò╫á╫Ö╫¥ - ╫ù╫ò╫í╫¿╫Ö╫¥, ╫É╫Ö╫¢╫ò╫¬ ╫á╫₧╫ò╫¢╫ö ╫É╫ò ╫¿╫Æ╫Ö╫⌐╫ò╫¬ ╫₧╫Ö╫ô╫ó ╫₧╫Æ╫ô╫Ö╫£╫Ö╫¥ ╫É╫¬ ╫ö╫í╫Ö╫¢╫ò╫ƒ.
      <br>╫₧╫⌐╫É╫æ╫Ö╫¥ - ╫₧╫ù╫í╫ò╫¿ ╫æ╫û╫₧╫Ö╫á╫ò╫¬ ╫£╫£╫₧╫Ö╫ô╫ö, ╫ö╫ÿ╫₧╫ó╫ö ╫ò╫æ╫Ö╫ª╫ò╫ó ╫æ╫ô╫Ö╫º╫ò╫¬ ╫₧╫ó╫£╫ö ╫É╫¬ ╫ö╫í╫Ö╫¢╫ò╫ƒ.
    </div>
  </div>

  <!-- Tool 3: ROI Calculation -->
  <div class="detail-section">
    <h3 style="display: flex; align-items: center; justify-content: space-between;">
      <span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="display: inline-block; vertical-align: middle; margin-left: 4px;"><path d="M12 2C12 2 17 7 17 12C17 15.31 14.31 18 11 18C7.69 18 5 15.31 5 12C5 9 8 6 8 6C8 8 9 9 11 9C11 6 12 2 12 2Z" fill="#EF4444" stroke="#DC2626" stroke-width="1"/></svg> ╫¢╫£╫Ö 3: ╫ö╫ó╫¿╫¢╫¬ ╫ù╫í╫¢╫ò╫ƒ ╫£-6 ╫ù╫ò╫ô╫⌐╫Ö╫¥</span>
      <span style="font-size: 14px; font-weight: 700; color: #10B981; background: #ECFDF5; padding: 4px 10px; border-radius: 6px;">╫ö╫ù╫û╫¿ ╫ö╫⌐╫º╫ó╫ö ╫æ╫ù╫ò╫ô╫⌐ ${tool3.breakEvenMonth && tool3.breakEvenMonth <= 12 ? escapeHtml(String(tool3.breakEvenMonth)) : 'ΓÇö'} | ╫ù╫Ö╫í╫¢╫ò╫ƒ ╫¢╫ò╫£╫£: ${sixMonthSavings}</span>
    </h3>
    

    <div class="detail-grid">
      <div class="detail-item">
        <strong>╫⌐╫ó╫ò╫¬ ╫⌐╫æ╫ò╫ó╫Ö╫ò╫¬ ╫£╫₧╫⌐╫Ö╫₧╫ö:</strong> ${escapeHtml(tool3.hoursPerWeek ?? '╫£╫É ╫ª╫ò╫Ö╫ƒ')}
      </div>
      <div class="detail-item">
        <strong>╫₧╫í╫ñ╫¿ ╫ó╫ò╫æ╫ô╫Ö╫¥ ╫₧╫æ╫ª╫ó╫Ö╫¥:</strong> ${escapeHtml(tool3.numEmployees ?? '╫£╫É ╫ª╫ò╫Ö╫ƒ')}
      </div>
      <div class="detail-item">
        <strong>╫ó╫£╫ò╫¬ ╫⌐╫ó╫¬╫Ö╫¬:</strong> ${formatCurrency(tool3.hourlyRate ?? 0)}
      </div>
      <div class="detail-item">
        <strong>╫⌐╫ó╫ò╫¬ ╫£╫₧╫Ö╫ô╫ö ╫₧╫⌐╫ò╫ó╫¿╫ò╫¬:</strong> ${escapeHtml(tool3.learningHours ?? '╫£╫É ╫ù╫ò╫⌐╫æ')}
      </div>
      <div class="detail-item">
        <strong>╫¬╫º╫ª╫Ö╫æ ╫ù╫ò╫ô╫⌐╫Ö ╫₧╫ò╫ó╫¿╫Ü:</strong> ${formatCurrency(tool3.monthlyBudgetUsed ?? 0)}
      </div>
      <div class="detail-item">
        <strong>╫¿╫₧╫¬ ╫¢╫£╫Ö ╫₧╫ò╫₧╫£╫ª╫¬:</strong> ${escapeHtml(tool3.recommendedTier || '╫£╫É ╫û╫₧╫Ö╫ƒ')}
      </div>
      <div class="detail-item">
        <strong>╫ñ╫¿╫ò╫ñ╫Ö╫£ ╫ö╫ÿ╫₧╫ó╫ö:</strong> ${escapeHtml(tool3.implementationProfileLabel || '╫£╫É ╫ª╫ò╫Ö╫ƒ')}
      </div>
      <div class="detail-item">
        <strong>╫á╫ò╫ù╫ò╫¬ ╫ÿ╫¢╫á╫ò╫£╫ò╫Æ╫Ö╫¬:</strong> ${escapeHtml(tool3.technicalComfortLabel || '╫£╫É ╫ª╫ò╫Ö╫ƒ')}
      </div>
      <div class="detail-item">&nbsp;</div>
    </div>

    <div style="margin-top:10px; font-size:11px; color:var(--slate-700);">
      ╫ö╫ù╫Ö╫⌐╫ò╫æ ╫₧╫æ╫ò╫í╫í ╫ó╫£ ╫ö╫ñ╫ù╫¬╫¬ ╫⌐╫ó╫ò╫¬ ╫ó╫æ╫ò╫ô╫ö ╫⌐╫£ ╫ó╫ò╫æ╫ô╫Ö╫¥ ╫æ╫ó╫º╫æ╫ò╫¬ ╫ö╫ÿ╫₧╫ó╫¬ ╫ö╫É╫ò╫ÿ╫ò╫₧╫ª╫Ö╫ö, ╫æ╫á╫Ö╫¢╫ò╫Ö ╫ó╫£╫ò╫Ö╫ò╫¬ ╫£╫₧╫Ö╫ô╫ö,
      ╫¬╫ù╫û╫ò╫º╫ö ╫ò╫¢╫£╫Ö AI. ╫ö╫ù╫Ö╫⌐╫ò╫æ ╫₧╫á╫Ö╫ù ╫ó╫£╫Ö╫Ö╫ö ╫ö╫ô╫¿╫Æ╫¬╫Ö╫¬ ╫æ╫Ö╫ó╫Ö╫£╫ò╫¬ ╫ò╫ó╫£╫ò╫Ö╫ò╫¬ ╫º╫æ╫ò╫ó╫ò╫¬ ╫£╫¢╫£╫Ö╫¥. ╫á╫º╫ò╫ô╫¬ ╫ö╫É╫Ö╫û╫ò╫ƒ ╫₧╫⌐╫º╫ñ╫¬ ╫É╫¬ ╫ö╫ù╫ò╫ô╫⌐ ╫⌐╫æ╫ò ╫ö╫ù╫Ö╫í╫¢╫ò╫ƒ ╫ö╫₧╫ª╫ÿ╫æ╫¿ "╫₧╫ù╫û╫Ö╫¿" ╫É╫¬ ╫ö╫⌐╫º╫ó╫¬ ╫ö╫ó╫£╫ò╫Ö╫ò╫¬.
    </div>


  </div>
  <!-- Ensure chart starts on its own page -->
  <div class="page-break"></div>
  <!-- Visual ROI Chart -->
  <div class="chart-container">
    <div class="chart-title">╫ö╫ó╫¿╫¢╫¬ ╫ù╫Ö╫í╫¢╫ò╫ƒ ΓÇö 6 ╫ù╫ò╫ô╫⌐╫Ö╫¥</div>
    <div class="chart-bars">
      ${tool3.monthlyBreakdown && tool3.monthlyBreakdown.length > 0 ? (() => {
        const maxCumulative = Math.max(...tool3.monthlyBreakdown.map(m => Math.abs(m.cumulativeSavings)), 1)
        return tool3.monthlyBreakdown.map((month, idx) => {
          const heightPx = Math.max((Math.abs(month.cumulativeSavings) / maxCumulative) * 120, 8)
          const isPositive = month.cumulativeSavings >= 0
          const isBreakeven = tool3.breakEvenMonth === month.month
          const displayValue = formatCurrency(month.cumulativeSavings).replace('Γé¬', '').trim()
          return `
            <div class="chart-bar">
              <div class="bar-value">${displayValue}Γé¬</div>
              <div class="bar-fill" style="height: ${heightPx}px; background-color: ${isPositive ? '#10B981' : '#EF4444'};"></div>
              <div class="bar-label">╫ù${month.month}</div>
              ${isBreakeven ? '<div class="breakeven-mark" style="display:inline-flex; align-items:center; gap:6px;"><svg width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.2l-3.5-3.5L4 14.2 9 19.2 20 8.2 18.6 6.8z" fill="#059669"/></svg><span>╫É╫Ö╫û╫ò╫ƒ</span></div>' : ''}
            </div>
          `
        }).join('')
      })() : '<p style="text-align: center; color: #94A3B8;">╫É╫Ö╫ƒ ╫á╫¬╫ò╫á╫Ö╫¥</p>'}
    </div>
    <div class="chart-summary">
      ╫ö╫ù╫û╫¿ ╫ö╫ó╫¿╫¢╫¬ ╫ö╫⌐╫º╫ó╫ö ╫æ╫ù╫ò╫ô╫⌐ ${tool3.breakEvenMonth ?? 'ΓÇö'} | ╫ù╫Ö╫í╫¢╫ò╫ƒ ╫¢╫ò╫£╫£: ${sixMonthSavings}
    </div>
  </div>

  <!-- 6-Month Breakdown Table -->
  <div class="detail-section">
    <h3><svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="display: inline-block; vertical-align: middle; margin-left: 4px;"><rect x="3" y="17" width="4" height="4" fill="#3B82F6"/><rect x="10" y="12" width="4" height="9" fill="#3B82F6"/><rect x="17" y="7" width="4" height="14" fill="#3B82F6"/></svg> ╫ñ╫Ö╫¿╫ò╫ÿ ╫ö╫ó╫¿╫¢╫¬ ╫ù╫Ö╫í╫¢╫ò╫ƒ ╫ù╫ò╫ô╫⌐╫Ö (6 ╫ù╫ò╫ô╫⌐╫Ö╫¥)</h3>
    
    <div class="table-container">
      <table class="roi-table">
        <thead>
          <tr>
            <th>╫ù╫ò╫ô╫⌐</th>
            <th>╫ù╫Ö╫í╫¢╫ò╫ƒ ╫ó╫æ╫ò╫ô╫ö</th>
            <th>╫ó╫£╫ò╫Ö╫ò╫¬ ╫¢╫ò╫£╫£╫ò╫¬</th>
            <th>╫ù╫Ö╫í╫¢╫ò╫ƒ ╫á╫ÿ╫ò</th>
            <th>╫ù╫Ö╫í╫¢╫ò╫ƒ ╫₧╫ª╫ÿ╫æ╫¿</th>
          </tr>
        </thead>
        <tbody>
          ${tableRowsHtml}
        </tbody>
      </table>
    </div>
    <!-- Simple explanations for table columns -->
    <div style="margin-top:10px; font-size:11px; color:var(--slate-700);">
      <ul style="margin-top:8px; margin-right:18px;">
        <li style="margin-bottom:6px;">ΓÇó "╫ù╫Ö╫í╫¢╫ò╫ƒ ╫ó╫æ╫ò╫ô╫ö" ΓÇö ╫í╫¢╫ò╫¥ ╫ö╫ó╫¿╫¢╫ö ╫⌐╫£ ╫⌐╫ó╫ò╫¬ ╫ó╫æ╫ò╫ô╫ö ╫⌐╫₧╫ª╫ÿ╫₧╫ª╫₧╫ò╫¬ ╫æ╫ó╫º╫æ╫ò╫¬ ╫ö╫É╫ò╫ÿ╫ò╫₧╫ª╫Ö╫ö, ╫₧╫ù╫ò╫⌐╫æ ╫£╫ñ╫Ö ╫⌐╫ó╫ò╫¬ ╫⌐╫ö╫ò╫ñ╫ù╫¬╫ò ├ù ╫⌐╫ó╫¬ ╫ó╫æ╫ò╫ô╫ö ╫₧╫₧╫ò╫ª╫ó╫¬.</li>
        <li>ΓÇó "╫ó╫£╫ò╫Ö╫ò╫¬ ╫¢╫ò╫£╫£╫ò╫¬" ΓÇö ╫í╫Ö╫¢╫ò╫¥ ╫ó╫£╫ò╫Ö╫ò╫¬ ╫ö╫£╫₧╫Ö╫ô╫ö ╫ò╫ö╫ö╫ÿ╫₧╫ó╫ö, ╫¬╫ù╫û╫ò╫º╫ö ╫ò╫ó╫£╫ò╫Ö╫ò╫¬ ╫¢╫£╫Ö (╫ù╫ò╫ô╫⌐╫Ö╫ò╫¬ ╫ò/╫É╫ò ╫ù╫ô╓╛╫ñ╫ó╫₧╫Ö╫ò╫¬ ╫⌐╫ö╫ò╫ª╫Æ╫ò ╫¢╫¬╫ò╫ª╫É╫ö ╫₧╫ö╫ñ╫¿╫ò╫ñ╫Ö╫£ ╫⌐╫á╫æ╫ù╫¿).</li>
        <li style="margin-top:6px;">ΓÇó ╫É╫¥ ╫ª╫Ö╫Ö╫á╫¬ ╫⌐╫á╫ô╫¿╫⌐ ╫í╫Ö╫ò╫ó ╫⌐╫Ö╫¿╫ò╫¬╫Ö╫¥ ╫ù╫Ö╫ª╫ò╫á╫Ö╫Ö╫¥ ╫æ╫ö╫ÿ╫₧╫ó╫¬ ╫¢╫£╫Ö AI, ╫ö╫ó╫£╫ò╫Ö╫ò╫¬ ╫ö╫£╫£╫ò ╫á╫¢╫£╫£╫ò╫¬ ╫¬╫ù╫¬ "╫ó╫£╫ò╫Ö╫ò╫¬ ╫¢╫ò╫£╫£╫ò╫¬" ╫¢╫¬╫⌐╫£╫ò╫¥ ╫ù╫ô╓╛╫ñ╫ó╫₧╫Ö ╫æ╫ù╫ò╫ô╫⌐ 1.</li>
      </ul>
    </div>
    
    ${tool3.breakEvenMonth && tool3.breakEvenMonth <= 6 
        ? `<p style="text-align: center; margin-top: 12px; font-weight: 600; color: #059669;">
          ╫á╫º╫ò╫ô╫¬ ╫É╫Ö╫û╫ò╫ƒ ╫₧╫⌐╫ò╫ó╫¿╫¬: ╫ù╫ò╫ô╫⌐ ${escapeHtml(tool3.breakEvenMonth)}
         </p>`
        : `<p style="text-align: center; margin-top: 12px; font-weight: 600; color: #92400E;">
          ╫á╫º╫ò╫ô╫¬ ╫É╫Ö╫û╫ò╫ƒ ╫ù╫ò╫¿╫Æ╫¬ ╫₧-6 ╫ù╫ò╫ô╫⌐╫Ö╫¥
         </p>`
    }
  </div>

  <!-- CTA Section -->
  <div class="cta-section">
    <div style="text-align: center; margin-bottom: 12px;">
      <p style="font-size: 14px; font-weight: 700; color: var(--blue-900); margin: 0 0 6px 0;">╫¬╫ò╫ô╫ö ╫⌐╫ö╫⌐╫¬╫₧╫⌐╫¬ ╫æ╫í╫Ö╫₧╫ò╫£╫ÿ╫ò╫¿ ╫⌐╫£ BizgoAI</p>
      <p style="font-size: 11px; color: var(--slate-600); margin: 0; line-height: 1.5;">
        ╫ö╫ª╫ÿ╫¿╫ñ/╫Ö ╫£╫ñ╫ó╫Ö╫£╫ò╫¬ ╫æ╫ó╫¿╫ò╫ª╫Ö╫¥ ╫ö╫⌐╫ò╫á╫Ö╫¥ ╫ò╫º╫æ╫£/╫Ö ╫₧╫Ö╫ô╫ó ╫ù╫Ö╫ò╫á╫Ö AI ╫£╫ó╫í╫º╫Ö╫¥ ╫º╫ÿ╫á╫Ö╫¥, ╫ù╫ò╫₧╫¿╫Ö╫¥, ╫¢╫£╫Ö╫¥ ╫ò╫ñ╫¬╫¿╫ò╫á╫ò╫¬ ╫á╫ò╫í╫ñ╫Ö╫¥
      </p>
    </div>
    <!-- Social Media Icons -->
    <div style="display: flex; justify-content: center; gap: 16px; margin-top: 10px;">
      <div style="text-align: center;">
        <div style="width: 32px; height: 32px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 4px auto;">
          <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
        <div style="font-size: 8px; color: var(--slate-600);">WhatsApp</div>
      </div>
      <div style="text-align: center;">
        <div style="width: 32px; height: 32px; background: #1877F2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 4px auto;">
          <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M13 3h3v3h-3c-1.657 0-3 1.567-3 3.5V12h-3v3h3v6h3v-6h2.5l.5-3H13V9.5c0-.276.224-.5.5-.5z"/></svg>
        </div>
        <div style="font-size: 8px; color: var(--slate-600);">Facebook</div>
      </div>
      <div style="text-align: center;">
        <div style="width: 32px; height: 32px; background: #0A66C2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 4px auto;">
          <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M6 9H3V21h3V9zM4.5 6A1.5 1.5 0 1 1 4.5 3a1.5 1.5 0 0 1 0 3zM21 21h-3v-5.5c0-1.328-.497-2.5-1.743-2.5-1.09 0-1.743.73-2.032 1.437-.104.237-.13.566-.13.883V21h-3s.04-11 0-12h3v1.7c.398-.614 1.11-1.486 2.7-1.486C19.21 9.214 21 11.08 21 14.8V21z"/></svg>
        </div>
        <div style="font-size: 8px; color: var(--slate-600);">LinkedIn</div>
      </div>
      <div style="text-align: center;">
        <div style="width: 32px; height: 32px; background: #EA4335; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 4px auto;">
          <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v0.01L12 13 3 6.01V6zM3 8.236V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.236l-9 5.625-9-5.625z"/></svg>
        </div>
        <div style="font-size: 8px; color: var(--slate-600);">Newsletter</div>
      </div>
      <div style="text-align: center;">
        <div style="width: 32px; height: 32px; background: #6366F1; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 4px auto;">
          <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-4 13h2v4H8v-4zm0-8h2v6H8V7zm6 4h2v8h-2v-8z"/></svg>
        </div>
        <div style="font-size: 8px; color: var(--slate-600);">Website</div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p style="margin: 0;"><strong>Israel BizgoAI</strong> | ╫ô╫ò╫ù ╫û╫ö ╫á╫ò╫ª╫¿ ╫É╫ò╫ÿ╫ò╫₧╫ÿ╫Ö╫¬ ╫ó╫£ ╫æ╫í╫Ö╫í ╫ö╫₧╫Ö╫ô╫ó ╫⌐╫ö╫û╫á╫¬</p>
    <p style="margin: 4px 0 0 0; font-size: 8px; line-height: 1.4;">
      ╫₧╫í╫₧╫Ü ╫û╫ö ╫£╫⌐╫Ö╫¿╫ò╫¬╫Ü ╫ò╫₧╫ö╫ò╫ò╫ö ╫ö╫ó╫¿╫¢╫ö ╫É╫Ö╫á╫ô╫Ö╫º╫ÿ╫Ö╫æ╫¬ ╫æ╫£╫æ╫ô. ╫É╫Ö╫ƒ ╫£╫¿╫É╫ò╫¬ ╫æ╫¢╫Ü ╫₧╫⌐╫ò╫¥ ╫ö╫₧╫£╫ª╫ö ╫£╫ñ╫ó╫ò╫£╫ö, ╫Ö╫Ö╫ó╫ò╫Ñ ╫₧╫º╫ª╫ò╫ó╫Ö ╫É╫ò ╫ö╫¬╫ù╫Ö╫Ö╫æ╫ò╫¬.
    </p>
  </div>
</body>
</html>`
}
