/**
 * quote-generator.js — Dynamic Quote API Integration
 * Fetches quotes from Advice Slip API (with CORS support)
 * Glass morphism design with dark/light theme support
 * Real-time updates with beautiful animations
 */

class QuoteGenerator {
  constructor() {
    this.container = document.getElementById('quote-container');
    this.currentQuote = null;
    this.isLoading = false;
    // Using Advice Slip API - has proper CORS headers
    this.apiUrl = 'https://api.adviceslip.com/advice';
    this.init();
  }

  init() {
    if (!this.container) return;
    this.setupEventListeners();
    this.displayRandomQuote();
  }

  /**
   * Fetch a random quote/advice from Advice Slip API (CORS-enabled)
   */
  async fetchQuoteFromAPI() {
    try {
      this.isLoading = true;
      
      const response = await fetch(this.apiUrl);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      // Advice Slip API format
      this.currentQuote = {
        text: data.slip?.advice || data.advice || 'No advice available',
        author: 'Advice Slip',
        source: 'Daily Wisdom'
      };

      return this.currentQuote;
    } catch (error) {
      console.warn('Failed to fetch from ZenQuotes API, using fallback:', error);
      // Fallback quote if API fails
      this.currentQuote = {
        text: 'The best time to plant a tree was 20 years ago. The second best time is now.',
        author: 'Chinese Proverb',
        source: 'Wisdom'
      };
      return this.currentQuote;
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Display quote with smooth fade animation
   */
  async displayRandomQuote() {
    if (this.isLoading) return;

    const quoteEl = this.container.querySelector('.quote-text');
    const authorEl = this.container.querySelector('.quote-author');
    const sourceEl = this.container.querySelector('.quote-source');
    const refreshBtn = this.container.querySelector('.quote-refresh-btn');

    if (!quoteEl || !authorEl) return;

    // Fetch new quote
    await this.fetchQuoteFromAPI();

    // Fade out
    this.container.classList.add('quote-fade-out');

    // Update content during fade
    setTimeout(() => {
      quoteEl.textContent = `"${this.currentQuote.text}"`;
      authorEl.textContent = `— ${this.currentQuote.author}`;
      if (sourceEl) sourceEl.textContent = this.currentQuote.source;

      // Fade in
      this.container.classList.remove('quote-fade-out');
    }, 300);

    // Update button state
    if (refreshBtn) {
      refreshBtn.disabled = true;
      setTimeout(() => {
        refreshBtn.disabled = false;
      }, 600);
    }
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    const refreshBtn = this.container.querySelector('.quote-refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => this.displayRandomQuote());
      refreshBtn.disabled = false;
    }

    // Keyboard shortcut: Ctrl+Space or Space to refresh
    document.addEventListener('keydown', (e) => {
      if ((e.code === 'Space' || (e.ctrlKey && e.code === 'Space')) && e.target === document.body) {
        e.preventDefault();
        this.displayRandomQuote();
      }
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.quoteGenerator = new QuoteGenerator();
  });
} else {
  window.quoteGenerator = new QuoteGenerator();
}
