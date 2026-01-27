import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, pdfBase64, reportData } = await request.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate PDF data
    if (!pdfBase64 || !reportData) {
      return NextResponse.json(
        { error: 'Missing PDF or report data' },
        { status: 400 }
      );
    }

    // Convert base64 to buffer
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');

    // Send email with Resend
    const { data, error } = await resend.emails.send({
      from: 'BizGoAI <reports@bizgoai.co.il>',
      to: email,
      subject: `דוח הערכת מוכנות AI: ${reportData.taskName}`,
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="he">
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, Helvetica, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              direction: rtl;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              border-radius: 8px;
              text-align: center;
              margin-bottom: 30px;
            }
            .metric-card {
              background: #f8f9fa;
              border-right: 4px solid #667eea;
              padding: 15px;
              margin: 15px 0;
              border-radius: 4px;
            }
            .metric-label {
              font-size: 12px;
              color: #6c757d;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .metric-value {
              font-size: 24px;
              font-weight: bold;
              color: #212529;
              margin: 5px 0;
            }
            .cta-button {
              display: inline-block;
              background: #667eea;
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 6px;
              margin: 20px 0;
              font-weight: 600;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #dee2e6;
              font-size: 12px;
              color: #6c757d;
              text-align: center;
            }
            ul {
              padding-right: 20px;
            }
            li {
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">הדוח שלך מוכן!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">ניתוח מוכנות AI עבור: ${reportData.taskName}</p>
          </div>
          
          <p>שלום,</p>
          <p>תודה שהשתמשת בסימולטור מוכנות AI של BizGoAI. הדוח המלא שלך מצורף למייל זה כקובץ PDF.</p>
          
          <div class="metric-card">
            <div class="metric-label">ציון התאמה</div>
            <div class="metric-value">${reportData.fitScore}/10</div>
            <div style="color: #64748b;">${reportData.fitLabel}</div>
          </div>
          
          <div class="metric-card">
            <div class="metric-label">ציון בטיחות</div>
            <div class="metric-value">${reportData.safetyScore}/10</div>
            <div style="color: #64748b;">${reportData.safetyLabel}</div>
          </div>
          
          <div class="metric-card">
            <div class="metric-label">חיסכון צפוי ל-6 חודשים</div>
            <div class="metric-value" style="color: #16a34a;">₪${reportData.totalSixMonthSavings.toLocaleString('he-IL')}</div>
            <div style="color: #64748b;">נקודת איזון: חודש ${reportData.breakEvenMonth}</div>
          </div>
          
          <p><strong>מה כולל הדוח המצורף:</strong></p>
          <ul>
            <li>הערכה מקיפה של התאמת המשימה לאוטומציה</li>
            <li>ניתוח סיכונים ובטיחות</li>
            <li>תחזית פיננסית ל-6 חודשים עם פירוט חודשי</li>
            <li>המלצות יישום והטמעה</li>
          </ul>
          
          <p>הדוח כולל שני עמודים:</p>
          <ul>
            <li><strong>עמוד 1:</strong> סיכום מנהלים עם ממצאים עיקריים</li>
            <li><strong>עמוד 2:</strong> ניתוח פיננסי מפורט ומתודולוגיה</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://bizgoai.co.il/consultation" class="cta-button">
              לקביעת ייעוץ אישי
            </a>
          </div>
          
          <p style="margin-top: 30px;">שאלות? אנחנו כאן כדי לעזור לך לקבל את ההחלטה הנכונה ביותר לגבי אוטומציה עם AI.</p>
          
          <div class="footer">
            <p>דוח זה נוצר בתאריך ${new Date().toLocaleDateString('he-IL', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            <p>© ${new Date().getFullYear()} BizGoAI. כל הזכויות שמורות.</p>
            <p style="margin-top: 10px;">
              <a href="https://bizgoai.co.il/privacy" target="_blank" rel="noopener noreferrer" style="color: #667eea; text-decoration: none;">מדיניות פרטיות</a>
            </p>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: `AI-Readiness-Report-${reportData.taskName.replace(/[^a-z0-9]/gi, '-')}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      messageId: data?.id 
    });

  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
