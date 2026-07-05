/**
 * Thin client for the Demo Hotels API.
 * Docs: https://demohotelsapi.pythonanywhere.com/
 *
 * Supported query params (per API docs):
 *  - location        icontains match on location
 *  - search          icontains match on name OR location
 *  - price           exact price match
 *  - min_price / max_price
 *  - rating          exact rating match
 *  - min_rating / max_rating
 *  - limit / skip    pagination (slice semantics)
 *  - order_by        e.g. "-rating", "price"
 */

const BASE_URL = 'https://demohotelsapi.pythonanywhere.com'

class HotelApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'HotelApiError'
    this.status = status
  }
}

function buildQuery(params = {}) {
  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    search.set(key, value)
  })
  const qs = search.toString()
  return qs ? `?${qs}` : ''
}

async function request(path, params) {
  const url = `${BASE_URL}${path}${buildQuery(params)}`
  let res
  try {
    res = await fetch(url)
  } catch (err) {
    throw new HotelApiError('Could not reach the hotel service. Check your connection and try again.', 0)
  }

  if (!res.ok) {
    throw new HotelApiError(`The hotel service responded with an error (${res.status}).`, res.status)
  }

  const json = await res.json()
  return json
}

/**
 * Fetch a list of hotels, optionally filtered/sorted/paginated.
 * Returns { count, returned, data }
 */
export async function fetchHotels(params) {
  const json = await request('/hotels/', params)
  return {
    count: json.count ?? 0,
    returned: json.returned ?? (json.data ? json.data.length : 0),
    data: json.data ?? [],
  }
}

/**
 * Fetch a single hotel by its numeric id.
 */
export async function fetchHotelById(id) {
  const json = await request(`/hotels/${id}/`)
  // The API returns { status, message, data } for detail lookups,
  // but guard for a bare object just in case.
  return json.data ?? json
}

export { HotelApiError }
