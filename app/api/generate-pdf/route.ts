import { NextRequest, NextResponse } from "next/server"
import puppeteer, { type Browser } from "puppeteer-core"
import chromium from '@sparticuz/chromium'
import { buildPdfHtml, type PdfPayload } from "@/lib/pdf-template"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Check if running locally (not in Vercel serverless)
const isLocal = process.env.NODE_ENV === 'development' || !process.env.VERCEL

// Common Chrome paths for local development
const LOCAL_CHROME_PATHS = {
  win32: [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
  ],
  darwin: ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'],
  linux: ['/usr/bin/google-chrome', '/usr/bin/chromium-browser'],
}

async function getLocalChromePath(): Promise<string | null> {
  const platform = process.platform as keyof typeof LOCAL_CHROME_PATHS
  const paths = LOCAL_CHROME_PATHS[platform] || []
  
  for (const p of paths) {
    try {
      const fs = await import('fs')
      if (fs.existsSync(p)) return p
    } catch { /* ignore */ }
  }
  return null
}

function isValidPayload(payload: PdfPayload) {
  if (!payload || typeof payload !== "object") return false
  const { tool1Data, tool2Data, tool3Data } = payload
  return Boolean(tool1Data || tool2Data || tool3Data)
}

export async function POST(request: NextRequest) {
  let body: PdfPayload

  try {
    body = await request.json()
  } catch (error) {
    return NextResponse.json({ error: "בקשה לא חוקית" }, { status: 400 })
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "נתוני סימולטור חסרים" }, { status: 400 })
  }

  const html = buildPdfHtml(body)
  let browser: Browser | null = null

  try {
    // Use local Chrome for development, @sparticuz/chromium for Vercel
    let launchOptions
    
    if (isLocal) {
      const localChrome = await getLocalChromePath()
      if (!localChrome) {
        console.error('No local Chrome found. Install Chrome or use production.')
        return NextResponse.json({ 
          error: "Chrome לא נמצא במחשב. יש להתקין Chrome או לבדוק בסביבת Production" 
        }, { status: 500 })
      }
      console.log('[PDF] Using local Chrome:', localChrome)
      launchOptions = {
        executablePath: localChrome,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      }
    } else {
      console.log('[PDF] Using Vercel chromium')
      launchOptions = {
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      }
    }
    
    browser = await puppeteer.launch(launchOptions)

    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: "networkidle0" })

    const pdfUint8Array = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "15mm",
        right: "15mm",
      },
    })

    // Convert Uint8Array to Buffer for NextResponse
    const pdfBuffer = Buffer.from(pdfUint8Array)

    const headers = new Headers()
    headers.set("Content-Type", "application/pdf")
    headers.set("Content-Disposition", `attachment; filename="bizgoai-report.pdf"`)

    return new NextResponse(pdfBuffer as unknown as BodyInit, { status: 200, headers })
  } catch (error) {
    console.error("PDF generation failed", error)
    return NextResponse.json({ error: "נכשלה יצירת ה-PDF" }, { status: 500 })
  } finally {
    if (browser) {
      try {
        await browser.close()
      } catch (err) {
        console.warn("Failed closing browser", err)
      }
    }
  }
}
