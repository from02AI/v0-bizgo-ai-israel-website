import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Row A - Social Media Icons (compact) */}
        <div className="flex justify-center gap-4 mb-6 pb-6 border-b border-blue-800">
          <a
            href="https://wa.me/972XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2 transition-colors"
            aria-label="WhatsApp"
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#25D366' }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <span className="text-xs">WhatsApp</span>
          </a>
          
          <a
            href="https://www.facebook.com/bizgoai"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2 transition-colors"
            aria-label="Facebook"
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#1877F2' }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xs">Facebook</span>
          </a>
          
          <a
            href="https://www.linkedin.com/company/bizgoai"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2 transition-colors"
            aria-label="LinkedIn"
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#0A66C2' }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <span className="text-xs">LinkedIn</span>
          </a>

          <Link href="/newsletter" className="group flex flex-col items-center gap-2 transition-colors" aria-label="Newsletter">
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#f59e0b' }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <span className="text-xs">Newsletter</span>
          </Link>
        </div>
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
                <Link href="/privacy" className="hover:text-white transition-colors">מדיניות פרטיות</Link>
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
