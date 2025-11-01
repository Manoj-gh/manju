import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useContentstack } from '../hooks/useContentstack'

export default function PartnersPage() {
  const { data, loading, error } = useContentstack('partner')
  const [activeTab, setActiveTab] = useState('solutions')
  const [searchTerm, setSearchTerm] = useState('')
  
  useEffect(() => {
    document.title = 'Partners – Contentstack'
  }, [])

  if (loading) {
    return <div className="cs-loading">Loading Partners...</div>
  }

  if (error) {
    console.error('Partners Contentstack error:', error)
    return <div>Error loading partners: {error.message}</div>
  }

  // Get all partners entries (not just first one)
  const allPartners = data?.data?.entries || []
  console.log('🤝 [Partners] All partners data:', allPartners)
  
  // Filter partners by type
  const solutionsPartners = allPartners.filter(p => 
    p.partner_type?.toLowerCase() === 'solutions' || 
    p.partner_type?.toLowerCase() === 'solution'
  )
  
  const technologyPartners = allPartners.filter(p => 
    p.partner_type?.toLowerCase() === 'technology' || 
    p.partner_type?.toLowerCase() === 'tech'
  )
  
  // Filter by search term
  const filterPartners = (partners) => {
    if (!searchTerm) return partners
    return partners.filter(partner => 
      partner.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.summary?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const currentPartners = activeTab === 'solutions' 
    ? filterPartners(solutionsPartners) 
    : filterPartners(technologyPartners)

  return (
    <>
      <header className="site-header">
        <div className="container nav">
          <Link className="logo" to="/">
            <img src="/assets/logo%20(2).png" alt="Contentstack" className="logo-img" /> 
            Contentstack
          </Link>
          <Link className="btn ghost" to="/">Back</Link>
        </div>
      </header>

      <section className="hero partners-hero">
        <div className="container">
          <h1>Our partner ecosystem</h1>
          <p className="muted">Find the right solutions or technology partner to make your next digital project a success.</p>
          <div className="cta">
            <a className="btn solid" href="#">Partner login</a>
            <Link className="btn ghost" to="/contact">Become a partner</Link>
          </div>
          
          <div style={{marginTop: '20px'}}>
            <input 
              type="text"
              className="search" 
              placeholder="Search partners"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '12px 16px',
                background: '#14141f',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: '#fff',
                marginBottom: '20px'
              }}
            />
          </div>
          
          <div className="tablist" data-tabs>
            <button 
              role="tab" 
              className={activeTab === 'solutions' ? 'active' : ''}
              onClick={() => setActiveTab('solutions')}
            >
              Solutions Partners ({solutionsPartners.length})
            </button>
            <button 
              role="tab" 
              className={activeTab === 'technology' ? 'active' : ''}
              onClick={() => setActiveTab('technology')}
            >
              Technology Partners ({technologyPartners.length})
            </button>
          </div>
        </div>
      </section>

      <main className="container">
        <section role="tabpanel">
          <div className="cards">
            {currentPartners.length > 0 ? (
              currentPartners.map((partner, index) => (
                <article key={partner.uid || index} className="p-card">
                  {partner.logo?.url && (
                    <img alt={partner.title} src={partner.logo.url} />
                  )}
                  <h3>{partner.title}</h3>
                  <p>{partner.summary || 'Partner description not available.'}</p>
                  <div className="cta">
                    {partner.website && (
                      <a className="link" href={partner.website} target="_blank" rel="noopener noreferrer">
                        Learn more
                      </a>
                    )}
                  </div>
                </article>
              ))
            ) : (
              <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '40px'}}>
                <h3>No {activeTab} partners found</h3>
                <p className="muted">
                  {searchTerm 
                    ? `No partners match "${searchTerm}"`
                    : `No ${activeTab} partners available yet.`
                  }
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <style jsx>{`
        .partners-hero { padding: 56px 0 30px; }
        .tablist { 
          display: flex; 
          gap: 24px; 
          justify-content: center; 
          border-bottom: 1px solid var(--border); 
        }
        .tablist button { 
          background: transparent; 
          border: 0; 
          color: var(--text-1); 
          padding: 14px 0; 
          font-weight: 600; 
          cursor: pointer; 
        }
        .tablist button.active { 
          color: #fff; 
          border-bottom: 3px solid var(--accent); 
          margin-bottom: -1px; 
        }
        .cards { 
          display: grid; 
          grid-template-columns: repeat(3, minmax(0,1fr)); 
          gap: 22px; 
          padding: 24px 0 60px; 
        }
        .p-card { 
          background: #14141f; 
          border: 1px solid var(--border); 
          border-radius: 12px; 
          padding: 22px; 
        }
        .p-card h3 { margin: 0 0 8px; }
        .p-card p { color: var(--text-1); }
        .p-card img { 
          width: 56px; 
          height: 56px; 
          border-radius: 10px; 
          border: 1px solid var(--border); 
          background: #0f0f18; 
          margin-bottom: 8px; 
        }
        .cta { 
          display: flex; 
          gap: 10px; 
          align-items: center; 
          margin-top: 10px; 
        }
        @media (max-width: 1100px) { .cards { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 760px) { .cards { grid-template-columns: 1fr; } }
      `}</style>
    </>
  )
}
