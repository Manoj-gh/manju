import { useState, useEffect } from 'react'

const API_HOST = 'https://cdn.contentstack.io/v3'
const API_KEY = 'blt979982b3ad227a1d'
const DELIVERY_TOKEN = 'cs4a3fe30dbd2e57d4efb25c6a'
const ENVIRONMENT = 'development'
const LOCALE = 'en-us'

async function fetchJSON(url) {
  const sep = url.includes('?') ? '&' : '?'
  const full = `${API_HOST}${url}${sep}locale=${encodeURIComponent(LOCALE)}&ts=${Date.now()}&cache_bust=${Math.random()}`
  
  console.log('🚀 [React CS Debug] Fetching:', full)
  
  const res = await fetch(full, {
    headers: { 
      'api_key': API_KEY, 
      'access_token': DELIVERY_TOKEN,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache'
    }
  })
  
  console.log('📡 [React CS Debug] Response status:', res.status, res.statusText)
  
  if (!res.ok) {
    console.error('❌ [React CS Debug] API Error:', res.status, res.statusText)
    throw new Error(`${res.status} ${res.statusText}`)
  }
  
  const data = await res.json()
  console.log('✅ [React CS Debug] Data received:', data)
  return data
}

function getBlock(entry, uid) {
  const blocks = Array.isArray(entry.page_sections) ? entry.page_sections : []
  return blocks.map(b => b[uid]).find(Boolean)
}

export function useContentstack(contentType) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        console.log(`🏠 [React CS Debug] Loading ${contentType}...`)
        const response = await fetchJSON(`/content_types/${contentType}/entries?environment=${encodeURIComponent(ENVIRONMENT)}&include_count=true&include[]=assets&include[]=references`)
        
        // For partners, return all entries; for others, return first entry
        const isMultiEntry = contentType === 'partner' || contentType === 'blog_post' || contentType === 'event'
        const entry = isMultiEntry ? null : ((response.entries && response.entries[0]) || null)
        
        console.log(`🏠 [React CS Debug] ${contentType} ${isMultiEntry ? 'entries' : 'entry'}:`, isMultiEntry ? response.entries : entry)
        
        if (entry && response.includes) {
          const assets = (response.includes.Asset || response.includes.assets || []).reduce((m, a) => {
            if (a.uid) { m[a.uid] = a.url || a.file?.url }
            return m
          }, {})
          
          console.log('🖼️ [React CS Debug] processed assets:', assets)
          
          // Process any image references in blocks
          if (entry.page_sections) {
            entry.page_sections.forEach(section => {
              Object.values(section).forEach(block => {
                if (block && Array.isArray(block.cards)) {
                  block.cards.forEach(card => {
                    const uid = card.image?.uid || card.image
                    if (uid && assets[uid]) {
                      card.image = { uid, url: assets[uid] }
                    }
                  })
                }
              })
            })
          }
        }
        
        setData({ 
          entry, 
          data: response, // Include full response for multi-entry content types
          getBlock: (uid) => getBlock(entry, uid) 
        })
        setLoading(false)
      } catch (err) {
        console.error('❌ [React CS Debug] Error:', err)
        setError(err)
        setLoading(false)
      }
    }

    fetchData()
  }, [contentType])

  return { data, loading, error }
}
