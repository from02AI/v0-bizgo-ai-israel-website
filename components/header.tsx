"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="h-16">
          {/* Logo - pinned to the left corner */}
          <div className="absolute left-4 inset-y-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-[#0b2e7b]">
              BizgoAI Israel
            </Link>
          </div>

          {/* Desktop Navigation - pinned to the right */}
          <nav className="hidden md:flex items-center gap-8 absolute right-4 inset-y-0">
            <Link href="/simulator" className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium">
              סימולטור AI לעסק
            </Link>
            <Link href="/#consultation" className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium">
              עזרה מקצועית
            </Link>
            <Link href="/#community" className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium">
              קהילה
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium">
              אודות
            </Link>
          </nav>

          {/* Mobile menu button - pinned to the right on small screens */}
          <div className="absolute right-4 inset-y-0 flex items-center md:hidden">
            <button
              className="p-2 text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "סגור תפריט" : "פתח תפריט"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-slate-100">
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
                עזרה מקצועית
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
