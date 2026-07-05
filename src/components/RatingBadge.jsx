import { formatRating } from '../utils/format'

export default function RatingBadge({ rating, size = 'md' }) {
  const value = typeof rating === 'string' ? parseFloat(rating) : rating
  const tone =
    value >= 4.5 ? 'bg-brass text-ink' : value >= 3.5 ? 'bg-sage text-ink' : 'bg-ink/10 text-ink'

  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5 gap-1' : 'text-sm px-2.5 py-1 gap-1.5'

  return (
    <span
      className={`inline-flex items-center rounded-full font-mono font-medium ${sizeClasses} ${tone}`}
      aria-label={`Rated ${formatRating(rating)} out of 5`}
    >
      <svg viewBox="0 0 20 20" fill="currentColor" className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'}>
        <path d="M10 1.5l2.6 5.7 6.2.6-4.7 4.2 1.4 6.1L10 15l-5.5 3.1 1.4-6.1-4.7-4.2 6.2-.6L10 1.5z" />
      </svg>
      {formatRating(rating)}
    </span>
  )
}
