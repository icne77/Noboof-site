/* ============================================
   NOBOOF — MAIN JS (main.js)
   Navigation, cursor, animations, UX
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── LOADER ───────────────────────────────
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1800);
    document.body.style.overflow = 'hidden';
  }

  // ─── CUSTOM CURSOR ────────────────────────
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');

  if (cursor && follower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    const animFollower = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animFollower);
    };
    animFollower();

    document.querySelectorAll('a, button, .product-card, .lookbook-item').forEach(el => {
      el.addEventListener('mouseenter', () => follower.classList.add('hovering'));
      el.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
    });
  }

  // ─── NAV SCROLL ───────────────────────────
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // ─── MOBILE MENU ──────────────────────────
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      const spans = toggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        const spans = toggle.querySelectorAll('span');
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  // ─── SCROLL REVEAL ────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => revealObserver.observe(el));

  // ─── LOOKBOOK DRAG SCROLL ─────────────────
  const lookbook = document.querySelector('.lookbook-scroll');
  if (lookbook) {
    let isDown = false;
    let startX, scrollLeft;

    lookbook.addEventListener('mousedown', e => {
      isDown = true;
      startX = e.pageX - lookbook.offsetLeft;
      scrollLeft = lookbook.scrollLeft;
    });

    lookbook.addEventListener('mouseleave', () => isDown = false);
    lookbook.addEventListener('mouseup', () => isDown = false);

    lookbook.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - lookbook.offsetLeft;
      lookbook.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });

    // Touch support
    let touchStartX;
    lookbook.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].pageX;
      scrollLeft = lookbook.scrollLeft;
    }, { passive: true });

    lookbook.addEventListener('touchmove', e => {
      const diff = touchStartX - e.touches[0].pageX;
      lookbook.scrollLeft = scrollLeft + diff;
    }, { passive: true });
  }

  // ─── PARALLAX HERO IMAGE ──────────────────
  const heroImg = document.querySelector('.hero-image-container img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const offset = window.scrollY * 0.3;
      heroImg.style.transform = `translateY(${offset}px)`;
    });
  }

  // ─── FILTER BUTTONS (shop) ────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        filterProducts(filter);
      });
    });
  }

  function filterProducts(filter) {
    const cards = document.querySelectorAll('.shop-product-card');
    cards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
        setTimeout(() => card.style.opacity = '1', 10);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  }

  // ─── CONTACT FORM ─────────────────────────
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit');
      btn.textContent = 'SENT ✓';
      btn.style.background = '#b8965a';
      btn.style.color = '#0a0a0a';
      setTimeout(() => {
        btn.textContent = 'SEND MESSAGE';
        btn.style.background = '';
        btn.style.color = '';
        contactForm.reset();
      }, 3000);
    });
  }
});
