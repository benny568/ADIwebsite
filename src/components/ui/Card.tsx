type CardProps = {
  children: React.ReactNode
  className?: string
  highlighted?: boolean
}

export default function Card({ children, className = '', highlighted = false }: CardProps) {
  const border = highlighted ? 'border-yellow-400' : 'border-slate-700'
  return (
    <div
      className={`bg-slate-800 border-2 ${border} rounded-2xl p-6 shadow-lg transition-transform duration-200 hover:-translate-y-1 ${className}`}
    >
      {children}
    </div>
  )
}
