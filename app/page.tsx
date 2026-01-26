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
        <DataProofsSection />
        <CommunitySection />
        
        {/* Contact Form Section */}
        <section className="py-16 bg-blue-600" id="contact">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-12">
              <div className="bg-[#0b2e7b] backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-3xl w-full">
                <div className="text-center">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    צרו קשר
                  </h2>
                  <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                    יש לך שאלה? רוצה לשמוע עוד? השאר/י פרטים ונחזור אליך בהקדם
                  </p>
                </div>

                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
