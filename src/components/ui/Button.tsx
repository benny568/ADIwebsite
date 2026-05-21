type ButtonProps = {
  variant?: 'primary' | 'outline'
  children: React.ReactNode
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

export default function Button({
  variant = 'primary',
  children,
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-yellow-400 text-slate-900 hover:bg-yellow-300 active:bg-yellow-500',
    outline:
      'border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900 active:bg-yellow-500',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
