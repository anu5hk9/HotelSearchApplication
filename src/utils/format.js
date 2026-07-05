const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export function formatPrice(price) {
  const value = typeof price === 'string' ? parseFloat(price) : price
  if (Number.isNaN(value)) return '—'
  return currencyFormatter.format(value)
}

export function formatRating(rating) {
  const value = typeof rating === 'string' ? parseFloat(rating) : rating
  if (Number.isNaN(value)) return '—'
  return value.toFixed(1)
}

/**
 * Turns a city name into a short "airport style" code for the ticket-stub
 * motif, e.g. "Bengaluru" -> "BLR", "Goa" -> "GOA".
 */
const CITY_CODES = {
  Ahmedabad: 'AMD',
  Bengaluru: 'BLR',
  Chennai: 'MAA',
  Delhi: 'DEL',
  Goa: 'GOI',
  Gurgaon: 'GGN',
  Hyderabad: 'HYD',
  Jaipur: 'JAI',
  Kolkata: 'CCU',
  Mumbai: 'BOM',
  Noida: 'NOI',
  Pune: 'PNQ',
}

export function cityCode(location) {
  if (!location) return '---'
  return CITY_CODES[location] || location.slice(0, 3).toUpperCase()
}
