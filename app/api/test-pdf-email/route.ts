import { NextRequest, NextResponse } from "next/server"
import { Resend } from 'resend'

export async function GET() {
  // Create a tiny valid PDF (smallest possible)
  const tinyPDF = Buffer.from(
    '%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/Resources <<\n/Font <<\n/F1 <<\n/Type /Font\n/Subtype /Type1\n/BaseFont /Helvetica\n>>\n>>\n>>\n/MediaBox [0 0 612 792]\n/Contents 4 0 R\n>>\nendobj\n4 0 obj\n<<\n/Length 44\n>>\nstream\nBT\n/F1 12 Tf\n100 700 Td\n(Test) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f\n0000000009 00000 n\n0000000058 00000 n\n0000000115 00000 n\n0000000300 00000 n\ntrailer\n<<\n/Size 5\n/Root 1 0 R\n>>\nstartxref\n394\n%%EOF\n'
  )

  const base64 = tinyPDF.toString('base64')
  
  console.log('[TEST-PDF-EMAIL] Tiny PDF size:', tinyPDF.length, 'bytes')
  console.log('[TEST-PDF-EMAIL] Base64 size:', base64.length, 'bytes')
  console.log('[TEST-PDF-EMAIL] PDF magic bytes:', tinyPDF.slice(0, 4).toString('hex'))
  console.log('[TEST-PDF-EMAIL] Base64 sample (first 100 chars):', base64.substring(0, 100))

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM || 'BizgoAI Israel <onboarding@resend.dev>',
      to: ['bizgoai.il@gmail.com'],
      subject: 'Test PDF Attachment - Tiny PDF',
      html: '<p>Testing PDF attachment encoding with minimal PDF</p><p>If you can open this PDF, the encoding is correct.</p>',
      attachments: [
        {
          filename: 'test.pdf',
          content: base64,
          // NOT setting contentType - let Resend infer from filename
        },
      ],
    })

    console.log('[TEST-PDF-EMAIL] Resend result:', JSON.stringify(result))

    return NextResponse.json({ 
      success: true, 
      result,
      pdfSize: tinyPDF.length,
      base64Length: base64.length,
      base64Sample: base64.substring(0, 100),
    })
  } catch (error: any) {
    console.error('[TEST-PDF-EMAIL] Error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      pdfSize: tinyPDF.length,
      base64Length: base64.length,
    }, { status: 500 })
  }
}
