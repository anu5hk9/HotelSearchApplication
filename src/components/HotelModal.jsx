import { useEffect, useState } from 'react'
import { fetchHotelById, HotelApiError } from '../api/hotelApi'
import { formatPrice, cityCode } from '../utils/format'
import RatingBadge from './RatingBadge'
import { useFavorites } from '../context/FavoritesContext'

export default function HotelModal({ hotel, onClose }) {
  // Show the card's data immediately, then refine with a live /hotels/:id/ fetch.
  const [detail, setDetail] = useState(hotel)
  const [activePhoto, setActivePhoto] = useState(0)
  const [detailStatus, setDetailStatus] = useState('loading')
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    let cancelled = false
    setDetailStatus('loading')
    fetchHotelById(hotel.id)
      .then((data) => {
        if (cancelled) return
        setDetail({ ...hotel, ...data })
        setDetailStatus('success')
      })
      .catch((err) => {
        if (cancelled) return
        // Keep showing the data we already have from the list card.
        setDetailStatus(err instanceof HotelApiError ? 'stale' : 'error')
      })
    return () => {
      cancelled = true
    }
  }, [hotel])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const photos = detail.photos?.length ? detail.photos : [detail.thumbnail]
  const favorite = isFavorite(detail.id)

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/60 backdrop-blur-sm p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${detail.name} details`}
      onClick={onClose}
    >
      <div
        className="relative bg-paper w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-stub sm:rounded-stub shadow-stub"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-ink/70 text-paper flex items-center justify-center hover:bg-ink"
          aria-label="Close hotel details"
        >
          ✕
        </button>

        {/* Gallery */}
        <div className="relative h-64 sm:h-80 bg-ink/10">
          <img
            src={photos[activePhoto]}
            alt={`${detail.name} — photo ${activePhoto + 1}`}
            className="w-full h-full object-cover"
          />
          {detailStatus === 'loading' && (
            <div className="absolute inset-0 flex items-center justify-center bg-ink/20 text-paper text-sm font-mono">
              Loading live details…
            </div>
          )}
        </div>
        {photos.length > 1 && (
          <div className="flex gap-2 px-5 sm:px-8 py-3 overflow-x-auto bg-ink/5">
            {photos.map((src, i) => (
              <button
                key={src + i}
                onClick={() => setActivePhoto(i)}
                className={`shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-colors ${
                  i === activePhoto ? 'border-rust' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
                aria-label={`Show photo ${i + 1}`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Tear line */}
        <div className="relative h-0">
          <div className="stub-notch tear-line h-px w-full" />
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/40">
                Boarding pass · {cityCode(detail.location)}
              </p>
              <h2 className="font-display text-3xl text-ink mt-1">{detail.name}</h2>
              <p className="text-ink/60 text-sm mt-1">{detail.location}</p>
            </div>
            <RatingBadge rating={detail.rating} />
          </div>

          <p className="mt-5 text-ink/75 leading-relaxed text-sm sm:text-base">{detail.description}</p>

          <div className="mt-6 border-t border-dashed border-ink/15 pt-5 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-ink/40">Per night</p>
              <p className="font-mono text-2xl text-rust font-semibold">{formatPrice(detail.price)}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => toggleFavorite(detail)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-colors ${
                  favorite ? 'bg-rust text-paper border-rust' : 'border-ink/20 hover:border-rust hover:text-rust'
                }`}
              >
                {favorite ? '✓ Shortlisted' : '+ Add to shortlist'}
              </button>
              <button className="px-5 py-2.5 rounded-full text-sm font-medium bg-ink text-paper hover:bg-ink-light transition-colors">
                Reserve stay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
