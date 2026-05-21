import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'

const services = [
  {
    title: 'Manual Car Lessons',
    description:
      "Learn to drive a manual (stick shift) car from the ground up. I'll take you from basic car control all the way through to confident, independent driving.",
    features: [
      'Beginner to advanced',
      'Dual-controlled car',
      'Town, rural & motorway driving',
      'All manoeuvres covered',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h7l1-2zm0 0h6l2-2V9a1 1 0 00-1-1h-5v8z" />
      </svg>
    ),
  },
  {
    title: 'Automatic Car Lessons',
    description:
      'Automatic lessons are perfect if you want to focus entirely on road awareness and confidence without the added complexity of gears and clutch.',
    features: [
      'No gears or clutch to worry about',
      'Great for nervous drivers',
      'Modern automatic vehicle',
      'Fast track to independence',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
  {
    title: 'EDT — Essential Driver Training',
    description:
      "The mandatory RSA 12-lesson programme required by law for all first-time licence applicants in Ireland. I'll guide you through all 12 topics efficiently and thoroughly.",
    features: [
      'All 12 RSA EDT topics covered',
      'Logbook completed & stamped',
      'RSA compliant at every stage',
      'Flexible scheduling across weeks',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Pre-Test Preparation',
    description:
      "Already driving but need to tighten things up before your driver test? I'll identify exactly what needs work and run focused, targeted sessions to get you test-ready.",
    features: [
      'Test route familiarisation',
      'Focused manoeuvres practice',
      'Mock test with full debrief',
      'Confidence-building techniques',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-slate-900" aria-labelledby="services-heading">
      <Container>
        <SectionHeading
          id="services-heading"
          title="Driving Lessons & Services"
          subtitle="Whether you're a complete beginner or preparing for your test, I have a lesson package for you"
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card key={service.title}>
              <div className="flex items-start gap-4 mb-4">
                <div className="shrink-0 w-14 h-14 bg-yellow-400/10 rounded-xl flex items-center justify-center text-yellow-400">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">{service.title}</h3>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{service.description}</p>
              <ul className="flex flex-col gap-2 mb-6">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-slate-300 text-sm">
                    <svg className="w-4 h-4 text-yellow-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Button href="#booking" variant="outline" className="text-sm px-4 py-2 w-full">
                Book This Lesson
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
