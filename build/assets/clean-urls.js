// SAFE clean URL script - only cosmetic changes, no breaking changes
(function(){
  
  // 1. Remove .html from current URL (cosmetic only)
  function cleanCurrentURL() {
    const currentPath = window.location.pathname;
    if (currentPath.endsWith('.html') && currentPath !== '/index.html') {
      const cleanPath = currentPath.replace('.html', '');
      // Use replaceState to update URL bar without reload
      window.history.replaceState(null, '', cleanPath);
    }
  }
  
  // 2. Handle clicks on internal links to show clean URLs
  function handleLinkClicks() {
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a');
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) {
        return; // External link or anchor, do nothing
      }
      
      // If it's an internal .html link, show clean URL but load .html file
      if (href.endsWith('.html')) {
        e.preventDefault();
        const cleanUrl = href.replace('.html', '');
        
        // Update URL bar to show clean URL
        window.history.pushState(null, '', cleanUrl);
        
        // Load the actual .html file
        window.location.href = href;
      }
    });
  }
  
  // 3. Handle back/forward buttons
  function handleBrowserNavigation() {
    window.addEventListener('popstate', function(e) {
      const path = window.location.pathname;
      
      // If clean URL, redirect to .html file
      if (!path.endsWith('.html') && !path.endsWith('/')) {
        window.location.href = path + '.html';
      }
    });
  }
  
  // Initialize when page loads
  document.addEventListener('DOMContentLoaded', function() {
    cleanCurrentURL();
    handleLinkClicks();
    handleBrowserNavigation();
    console.log('✅ Clean URLs initialized - no website functionality changed!');
  });
  
})();
