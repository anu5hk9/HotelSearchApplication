import { useEffect, useState, useCallback } from 'react'
import { fetchHotels, HotelApiError } from '../api/hotelApi'

export const PAGE_SIZE = 12

const INITIAL_FILTERS = {
  search: '',
  location: '',
  minPrice: '',
  maxPrice: '',
  minRating: '',
  order: '-rating',
}

/**
 * Owns all filter/sort/pagination state and keeps the hotel list in sync
 * with it by calling the API whenever the state changes.
 */
export function useHotels() {
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [page, setPage] = useState(1)
  const [hotels, setHotels] = useState([])
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const load = useCallback(async () => {
    setStatus('loading')
    setErrorMessage('')
    try {
      const params = {
        search: filters.search || undefined,
        location: filters.location || undefined,
        min_price: filters.minPrice || undefined,
        max_price: filters.maxPrice || undefined,
        min_rating: filters.minRating || undefined,
        order_by: filters.order || undefined,
        limit: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
      }
      const result = await fetchHotels(params)
      setHotels(result.data)
      setCount(result.count)
      setStatus('success')
    } catch (err) {
      const message = err instanceof HotelApiError ? err.message : 'Something went wrong while loading hotels.'
      setErrorMessage(message)
      setStatus('error')
    }
  }, [filters, page])

  useEffect(() => {
    load()
  }, [load])

  const updateFilters = useCallback((patch) => {
    setFilters((prev) => ({ ...prev, ...patch }))
    setPage(1) // any filter change resets to page 1
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS)
    setPage(1)
  }, [])

  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE))

  return {
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
    retry: load,
  }
}
