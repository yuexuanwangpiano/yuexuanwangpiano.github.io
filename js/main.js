// ============================================
// Yuexuan Wang — Pianist Website — main.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Language toggle ---
  function applyLanguage(lang) {
    document.querySelectorAll('[data-zh]').forEach(el => {
      if (lang === 'zh') {
        if (!el.dataset.en) el.dataset.en = el.innerHTML;
        el.innerHTML = el.dataset.zh;
      } else {
        if (el.dataset.en) el.innerHTML = el.dataset.en;
      }
    });
    document.querySelectorAll('[data-zh-placeholder]').forEach(el => {
      if (lang === 'zh') {
        if (!el.dataset.enPlaceholder) el.dataset.enPlaceholder = el.placeholder;
        el.placeholder = el.dataset.zhPlaceholder;
      } else {
        if (el.dataset.enPlaceholder) el.placeholder = el.dataset.enPlaceholder;
      }
    });
    localStorage.setItem('lang', lang);
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.textContent = lang === 'zh' ? 'EN' : '中';
    });
  }

  const savedLang = localStorage.getItem('lang') || 'en';
  if (savedLang === 'zh') applyLanguage('zh');

  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = localStorage.getItem('lang') || 'en';
      applyLanguage(current === 'en' ? 'zh' : 'en');
    });
  });

  // --- Sticky nav shrink on scroll ---
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // --- Mobile nav toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // --- Active nav link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Media page tabs ---
  const mediaTabs = document.querySelectorAll('.media-tab');
  const mediaSections = document.querySelectorAll('.media-section');
  if (mediaTabs.length) {
    mediaTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        mediaTabs.forEach(t => t.classList.remove('active'));
        mediaSections.forEach(s => s.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.tab;
        const section = document.getElementById(target);
        if (section) section.classList.add('active');
      });
    });
  }

  // --- Schedule filter ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const perfItems = document.querySelectorAll('.performance-item');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        perfItems.forEach(item => {
          item.style.display = (filter === 'all' || item.dataset.type === filter) ? '' : 'none';
        });
      });
    });
  }

  // --- Contact form ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.submit-btn');
      btn.textContent = 'Sent!';
      btn.style.background = '#4a8c6a';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // --- Newsletter form ---
  const nlForm = document.getElementById('newsletter-form');
  if (nlForm) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = nlForm.querySelector('button');
      btn.textContent = 'Subscribed!';
      btn.style.background = '#4a8c6a';
      setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.style.background = '';
        nlForm.reset();
      }, 3000);
    });
  }

// --- Smooth fade-in on scroll ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });

});
