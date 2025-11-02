import React from 'react'
import { useContentstack } from '../hooks/useContentstack'

export default function PlatformPage() {
  const { data, loading, error } = useContentstack('platform_page')

  if (loading) return <div className="cs-loading">Loading Platform...</div>
  if (error) console.error('Platform page error:', error)

  return (
    <div>
      <h1>Platform Page</h1>
      <p>React Platform page with Contentstack integration</p>
      <a href="/">← Back to Home</a>
    </div>
  )
}
