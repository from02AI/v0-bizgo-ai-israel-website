"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header dir="ltr" className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between min-w-0">
          {/* Logo - on LEFT */}
          <div className="flex items-center min-w-0 order-1">
            <Link href="/" className="text-lg sm:text-xl md:text-2xl font-bold text-[#0b2e7b] truncate">
              BizGoAI
            </Link>
          </div>

          {/* Desktop Navigation - on RIGHT */}
          <nav dir="rtl" className="hidden md:flex items-center gap-4 lg:gap-8 order-2">
            <Link href="/simulator" className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium">
              סימולטור AI לעסק
            </Link>
            <Link href="/#consultation" className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium">
              התאמת כלי AI
            </Link>
            <Link href="/#community" className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium">
              קהילה
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
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav dir="rtl" className="md:hidden py-4 border-t border-slate-100">
            <div className="flex flex-col gap-4">
              <Link
                href="/simulator"
                className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                סימולטור AI לעסק
              </Link>
              <Link
                href="/#consultation"
                className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                התאמת כלי AI
              </Link>
              <Link
                href="/#community"
                className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                קהילה
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
