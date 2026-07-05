export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const goTo = (p) => {
    const clamped = Math.min(Math.max(1, p), totalPages)
    onChange(clamped)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Build a compact page list: first, last, current +/-1, with ellipses
  const pages = []
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) pages.push(p)
  }
  const withEllipses = []
  let last = 0
  for (const p of pages) {
    if (p - last > 1) withEllipses.push('…')
    withEllipses.push(p)
    last = p
  }

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-10" aria-label="Pagination">
      <button
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        className="px-3 py-2 rounded-full text-sm border border-ink/15 disabled:opacity-30 disabled:cursor-not-allowed hover:border-ink/40 transition-colors"
        aria-label="Previous page"
      >
        ←
      </button>
      {withEllipses.map((p, i) =>
        p === '…' ? (
          <span key={`e-${i}`} className="px-2 text-ink/40 font-mono text-sm">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => goTo(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`w-9 h-9 rounded-full text-sm font-mono transition-colors ${
              p === page ? 'bg-ink text-paper' : 'border border-ink/15 hover:border-ink/40'
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-2 rounded-full text-sm border border-ink/15 disabled:opacity-30 disabled:cursor-not-allowed hover:border-ink/40 transition-colors"
        aria-label="Next page"
      >
        →
      </button>
    </nav>
  )
}
