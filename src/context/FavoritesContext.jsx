import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const FavoritesContext = createContext(null)
const STORAGE_KEY = 'hotel-explorer:favorites'

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // localStorage might be unavailable (private mode) — fail silently
    }
  }, [favorites])

  const toggleFavorite = (hotel) => {
    setFavorites((prev) => {
      const exists = prev.some((h) => h.id === hotel.id)
      if (exists) return prev.filter((h) => h.id !== hotel.id)
      return [...prev, hotel]
    })
  }

  const isFavorite = (id) => favorites.some((h) => h.id === id)

  const value = useMemo(
    () => ({ favorites, toggleFavorite, isFavorite }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [favorites]
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within a FavoritesProvider')
  return ctx
}
