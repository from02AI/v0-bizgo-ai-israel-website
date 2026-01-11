import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import PDFTemplate from '@/components/simulator/PDFTemplate';
import React from 'react';

export const maxDuration = 60; // Maximum execution time for Vercel

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required data
    if (!data.taskName || typeof data.fitScore !== 'number') {
      return NextResponse.json(
        { error: 'Missing required data fields' },
        { status: 400 }
      );
    }

    // Dynamic import for renderToStaticMarkup
    const { renderToStaticMarkup } = await import('react-dom/server');
    
    // Render React component to HTML
    const htmlContent = renderToStaticMarkup(React.createElement(PDFTemplate, { data }));
    const fullHTML = `<!DOCTYPE html>${htmlContent}`;

    // Determine if running on Vercel (production) or locally
    const isProduction = process.env.VERCEL === '1';
    
    let browser;
    
    if (isProduction) {
      // Use chromium for Vercel deployment
      const chromium = require('@sparticuz/chromium');
      const puppeteerCore = require('puppeteer-core');
      
      browser = await puppeteerCore.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    } else {
      // Use regular puppeteer locally
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    }

    const page = await browser.newPage();

    // Set content and wait for it to be ready
    await page.setContent(fullHTML, {
      waitUntil: 'networkidle0',
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm',
      },
    });

    await browser.close();

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="AI-Readiness-Report-${data.taskName.replace(/[^a-z0-9]/gi, '-')}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate PDF',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
