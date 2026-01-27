import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactEmail } from '@/components/emails/contact-email';
import { checkRateLimit, getRateLimitReset } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Get IP address for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Check rate limit: 5 requests per minute per IP
    if (!checkRateLimit(ip, 5, 60000)) {
      const resetTime = getRateLimitReset(ip);
      return NextResponse.json(
        { 
          error: `יותר מדי בקשות. אנא נסה שוב בעוד ${resetTime} שניות.` 
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email, phone, message, subscribeCommunity } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'חסרים שדות חובה: שם, אימייל והודעה נדרשים' },
        { status: 400 }
      );
    }

    // Validate name length
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: 'שם חייב להכיל בין 2 ל-100 תווים' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'כתובת אימייל לא תקינה' },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { error: 'הודעה חייבת להכיל בין 10 ל-2000 תווים' },
        { status: 400 }
      );
    }

    // Validate phone if provided
    if (phone && phone.length > 20) {
      return NextResponse.json(
        { error: 'מספר טלפון לא תקין' },
        { status: 400 }
      );
    }

    // Normalize subscribeCommunity to boolean (optional)
    const subscribed = !!subscribeCommunity;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'BizGoAI Contact <noreply@bizgoai.co.il>',
      to: [process.env.CONTACT_EMAIL || 'contact@bizgoai.co.il'],
      replyTo: email,
      subject: `פנייה חדשה מ-${name} - אתר BizGoAI`,
      react: ContactEmail({ name, email, phone, message, subscribeCommunity: subscribed }),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'שגיאה בשליחת האימייל. אנא נסה שוב מאוחר יותר.' },
        { status: 500 }
      );
    }

    console.log('Contact form submitted successfully:', { 
      name, 
      email, 
      subscribeCommunity: subscribed,
      messageId: data?.id,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'ההודעה נשלחה בהצלחה',
        messageId: data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'שגיאת שרת. אנא נסה שוב מאוחר יותר.' },
      { status: 500 }
    );
  }
}
