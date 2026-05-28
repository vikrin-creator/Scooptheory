import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { reportWebVitals } from './utils/analytics'

// Automatically unregister all service workers and clear caches to bypass PWA aggressive caching issues
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister();
    }
  });
}
if ('caches' in window) {
  caches.keys().then((keys) => {
    keys.forEach((key) => caches.delete(key));
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Performance monitoring
reportWebVitals(console.log)
