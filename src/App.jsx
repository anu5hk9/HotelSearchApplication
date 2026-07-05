import { useMemo, useState } from 'react'
import Header from './components/Header'
import SearchConsole from './components/SearchConsole'
import HotelGrid from './components/HotelGrid'
import HotelModal from './components/HotelModal'
import Pagination from './components/Pagination'
import Loader from './components/Loader'
import EmptyState from './components/EmptyState'
import Footer from './components/Footer'
import { useHotels } from './hooks/useHotels'
import { useFavorites } from './context/FavoritesContext'

export default function App() {
  const {
    hotels,
    count,
    status,
    errorMessage,
    filters,
    updateFilters,
    resetFilters,
    page,
    setPage,
    totalPages,
    retry,
  } = useHotels()

  const { favorites } = useFavorites()
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [showingFavorites, setShowingFavorites] = useState(false)

  const visibleHotels = useMemo(
    () => (showingFavorites ? favorites : hotels),
    [showingFavorites, favorites, hotels]
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        favoritesCount={favorites.length}
        showingFavorites={showingFavorites}
        onShowFavorites={() => setShowingFavorites((v) => !v)}
      />

      {!showingFavorites && (
        <SearchConsole
          filters={filters}
          onChange={updateFilters}
          onReset={resetFilters}
          resultCount={count}
          status={status}
        />
      )}

      <main className="flex-1 max-w-6xl mx-auto w-full px-5 sm:px-8 py-10">
        {showingFavorites && (
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl">Your shortlist</h2>
            <button
              onClick={() => setShowingFavorites(false)}
              className="text-sm text-rust font-medium hover:underline"
            >
              ← Back to search
            </button>
          </div>
        )}

        {showingFavorites ? (
          favorites.length === 0 ? (
            <EmptyState
              title="Nothing shortlisted yet"
              description="Tap the heart icon on any hotel card to save it here for later comparison."
              actionLabel="Browse hotels"
              onAction={() => setShowingFavorites(false)}
            />
          ) : (
            <HotelGrid hotels={visibleHotels} onOpen={setSelectedHotel} />
          )
        ) : status === 'loading' ? (
          <Loader />
        ) : status === 'error' ? (
          <EmptyState
            tone="error"
            title="Couldn't load hotels"
            description={errorMessage || 'Please check your connection and try again.'}
            actionLabel="Retry"
            onAction={retry}
          />
        ) : hotels.length === 0 ? (
          <EmptyState
            title="No hotels match those filters"
            description="Try widening your price range, clearing the rating filter, or searching a different city."
            actionLabel="Reset filters"
            onAction={resetFilters}
          />
        ) : (
          <>
            <HotelGrid hotels={visibleHotels} onOpen={setSelectedHotel} />
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </>
        )}
      </main>

      <Footer />

      {selectedHotel && (
        <HotelModal hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />
      )}
    </div>
  )
}
