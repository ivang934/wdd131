function highlightCurrentPage() {
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    const linkFile = link.getAttribute('href').split('/').pop();

    if (linkFile === currentFile) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

function initNavToggle() {
  const toggle   = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function updateFavoritesCount() {
  const badge = document.getElementById('fav-count');
  if (!badge) return;

  const favorites = JSON.parse(localStorage.getItem('ar-favorites') || '[]');

  if (favorites.length > 0) {
    badge.textContent  = String(favorites.length);
    badge.style.display = 'inline-flex';
  } else {
    badge.style.display = 'none';
  }
}

function setFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  highlightCurrentPage();
  initNavToggle();
  updateFavoritesCount();
  setFooterYear();
});