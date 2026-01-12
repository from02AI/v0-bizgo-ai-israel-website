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
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 3px solid var(--blue-600);
}

.logo-box {
  width: 110px;
  height: 44px;
  background: linear-gradient(135deg, var(--blue-900) 0%, var(--blue-800) 100%);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.logo-text {
  color: white;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.header-content {
  flex: 1;
  text-align: left;
  margin-left: 20px;
}

.h1 {
  font-size: 28px;
  font-weight: 700;
  color: var(--blue-900);
  margin-bottom: 4px;
}

.subtitle {
  font-size: 13px;
  color: var(--slate-500);
}

/* Summary Cards */
.summary-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--blue-900);
  margin-bottom: 12px;
  padding-bottom: 6px;
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
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 16px;
}

.status-badge.green { background: var(--green-bg); color: var(--green-text); }
.status-badge.yellow { background: var(--yellow-bg); color: var(--yellow-text); }
.status-badge.red { background: var(--red-bg); color: var(--red-text); }

/* Detail Sections */
.detail-section {
  background: #f8fafc;
  border: 1px solid var(--slate-200);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}

.detail-section h3 {
  font-size: 17px;
  font-weight: 700;
  color: var(--blue-900);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.detail-item {
  font-size: 12px;
  color: var(--slate-700);
  padding: 6px 0;
}

.detail-item strong {
  color: var(--blue-900);
  font-weight: 600;
}

/* ROI Table */
.table-container {
  margin: 20px 0;
  overflow-x: auto;
}

.roi-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.roi-table thead {
  background: var(--blue-900);
  color: white;
}

.roi-table th {
  padding: 14px 10px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
}

.roi-table td {
  padding: 12px 10px;
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

/* Next Steps */
.next-steps {
  background: linear-gradient(135deg, #fef3c7 0%, #fef9e7 100%);
  border: 2px solid #fbbf24;
  border-radius: 10px;
  padding: 14px 18px;
  margin: 18px 0;
}

.next-steps h3 {
  font-size: 16px;
  font-weight: 700;
  color: #92400e;
  margin-bottom: 10px;
}

.next-steps ol {
  margin-right: 18px;
  color: var(--slate-700);
}

.next-steps li {
  margin-bottom: 6px;
  font-size: 13px;
}

/* Footer */
.footer {
  margin-top: 20px;
  padding-top: 12px;
  border-top: 1px solid var(--slate-200);
  text-align: center;
  font-size: 10px;
  color: var(--slate-400);
}

/* ROI Chart */
.chart-container {
  margin: 16px 0 20px 0;
}

.chart-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--blue-900);
  margin-bottom: 12px;
  text-align: center;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  height: 100px;
  gap: 8px;
  margin-bottom: 8px;
}

.chart-bar {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bar-fill {
  width: 100%;
  border-radius: 4px 4px 0 0;
  transition: height 0.3s;
}

.bar-label {
  font-size: 9px;
  color: var(--slate-600);
  margin-top: 4px;
  font-weight: 600;
}

.breakeven-mark {
  font-size: 10px;
  font-weight: 700;
  color: #059669;
  margin-top: 2px;
}

.chart-summary {
  font-size: 11px;
  color: var(--slate-600);
  text-align: center;
  margin-top: 8px;
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
<body>
  <!-- Enhanced Header with Branding -->
  <div class="header">
    <div class="logo-box">
      <div class="logo-text">BizgoAI</div>
    </div>
    <div class="header-content">
      <h1 class="h1">דוח מוכנות בינה מלאכותית</h1>
      <p class="subtitle">${escapeHtml(currentDate)} | נוצר עבור: ${taskDisplayName}</p>
    </div>
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
    <h3>🎯 כלי 1: ניתוח התאמה למשימה</h3>
    <div class="detail-grid">
      <div class="detail-item">
        <strong>שם המשימה:</strong> ${taskDisplayName}
      </div>
      <div class="detail-item">
        <strong>ציון כולל:</strong> ${escapeHtml(tool1Score)}/10 — ${escapeHtml(tool1.fitLabel || 'לא זמין')}
      </div>
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
    <h3>🛡️ כלי 2: בדיקת בטיחות וסיכונים</h3>
    <div class="detail-grid">
      <div class="detail-item">
        <strong>ציון בטיחות:</strong> ${escapeHtml(tool2Score)}/10 — ${escapeHtml(tool2.safetyLabel || 'לא זמין')}
      </div>
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

  <!-- Methodology & Trust Section -->
  <div class="methodology-box">
    <h4>🔍 איך חישבנו את הציונים?</h4>
    <p>
      • <strong>ציון התאמה:</strong> מבוסס על סוג משימה (25%), חזרתיות (45%), ותיעוד (30%)<br/>
      • <strong>ציון בטיחות:</strong> שקלול של גיבויים (25%), זיהוי שגיאות (40%), השלכות (20%), ויכולת (15%)<br/>
      • <strong>חישוב ROI:</strong> בהנחות שמרניות — 4.33 שבועות/חודש, עלייה הדרגתית ביעילות (35%→95%)<br/>
      • <strong>רמת ודאות:</strong> ${tool1Score >= 7 && tool2Score >= 7 ? 'גבוהה ⭐⭐⭐' : tool1Score >= 5 && tool2Score >= 5 ? 'בינונית ⭐⭐' : 'נמוכה-בינונית ⭐'} (מבוסס על איכות הנתונים שסיפקת)
    </p>
  </div>

  <div class="page-break"></div>

  <!-- Tool 3: ROI Calculation -->
  <div class="detail-section">
    <h3>💰 כלי 3: חישוב ROI והמלצות</h3>
    
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

    <!-- Summary: Break-even and Risk Adjustment Only -->
    <div class="summary-grid" style="margin-top: 20px; grid-template-columns: repeat(2, 1fr);">
      <div class="metric-card">
        <div class="metric-value" style="font-size: 32px;">
          ${tool3.breakEvenMonth && tool3.breakEvenMonth <= 6 ? escapeHtml(tool3.breakEvenMonth) : '7+'}
        </div>
        <div class="metric-label">חודש החזר השקעה</div>
      </div>
      
      <div class="metric-card">
        <div class="metric-value" style="font-size: 28px;">
          ${tool3.riskAdjusted ? '✓' : '—'}
        </div>
        <div class="metric-label">התאמה לסיכון</div>
      </div>
    </div>
  </div>

  <!-- Visual ROI Chart -->
  <div class="chart-container">
    <div class="chart-title">מסלול החיסכון — 6 חודשים</div>
    <div class="chart-bars">
      ${tool3.monthlyBreakdown && tool3.monthlyBreakdown.length > 0 ? (() => {
        const maxCumulative = Math.max(...tool3.monthlyBreakdown.map(m => Math.abs(m.cumulativeSavings)), 1)
        return tool3.monthlyBreakdown.map((month, idx) => {
          const height = Math.abs(month.cumulativeSavings) / maxCumulative * 100
          const isPositive = month.cumulativeSavings >= 0
          const isBreakeven = tool3.breakEvenMonth === month.month
          return `
            <div class="chart-bar">
              <div class="bar-fill" style="height: ${height}%; background-color: ${isPositive ? '#10B981' : '#EF4444'};"></div>
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

  <!-- Next Steps -->
  <div class="next-steps">
    <h3>🚀 הצעדים הבאים</h3>
    <ol>
      <li><strong>קבעו פגישת ייעוץ חינם</strong> — לתכנון מפורט והתאמה אישית</li>
      <li><strong>הצטרפו לקהילת WhatsApp</strong> — עדכונים וטיפים שבועיים</li>
      <li><strong>התחילו עם פיילוט קטן</strong> — 10-20% מהמשימות קודם</li>
    </ol>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p><strong>BizgoAI Israel</strong> | דוח זה נוצר אוטומטית על בסיס המידע שהזנת</p>
    <p style="margin-top: 4px;">הערכה זו אינדיקטיבית בלבד ואינה מהווה ייעוץ מקצועי או התחייבות</p>
  </div>
</body>
</html>`
}
