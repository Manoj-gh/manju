import React, { useEffect } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PlatformPage from './pages/PlatformPage'
import PlansPage from './pages/PlansPage'
import CompanyPage from './pages/CompanyPage'
import PartnersPage from './pages/PartnersPage'
import DocsPage from './pages/DocsPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'

function App() {
  const location = useLocation()

  useEffect(() => {
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
      </Routes>
    </div>
  )
}

export default App
