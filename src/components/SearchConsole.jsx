const CITIES = [
  'Ahmedabad', 'Bengaluru', 'Chennai', 'Delhi', 'Goa', 'Gurgaon',
  'Hyderabad', 'Jaipur', 'Kolkata', 'Mumbai', 'Noida', 'Pune',
]

const SORT_OPTIONS = [
  { value: '-rating', label: 'Rating: high to low' },
  { value: 'rating', label: 'Rating: low to high' },
  { value: 'price', label: 'Price: low to high' },
  { value: '-price', label: 'Price: high to low' },
  { value: 'name', label: 'Name: A → Z' },
]

export default function SearchConsole({ filters, onChange, onReset, resultCount, status }) {
  const handleField = (field) => (e) => onChange({ [field]: e.target.value })

  const activeCity = filters.location

  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 12px)',
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-12 pb-10 sm:pt-16 sm:pb-14">
        <p className="font-mono text-xs tracking-[0.25em] text-brass-light uppercase mb-3">
          Departures · 12 cities · live inventory
        </p>
        <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] max-w-xl">
          Find a room worth <span className="italic text-brass-light">the detour.</span>
        </h1>
        <p className="mt-4 text-paper/70 max-w-md text-sm sm:text-base">
          Search real-time listings across India by city, price and rating — every card is your
          boarding pass to the stay.
        </p>

        {/* Search console */}
        <div className="mt-8 bg-paper text-ink rounded-stub shadow-stub p-5 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <label className="sm:col-span-5 flex flex-col gap-1.5">
              <span className="text-xs font-mono uppercase tracking-wide text-ink/50">
                Search hotel or city
              </span>
              <input
                type="text"
                value={filters.search}
                onChange={handleField('search')}
                placeholder="e.g. Marina Nebula, Goa…"
                className="rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-sm focus:border-brass outline-none"
              />
            </label>

            <label className="sm:col-span-3 flex flex-col gap-1.5">
              <span className="text-xs font-mono uppercase tracking-wide text-ink/50">
                Price range (₹)
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  inputMode="numeric"
                  value={filters.minPrice}
                  onChange={handleField('minPrice')}
                  placeholder="Min"
                  className="w-1/2 rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-sm focus:border-brass outline-none"
                />
                <span className="text-ink/30">–</span>
                <input
                  type="number"
                  min="0"
                  inputMode="numeric"
                  value={filters.maxPrice}
                  onChange={handleField('maxPrice')}
                  placeholder="Max"
                  className="w-1/2 rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-sm focus:border-brass outline-none"
                />
              </div>
            </label>

            <label className="sm:col-span-2 flex flex-col gap-1.5">
              <span className="text-xs font-mono uppercase tracking-wide text-ink/50">Min rating</span>
              <select
                value={filters.minRating}
                onChange={handleField('minRating')}
                className="rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-sm focus:border-brass outline-none"
              >
                <option value="">Any</option>
                {[4.5, 4, 3.5, 3, 2.5].map((r) => (
                  <option key={r} value={r}>
                    {r}+
                  </option>
                ))}
              </select>
            </label>

            <label className="sm:col-span-2 flex flex-col gap-1.5">
              <span className="text-xs font-mono uppercase tracking-wide text-ink/50">Sort by</span>
              <select
                value={filters.order}
                onChange={handleField('order')}
                className="rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-sm focus:border-brass outline-none"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* City chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {CITIES.map((city) => {
              const active = activeCity === city
              return (
                <button
                  key={city}
                  onClick={() => onChange({ location: active ? '' : city })}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    active
                      ? 'bg-rust text-paper border-rust'
                      : 'border-ink/15 text-ink/70 hover:border-ink/40'
                  }`}
                  aria-pressed={active}
                >
                  {city}
                </button>
              )
            })}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-dashed border-ink/15 pt-4">
            <p className="text-xs font-mono text-ink/50">
              {status === 'loading' ? 'Searching…' : `${resultCount} hotel${resultCount === 1 ? '' : 's'} found`}
            </p>
            <button
              onClick={onReset}
              className="text-xs font-medium text-rust hover:text-rust-light underline underline-offset-2"
            >
              Reset filters
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
