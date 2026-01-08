import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Rubik, Caveat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const rubik = Rubik({ subsets: ["latin", "hebrew"], variable: "--font-rubik" })
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", weight: ["500", "700"] })

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
      <body className={`${inter.variable} ${rubik.variable} ${caveat.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
