import { formatPrice, cityCode } from '../utils/format'
import RatingBadge from './RatingBadge'
import { useFavorites } from '../context/FavoritesContext'

export default function HotelCard({ hotel, onOpen }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(hotel.id)

  return (
    <article className="group relative rounded-stub bg-white shadow-stub overflow-hidden transition-transform hover:-translate-y-1">
      <button
        type="button"
        onClick={() => onOpen(hotel)}
        className="block w-full text-left"
        aria-label={`View details for ${hotel.name}`}
      >
        <div className="relative h-44 overflow-hidden">
          <img
            src={hotel.thumbnail}
            alt={hotel.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <RatingBadge rating={hotel.rating} size="sm" />
          </div>
        </div>
      </button>

      {/* Perforated tear line */}
      <div className="relative h-0">
        <div className="stub-notch tear-line h-px w-full" />
      </div>

      {/* Ticket stub */}
      <div className="p-5 pt-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-lg leading-snug text-ink truncate">{hotel.name}</h3>
            <p className="text-xs text-ink/50 mt-0.5 font-mono uppercase tracking-wide">
              {hotel.location} · {cityCode(hotel.location)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => toggleFavorite(hotel)}
            aria-pressed={favorite}
            aria-label={favorite ? 'Remove from shortlist' : 'Add to shortlist'}
            className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
              favorite ? 'bg-rust border-rust text-paper' : 'border-ink/15 text-ink/40 hover:border-rust hover:text-rust'
            }`}
          >
            <svg viewBox="0 0 20 20" fill={favorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path d="M10 17.3l-.9-.8C4.9 12.6 2 10 2 6.9 2 4.4 4 2.5 6.4 2.5c1.4 0 2.7.6 3.6 1.7 0.9-1.1 2.2-1.7 3.6-1.7C15.9 2.5 18 4.4 18 6.9c0 3.1-2.9 5.7-7.1 9.6l-.9.8z" />
            </svg>
          </button>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-ink/40">Per night</p>
            <p className="font-mono text-xl text-rust font-semibold">{formatPrice(hotel.price)}</p>
          </div>
          <button
            onClick={() => onOpen(hotel)}
            className="text-xs font-medium px-3.5 py-2 rounded-full bg-ink text-paper hover:bg-ink-light transition-colors"
          >
            View stay
          </button>
        </div>
      </div>
    </article>
  )
}
