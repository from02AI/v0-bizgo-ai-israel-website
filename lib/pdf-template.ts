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
      return 'סיכון נמוך — מוכן להטמעה'
    case 'red':
      return 'סיכון גבוה — נדרשת בדיקה מעמיקה'
    default:
      return 'סיכון בינוני — נדרשת היערכות'
  }
}

// Professional score indicator circles (optimized for PDF rendering)
const getScoreIcon = (score?: number) => {
  if (score === undefined || score === null) {
    return '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-left:4px;"><circle cx="8" cy="8" r="6.5" fill="#E5E7EB" stroke="#9CA3AF" stroke-width="1.5"/></svg>'
  }
  if (score >= 8) {
    return '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-left:4px;"><circle cx="8" cy="8" r="6.5" fill="#10B981" stroke="#059669" stroke-width="1.5"/></svg>'
  }
  if (score >= 6) {
    return '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-left:4px;"><circle cx="8" cy="8" r="6.5" fill="#F59E0B" stroke="#D97706" stroke-width="1.5"/></svg>'
  }
  if (score >= 4) {
    return '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-left:4px;"><circle cx="8" cy="8" r="6.5" fill="#F97316" stroke="#EA580C" stroke-width="1.5"/></svg>'
  }
  return '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-left:4px;"><circle cx="8" cy="8" r="6.5" fill="#EF4444" stroke="#DC2626" stroke-width="1.5"/></svg>'
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

  // Canonical site URL for absolute links inside PDFs/emails
  const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://bizgoai.co.il'

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
    tableRowsHtml = '<tr><td colspan="5">לא זמין</td></tr>'
  }

  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>דוח מוכנות AI - ${taskDisplayName}</title>
  <style>
    ${fontFace}
    ${baseStyles}
  </style>
</head>
<body style="padding-bottom: 68px;">
  <!-- Header -->
  <div class="header">
    <!-- Plain text logo top-left -->
    <div class="logo-plain">BizGoAI</div>
    <!-- Date top-right -->
    <div class="date-plain">${escapeHtml(currentDate)}</div>
    <!-- Centered Headline (primary) -->
    <h1 class="h1">הערכת מוכנות ל-AI: סיכום סימולטור (2 עמודים)</h1>
    <!-- Subtitle below headline -->
    <div style="text-align:center; font-size:12px; color:var(--slate-600); margin-top:6px; margin-bottom:8px;">
      במסמך זה מופיעים הנתונים שהזנת ב-3 הכלים וההערכות שבוצעו בעזרתם.
    </div>
    <!-- Mission Title (H2) - show once under headline; reserve space if empty -->
    ${taskDisplayName ? `<h2 style="text-align: center; font-size:16px; font-weight:700; color:var(--slate-700); margin-bottom: 12px;">המשימה: ${taskDisplayName}</h2>` : ''}
  </div>

  <!-- Summary Section -->
  <div class="summary-section">
    <!-- status badge removed per request -->
    
    <!-- RTL-Correct Card Order: Tool1 (right) → Tool2 (middle) → Tool3 (left) -->
    <div class="summary-grid">
      <div class="metric-card">
        <div class="metric-value">${getScoreIcon(tool1Score)} ${escapeHtml(tool1Score)}<span style="font-size: 20px; color: #94A3B8;">/10</span></div>
        <div class="metric-label">הערכת התאמה</div>
        <div style="font-size: 9px; color: #64748B; margin-top: 4px;">עד כמה המשימה מתאימה ל-AI</div>
      </div>
      
      <div class="metric-card">
        <div class="metric-value">${getScoreIcon(tool2Score)} ${escapeHtml(tool2Score)}<span style="font-size: 20px; color: #94A3B8;">/10</span></div>
        <div class="metric-label">הערכת בטיחות</div>
        <div style="font-size: 9px; color: #64748B; margin-top: 4px;">רמת הסיכון ביישום</div>
      </div>
      
      <div class="metric-card">
        <div class="metric-value" style="font-size: 28px;">${sixMonthSavings}</div>
        <div class="metric-label">הערכת חסכון ל-6 חודשים</div>
        <div style="font-size: 9px; color: #64748B; margin-top: 4px;">אחרי ניכוי כל העלויות</div>
      </div>
    </div>
    <div style="height:8px"></div>
  </div>

  <!-- Tool 1: Opportunity Assessment -->
  <div class="detail-section">
    <h3 style="display: flex; align-items: center; justify-content: space-between;">
      <span> כלי 1: ניתוח התאמה למשימה</span>
      <span style="font-size: 12px; font-weight: 800; color: ${tool1Score >= 7 ? '#10B981' : tool1Score >= 4 ? '#F59E0B' : '#EF4444'}; background: ${tool1Score >= 7 ? '#ECFDF5' : tool1Score >= 4 ? '#FFFBEB' : '#FEE2E2'}; padding: 2px 6px; border-radius: 4px; white-space: nowrap;">${escapeHtml(tool1Score)}/10 — ${escapeHtml(tool1.fitLabel || '')}</span>
    </h3>
      <div class="detail-grid">
        <div class="detail-item">
          <strong>סוג המשימה:</strong> ${escapeHtml(tool1.taskTypeLabel || 'לא צוין')}
        </div>
        <div class="detail-item">
          <strong>רמת חזרתיות:</strong> ${escapeHtml(tool1.repetitivenessLabel || 'לא צוין')}
        </div>
        <div class="detail-item">
          <strong>תיעוד ודוגמאות:</strong> ${escapeHtml(tool1.documentationLabel || 'לא צוין')}
        </div>
      </div>

      <div style="margin-top:10px; font-size:11px; color:var(--slate-700);">
        ההערכה מורכבת מ־3 מרכיבים עיקריים. לכל מרכיב הוקצה משקל לפי חשיבות יחסית.
        <br>סוג המשימה — משימות שגרתיות ומובנות מתאימות יותר לאוטומציה.
        <br>חזרתיות — תהליכים עקביים וחוזרים מאפשרים ל-AI ללמוד טוב יותר.
        <br>תיעוד ודוגמאות — מאגר גדול של דוגמאות משפר את איכות האימון.
      </div>
  </div>

  <!-- Tool 2: Safety Assessment -->
  <div class="detail-section">
    <h3 style="display: flex; align-items: center; justify-content: space-between;">
      <span> כלי 2: בדיקת בטיחות וסיכונים</span>
      <span style="font-size: 12px; font-weight: 800; color: ${tool2Score >= 7 ? '#10B981' : tool2Score >= 4 ? '#F59E0B' : '#EF4444'}; background: ${tool2Score >= 7 ? '#ECFDF5' : tool2Score >= 4 ? '#FFFBEB' : '#FEE2E2'}; padding: 2px 6px; border-radius: 4px; white-space: nowrap;">${escapeHtml(tool2Score)}/10 — ${escapeHtml(tool2.safetyLabel || '')}</span>
    </h3>
    <div class="detail-grid">
      <div class="detail-item">
        <strong>מצב גיבויים:</strong> ${escapeHtml(tool2.backupsLabel || 'לא צוין')}
      </div>
      <div class="detail-item">
        <strong>זיהוי שגיאות:</strong> ${escapeHtml(tool2.errorDetectionLabel || 'לא צוין')}
      </div>
      <div class="detail-item">
        <strong>השלכות שגיאה:</strong> ${escapeHtml(tool2.errorConsequenceLabel || 'לא צוין')}
      </div>
      <div class="detail-item">
        <strong>יכולת הטמעה:</strong> ${escapeHtml(tool2.capacityLabel || 'לא צוין')}
      </div>
    </div>

    <div style="margin-top:10px; font-size:11px; color:var(--slate-700);">
      ההערכה מורכבת ממספר מרכיבי סיכון שכל אחד מהם משפיע על היכולת להטמיע את הכלי בבטחה.
      <br>תשתית וגיבויים - חוסן מערכתי מקטין את הסיכון לאובדן או לשיבושים.
      <br>שגיאות - טעויות שקשה לגלות או שגורמות לנזק משמעותי מעלות את הסיכון.
      <br>נתונים - חוסרים, איכות נמוכה או רגישות מידע מגדילים את הסיכון.
      <br>משאבים - מחסור בזמינות ללמידה, הטמעה וביצוע בדיקות מעלה את הסיכון.
    </div>
  </div>

  <!-- Tool 3: ROI Calculation -->
  <div class="detail-section">
    <h3 style="display: flex; align-items: center; justify-content: space-between;">
      <span> כלי 3: הערכת חסכון ל-6 חודשים</span>
      <span style="font-size: 14px; font-weight: 700; color: #10B981; background: #ECFDF5; padding: 4px 10px; border-radius: 6px;">החזר השקעה בחודש ${tool3.breakEvenMonth && tool3.breakEvenMonth <= 12 ? escapeHtml(String(tool3.breakEvenMonth)) : '—'} | חיסכון כולל: ${sixMonthSavings}</span>
    </h3>
    

    <div class="detail-grid">
      <div class="detail-item">
        <strong>שעות שבועיות למשימה:</strong> ${escapeHtml(tool3.hoursPerWeek ?? 'לא צוין')}
      </div>
      <div class="detail-item">
        <strong>מספר עובדים מבצעים:</strong> ${escapeHtml(tool3.numEmployees ?? 'לא צוין')}
      </div>
      <div class="detail-item">
        <strong>עלות שעתית:</strong> ${formatCurrency(tool3.hourlyRate ?? 0)}
      </div>
      <div class="detail-item">
        <strong>שעות למידה משוערות:</strong> ${escapeHtml(tool3.learningHours ?? 'לא חושב')}
      </div>
      <div class="detail-item">
        <strong>תקציב חודשי מוערך:</strong> ${formatCurrency(tool3.monthlyBudgetUsed ?? 0)}
      </div>
      <div class="detail-item">
        <strong>רמת כלי מומלצת:</strong> ${escapeHtml(tool3.recommendedTier || 'לא זמין')}
      </div>
      <div class="detail-item">
        <strong>פרופיל הטמעה:</strong> ${escapeHtml(tool3.implementationProfileLabel || 'לא צוין')}
      </div>
      <div class="detail-item">
        <strong>נוחות טכנולוגית:</strong> ${escapeHtml(tool3.technicalComfortLabel || 'לא צוין')}
      </div>
      <div class="detail-item">&nbsp;</div>
    </div>

    <div style="margin-top:10px; font-size:11px; color:var(--slate-700);">
      החישוב מבוסס על הפחתת שעות עבודה של עובדים בעקבות הטמעת האוטומציה, בניכוי עלויות למידה,
      תחזוקה וכלי AI. החישוב מניח עלייה הדרגתית ביעילות ועלויות קבועות לכלים. נקודת האיזון משקפת את החודש שבו החיסכון המצטבר "מחזיר" את השקעת העלויות.
    </div>


  </div>
  <!-- Ensure chart starts on its own page -->
  <div class="page-break"></div>
  <!-- Visual ROI Chart -->
  <div class="chart-container">
    <div class="chart-title">הערכת חיסכון — 6 חודשים</div>
    <div class="chart-bars">
      ${tool3.monthlyBreakdown && tool3.monthlyBreakdown.length > 0 ? (() => {
        const maxCumulative = Math.max(...tool3.monthlyBreakdown.map(m => Math.abs(m.cumulativeSavings)), 1)
        return tool3.monthlyBreakdown.map((month, idx) => {
          const heightPx = Math.max((Math.abs(month.cumulativeSavings) / maxCumulative) * 120, 8)
          const isPositive = month.cumulativeSavings >= 0
          const isBreakeven = tool3.breakEvenMonth === month.month
          const displayValue = formatCurrency(month.cumulativeSavings).replace('₪', '').trim()
          return `
            <div class="chart-bar">
              <div class="bar-value">${displayValue}₪</div>
              <div class="bar-fill" style="height: ${heightPx}px; background-color: ${isPositive ? '#10B981' : '#EF4444'};"></div>
              <div class="bar-label">ח${month.month}</div>
              ${isBreakeven ? '<div class="breakeven-mark" style="display:inline-flex; align-items:center; gap:6px;"><svg width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.2l-3.5-3.5L4 14.2 9 19.2 20 8.2 18.6 6.8z" fill="#059669"/></svg><span>איזון</span></div>' : ''}
            </div>
          `
        }).join('')
      })() : '<p style="text-align: center; color: #94A3B8;">אין נתונים</p>'}
    </div>
    <div class="chart-summary">
      החזר הערכת השקעה בחודש ${tool3.breakEvenMonth ?? '—'} | חיסכון כולל: ${sixMonthSavings}
    </div>
  </div>

  <!-- 6-Month Breakdown Table -->
  <div class="detail-section">
    <h3> פירוט הערכת חיסכון חודשי (6 חודשים)</h3>
    
    <div class="table-container">
      <table class="roi-table">
        <thead>
          <tr>
            <th>חודש</th>
            <th>חיסכון עבודה</th>
            <th>עלויות כוללות</th>
            <th>חיסכון נטו</th>
            <th>חיסכון מצטבר</th>
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
        <li style="margin-bottom:6px;">• "חיסכון עבודה" — סכום הערכה של שעות עבודה שמצטמצמות בעקבות האוטומציה, מחושב לפי שעות שהופחתו × שעת עבודה ממוצעת.</li>
        <li>• "עלויות כוללות" — סיכום עלויות הלמידה וההטמעה, תחזוקה ועלויות כלי (חודשיות ו/או חד־פעמיות שהוצגו כתוצאה מהפרופיל שנבחר).</li>
        <li style="margin-top:6px;">• אם ציינת שנדרש סיוע שירותים חיצוניים בהטמעת כלי AI, העלויות הללו נכללות תחת "עלויות כוללות" כתשלום חד־פעמי בחודש 1.</li>
      </ul>
    </div>
    
    ${tool3.breakEvenMonth && tool3.breakEvenMonth <= 6 
        ? `<p style="text-align: center; margin-top: 12px; font-weight: 600; color: #059669;">
          נקודת איזון משוערת: חודש ${escapeHtml(tool3.breakEvenMonth)}
         </p>`
        : `<p style="text-align: center; margin-top: 12px; font-weight: 600; color: #92400E;">
          נקודת איזון חורגת מ-6 חודשים
         </p>`
    }
  </div>

  <!-- CTA Section -->
  <div class="cta-section">
    <div style="text-align: center; margin-bottom: 12px;">
      <p style="font-size: 14px; font-weight: 700; color: var(--blue-900); margin: 0 0 6px 0;">תודה שהשתמשת בסימולטור של BizGoAI</p>
      <p style="font-size: 11px; color: var(--slate-600); margin: 0; line-height: 1.5;">
        הצטרפ/י לפעילות בערוצים השונים וקבל/י מידע חיוני AI לעסקים קטנים, חומרים, כלים ופתרונות נוספים
      </p>
    </div>
    <!-- Social Media Icons (high-quality badges) -->
    <div style="display: flex; justify-content: center; gap: 20px; margin-top: 16px;">
      <div style="text-align: center;">
        <a href="${siteUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration:none; color:inherit;">
          <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 6px auto; box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white">
              <circle cx="12" cy="12" r="10" fill="none" stroke="white" stroke-width="2"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="white" stroke-width="2" fill="none"/>
            </svg>
          </div>
          <div style="font-size: 10px; color: var(--slate-700); font-weight: 600;">Website</div>
        </a>
      </div>

      <div style="text-align: center;">
        <a href="${siteUrl}/newsletter" target="_blank" rel="noopener noreferrer" style="text-decoration:none; color:inherit;">
          <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 6px auto; box-shadow: 0 4px 8px rgba(245, 87, 108, 0.3);">
            <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div style="font-size: 10px; color: var(--slate-700); font-weight: 600;">Newsletter</div>
        </a>
      </div>

      <div style="text-align: center;">
        <a href="https://www.linkedin.com/in/shani-carmi-radoszycki-b7474886/" target="_blank" rel="noopener noreferrer" style="text-decoration:none; color:inherit;">
          <div style="width: 48px; height: 48px; background: #0A66C2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 6px auto; box-shadow: 0 4px 8px rgba(10, 102, 194, 0.3);">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="16" font-weight="700" font-family="Arial, sans-serif">in</text>
            </svg>
          </div>
          <div style="font-size: 10px; color: var(--slate-700); font-weight: 600;">LinkedIn</div>
        </a>
      </div>

      <div style="text-align: center;">
        <a href="https://www.facebook.com/groups/3741611762641473" target="_blank" rel="noopener noreferrer" style="text-decoration:none; color:inherit;">
          <div style="width: 48px; height: 48px; background: #1877F2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 6px auto; box-shadow: 0 4px 8px rgba(24, 119, 242, 0.3);">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="18" font-weight="700" font-family="Arial, sans-serif">f</text>
            </svg>
          </div>
          <div style="font-size: 10px; color: var(--slate-700); font-weight: 600;">Facebook</div>
        </a>
      </div>

      <div style="text-align: center;">
        <a href="https://chat.whatsapp.com/JLuDnhyUykg0sy0zOW8fM8" target="_blank" rel="noopener noreferrer" style="text-decoration:none; color:inherit;">
          <div style="width: 48px; height: 48px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 6px auto; box-shadow: 0 4px 8px rgba(37, 211, 102, 0.3);">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="16" font-weight="700" font-family="Arial, sans-serif">W</text>
            </svg>
          </div>
          <div style="font-size: 10px; color: var(--slate-700); font-weight: 600;">WhatsApp</div>
        </a>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p style="margin: 0;"><strong>BizGoAI</strong> | דוח זה נוצר אוטומטית על בסיס המידע שהזנת</p>
    <p style="margin: 4px 0 0 0; font-size: 8px; line-height: 1.4;">
      מסמך זה לשירותך ומהווה הערכה אינדיקטיבת בלבד. אין לראות בכך משום המלצה לפעולה, ייעוץ מקצועי או התחייבות.
    </p>
  </div>
</body>
</html>`
}
