import React, { useEffect } from 'react'
import { Routes, Route, useLocation, HashRouter, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SimplePage from './pages/SimplePage'
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
             <Route path="/platform" element={<SimplePage title="Platform"><p>Your platform content will be here</p></SimplePage>} />
             <Route path="/plans" element={<SimplePage title="Plans"><p>Your plans content will be here</p></SimplePage>} />
             <Route path="/company" element={<SimplePage title="Company"><p>Your company content will be here</p></SimplePage>} />
             <Route path="/partners" element={<SimplePage title="Partners"><p>Your partners content will be here</p></SimplePage>} />
             <Route path="/docs" element={<SimplePage title="Documentation"><p>Your docs content will be here</p></SimplePage>} />
             <Route path="/blog" element={<SimplePage title="Blog"><p>Your blog content will be here</p></SimplePage>} />
             <Route path="/contact" element={<SimplePage title="Contact"><p>Your contact content will be here</p></SimplePage>} />
             <Route path="/marketplace" element={<SimplePage title="Marketplace"><p>Marketplace coming soon</p></SimplePage>} />
             <Route path="/careers" element={<SimplePage title="Careers"><p>Careers coming soon</p></SimplePage>} />
             <Route path="/events" element={<SimplePage title="Events"><p>Events coming soon</p></SimplePage>} />
             <Route path="/updates" element={<SimplePage title="Updates"><p>Updates coming soon</p></SimplePage>} />
             <Route path="/academy" element={<SimplePage title="Academy"><p>Academy coming soon</p></SimplePage>} />
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
