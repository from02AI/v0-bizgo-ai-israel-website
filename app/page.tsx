import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { ProblemSection } from "@/components/home/problem-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { ConsultationPreviewSection } from "@/components/home/consultation-preview-section"
import { DataProofsSection } from "@/components/home/data-proofs-section"
import { CommunitySection } from "@/components/home/community-section"
import { ContactForm } from "@/components/contact-form"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <ConsultationPreviewSection />
        <CommunitySection />
        <DataProofsSection />
        
        {/* Contact Form Section */}
        <section className="py-16 bg-slate-50" id="contact">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">
                צור קשר
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                יש לך שאלה? רוצה לשמוע עוד? השאר פרטים ונחזור אליך בהקדם
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
