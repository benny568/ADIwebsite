import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import { SITE } from '@/lib/constants'

const plans = [
  {
    name: 'Single Lesson',
    price: SITE.pricing.singleLesson,
    duration: SITE.pricing.singleLessonDuration,
    description: 'Perfect for top-ups, refreshers, or trying your first lesson.',
    features: [
      'Manual or automatic',
      'Dual-controlled car',
      'Any area covered',
      'Pay as you go',
    ],
    popular: false,
  },
  {
    name: 'Block of 5',
    price: SITE.pricing.blockOf5,
    duration: SITE.pricing.blockOf5Duration,
    description: 'Save money and build real momentum with a block of lessons.',
    features: [
      'Manual or automatic',
      'Save €15 vs single rate',
      'Flexible scheduling',
      'Progress tracked each lesson',
    ],
    popular: false,
  },
  {
    name: 'EDT Package',
    price: SITE.pricing.edtPackage,
    duration: SITE.pricing.edtLessons,
    description: 'The complete RSA mandatory programme for first-time licence applicants.',
    features: [
      'All 12 EDT topics covered',
      'Logbook completed & stamped',
      'Best value for new drivers',
      'Flexible across your timeline',
    ],
    popular: true,
  },
  {
    name: 'Pre-Test Package',
    price: SITE.pricing.preTestPackage,
    duration: SITE.pricing.preTestLessons,
    description: 'Focused preparation in the weeks before your driver test.',
    features: [
      'Mock test with debrief',
      'Test route covered',
      'Targeted manoeuvres work',
      'Confidence-building focus',
    ],
    popular: false,
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-slate-800/50" aria-labelledby="pricing-heading">
      <Container>
        <SectionHeading
          id="pricing-heading"
          title="Simple, Transparent Pricing"
          subtitle="No hidden fees. All prices include VAT. Block bookings always available — contact me for details."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className="relative">
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <Card highlighted={plan.popular} className="h-full flex flex-col pt-8">
                <div className="mb-4">
                  <h3 className="text-white font-bold text-lg">{plan.name}</h3>
                  <p className="text-slate-400 text-xs mt-1">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-yellow-400">{plan.price}</span>
                  <span className="text-slate-400 text-sm ml-2">/ {plan.duration}</span>
                </div>

                <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-slate-300 text-sm">
                      <svg className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  href="#booking"
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full text-sm"
                >
                  Book Now
                </Button>
              </Card>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-500 text-sm mt-8">
          Prices include VAT · Block bookings &amp; custom packages available ·{' '}
          <a href="#contact" className="text-yellow-400 hover:underline">
            Contact me
          </a>{' '}
          to discuss your needs
        </p>
      </Container>
    </section>
  )
}
