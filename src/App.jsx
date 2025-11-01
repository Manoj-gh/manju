import React, { useEffect } from 'react'
import { Routes, Route, useLocation, Link, HashRouter, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PlatformPage from './pages/PlatformPage'
import PlansPage from './pages/PlansPage'
import CompanyPage from './pages/CompanyPage'
import PartnersPage from './pages/PartnersPage'
import DocsPage from './pages/DocsPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import ErrorBoundary from './components/ErrorBoundary'

function AppRoutes() {
  const location = useLocation()

  useEffect(() => {
    // Debug current route
    console.log('🧭 [App] Current location:', location.pathname, location.hash);
    console.log('🧭 [App] Full URL:', window.location.href);
    
    // Initialize counters and animations (from original script.js)
    const script = document.createElement('script')
    script.src = '/assets/script.js'
    document.body.appendChild(script)

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [location])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/platform" element={<PlatformPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/marketplace" element={<div>Marketplace coming soon</div>} />
        <Route path="/careers" element={<div>Careers coming soon</div>} />
        <Route path="/events" element={<div>Events coming soon</div>} />
        <Route path="/updates" element={<div>Updates coming soon</div>} />
        <Route path="/academy" element={<div>Academy coming soon</div>} />
        <Route path="/start" element={<Navigate to="/" replace />} />
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </ErrorBoundary>
  )
}

export default App
