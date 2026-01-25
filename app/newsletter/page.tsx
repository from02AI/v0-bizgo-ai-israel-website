import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import NewsletterSignup from '@/components/newsletter-signup'

export default function NewsletterPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  )
}
