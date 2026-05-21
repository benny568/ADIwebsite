type SectionHeadingProps = {
  title: string
  subtitle?: string
  centered?: boolean
  id?: string
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  id,
}: SectionHeadingProps) {
  const align = centered ? 'items-center text-center' : 'items-start'
  return (
    <div className={`flex flex-col ${align} mb-12`}>
      <h2 id={id} className="text-3xl md:text-4xl font-bold text-white">
        {title}
      </h2>
      {subtitle && <p className="text-slate-400 mt-3 text-lg max-w-2xl">{subtitle}</p>}
      <div className="h-1 w-16 bg-yellow-400 mt-4 rounded-full" />
    </div>
  )
}
