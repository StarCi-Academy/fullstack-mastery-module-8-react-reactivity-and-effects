import ReactDOM from 'react-dom/client'
import App from './App'
import './app/globals.css'

// NOTE: StrictMode is intentionally omitted. In dev it double-invokes effects,
// which would double-fire the mock requests and double the request counters that
// this lesson asks the learner (and Playwright) to read. Without it the request
// counts are exact and the race demo is deterministic.
ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
