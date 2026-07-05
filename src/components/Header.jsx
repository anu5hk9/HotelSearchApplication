export default function Header({ favoritesCount, onShowFavorites, showingFavorites }) {
  return (
    <header className="sticky top-0 z-30 bg-ink text-paper">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <span className="text-xl" aria-hidden="true">
            🧳
          </span>
          <span className="font-display text-lg tracking-tight">
            Hotel <span className="text-brass-light">Explorer</span>
          </span>
        </a>

        <button
          onClick={onShowFavorites}
          className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
            showingFavorites
              ? 'bg-brass text-ink border-brass'
              : 'border-paper/25 hover:border-paper/50 text-paper'
          }`}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M10 17.3l-.9-.8C4.9 12.6 2 10 2 6.9 2 4.4 4 2.5 6.4 2.5c1.4 0 2.7.6 3.6 1.7 0.9-1.1 2.2-1.7 3.6-1.7C15.9 2.5 18 4.4 18 6.9c0 3.1-2.9 5.7-7.1 9.6l-.9.8z" />
          </svg>
          Shortlist {favoritesCount > 0 && `(${favoritesCount})`}
        </button>
      </div>
    </header>
  )
}
