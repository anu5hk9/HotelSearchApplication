export default function Loader({ count = 6 }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      role="status"
      aria-label="Loading hotels"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-stub bg-white/60 shadow-stub overflow-hidden animate-pulse">
          <div className="h-44 bg-ink/10" />
          <div className="p-5 space-y-3">
            <div className="h-4 w-2/3 bg-ink/10 rounded" />
            <div className="h-3 w-1/3 bg-ink/10 rounded" />
            <div className="h-3 w-1/2 bg-ink/10 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}
