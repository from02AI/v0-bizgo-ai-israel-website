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
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
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
  margin: 10px 0;
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
  margin: 16px 0;
}

/* Footer */
.footer {
  position: fixed;
  bottom: 12px;
  left: 0;
  right: 0;
  padding: 8px 0;
  border-top: 1px solid var(--slate-200);
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

const statusText = (status?: RiskStatus) => {
  switch (status) {
    case 'green':
      return '✓ סיכון נמוך — מוכן להטמעה'
    case 'red':
      return '⚠ סיכון גבוה — נדרשת בדיקה מעמיקה'
    default:
      return '⚡ סיכון בינוני — נדרשת היערכות'
  }
}

const getScoreIcon = (score?: number) => {
  if (!score) return '⚪'
  if (score >= 8) return '🟢'
  if (score >= 6) return '🟡'
  if (score >= 4) return '🟠'
  return '🔴'
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

  const taskDisplayName = escapeHtml(tool1.taskName || 'משימה')
  const tool1Score = tool1.score ?? 0
  const tool2Score = tool2.safetyScore ?? 0
  const sixMonthSavings = formatCurrency(tool3.sixMonthTotal ?? 0)
  
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
    <div class="logo-plain">BizgoAI</div>
    <!-- Date top-right -->
    <div class="date-plain">${escapeHtml(currentDate)}</div>
    <!-- Centered Headline (primary) -->
    <h1 class="h1">דוח מוכנות בינה מלאכותית</h1>
    <!-- Mission Title (slightly bigger) - show once under headline -->
    <div style="text-align: center; font-size:16px; font-weight:700; color:var(--slate-700); margin-bottom: 12px;">המשימה: ${taskDisplayName}</div>
  </div>

  <!-- Summary Section -->
  <div class="summary-section">
    <h2 class="section-title">סיכום ביצועים</h2>
    
    <!-- Status Badge ABOVE cards for better visibility -->
    <div class="status-badge ${escapeHtml(tool2.status || 'yellow')}">
      ${statusText(tool2.status)}
    </div>
    
    <!-- RTL-Correct Card Order: Tool1 (right) → Tool2 (middle) → Tool3 (left) -->
    <div class="summary-grid">
      <div class="metric-card">
        <div class="metric-value">${getScoreIcon(tool1Score)} ${escapeHtml(tool1Score)}<span style="font-size: 20px; color: #94A3B8;">/10</span></div>
        <div class="metric-label">ציון התאמה</div>
        <div style="font-size: 9px; color: #64748B; margin-top: 4px;">עד כמה המשימה מתאימה ל-AI</div>
      </div>
      
      <div class="metric-card">
        <div class="metric-value">${getScoreIcon(tool2Score)} ${escapeHtml(tool2Score)}<span style="font-size: 20px; color: #94A3B8;">/10</span></div>
        <div class="metric-label">ציון בטיחות</div>
        <div style="font-size: 9px; color: #64748B; margin-top: 4px;">רמת הסיכון ביישום</div>
      </div>
      
      <div class="metric-card">
        <div class="metric-value" style="font-size: 28px;">${sixMonthSavings}</div>
        <div class="metric-label">חסכון צפוי ל-6 חודשים</div>
        <div style="font-size: 9px; color: #64748B; margin-top: 4px;">אחרי ניכוי כל העלויות</div>
      </div>
    </div>
  </div>

  <!-- Tool 1: Opportunity Assessment -->
  <div class="detail-section">
    <h3 style="display: flex; align-items: center; justify-content: space-between;">
      <span>🎯 כלי 1: ניתוח התאמה למשימה</span>
      <span style="font-size: 12px; font-weight: 800; color: ${tool1Score >= 7 ? '#10B981' : tool1Score >= 4 ? '#F59E0B' : '#EF4444'}; background: ${tool1Score >= 7 ? '#ECFDF5' : tool1Score >= 4 ? '#FFFBEB' : '#FEE2E2'}; padding: 2px 6px; border-radius: 4px; white-space: nowrap;">${escapeHtml(tool1Score)}/10 — ${escapeHtml(tool1.fitLabel || '')}</span>
    </h3>
    <div class="detail-grid">
      <div class="detail-item">
        <strong>סוג המשימה:</strong> ${escapeHtml(tool1.taskTypeLabel || 'לא צוין')}
      </div>
      <div class="detail-item">
        <strong>רמת חזרתיות:</strong> ${escapeHtml(tool1.repetitivenessLabel || 'לא צוין')}
      </div>
      <div class="detail-item" style="grid-column: 1 / -1;">
        <strong>תיעוד ודוגמאות:</strong> ${escapeHtml(tool1.documentationLabel || 'לא צוין')}
      </div>
    </div>
  </div>

  <!-- Tool 2: Safety Assessment -->
  <div class="detail-section">
    <h3 style="display: flex; align-items: center; justify-content: space-between;">
      <span>🛡️ כלי 2: בדיקת בטיחות וסיכונים</span>
      <span style="font-size: 12px; font-weight: 800; color: ${tool2Score >= 7 ? '#10B981' : tool2Score >= 4 ? '#F59E0B' : '#EF4444'}; background: ${tool2Score >= 7 ? '#ECFDF5' : tool2Score >= 4 ? '#FFFBEB' : '#FEE2E2'}; padding: 2px 6px; border-radius: 4px; white-space: nowrap;">${escapeHtml(tool2Score)}/10 — ${escapeHtml(tool2.safetyLabel || '')}</span>
    </h3>
    <div class="detail-grid">
      <div class="detail-item">
        <strong>סיכון משוקלל:</strong> ${escapeHtml(tool2.weightedRisk?.toFixed(2) ?? 'לא חושב')}
      </div>
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
  </div>

  <!-- Tool 3: ROI Calculation -->
  <div class="detail-section">
    <h3 style="display: flex; align-items: center; justify-content: space-between;">
      <span>💰 כלי 3: חישוב ROI והמלצות</span>
      <span style="font-size: 18px; font-weight: 700; color: #10B981; background: #ECFDF5; padding: 4px 10px; border-radius: 6px;">החזר בחודש ${tool3.breakEvenMonth && tool3.breakEvenMonth <= 6 ? escapeHtml(tool3.breakEvenMonth) : '7+'}</span>
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
        <strong>תקציב חודשי מומלץ:</strong> ${formatCurrency(tool3.monthlyBudgetUsed ?? 0)}
      </div>
      <div class="detail-item">
        <strong>רמת כלי מומלצת:</strong> ${escapeHtml(tool3.recommendedTier || 'לא זמין')}
      </div>
      <div class="detail-item" style="grid-column: 1 / -1;">
        <strong>פרופיל הטמעה:</strong> ${escapeHtml(tool3.implementationProfileLabel || 'לא צוין')}
      </div>
      <div class="detail-item" style="grid-column: 1 / -1;">
        <strong>נוחות טכנולוגית:</strong> ${escapeHtml(tool3.technicalComfortLabel || 'לא צוין')}
      </div>
    </div>

  </div>

  <!-- Ensure chart starts on its own page -->
  <div class="page-break"></div>
  <!-- Visual ROI Chart -->
  <div class="chart-container">
    <div class="chart-title">מסלול החיסכון — 6 חודשים</div>
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
              ${isBreakeven ? '<div class="breakeven-mark">✓ איזון</div>' : ''}
            </div>
          `
        }).join('')
      })() : '<p style="text-align: center; color: #94A3B8;">אין נתונים</p>'}
    </div>
    <div class="chart-summary">
      החזר השקעה בחודש ${tool3.breakEvenMonth ?? '—'} | חיסכון כולל: ${sixMonthSavings}
    </div>
  </div>

  <!-- 6-Month Breakdown Table -->
  <div class="detail-section">
    <h3>📊 פירוט חיסכון חודשי (6 חודשים)</h3>
    
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
    
    ${tool3.breakEvenMonth && tool3.breakEvenMonth <= 6 
      ? `<p style="text-align: center; margin-top: 12px; font-weight: 600; color: #059669;">
          ✓ נקודת איזון משוערת: חודש ${escapeHtml(tool3.breakEvenMonth)}
         </p>`
      : `<p style="text-align: center; margin-top: 12px; font-weight: 600; color: #92400E;">
          ⚠ נקודת איזון חורגת מ-6 חודשים
         </p>`
    }
  </div>

  <!-- CTA Section -->
  <div class="cta-section">
    <div style="text-align: center; margin-bottom: 12px;">
      <p style="font-size: 14px; font-weight: 700; color: var(--blue-900); margin: 0 0 6px 0;">תודה שהשתמשת בסימולטור של BizgoAI</p>
      <p style="font-size: 11px; color: var(--slate-600); margin: 0; line-height: 1.5;">
        הצטרפ/י לפעילות בערוצים השונים וקבל/י מידע חיוני AI לעסקים קטנים, חומרים, כלים ופתרונות נוספים
      </p>
    </div>
    <!-- Social Media Icons -->
    <div style="display: flex; justify-content: center; gap: 16px; margin-top: 10px;">
      <div style="text-align: center;">
        <div style="width: 32px; height: 32px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 4px auto;">
          <span style="color: white; font-size: 18px; font-weight: 700;">W</span>
        </div>
        <div style="font-size: 8px; color: var(--slate-600);">WhatsApp</div>
      </div>
      <div style="text-align: center;">
        <div style="width: 32px; height: 32px; background: #1877F2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 4px auto;">
          <span style="color: white; font-size: 18px; font-weight: 700;">f</span>
        </div>
        <div style="font-size: 8px; color: var(--slate-600);">Facebook</div>
      </div>
      <div style="text-align: center;">
        <div style="width: 32px; height: 32px; background: #0A66C2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 4px auto;">
          <span style="color: white; font-size: 18px; font-weight: 700;">in</span>
        </div>
        <div style="font-size: 8px; color: var(--slate-600);">LinkedIn</div>
      </div>
      <div style="text-align: center;">
        <div style="width: 32px; height: 32px; background: #EA4335; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 4px auto;">
          <span style="color: white; font-size: 16px; font-weight: 700;">✉</span>
        </div>
        <div style="font-size: 8px; color: var(--slate-600);">Newsletter</div>
      </div>
      <div style="text-align: center;">
        <div style="width: 32px; height: 32px; background: #6366F1; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 4px auto;">
          <span style="color: white; font-size: 18px; font-weight: 700;">🌐</span>
        </div>
        <div style="font-size: 8px; color: var(--slate-600);">Website</div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p style="margin: 0;"><strong>Israel BizgoAI</strong> | דוח זה נוצר אוטומטית על בסיס המידע שהזנת</p>
    <p style="margin: 4px 0 0 0; font-size: 8px; line-height: 1.4;">
      מסמך זה לשירותך ומהווה הערכה אינדיקטיבת בלבד. אין לראות בכך משום המלצה לפעולה, ייעוץ מקצועי או התחייבות.
    </p>
  </div>
</body>
</html>`
}
