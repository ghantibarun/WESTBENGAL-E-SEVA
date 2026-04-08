function InputField({ id, label, error, className = '', ...props }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        id={id}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-(--wb-blue) focus:outline-none focus:ring-2 focus:ring-blue-200"
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  )
}

export default InputField