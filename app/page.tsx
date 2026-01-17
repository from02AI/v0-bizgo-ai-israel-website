import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { ProblemSection } from "@/components/home/problem-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { ConsultationPreviewSection } from "@/components/home/consultation-preview-section"
import { DataProofsSection } from "@/components/home/data-proofs-section"
import { CommunitySection } from "@/components/home/community-section"

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
      </main>
      <Footer />
    </div>
  )
}
