import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import SectionHeading from '@/components/ui/SectionHeading'

const usps = [
  {
    title: 'RSA Fully Qualified ADI',
    description:
      'Fully licensed and registered with the Road Safety Authority. You can verify my ADI licence number — your safety and compliance are guaranteed.',
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    title: 'Patient & Calm Instructor',
    description:
      "Nervous about driving? You're not alone. I create a relaxed, judgement-free environment so you can learn at your own pace without pressure.",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    title: 'Flexible Scheduling',
    description:
      'Morning, evening, or weekend slots available. I work around your schedule — not the other way around. Easy online booking via Calendly.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'High Pass Rate',
    description:
      'My focus on building real skills — not just test techniques — means students who train with me pass and stay safe on the road for life.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
]

export default function WhyChooseSection() {
  return (
    <section id="why" className="py-24 bg-slate-800/50" aria-labelledby="why-heading">
      <Container>
        <SectionHeading
          id="why-heading"
          title="Why Learn with Me?"
          subtitle="What makes the difference between a stressful experience and one that builds real confidence"
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {usps.map((usp) => (
            <Card key={usp.title}>
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center text-yellow-400">
                  {usp.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">{usp.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{usp.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
