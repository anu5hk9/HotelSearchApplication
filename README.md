# 🧳 Hotel Explorer

An interactive, responsive hotel search app built with **React + Vite + Tailwind CSS**,
powered entirely by the [Demo Hotels API](https://demohotelsapi.pythonanywhere.com/).

Hotel cards are styled as **ticket stubs / boarding passes** — a nod to the travel-booking
subject matter — with a perforated tear-line separating each hotel's photo from its price
and rating stub.

## ✨ Features

- **Live search & filtering** — by keyword, city, price range, and minimum rating
  (`search`, `location`, `min_price`, `max_price`, `min_rating` query params)
- **Sorting** — by rating or price, ascending/descending (`order_by`)
- **Pagination** — via `limit` / `skip`, with a compact page control
- **Hotel detail view** — fetched live from `GET /hotels/:id/`, with a photo gallery
- **Shortlist / favorites** — saved to `localStorage`, toggled from any card or the detail view
- Debounced input, loading skeletons, empty states, and graceful error handling
- Fully responsive (mobile → desktop), keyboard accessible, respects reduced-motion

## 🗂 Project structure

```
hotel-explorer/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx                  # App entry point
    ├── App.jsx                   # Top-level layout & state wiring
    ├── index.css                 # Tailwind layers + ticket-stub styling
    ├── api/
    │   └── hotelApi.js           # Fetch wrapper for the Demo Hotels API
    ├── hooks/
    │   ├── useHotels.js          # Filters/sort/pagination + data fetching
    │   └── useDebounce.js
    ├── context/
    │   └── FavoritesContext.jsx  # Shortlist state, persisted to localStorage
    ├── components/
    │   ├── Header.jsx
    │   ├── SearchConsole.jsx     # Hero + filter/sort controls
    │   ├── HotelGrid.jsx
    │   ├── HotelCard.jsx         # Signature ticket-stub card
    │   ├── HotelModal.jsx        # Detail view with photo gallery
    │   ├── Pagination.jsx
    │   ├── RatingBadge.jsx
    │   ├── Loader.jsx
    │   └── EmptyState.jsx
    └── utils/
        └── format.js             # Currency / rating / city-code helpers
```

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173.

Build for production:

```bash
npm run build
npm run preview
```

## 🔌 API reference used

Base URL: `https://demohotelsapi.pythonanywhere.com`

| Purpose            | Endpoint                                                        |
|---------------------|------------------------------------------------------------------|
| List / filter hotels | `GET /hotels/?search=&location=&min_price=&max_price=&min_rating=&order_by=&limit=&skip=` |
| Single hotel         | `GET /hotels/:id/`                                                |

## 📤 Pushing this project to GitHub

From inside the `hotel-explorer` folder:

```bash
git init
git add .
git commit -m "Initial commit: Hotel Explorer"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

(Create the empty repo on GitHub first, without a README, so there's no merge conflict.)

## 🛠 Tech stack

- React 18 + Vite 5
- Tailwind CSS 3
- Fetch API (no extra HTTP client needed)
- Fraunces / Inter / IBM Plex Mono (Google Fonts)
