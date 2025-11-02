import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useContentstack } from '../hooks/useContentstack'

export default function HomePage() {
  const { data, loading, error } = useContentstack('home_page')

  useEffect(() => {
    // Set document title and year
    document.title = 'Contentstack'
    const yearElement = document.getElementById('year')
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear()
    }
  }, [])

  if (loading) {
    return <div className="cs-loading">Loading...</div>
  }

  if (error) {
    console.error('Contentstack error:', error)
  }

  const entry = data?.entry
  const getBlock = data?.getBlock

  // DEBUG: Log the actual entry structure to understand your data
  console.log('🏠 [HomePage Debug] Raw entry:', entry)
  console.log('🏠 [HomePage Debug] Entry keys:', entry ? Object.keys(entry) : 'No entry')
  console.log('🏠 [HomePage Debug] page_sections:', entry?.page_sections)
  
  // DEBUG: Log each page section to see the structure
  if (entry?.page_sections) {
    entry.page_sections.forEach((section, i) => {
      console.log(`🏠 [HomePage Debug] page_sections[${i}]:`, section)
      console.log(`🏠 [HomePage Debug] page_sections[${i}] keys:`, Object.keys(section))
    })
  }
  
  // Get content blocks (try both block-based and direct field access)
  const announcement = getBlock?.('announcement_bar') || entry?.announcement_bar
  const hero = getBlock?.('hero') || entry?.hero || entry
  const roles = getBlock?.('roles') || entry?.roles
  const success = getBlock?.('success_cards') || entry?.success_cards
  const metrics = getBlock?.('metrics') || entry?.metrics
  const analyst = getBlock?.('analyst_recognition') || entry?.analyst_recognition
  const why = getBlock?.('why') || entry?.why
  const quickLinks = getBlock?.('quick_links') || entry?.quick_links
  const bottomCta = getBlock?.('bottom_cta') || entry?.bottom_cta

  // DEBUG: Log what we found
  console.log('🏠 [HomePage Debug] hero block:', hero)
  console.log('🏠 [HomePage Debug] announcement block:', announcement)

  return (
    <>
      {/* Announcement Bar */}
      {(announcement?.enabled !== false) && (
        <div className="announce">
          <div className="container">
            <span>{announcement?.text || announcement?.message || announcement?.content || entry?.announcement || "See what's new at our Fall Product Update — Live November 6"}</span>
            <span aria-hidden="true" className="arrow">→</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="header">
        <div className="container">
          <nav className="navbar" role="navigation" aria-label="main navigation">
            <Link className="navbar-brand" to="/">
              <img src="/assets/logo%20(2).png" alt="Contentstack" width="185" height="32" />
            </Link>
            <ul className="nav-list">
              <li><Link to="/platform">Platform</Link></li>
              <li className="has-dropdown">
                <button className="dropdown-trigger" aria-expanded="false">Resources</button>
                <div className="dropdown" role="menu">
                  <Link to="/blog">Blog</Link>
                  <Link to="/academy">Academy</Link>
                  <Link to="/docs">Documentation</Link>
                  <Link to="/marketplace">Marketplace</Link>
                  <Link to="/updates">Product updates</Link>
                  <Link to="/events">Events</Link>
                </div>
              </li>
              <li><Link to="/plans">Plans</Link></li>
              <li><Link to="/partners">Partners</Link></li>
              <li><Link to="/company">Company</Link></li>
            </ul>
            <div className="nav-cta">
              <Link className="btn ghost" to="/contact">Talk to Us</Link>
              <Link className="btn solid" to="/start">Start Free</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <h1>{hero?.headline || hero?.title || entry?.title || entry?.headline || "The adaptive experience platform for real‑time personalization at speed and scale"}</h1>
          <div className="hero-cta">
            <Link className="btn solid xl" to={hero?.primary_cta?.href || hero?.cta_href || "/start"}>
              {hero?.primary_cta?.label || hero?.cta_text || hero?.cta_label || "Try for free"}
            </Link>
          </div>
        </div>
      </section>

      {/* Logo strip */}
      <section className="logos">
        <div className="container">
          <div className="logo-row" aria-label="Customer brands">
            <div className="logo-pill">Topgolf Callaway</div>
            <div className="logo-pill">Steve Madden</div>
            <div className="logo-pill">MongoDB</div>
            <div className="logo-pill">Alaska Airlines</div>
            <div className="logo-pill">bol.</div>
            <div className="logo-pill">Callaway</div>
            <div className="logo-pill">Burberry</div>
            <div className="logo-pill">Land O'Lakes</div>
            <div className="logo-pill">Simmons &amp; Simmons</div>
            <div className="logo-pill">KLM</div>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="roles" id="platform">
        <div className="container">
          <h2>{roles?.title || "Built for everyone in your organization"}</h2>
          <div className="card-grid reveal">
            {roles?.cards?.map((card, i) => (
              <article key={i} className="role-card">
                <div 
                  className={`role-art role-${i + 1}`} 
                  aria-hidden="true"
                  style={card.image?.url ? {
                    backgroundImage: `url(${card.image.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  } : {}}
                ></div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <Link className="link" to={card.link?.href || "#"}>
                  {card.link?.label || "Learn more"}
                </Link>
              </article>
            )) || (
              // Fallback static content if no Contentstack data
              <>
                <article className="role-card">
                  <div className="role-art role-1" aria-hidden="true"></div>
                  <h3>Business users</h3>
                  <p>Streamline workflows and collaborate with guardrails so teams ship faster.</p>
                  <Link className="link" to="#">Learn more</Link>
                </article>
                <article className="role-card">
                  <div className="role-art role-2" aria-hidden="true"></div>
                  <h3>Developers &amp; IT</h3>
                  <p>Build with your preferred tools and frameworks on an API‑first platform.</p>
                  <Link className="link" to="#">Learn more</Link>
                </article>
                <article className="role-card">
                  <div className="role-art role-3" aria-hidden="true"></div>
                  <h3>Digital leaders</h3>
                  <p>Orchestrate omnichannel experiences and scale with confidence.</p>
                  <Link className="link" to="#">Learn more</Link>
                </article>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Success Cards */}
      <section className="success" id="success">
        <div className="container">
          <p className="eyebrow">{success?.eyebrow || "Customer success"}</p>
          <h2>{success?.title || "Measurable success that makes a difference"}</h2>
          <div className="success-grid reveal">
            {success?.cards?.map((card, i) => (
              <article key={i} className="success-card">
                <div className="metric">
                  <span className="value">{card.value}</span>
                  <span className="unit">{card.unit}</span>
                </div>
                <h3>{card.label}</h3>
                <p className="muted">{card.description}</p>
                <Link className="link" to={card.link?.href || "#"}>
                  {card.link?.label || "Read the story"}
                </Link>
              </article>
            )) || (
              // Fallback content
              <>
                <article className="success-card">
                  <div className="metric">
                    <span className="value">80</span>
                    <span className="unit">%</span>
                  </div>
                  <h3>Faster content publishing</h3>
                  <p className="muted">See how global brands accelerate launches.</p>
                  <Link className="link" to="#">Read the story</Link>
                </article>
                <article className="success-card">
                  <div className="metric">
                    <span className="value">38</span>
                    <span className="unit">%</span>
                  </div>
                  <h3>Conversion rate</h3>
                  <p className="muted">Personalization that impacts revenue.</p>
                  <Link className="link" to="#">Read the story</Link>
                </article>
                <article className="success-card">
                  <div className="metric">
                    <span className="value">21</span>
                    <span className="unit">%</span>
                  </div>
                  <h3>Fewer workflow steps</h3>
                  <p className="muted">Governance without slowing teams.</p>
                  <Link className="link" to="#">Read the story</Link>
                </article>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="metrics">
        <div className="container">
          <div className="metrics-grid reveal">
            {metrics?.metric?.map((item, i) => (
              <div key={i} className="metric-item">
                <h3 className="counter" data-target={item.value?.replace(/[^\d]/g, '')} data-suffix={item.suffix}>
                  {item.value}
                </h3>
                <p>{item.label}</p>
              </div>
            )) || (
              // Fallback metrics
              <>
                <div className="metric-item">
                  <h3 className="counter" data-target="250" data-suffix="x">2.5x</h3>
                  <p>Faster launches</p>
                </div>
                <div className="metric-item">
                  <h3 className="counter" data-target="40" data-suffix="%">40%</h3>
                  <p>Lower TCO</p>
                </div>
                <div className="metric-item">
                  <h3 className="counter" data-target="98" data-suffix="%">98%</h3>
                  <p>CSAT</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Analyst Recognition */}
      <section className="analyst">
        <div className="container">
          <h2>{analyst?.title || "Analyst recognition"}</h2>
          <div className="analyst-grid reveal">
            {analyst?.badges?.map((badge, i) => (
              <article key={i} className="analyst-card">
                <h3>{badge.provider}</h3>
                <p className="tag">{badge.label}</p>
                <p className="muted">Recognition for innovation and market leadership.</p>
              </article>
            )) || (
              // Empty structure for Contentstack to populate
              <>
                <article className="analyst-card">
                  <h3></h3>
                  <p className="tag"></p>
                  <p className="muted"></p>
                </article>
                <article className="analyst-card">
                  <h3></h3>
                  <p className="tag"></p>
                  <p className="muted"></p>
                </article>
                <article className="analyst-card">
                  <h3></h3>
                  <p className="tag"></p>
                  <p className="muted"></p>
                </article>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="why">
        <div className="container">
          <h2>{why?.title || "Why legacy platforms hold you back"}</h2>
          <div className="why-grid reveal">
            {why?.cards?.map((card, i) => (
              <article key={i} className="why-card">
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            )) || (
              // Fallback content
              <>
                <article className="why-card">
                  <h3>Slow releases</h3>
                  <p>Monolithic stacks couple content with code, making every change a release.</p>
                </article>
                <article className="why-card">
                  <h3>Rigid tooling</h3>
                  <p>Limited integrations and templates constrain teams and create workarounds.</p>
                </article>
                <article className="why-card">
                  <h3>Scaling pains</h3>
                  <p>Traffic spikes and new channels require costly re‑platforms and ops.</p>
                </article>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="actions">
        <div className="container">
          <h2>Get started</h2>
          <div className="action-grid reveal">
            {quickLinks?.links?.map((link, i) => (
              <Link key={i} className="action-card" to={link.href}>
                <h3>{link.label}</h3>
                <p className="muted">Quick description for {link.label.toLowerCase()}.</p>
              </Link>
            )) || (
              // Fallback links
              <>
                <Link className="action-card" to="/plans">
                  <h3>Compare plans</h3>
                  <p className="muted">Find the right solution for your team.</p>
                </Link>
                <Link className="action-card" to="/docs">
                  <h3>Read the docs</h3>
                  <p className="muted">Build fast with guides and APIs.</p>
                </Link>
                <Link className="action-card" to="/marketplace">
                  <h3>Explore apps</h3>
                  <p className="muted">Integrations for search, media, commerce and more.</p>
                </Link>
                <Link className="action-card" to="/contact">
                  <h3>Talk to us</h3>
                  <p className="muted">Tell us about your goals. We'll help you get there.</p>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="cta-banner">
        <div className="container">
          <h2>{bottomCta?.title || "Ready to reimagine possible?"}</h2>
          <p className="muted">
            {bottomCta?.subtitle || "Learn more about Contentstack Edge, the adaptive experience platform that powers real‑time, omnichannel personalization."}
          </p>
          <div className="cta-row">
            {bottomCta?.ctas?.map((cta, i) => (
              <Link key={i} className={`btn ${i === 0 ? 'solid' : 'ghost'} xl`} to={cta.href}>
                {cta.label}
              </Link>
            )) || (
              <>
                <Link className="btn solid xl" to="/contact">Request a demo</Link>
                <Link className="btn ghost xl" to="/start">Start free</Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>Solutions</h4>
              <ul>
                <li><a href="#">Solution Center</a></li>
                <li><Link to="/marketplace">Marketplace</Link></li>
                <li><a href="#">Changelog</a></li>
                <li><a href="#">Developers &amp; IT</a></li>
                <li><a href="#">Business users</a></li>
                <li><Link to="/plans">Plans &amp; Pricing</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Learn</h4>
              <ul>
                <li><a href="#">Academy</a></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><a href="#">Product updates</a></li>
                <li><a href="#">Webinars</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><Link to="/company">About us</Link></li>
                <li><a href="#">News</a></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><a href="#">Customer support portal</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Partners</h4>
              <ul>
                <li><Link to="/partners">Overview</Link></li>
                <li><Link to="/partners" state={{ tab: 'solutions' }}>Find a partner</Link></li>
                <li><a href="#">Login</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container footnote">
          <p>© <span id="year"></span> Contentstack. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
