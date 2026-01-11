import React from 'react';

interface PDFTemplateProps {
  data: {
    date: string;
    taskName: string;
    // Tool 1
    fitScore: number;
    fitLabel: string;
    taskTypeLabel: string;
    repetitivenessLabel: string;
    documentationLabel: string;
    // Tool 2
    safetyScore: number;
    safetyLabel: string;
    riskStatus: 'green' | 'yellow' | 'red';
    backupsLabel: string;
    errorDetectionLabel: string;
    errorConsequenceLabel: string;
    capacityLabel: string;
    // Tool 3
    hoursPerWeek: number;
    employees: number;
    hourlyRate: number;
    technicalComfort: string;
    implementationProfile: string;
    learningHours: number;
    recommendedTier: string;
    budgetMin: number;
    budgetMax: number;
    monthlyBudgetUsed: number;
    breakEvenMonth: number;
    totalSixMonthSavings: number;
    monthlyBreakdown: Array<{
      month: number;
      laborSaved: number;
      learningCost: number;
      maintenanceCost: number;
      toolCost: number;
      netSavings: number;
      cumulativeSavings: number;
    }>;
  };
}

export function PDFTemplate({ data }: PDFTemplateProps) {
  const statusEmoji = data.riskStatus === 'green' ? '🟢' : data.riskStatus === 'yellow' ? '🟡' : '🔴';
  const fitEmoji = data.fitScore >= 8 ? '🟢' : data.fitScore >= 6 ? '🟡' : data.fitScore >= 4 ? '🟠' : '🔴';

  return (
    <html dir="rtl" lang="he">
      <head>
        <meta charSet="UTF-8" />
        <title>דוח הערכת מוכנות AI - {data.taskName}</title>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Arial', 'Helvetica', sans-serif;
            direction: rtl;
            background: white;
            color: #1e293b;
            line-height: 1.6;
          }
          
          .page {
            width: 210mm;
            min-height: 297mm;
            padding: 20mm;
            margin: 0 auto;
            background: white;
            page-break-after: always;
          }
          
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            margin-bottom: 30px;
          }
          
          .header h1 {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          
          .header .task-name {
            font-size: 18px;
            opacity: 0.95;
          }
          
          .header .date {
            font-size: 14px;
            opacity: 0.85;
            margin-top: 10px;
          }
          
          .section {
            margin-bottom: 25px;
            padding: 20px;
            background: #f8fafc;
            border-radius: 8px;
            border-right: 4px solid #667eea;
          }
          
          .section-title {
            font-size: 20px;
            font-weight: bold;
            color: #0b2e7b;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          .score-display {
            text-align: center;
            padding: 20px;
            background: white;
            border-radius: 8px;
            margin: 15px 0;
          }
          
          .score-value {
            font-size: 48px;
            font-weight: bold;
            color: #0b2e7b;
          }
          
          .score-label {
            font-size: 16px;
            color: #64748b;
            margin-top: 8px;
          }
          
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 15px;
          }
          
          .info-item {
            background: white;
            padding: 12px;
            border-radius: 6px;
          }
          
          .info-label {
            font-size: 12px;
            color: #64748b;
            margin-bottom: 4px;
          }
          
          .info-value {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            background: white;
          }
          
          th, td {
            padding: 12px;
            text-align: right;
            border-bottom: 1px solid #e2e8f0;
          }
          
          th {
            background: #f1f5f9;
            font-weight: bold;
            color: #0b2e7b;
          }
          
          .positive {
            color: #16a34a;
          }
          
          .negative {
            color: #dc2626;
          }
          
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e2e8f0;
            text-align: center;
            font-size: 12px;
            color: #64748b;
          }
          
          .disclaimer {
            background: #fef3c7;
            border: 1px solid #fbbf24;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            font-size: 13px;
            color: #92400e;
          }
          
          @media print {
            .page {
              margin: 0;
              border: initial;
              width: initial;
              min-height: initial;
              box-shadow: initial;
              background: initial;
              page-break-after: always;
            }
          }
        `}</style>
      </head>
      <body>
        {/* Page 1: Executive Summary */}
        <div className="page">
          <div className="header">
            <h1>דוח הערכת מוכנות AI</h1>
            <div className="task-name">{data.taskName}</div>
            <div className="date">{data.date}</div>
          </div>

          {/* Tool 1: Opportunity Score */}
          <div className="section">
            <div className="section-title">
              <span>{fitEmoji}</span>
              <span>כלי 1: הערכת התאמת המשימה</span>
            </div>
            <div className="score-display">
              <div className="score-value">{data.fitScore}/10</div>
              <div className="score-label">{data.fitLabel}</div>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">סוג המשימה</div>
                <div className="info-value">{data.taskTypeLabel}</div>
              </div>
              <div className="info-item">
                <div className="info-label">רמת חזרתיות</div>
                <div className="info-value">{data.repetitivenessLabel}</div>
              </div>
              <div className="info-item">
                <div className="info-label">תיעוד ודוגמאות</div>
                <div className="info-value">{data.documentationLabel}</div>
              </div>
            </div>
          </div>

          {/* Tool 2: Safety Assessment */}
          <div className="section">
            <div className="section-title">
              <span>{statusEmoji}</span>
              <span>כלי 2: הערכת בטיחות</span>
            </div>
            <div className="score-display">
              <div className="score-value">{data.safetyScore}/10</div>
              <div className="score-label">{data.safetyLabel}</div>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">גיבויים</div>
                <div className="info-value">{data.backupsLabel}</div>
              </div>
              <div className="info-item">
                <div className="info-label">זיהוי שגיאות</div>
                <div className="info-value">{data.errorDetectionLabel}</div>
              </div>
              <div className="info-item">
                <div className="info-label">השלכות טעויות</div>
                <div className="info-value">{data.errorConsequenceLabel}</div>
              </div>
              <div className="info-item">
                <div className="info-label">קיבולת הטמעה</div>
                <div className="info-value">{data.capacityLabel}</div>
              </div>
            </div>
          </div>

          {/* Tool 3: ROI Summary */}
          <div className="section">
            <div className="section-title">
              <span>💰</span>
              <span>כלי 3: תחזית תשואה - סיכום</span>
            </div>
            <div className="score-display">
              <div className="score-value positive">₪{data.totalSixMonthSavings.toLocaleString('he-IL')}</div>
              <div className="score-label">חיסכון צפוי ל-6 חודשים</div>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">נקודת איזון</div>
                <div className="info-value">חודש {data.breakEvenMonth}</div>
              </div>
              <div className="info-item">
                <div className="info-label">שעות שבועיות</div>
                <div className="info-value">{data.hoursPerWeek}h × {data.employees} עובדים</div>
              </div>
              <div className="info-item">
                <div className="info-label">מוכנות טכנולוגית</div>
                <div className="info-value">{data.technicalComfort}</div>
              </div>
              <div className="info-item">
                <div className="info-label">אופן הטמעה</div>
                <div className="info-value">{data.implementationProfile}</div>
              </div>
              <div className="info-item">
                <div className="info-label">כלי מומלץ</div>
                <div className="info-value">{data.recommendedTier}</div>
              </div>
              <div className="info-item">
                <div className="info-label">תקציב חודשי</div>
                <div className="info-value">₪{data.monthlyBudgetUsed.toLocaleString('he-IL')}</div>
              </div>
            </div>
          </div>

          <div className="disclaimer">
            ⚠️ הסימולטור מספק הערכה כללית בלבד ואינו מהווה ייעוץ מקצועי. ההערכה מתבססת על מידע שהזנת, היא אינדיקטיבית בלבד ותיתכן שונות בתנאים אמיתיים.
          </div>

          <div className="footer">
            <p>דוח זה נוצר באמצעות סימולטור מוכנות AI של BizgoAI Israel</p>
            <p>© {new Date().getFullYear()} BizgoAI Israel. כל הזכויות שמורות.</p>
          </div>
        </div>

        {/* Page 2: Financial Breakdown */}
        <div className="page">
          <div className="header">
            <h1>פירוט פיננסי - 6 חודשים</h1>
            <div className="task-name">{data.taskName}</div>
          </div>

          <div className="section">
            <div className="section-title">
              <span>📊</span>
              <span>פירוט חודשי</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>חודש</th>
                  <th>חיסכון בעבודה</th>
                  <th>עלות למידה</th>
                  <th>עלות תחזוקה</th>
                  <th>עלות כלי</th>
                  <th>נטו</th>
                  <th>מצטבר</th>
                </tr>
              </thead>
              <tbody>
                {data.monthlyBreakdown.map((row) => (
                  <tr key={row.month}>
                    <td>{row.month}</td>
                    <td className="positive">₪{row.laborSaved.toLocaleString('he-IL', { maximumFractionDigits: 0 })}</td>
                    <td className="negative">₪{row.learningCost.toLocaleString('he-IL', { maximumFractionDigits: 0 })}</td>
                    <td className="negative">₪{row.maintenanceCost.toLocaleString('he-IL', { maximumFractionDigits: 0 })}</td>
                    <td className="negative">₪{row.toolCost.toLocaleString('he-IL', { maximumFractionDigits: 0 })}</td>
                    <td className={row.netSavings >= 0 ? 'positive' : 'negative'}>
                      {row.netSavings >= 0 ? '+' : ''}₪{row.netSavings.toLocaleString('he-IL', { maximumFractionDigits: 0 })}
                    </td>
                    <td className={row.cumulativeSavings >= 0 ? 'positive' : 'negative'}>
                      {row.cumulativeSavings >= 0 ? '+' : ''}₪{row.cumulativeSavings.toLocaleString('he-IL', { maximumFractionDigits: 0 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="section">
            <div className="section-title">
              <span>📝</span>
              <span>הנחות החישוב</span>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">עלות שעת עבודה</div>
                <div className="info-value">₪{data.hourlyRate}</div>
              </div>
              <div className="info-item">
                <div className="info-label">שעות למידה (סה"כ)</div>
                <div className="info-value">{data.learningHours}h × {data.employees}</div>
              </div>
              <div className="info-item">
                <div className="info-label">טווח תקציב מומלץ</div>
                <div className="info-value">₪{data.budgetMin}-{data.budgetMax}</div>
              </div>
              <div className="info-item">
                <div className="info-label">סטטוס סיכון</div>
                <div className="info-value">
                  {data.riskStatus === 'green' ? 'נמוך' : data.riskStatus === 'yellow' ? 'בינוני' : 'גבוה'}
                </div>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="section-title">
              <span>💡</span>
              <span>המלצות</span>
            </div>
            <div style={{ padding: '10px', lineHeight: '1.8' }}>
              {data.fitScore >= 7 && data.safetyScore >= 7 && (
                <p>✅ המשימה מתאימה מאוד לאוטומציה עם AI. מומלץ להתחיל בפיילוט קטן ולהרחיב בהדרגה.</p>
              )}
              {data.fitScore >= 6 && data.safetyScore >= 6 && data.fitScore < 7 && (
                <p>⚠️ המשימה בעלת פוטנציאל טוב. יש להקפיד על תכנון מדויק ומעקב צמוד בשלבים הראשונים.</p>
              )}
              {(data.fitScore < 6 || data.safetyScore < 6) && (
                <p>🔴 יש לשקול בזהירות את ההטמעה. מומלץ להתייעץ עם מומחה לפני התחלה.</p>
              )}
              {data.breakEvenMonth <= 3 && (
                <p>💰 נקודת האיזון המהירה (חודש {data.breakEvenMonth}) מצביעה על פוטנציאל חיסכון גבוה.</p>
              )}
              {data.technicalComfort === 'נמוכה' || data.technicalComfort === 'אין ניסיון' && (
                <p>🎓 מומלץ להשקיע בהדרכה ולשקול סיוע חיצוני בשלב ההטמעה.</p>
              )}
            </div>
          </div>

          <div className="disclaimer">
            ⚠️ תחזית זו מבוססת על הנחות והערכות. התוצאות בפועל עשויות להשתנות בהתאם לנסיבות ספציפיות של העסק. מומלץ להתייעץ עם יועץ מקצועי לפני קבלת החלטות עסקיות משמעותיות.
          </div>

          <div className="footer">
            <p>לשאלות ויעוץ נוסף: BizgoAI Israel</p>
            <p>© {new Date().getFullYear()} BizgoAI Israel. כל הזכויות שמורות.</p>
          </div>
        </div>
      </body>
    </html>
  );
}

export default PDFTemplate;
