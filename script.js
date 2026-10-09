document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const siteNav = document.getElementById('siteNav');

  const setMenuOpen = (open) => {
    if (!menuBtn || !siteNav) return;
    siteNav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
    menuBtn.textContent = open ? '×' : '☰';
    document.body.classList.toggle('menu-open', open);
  };

  if (menuBtn && siteNav) {
    menuBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      setMenuOpen(!siteNav.classList.contains('open'));
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('click', (event) => {
      if (!siteNav.classList.contains('open')) return;
      if (!siteNav.contains(event.target) && event.target !== menuBtn) setMenuOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    }, { passive: true });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('in'));
  }

  const progressBar = document.getElementById('progressBar');
  const siteHeader = document.querySelector('.header');
  let ticking = false;
  const updateScrollUI = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = `${docHeight > 0 ? (scrollTop / docHeight) * 100 : 0}%`;
    siteHeader?.classList.toggle('is-scrolled', scrollTop > 12);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollUI);
      ticking = true;
    }
  }, { passive: true });
  updateScrollUI();

  const breedSearch = document.getElementById('breedSearch');
  const breedCards = [...document.querySelectorAll('.breed-card')];
  const filterButtons = [...document.querySelectorAll('.filter-btn')];
  let activeBreedFilter = 'all';

  const applyBreedFilters = () => {
    if (!breedCards.length) return;
    const query = (breedSearch?.value || '').trim().toLocaleLowerCase('zh-Hant');
    let visible = 0;
    breedCards.forEach((card) => {
      const typeMatch = activeBreedFilter === 'all' || (card.dataset.type || '').includes(activeBreedFilter);
      const textMatch = !query || card.textContent.toLocaleLowerCase('zh-Hant').includes(query);
      const show = typeMatch && textMatch;
      card.hidden = !show;
      if (show) visible += 1;
    });
    const noResults = document.getElementById('noBreedResults');
    if (noResults) noResults.style.display = visible ? 'none' : 'block';
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => {
        item.classList.remove('active');
        item.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
      activeBreedFilter = button.dataset.filter || 'all';
      applyBreedFilters();
    });
  });
  breedSearch?.addEventListener('input', applyBreedFilters);

  const lightbox = document.getElementById('imageLightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.querySelector('.lightbox-close');
  let lastLightboxTrigger = null;

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.classList.remove('menu-open');
    lastLightboxTrigger?.focus();
  };

  document.querySelectorAll('[data-lightbox-src]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      lastLightboxTrigger = trigger;
      lightboxImage.src = trigger.dataset.lightboxSrc || '';
      lightboxImage.alt = trigger.dataset.lightboxAlt || '';
      lightbox.classList.add('open');
      document.body.classList.add('menu-open');
      lightboxClose?.focus();
    });
  });
  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox?.classList.contains('open')) closeLightbox();
  });
});
