"use client"

import { useState } from "react"
import Link from "next/link"
// Lightweight inline SVG icons used to avoid lucide-react type resolution issues in some environments.
function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  )
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header dir="ltr" className="sticky top-0 z-50 bg-white/50 backdrop-blur-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between min-w-0">
          {/* Logo - on LEFT */}
          <div className="flex items-center min-w-0 order-1">
            <Link href="/" className="flex items-center">
              <img
                src="/images/BizgoAI-logo.png"
                alt="BizGoAI"
                className="h-20 sm:h-24 md:h-20 lg:h-24 object-contain"
              />
              {/* Keep accessible text for screen readers only; remove visible text per request */}
              <span className="sr-only">BizGoAI</span>
            </Link>
          </div>

          {/* Desktop Navigation - on RIGHT */}
          <nav dir="rtl" className="hidden md:flex items-center gap-4 lg:gap-8 order-2">
            <Link href="/" className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium">
              עמוד הבית
            </Link>
            <Link href="/simulator" className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium">
              סימולטור AI
            </Link>
            <Link href="/#consultation" className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium">
              אבחון והתאמת כלים
            </Link>
            <Link href="/programs/smb-adoption" className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium">
              תכנית יישום AI ואוטומציה
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium">
              אודות
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden order-3">
            <button
              className="p-2 text-slate-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "סגור תפריט" : "פתח תפריט"}
            >
              {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav dir="rtl" className="md:hidden py-4 border-t border-slate-100">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                עמוד הבית
              </Link>
              <Link
                href="/simulator"
                className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                סימולטור AI
              </Link>
              <Link
                href="/programs/smb-adoption"
                className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                תכנית יישום AI ואוטומציה
              </Link>
              <Link
                href="/#consultation"
                className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                אבחון והתאמת כלים
              </Link>
              <Link
                href="/about"
                className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                אודות
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
