function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-blue-100 bg-white p-4 shadow-sm" aria-hidden="true">
      <div className="mb-3 h-4 w-1/3 rounded bg-blue-100" />
      <div className="mb-2 h-8 w-full rounded bg-blue-100" />
      <div className="h-8 w-2/3 rounded bg-blue-100" />
    </div>
  )
}

export default SkeletonCard