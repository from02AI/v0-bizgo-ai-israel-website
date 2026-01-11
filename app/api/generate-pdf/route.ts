import { NextRequest, NextResponse } from "next/server"
import puppeteer from "puppeteer"
import { buildPdfHtml, type PdfPayload } from "@/lib/pdf-template"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

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
  let browser: puppeteer.Browser | null = null

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    })

    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "15mm",
        right: "15mm",
      },
    })

    const headers = new Headers()
    headers.set("Content-Type", "application/pdf")
    headers.set("Content-Disposition", `attachment; filename="bizgoai-report.pdf"`)

    return new NextResponse(pdfBuffer, { status: 200, headers })
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
