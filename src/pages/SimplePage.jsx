import React from 'react'

// Simple page component for pages that don't need Contentstack data yet
export default function SimplePage({ title, children }) {
  return (
    <div style={{
      background: '#0a0a0f', 
      color: '#fff', 
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif',
      padding: '50px 20px'
    }}>
      <div style={{maxWidth: '800px', margin: '0 auto', textAlign: 'center'}}>
        <h1 style={{color: '#7c3aed', marginBottom: '30px'}}>{title}</h1>
        {children}
        <div style={{marginTop: '40px'}}>
          <a 
            href="/#/" 
            style={{
              color: '#7c3aed', 
              textDecoration: 'none',
              padding: '10px 20px',
              border: '1px solid #7c3aed',
              borderRadius: '5px',
              display: 'inline-block'
            }}
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
