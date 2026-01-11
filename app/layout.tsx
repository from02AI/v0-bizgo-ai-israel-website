import type React from "react"
import type { Metadata, Viewport } from "next"
import { Heebo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// Single site-wide font (Heebo) with Hebrew+Latin glyphs so all text—Hebrew or Latin—renders in the same face
const heebo = Heebo({ subsets: ["hebrew", "latin"], variable: "--font-main" })

export const metadata: Metadata = {
  title: "BizgoAI Israel - עסקים קטנים מתקדמים עם AI",
  description: "קהילה לעסקים קטנים בישראל שרוצים לאמץ AI בביטחון. כלי הערכה חינמי, ייעוץ אישי, ותמיכה קהילתית.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0b2e7b",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
