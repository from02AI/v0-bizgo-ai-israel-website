import { NextRequest, NextResponse } from "next/server"
import { Resend } from 'resend'

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  console.log('[TEST] Starting email test')
  
  const checks = {
    hasResendKey: !!process.env.RESEND_API_KEY,
    resendKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 8),
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
  }
  
  console.log('[TEST] Environment checks:', checks)
  
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ 
      error: 'No Resend API key', 
      checks 
    }, { status: 500 })
  }
  
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    const testEmail = 'shanniecarmi@gmail.com' // your test email
    
    console.log('[TEST] Sending test email to:', testEmail)
    
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM || 'BizgoAI Test <onboarding@resend.dev>',
      to: [testEmail],
      subject: '🧪 Resend API Test - BizgoAI',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1>✅ Email API is working!</h1>
          <p>This is a test email sent at: <strong>${new Date().toISOString()}</strong></p>
          <p>If you received this, Resend integration is functioning correctly.</p>
          <hr>
          <p style="font-size: 12px; color: #666;">
            Environment: ${process.env.VERCEL_ENV || 'local'}<br>
            Time: ${new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}
          </p>
        </div>
      `,
    })
    
    console.log('[TEST] Resend response:', { data, error })
    
    if (error) {
      console.error('[TEST] Resend API error:', error)
      return NextResponse.json({ 
        success: false,
        error: error.message,
        errorDetails: error,
        checks 
      }, { status: 400 })
    }
    
    return NextResponse.json({ 
      success: true, 
      emailId: data?.id,
      data,
      checks 
    }, { status: 200 })
  } catch (err: any) {
    console.error('[TEST ERROR]', err)
    return NextResponse.json({ 
      error: err.message, 
      details: err,
      checks 
    }, { status: 500 })
  }
}
