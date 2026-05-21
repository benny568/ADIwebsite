import { useEffect } from 'react'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { SITE } from '@/lib/constants'

export default function BookingSection() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <section id="booking" className="py-24 bg-slate-800/50" aria-labelledby="booking-heading">
      <Container>
        <SectionHeading
          id="booking-heading"
          title="Book a Lesson"
          subtitle="Choose a time that suits you — morning, evening, or weekend slots available"
          centered
        />

        <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
          {SITE.calendlyUrl.includes('YOUR-USERNAME') ? (
            /* Placeholder shown until real Calendly URL is configured */
            <div className="flex flex-col items-center justify-center py-24 px-6 text-center gap-4">
              <div className="w-16 h-16 bg-yellow-400/10 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-lg">Online Booking Coming Soon</p>
                <p className="text-slate-400 text-sm mt-1 max-w-sm">
                  To enable online booking, update <code className="text-yellow-400">calendlyUrl</code> in{' '}
                  <code className="text-yellow-400">src/lib/constants.ts</code> with your Calendly URL.
                </p>
              </div>
              <p className="text-slate-400 text-sm">
                In the meantime,{' '}
                <a href="#contact" className="text-yellow-400 hover:underline">
                  contact me directly
                </a>{' '}
                or call{' '}
                <a href={SITE.phoneHref} className="text-yellow-400 hover:underline">
                  {SITE.phone}
                </a>
              </p>
            </div>
          ) : (
            <div
              className="calendly-inline-widget"
              data-url={SITE.calendlyUrl}
              style={{ minWidth: '320px', height: '700px' }}
            />
          )}
        </div>
      </Container>
    </section>
  )
}
