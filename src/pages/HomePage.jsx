import React, { useEffect } from 'react'
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

  // Get content blocks
  const announcement = getBlock?.('announcement_bar')
  const hero = getBlock?.('hero')
  const roles = getBlock?.('roles')
  const success = getBlock?.('success_cards')
  const metrics = getBlock?.('metrics')
  const analyst = getBlock?.('analyst_recognition')
  const why = getBlock?.('why')
  const quickLinks = getBlock?.('quick_links')
  const bottomCta = getBlock?.('bottom_cta')

  return (
    <>
      {/* Announcement Bar */}
      {announcement?.enabled && (
        <div className="announce">
          <div className="container">
            <span>{announcement.text || "See what's new at our Fall Product Update — Live November 6"}</span>
            <span aria-hidden="true" className="arrow">→</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="header">
        <div className="container">
          <nav className="navbar" role="navigation" aria-label="main navigation">
            <a className="navbar-brand" href="/">
              <img src="/assets/logo%20(2).png" alt="Contentstack" width="185" height="32" />
            </a>
            <ul className="nav-list">
              <li><a href="/platform">Platform</a></li>
              <li className="has-dropdown">
                <button className="dropdown-trigger" aria-expanded="false">Resources</button>
                <div className="dropdown" role="menu">
                  <a href="/blog">Blog</a>
                  <a href="/academy">Academy</a>
                  <a href="/docs">Documentation</a>
                  <a href="/marketplace">Marketplace</a>
                  <a href="/updates">Product updates</a>
                  <a href="/events">Events</a>
                </div>
              </li>
              <li><a href="/plans">Plans</a></li>
              <li><a href="/partners">Partners</a></li>
              <li><a href="/company">Company</a></li>
            </ul>
            <div className="nav-cta">
              <a className="btn ghost" href="/contact">Talk to Us</a>
              <a className="btn solid" href="/start">Start Free</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <h1>{hero?.headline || "The adaptive experience platform for real‑time personalization at speed and scale"}</h1>
          <div className="hero-cta">
            <a className="btn solid xl" href={hero?.primary_cta?.href || "/start"}>
              {hero?.primary_cta?.label || "Try for free"}
            </a>
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
                <a className="link" href={card.link?.href || "#"}>
                  {card.link?.label || "Learn more"}
                </a>
              </article>
            )) || (
              // Fallback static content if no Contentstack data
              <>
                <article className="role-card">
                  <div className="role-art role-1" aria-hidden="true"></div>
                  <h3>Business users</h3>
                  <p>Streamline workflows and collaborate with guardrails so teams ship faster.</p>
                  <a className="link" href="#">Learn more</a>
                </article>
                <article className="role-card">
                  <div className="role-art role-2" aria-hidden="true"></div>
                  <h3>Developers &amp; IT</h3>
                  <p>Build with your preferred tools and frameworks on an API‑first platform.</p>
                  <a className="link" href="#">Learn more</a>
                </article>
                <article className="role-card">
                  <div className="role-art role-3" aria-hidden="true"></div>
                  <h3>Digital leaders</h3>
                  <p>Orchestrate omnichannel experiences and scale with confidence.</p>
                  <a className="link" href="#">Learn more</a>
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
                <a className="link" href={card.link?.href || "#"}>
                  {card.link?.label || "Read the story"}
                </a>
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
                  <a className="link" href="#">Read the story</a>
                </article>
                <article className="success-card">
                  <div className="metric">
                    <span className="value">38</span>
                    <span className="unit">%</span>
                  </div>
                  <h3>Conversion rate</h3>
                  <p className="muted">Personalization that impacts revenue.</p>
                  <a className="link" href="#">Read the story</a>
                </article>
                <article className="success-card">
                  <div className="metric">
                    <span className="value">21</span>
                    <span className="unit">%</span>
                  </div>
                  <h3>Fewer workflow steps</h3>
                  <p className="muted">Governance without slowing teams.</p>
                  <a className="link" href="#">Read the story</a>
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
              <a key={i} className="action-card" href={link.href}>
                <h3>{link.label}</h3>
                <p className="muted">Quick description for {link.label.toLowerCase()}.</p>
              </a>
            )) || (
              // Fallback links
              <>
                <a className="action-card" href="/plans">
                  <h3>Compare plans</h3>
                  <p className="muted">Find the right solution for your team.</p>
                </a>
                <a className="action-card" href="/docs">
                  <h3>Read the docs</h3>
                  <p className="muted">Build fast with guides and APIs.</p>
                </a>
                <a className="action-card" href="/marketplace">
                  <h3>Explore apps</h3>
                  <p className="muted">Integrations for search, media, commerce and more.</p>
                </a>
                <a className="action-card" href="/contact">
                  <h3>Talk to us</h3>
                  <p className="muted">Tell us about your goals. We'll help you get there.</p>
                </a>
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
              <a key={i} className={`btn ${i === 0 ? 'solid' : 'ghost'} xl`} href={cta.href}>
                {cta.label}
              </a>
            )) || (
              <>
                <a className="btn solid xl" href="/contact">Request a demo</a>
                <a className="btn ghost xl" href="/start">Start free</a>
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
                <li><a href="/marketplace">Marketplace</a></li>
                <li><a href="#">Changelog</a></li>
                <li><a href="#">Developers &amp; IT</a></li>
                <li><a href="#">Business users</a></li>
                <li><a href="/plans">Plans &amp; Pricing</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Learn</h4>
              <ul>
                <li><a href="#">Academy</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="#">Product updates</a></li>
                <li><a href="#">Webinars</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="/company">About us</a></li>
                <li><a href="#">News</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="#">Customer support portal</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Partners</h4>
              <ul>
                <li><a href="/partners">Overview</a></li>
                <li><a href="/partners#solutions">Find a partner</a></li>
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
