import ReactDOM from 'react-dom/client'
import App from './App'
import './app/globals.css'

// NOTE: StrictMode is intentionally omitted. This lesson counts renders and
// effect runs to contrast derived state vs effect-synced state; StrictMode's
// double-invoke in dev would double those numbers and obscure the comparison.
ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
