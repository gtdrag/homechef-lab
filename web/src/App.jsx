import { useEffect, useState } from 'react'
import './App.css'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function App() {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadData() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('http://localhost:3000/api/meals', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`)
        }

        setMeals(await response.json())
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadData()
    return () => controller.abort()
  }, [attempt])

  return (
    <main className="menu-page">
      <header className="menu-header">
        <a className="wordmark" href="#menu" aria-label="Home Chef menu">
          <span className="wordmark-mark" aria-hidden="true">h.</span>
          <span>homechef</span>
        </a>
        <span className="header-note">GOOD FOOD, READY WHEN YOU ARE</span>
      </header>

      <section className="menu-content" id="menu" aria-labelledby="menu-title">
        <div className="menu-intro">
          <p className="eyebrow">THE WEEKLY MENU</p>
          <h1 id="menu-title">Dinner, <em>handled.</em></h1>
          <p className="intro-copy">Thoughtful, satisfying meals made for your kind of week.</p>
        </div>

        <div className="menu-toolbar">
          <h2>On the menu</h2>
          {!loading && !error && (
            <span className="meal-count">
              {meals.length} {meals.length === 1 ? 'dish' : 'dishes'}
            </span>
          )}
        </div>

        {loading && <p className="status-message" role="status">Setting the table...</p>}

        {error && (
          <div className="status-message error-state" role="alert">
            <p>We couldn’t load the menu. {error}</p>
            <button type="button" onClick={() => setAttempt((value) => value + 1)}>
              Try again
            </button>
          </div>
        )}

        {!loading && !error && meals.length === 0 && (
          <p className="status-message">There are no meals on the menu just yet.</p>
        )}

        {!loading && !error && meals.length > 0 && (
          <ul className="meal-list" aria-label="Available meals">
            {meals.map((meal, index) => (
              <li className="meal-row" key={meal.id}>
                <span className="meal-number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="meal-details">
                  <h3>{meal.name}</h3>
                  {meal.description && <p>{meal.description}</p>}
                </div>
                <div className="meal-meta">
                  {meal.calories != null && (
                    <span className="calories">{meal.calories} cal</span>
                  )}
                  <span className="price">
                    {currencyFormatter.format(meal.price_cents / 100)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="menu-footer">
        <span>Made with care, served with ease.</span>
        <span>FRESH IDEAS FOR YOUR TABLE</span>
      </footer>
    </main>
  )
}

export default App
