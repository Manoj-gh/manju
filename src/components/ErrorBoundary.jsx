import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('🚨 [React Error]:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center', 
          background: '#14141f', 
          color: '#fff',
          minHeight: '100vh'
        }}>
          <h1>Oops! Something went wrong</h1>
          <p>The page encountered an error. Please try refreshing or go back to home.</p>
          <div style={{ margin: '20px 0' }}>
            <button 
              onClick={() => window.location.href = '/#/'}
              style={{
                background: '#7c3aed',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                marginRight: '10px',
                cursor: 'pointer'
              }}
            >
              Go to Home
            </button>
            <button 
              onClick={() => window.location.reload()}
              style={{
                background: 'transparent',
                color: '#7c3aed',
                border: '1px solid #7c3aed',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Refresh Page
            </button>
          </div>
          <details style={{ marginTop: '20px', textAlign: 'left' }}>
            <summary>Error Details</summary>
            <pre style={{ background: '#0f0f18', padding: '10px', borderRadius: '4px', fontSize: '12px' }}>
              {this.state.error?.toString()}
            </pre>
          </details>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
