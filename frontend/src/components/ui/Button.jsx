function Button({ children, className = '', variant = 'primary', ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

  const variants = {
    primary: 'bg-(--wb-blue) text-white hover:bg-(--wb-blue-deep) focus-visible:outline-(--wb-gold)',
    secondary: 'border border-(--wb-blue) bg-white text-(--wb-blue) hover:bg-blue-50 focus-visible:outline-(--wb-blue)',
    ghost: 'text-(--wb-blue) hover:bg-blue-50 focus-visible:outline-(--wb-blue)',
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button