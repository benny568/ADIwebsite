import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import SectionHeading from '@/components/ui/SectionHeading'
import StarRating from '@/components/ui/StarRating'
import { SITE } from '@/lib/constants'

const testimonials = [
  {
    name: 'Sarah M.',
    rating: 5,
    text: "Passed first time! I was a really nervous driver before I started, but the patience and calm approach made all the difference. I actually started to enjoy my lessons. Would absolutely recommend to anyone.",
    date: 'March 2025',
  },
  {
    name: "Ciarán O'B.",
    rating: 5,
    text: 'Completed my full EDT package here and it was brilliant. Everything was explained clearly, the logbook was always up to date, and I felt genuinely prepared. Passed my test on the first attempt.',
    date: 'January 2025',
  },
  {
    name: 'Emma K.',
    rating: 5,
    text: "I'd failed my test twice before and was losing confidence. A few pre-test sessions completely turned things around — the mock test and debrief were incredibly helpful. Third time was a charm!",
    date: 'February 2025',
  },
  {
    name: 'Darragh F.',
    rating: 5,
    text: 'Did the automatic lessons as I found manual too stressful. Best decision I made. Very professional and flexible with scheduling around my work hours. Highly recommend.',
    date: 'April 2025',
  },
  {
    name: 'Aoife R.',
    rating: 5,
    text: 'As someone with driving anxiety, I was dreading lessons. But the calm, patient teaching style put me completely at ease from lesson one. I can now drive independently — something I never thought possible!',
    date: 'December 2024',
  },
  {
    name: 'Jack T.',
    rating: 5,
    text: 'Great instructor. Knows the local test routes inside out and gave me really practical advice. Lessons were always on time, the car was spotless, and the whole experience was professional.',
    date: 'November 2024',
  },
]

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="py-24 bg-slate-900" aria-labelledby="reviews-heading">
      <Container>
        <SectionHeading
          id="reviews-heading"
          title="What Students Say"
          subtitle="Real feedback from real learners — read what past students have to say"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name}>
              <div className="flex items-start justify-between mb-3">
                <StarRating rating={t.rating} />
                <span className="text-slate-500 text-xs">{t.date}</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 font-bold text-sm shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-slate-500 text-xs">Verified Google Review</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Google rating summary */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-md mx-auto">
          <div className="text-center">
            <p className="text-4xl font-extrabold text-yellow-400">5.0</p>
            <StarRating rating={5} />
            <p className="text-slate-400 text-xs mt-1">Based on Google Reviews</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-slate-700" />
          <p className="text-slate-300 text-sm text-center sm:text-left max-w-xs">
            Consistently top-rated by students in {' '}
            <span className="text-white font-medium">{SITE.area}</span> for patience, professionalism, and results.
          </p>
        </div>
      </Container>
    </section>
  )
}
