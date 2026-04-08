function Spinner({ label = 'Loading...' }) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-700" role="status" aria-live="polite">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-(--wb-blue) border-t-transparent" />
      <span>{label}</span>
    </div>
  )
}

export default Spinner