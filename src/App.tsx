import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import WhyChooseSection from '@/components/sections/WhyChooseSection'
import ServicesSection from '@/components/sections/ServicesSection'
import PricingSection from '@/components/sections/PricingSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import BookingSection from '@/components/sections/BookingSection'
import ContactSection from '@/components/sections/ContactSection'

export default function App() {
  return (
    <div className="bg-[#0F172A] text-white">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <WhyChooseSection />
        <ServicesSection />
        <PricingSection />
        <TestimonialsSection />
        <BookingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
