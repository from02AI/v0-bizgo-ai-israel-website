"use client"

import Link from "next/link"
import React from "react"

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div dir="ltr" className="grid grid-cols-1 md:grid-cols-4 gap-0 sm:gap-1 mb-6 items-start mx-auto max-w-2xl">
          {/* Column 1: טופס יצירת קשר / contact email (swapped) */}
          {/* Mobile order: last (order-4). Desktop order restored via md:order. */}
          <div className="text-center md:text-center md:col-start-1 order-4 md:order-1">
            <ul className="space-y-1 text-xs sm:text-sm text-blue-200">
              <li>
                <a href="/#contact" className="hover:text-white transition-colors">טופס יצירת קשר</a>
              </li>
              <li>
                <a href="mailto:contact@bizgoai.co.il" className="hover:text-white transition-colors">contact@bizgoai.co.il</a>
              </li>
            </ul>
          </div>

          {/* Column 2: אודות / מדיניות פרטיות */}
          {/* Mobile order: third (order-3). Desktop order restored via md:order. */}
          <div className="text-center md:text-center md:col-start-2 order-3 md:order-2">
            <ul className="space-y-1 text-xs sm:text-sm text-blue-200">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">אודות</Link>
              </li>
              <li>
                <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">מדיניות פרטיות</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: סימולטור / התאמת כלים (swapped) */}
          {/* Mobile order: second (order-2). Desktop order restored via md:order. */}
          <div className="text-center md:text-center md:col-start-3 order-2 md:order-3">
            <ul className="space-y-1 text-xs sm:text-sm text-blue-200">
              <li>
                <Link href="/simulator" className="hover:text-white transition-colors">סימולטור</Link>
              </li>
              <li>
                <Link href="/consultation" className="hover:text-white transition-colors">התאמת כלים</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Logo + Tagline (right side on desktop) */}
          {/* Mobile order: first (order-1). Desktop order restored via md:order. */}
          <div dir="rtl" className="text-center md:text-right md:col-start-4 md:justify-self-end lg:translate-x-12 transform order-1 md:order-4">
            <h3 className="text-lg sm:text-xl font-bold mb-1">BizGoAI</h3>
            <p className="text-xs text-blue-200 whitespace-nowrap">עסקים קטנים מתקדמים ל- AI, בביטחון. ביחד.</p>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-4 text-center text-sm text-blue-300">
          © 2026 BizGoAI. כל הזכויות שמורות
        </div>
      </div>
    </footer>
  )
}
