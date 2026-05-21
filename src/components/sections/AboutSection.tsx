import Container from '@/components/ui/Container'
import { SITE } from '@/lib/constants'

const stats = [
  { value: '500+', label: 'Students Passed' },
  { value: '10+', label: 'Years Experience' },
  { value: '5★', label: 'Google Rating' },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-slate-900" aria-labelledby="about-heading">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image column */}
          <div className="flex flex-col items-center lg:items-start gap-6">
            <div className="relative w-full max-w-sm mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-yellow-400/20 rounded-2xl translate-x-3 translate-y-3" />
              <img
                src="/images/instructor-photo.jpg"
                alt={`${SITE.instructorName} — ADI Driving Instructor`}
                className="relative w-full aspect-[4/5] object-cover rounded-2xl border-2 border-slate-700"
                onError={(e) => {
                  const target = e.currentTarget
                  target.src = 'https://placehold.co/400x500/1E293B/FACC15?text=Photo+Coming+Soon'
                }}
              />
            </div>
            {/* ADI badge placeholder */}
            <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3">
              <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">RSA Approved Driving Instructor</p>
                <p className="text-slate-400 text-xs">Licence: {SITE.adiLicenceNumber}</p>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div>
            <p className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">
              About Me
            </p>
            <h2
              id="about-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
            >
              Your local, trusted driving instructor in {SITE.area}
            </h2>
            <div className="h-1 w-16 bg-yellow-400 rounded-full mb-6" />

            <div className="flex flex-col gap-4 text-slate-300 leading-relaxed">
              <p>
                Hi, I'm {SITE.instructorName} — a fully qualified RSA Approved Driving Instructor
                based in {SITE.area}. I'm passionate about helping learner drivers build genuine
                confidence and skill behind the wheel, not just pass a test.
              </p>
              <p>
                I offer manual and automatic lessons for complete beginners, as well as the full
                12-lesson EDT (Essential Driver Training) programme required by the RSA for all
                first-time licence applicants. Whether you've never sat in a driver's seat or
                you're preparing for your test, I'll tailor every lesson to where you are right now.
              </p>
              <p>
                I use a modern, fully insured dual-controlled car and take a calm, patient approach
                that puts nervous drivers at ease from lesson one. My goal is simple: to get you
                driving safely and confidently for life.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center"
                >
                  <p className="text-2xl font-extrabold text-yellow-400">{stat.value}</p>
                  <p className="text-slate-400 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
