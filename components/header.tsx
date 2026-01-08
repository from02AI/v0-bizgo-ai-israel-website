"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[#0b2e7b]">
            BizgoAI Israel
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#how-it-works" className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium">
              איך זה עובד?
            </Link>
            <Link href="/#consultation" className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium">
              ייעוץ חינם
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium">
              אודות
            </Link>
            <Button
              asChild
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all"
            >
              <Link href="/simulator">התחל סימולטור</Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "סגור תפריט" : "פתח תפריט"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-slate-100">
            <div className="flex flex-col gap-4">
              <Link
                href="/#how-it-works"
                className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                איך זה עובד?
              </Link>
              <Link
                href="/#consultation"
                className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                ייעוץ חינם
              </Link>
              <Link
                href="/about"
                className="text-slate-600 hover:text-[#0b2e7b] transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                אודות
              </Link>
              <Button
                asChild
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg w-full"
              >
                <Link href="/simulator" onClick={() => setMobileMenuOpen(false)}>
                  התחל סימולטור
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
