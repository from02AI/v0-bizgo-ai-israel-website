import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
          {/* Logo & Tagline */}
          <div className="text-center md:text-right">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">BizGoAI</h3>
            <p className="text-xs sm:text-sm text-blue-200">עסקים קטנים מתקדמים עם AI. בביטחון.</p>
          </div>

          {/* Navigation */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold mb-4">ניווט</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-blue-200">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  דף הבית
                </Link>
              </li>
              <li>
                <Link href="/simulator" className="hover:text-white transition-colors">
                  סימולטור
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  אודות
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="hover:text-white transition-colors">
                  ייעוץ חינם
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold mb-4">קהילה</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-blue-200">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  ניוזלטר
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold mb-4">משפטי</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-blue-200">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  מדיניות פרטיות
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-6 text-center text-sm text-blue-300">
          © 2026 BizGoAI. כל הזכויות שמורות
        </div>
      </div>
    </footer>
  )
}
